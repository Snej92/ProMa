import {Component, OnInit} from '@angular/core';
import {versionModel} from "../store/version.model";
import {Store} from "@ngrx/store";
import {getVersion} from "../store/version.selectors";
import {AppStateModel} from "../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {AddVersionComponent} from "./add-version/add-version.component";
import {deleteVersion} from "../store/version.actions";

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrl: './version.component.scss'
})
export class VersionComponent implements OnInit{

  constructor(private store:Store<AppStateModel>, private dialog:MatDialog) {
  }

  versionList !:versionModel[];
  displayedColumns: String[] = ['Version', 'Aufgabe']

  ngOnInit(): void {
    this.store.select(getVersion).subscribe(data=>{
      this.versionList=data;
      console.log(this.versionList)
    })
  }

  addVersion(){
    console.log('Neue Version hinzufügen')
    this.OpenPopup(0,'Version hinzufügen', false)
  }

  deleteVersion(id:any){
    console.log('Version löschen')
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
}
