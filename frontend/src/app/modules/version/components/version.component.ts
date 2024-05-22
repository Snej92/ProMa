import {Component, OnDestroy, OnInit} from '@angular/core';
import {versions} from "../store/version.model";
import {Store} from "@ngrx/store";
import {getVersionInfo} from "../store/version.selectors";
import {AppStateModel} from "../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {AddVersionComponent} from "./add-version/add-version.component";
import {deleteVersion, loadVersion} from "../store/version.actions";
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
  displayedColumns: String[] = ['Aktion', 'Datum', 'Version', 'Aufgabe', 'Status']
  columnsToDisplay: String[] = this.displayedColumns.slice();

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadVersion())
    this.subscriptions.push(
      this.store.select(getVersionInfo).pipe()
        .subscribe(data =>{
          this.version=data;
        })
    )
  }

  addVersion(){
    this.OpenPopup(0,'Version hinzufügen', false)
  }

  deleteVersion(id:any){
    console.log(id)
    if(confirm("Wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden")){
      this.store.dispatch(deleteVersion({id:id}));
    }
  }

  editVersion(id:any){
    console.log('version bearbeiten')
    this.OpenPopup(id, 'Version bearbeiten', true)
  }

  OpenPopup(id:any,version:any,isedit=false){
    this.dialog.open(AddVersionComponent,{
      width: '40%',
      data:{
        id:id,
        version:version,
        isedit:isedit
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
