import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";

import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {editProjectionModel, projection} from "../store/projection.model";
import {loadStationProjection, updateStationProjection} from "../store/projection.actions";
import {getProjectionById, getProjectionInfo} from "../store/projection.selectors";
import {DatePipe} from "@angular/common";
import {global} from "../../../../core/store/app.model";
import {MatDatepicker} from "@angular/material/datepicker";


@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrl: './projection.component.scss'
})
export class ProjectionComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];
  projection !: projection;
  editProjection: { [key: number]: editProjectionModel } = {};
  editProjectionDateDone: { [key: number]: editProjectionModel } = {};
  displayedColumns: string[] = ['Projektierung', 'Zusatz', 'Erledigt', 'Datum', 'Benutzer'];
  @Input() stationId!:number;
  @ViewChild('inputField', {static: false}) inputField!: ElementRef;
  @ViewChild('inputFieldDateDone', {static: false}) inputFieldDateDone!: ElementRef;
  manualDateInput : boolean = false;
  validDate : boolean = false;
  date!: string;
  datePipe = new DatePipe('de-DE');


  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    console.log('Station ID: ' + this.stationId);
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadStationProjection({stationId:this.stationId}));
    this.subscriptions.push(
      this.store.select(getProjectionInfo).pipe()
        .subscribe(data =>{
          this.projection=data;
          this.editProjection = data.projectionList.reduce((acc, item) => {
            acc[item.id] = {
              projection: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editProjectionModel });
          this.editProjectionDateDone = data.projectionList.reduce((acc, item) => {
            acc[item.id] = {
              projection: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editProjectionModel });
        })
    )
  }

  setEdit(id:any){
    console.log("enable edit ID: "+ id);
    this.editProjection[id].isEdit = !this.editProjection[id].isEdit
    setTimeout(()=> {
      this.inputField.nativeElement.focus();
    }, 0);
  }

  setEditDateDone(id:any){
    console.log("enable edit ID: "+ id);
    this.editProjectionDateDone[id].isEdit = !this.editProjectionDateDone[id].isEdit
    setTimeout(()=> {
      this.inputFieldDateDone.nativeElement.focus();
    }, 0);
  }

  updateStationProjectionCheckbox(event: MatCheckboxChange, id:any, field: string){
    console.log("update projection")
    this.store.select(getProjectionById(id)).subscribe(data => {
      this.editProjection[id].projection = {...data};
    })
    if(field == "done"){
      this.editProjection[id].projection.done = event.checked;
    }

    if(field == "commited"){
      this.editProjection[id].projection.commited = event.checked;
    }
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationProjection({projectionInput:this.editProjection[id].projection}))
  }

  updateStationProjection(id:any){
    console.log("update projection")
    this.editProjection[id].isEdit = !this.editProjection[id].isEdit
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationProjection({projectionInput:this.editProjection[id].projection}))
  }

  updateStationProjectionDateDone(id:any){
    if(this.validDate){
      console.log("update projection date done")
      this.editProjectionDateDone[id].isEdit = !this.editProjectionDateDone[id].isEdit
      this.editProjectionDateDone[id].projection.dateDone = this.date;
      this.store.dispatch(loadSpinner({isLoading:true}))
      this.store.dispatch(updateStationProjection({projectionInput:this.editProjectionDateDone[id].projection}))
    }
  }

  //Datepicker
  onDateChange(selectedDate: Date, id:any) {
    if(!this.manualDateInput){
      if (selectedDate){
        this.date = this.datePipe.transform(selectedDate, 'dd.MM.yyyy')!;
        this.validDate = global.dateRegex.test(this.date);
        this.updateStationProjectionDateDone(id);
      } else {
        this.date = '';
      }
    }
    this.manualDateInput = false;
  }

  onInputChange(event: Event){
    this.manualDateInput = true;
    console.log("manual date input");
    this.date = (event.target as HTMLInputElement).value;
    this.validDate = global.dateRegex.test(this.date);
  }

  onBlur(picker: MatDatepicker<any>, id:any){
    setTimeout(() => {
      if (!picker.opened) {
        if(this.validDate){
          this.updateStationProjectionDateDone(id);
        } else {
          setTimeout(()=> {
            this.inputFieldDateDone.nativeElement.focus();
          }, 0);
        }
      }
    }, 200);
  }

  leaveEdit(id:any){
    this.editProjectionDateDone[id].isEdit = false
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
