import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {editHeaderDataModel, headerData} from "../store/headerData.model";
import {loadStationHeaderData, updateStationHeaderData} from "../store/headerData.actions";
import {getHeaderDataInfo} from "../store/headerData.selectors";


@Component({
  selector: 'app-header-data',
  templateUrl: './header-data.component.html',
  styleUrl: './header-data.component.scss'
})
export class HeaderDataComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];
  headerData !: headerData;
  editHeaderData: { [key: number]: editHeaderDataModel } = {};
  displayedColumns: string[] = ['Kopfdaten', 'Daten'];
  @Input() stationId!:number;
  @ViewChild('inputField', {static: false}) inputField!: ElementRef;


  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    console.log('Station ID: ' + this.stationId);
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadStationHeaderData({stationId:this.stationId}));
    this.subscriptions.push(
      this.store.select(getHeaderDataInfo).pipe()
        .subscribe(data =>{
          this.headerData=data;
          this.editHeaderData = data.headerDataList.reduce((acc, item) => {
            acc[item.id] = {
              headerData: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editHeaderDataModel });
          console.log("edit")
          console.log(this.editHeaderData)
          console.log("header")
          console.log(this.headerData.headerDataList)
        })
    )
  }

  setEdit(id:any){
    console.log("enable edit ID: "+ id);
    this.editHeaderData[id].isEdit = !this.editHeaderData[id].isEdit
    setTimeout(()=> {
      this.inputField.nativeElement.focus();
    }, 0);
  }

  updateStationHeaderData(id:any){
    console.log("update header data")
    this.editHeaderData[id].isEdit = !this.editHeaderData[id].isEdit
    console.log(this.editHeaderData[id].headerData);
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationHeaderData({headerDataStationInput:this.editHeaderData[id].headerData}))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
