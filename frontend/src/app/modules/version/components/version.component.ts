import {Component, OnDestroy, OnInit} from '@angular/core';
import {versionModel, versions} from "../store/version.model";
import {Store} from "@ngrx/store";
import {getVersionById, getVersionInfo} from "../store/version.selectors";
import {AppStateModel} from "../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {AddVersionComponent} from "./add-version/add-version.component";
import {deleteVersion, loadVersion, updateVersion} from "../store/version.actions";
import {Subscription} from "rxjs";
import {loadSpinner} from "../../../core/store/app.action";


@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrl: './version.component.scss'
})
export class VersionComponent implements OnInit,OnDestroy{

  constructor(private store:Store<AppStateModel>, private dialog:MatDialog) {
  }

  version!:versions;
  private subscriptions: Subscription[] = [];
  displayedColumns: String[] = ['Aktion', 'Datum', 'Version', 'Aufgabe', 'Status'];
  extraColumns: String[] = [];
  updateVersion!:versionModel;


  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadVersion())
    this.subscriptions.push(
      this.store.select(getVersionInfo).pipe()
        .subscribe(data =>{
          this.version=data;
          for(let val of this.version.versionList){
            this.extraColumns = [];
            this.displayedColumns = ['Aktion', 'Datum', 'Version', 'Aufgabe', 'Status'];
            for(let test of val.versionStation){
              this.extraColumns.push(test.stationName);
              this.displayedColumns.push(test.stationName);
            }
          }
        })
    )
  }

  addVersion(){
    this.OpenPopup(0,'Version hinzufügen', false, 'Hinzufügen')
  }

  deleteVersion(id:any){
    console.log(id)
    if(confirm("Wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden")){
      this.store.dispatch(deleteVersion({id:id}));
    }
  }

  editVersion(id:any){
    console.log('version bearbeiten')
    this.OpenPopup(id, 'Version bearbeiten', true, 'Aktualisieren')
  }

  updateVersionStation(versionStationId:number, versionId:number){
    const subscription = this.store.select(getVersionById(versionId)).subscribe(data=>{
      if (data) {
        this.updateVersion = {
          ...data,
          versionStation: data.versionStation.map((station, index) =>
            data.versionStation[index].id === versionStationId ? {...station, done: !station.done} : station
          )
        };
      }
      console.log(this.updateVersion);
      this.store.dispatch(updateVersion({versionInput:this.updateVersion}));

    });
    subscription.unsubscribe();
  }

  OpenPopup(id:any,version:any,isEdit=false, button:any){
    this.dialog.open(AddVersionComponent,{
      width: '40%',
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
