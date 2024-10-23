import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {editTechnicalDataModel, technicalData} from "../store/technicalData.model";
import {loadStationTechnicalData, updateStationTechnicalData} from "../store/technicalData.actions";
import {getTechnicalDataById, getTechnicalDataInfo} from "../store/technicalData.selectors";
import {MatTooltip} from "@angular/material/tooltip";



@Component({
  selector: 'app-technical-data',
  templateUrl: './technical-data.component.html',
  styleUrl: './technical-data.component.scss'
})
export class TechnicalDataComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];
  technicalData !: technicalData;
  editTechnicalData: { [key: number]: editTechnicalDataModel } = {};
  displayedColumns: string[] = ['TechnischeDaten', 'Wert'];
  tooltipMessage = 'Klicken zum kopieren';
  @Input() stationId!:number;
  @ViewChild('inputField', {static: false}) inputField!: ElementRef;


  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    console.log('Station ID: ' + this.stationId);
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadStationTechnicalData({stationId:this.stationId}));
    this.subscriptions.push(
      this.store.select(getTechnicalDataInfo).pipe()
        .subscribe(data =>{
          this.technicalData=data;
          this.editTechnicalData = data.technicalDataList.reduce((acc, item) => {
            acc[item.id] = {
              technicalData: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editTechnicalDataModel });
        })
    )
  }

  setEdit(id:any){
    console.log("enable edit ID: "+ id);
    this.editTechnicalData[id].isEdit = !this.editTechnicalData[id].isEdit
    setTimeout(()=> {
      this.inputField.nativeElement.focus();
    }, 0);
  }

  updateStationTechnicalData(id:any){
    console.log("update technical data")
    this.editTechnicalData[id].isEdit = !this.editTechnicalData[id].isEdit
    console.log(this.editTechnicalData[id].technicalData);

    if(this.checkPattern(this.editTechnicalData[id].technicalData.value.toString()) > 0){
      this.store.dispatch(loadSpinner({isLoading:true}))
      this.store.dispatch(updateStationTechnicalData({technicalDataStationInput:this.editTechnicalData[id].technicalData}))
    } else{
      this.store.select(getTechnicalDataById(id)).subscribe(data => {
        this.editTechnicalData[id].technicalData = {...data}
      })
      this.store.dispatch(showAlert({message: 'Nur Zahlen erlaubt! Gleitkommazahlen sind mit einem Komma zu trennen', actionResult:'fail'}))
    }
  }

  checkPattern(check:string):number{
    const pattern = /^[0-9]+(\,[0-9]+)?$/;
    if(pattern.test(check)){
      return 1
    } else{
      return -1
    }
  }

  copyText(value: string, tooltip: MatTooltip): void {
    navigator.clipboard.writeText(value).then(() => {
      this.tooltipMessage = 'Text in Zwischenablage kopiert!';
      tooltip.show();

      // Hide the tooltip after 2 seconds
      setTimeout(() => {
        tooltip.hide();
        this.resetTooltip();
      }, 2000);
    }).catch(err => {
      this.tooltipMessage = 'Fehler beim kopieren in Zwischenablage!';
      tooltip.show();
      console.error('Failed to copy: ', err);
    });
  }

  resetTooltip(): void {
    setTimeout(() => {
      this.tooltipMessage = 'Klicken zum kopieren';
    }, 300)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
