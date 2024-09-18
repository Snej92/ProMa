import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {
  editVersion,
  editVersionTemp,
  versionModel,
  versions,
  versionStationModel
} from "../../settings/version/store/version.model";
import {loadSpinner} from "../../../core/store/app.action";
import {deleteVersion, loadVersion, updateVersion} from "../../settings/version/store/version.actions";
import {getVersionInfo} from "../../settings/version/store/version.selectors";
import {AddVersionComponent} from "../../settings/version/components/add-version/add-version.component";
import {SysConfirmationComponent} from "../../../core/sys-confirmation/sys-confirmation.component";

@Component({
  selector: 'app-version-overview',
  templateUrl: './version-overview.component.html',
  styleUrl: './version-overview.component.scss'
})
export class VersionOverviewComponent implements OnInit,OnDestroy{

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }


  private subscriptions: Subscription[] = [];
  displayedColumns: String[] = ['Datum', 'Version', 'Aufgabe', 'Status'];
  extraColumns: String[] = [];
  editVersion: { [key: number]: editVersion } = {};
  editVersionTemp: { [key: number]: editVersionTemp } = {};
  editVersionDeepCopy: { [key: number]: editVersionTemp } = {};
  editVersionStation: { [key: number]: versionStationModel } = {};
  version : versions = {
    versionList:[],
    errorMessage:''
  };


  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadVersion())
    this.subscriptions.push(
      this.store.select(getVersionInfo).pipe()
        .subscribe(data =>{
          this.version=data;
          this.editVersion = data.versionList.reduce((acc, item) => {

            this.editVersionStation = item.versionStation.reduce((acc, item2) => {
              acc[item2.id] = {...item2};
              return acc;
            }, {} as { [key: number]: versionStationModel});

            acc[item.id] = {
              version: {
                ...item,
                versionStation:this.editVersionStation},
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editVersion });

          this.editVersionTemp = data.versionList.reduce((acc, item) => {
            acc[item.id] = {
              version: {...item},
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editVersionTemp });

          this.editVersionDeepCopy = structuredClone(this.editVersionTemp);

          for(let val of this.version.versionList){
            this.extraColumns = [];
            this.displayedColumns = ['Datum', 'Version', 'Aufgabe', 'Status'];
            for(let val2 of val.versionStation){
              this.extraColumns.push(val2.stationName);
              this.displayedColumns.push(val2.stationName);
            }
          }
        })
    )
  }

  addVersion(){
    this.OpenPopup(0,'Version hinzufügen', false, 'Hinzufügen')
  }

  updateVersionStation(versionStationId:any, versionId:any, colIndex:any){

    this.editVersion[versionId].version.versionStation[versionStationId] = this.editVersionDeepCopy[versionId].version.versionStation[colIndex];

    const updateVersionModel:versionModel =  {
      id:this.editVersion[versionId].version.id,
      date:this.editVersion[versionId].version.date,
      toDo:this.editVersion[versionId].version.toDo,
      done:this.editVersion[versionId].version.done,
      version:this.editVersion[versionId].version.version,
      versionStation: Object.values(this.editVersion[versionId].version.versionStation),
    }
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(updateVersion({versionInput:updateVersionModel}));
  }

  OpenPopup(id:any,version:any,isEdit=false, button:any){
    this.dialog.open(AddVersionComponent,{
      width: '25%',
      data:{
        id:id,
        version:version,
        isEdit:isEdit,
        button:button
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
