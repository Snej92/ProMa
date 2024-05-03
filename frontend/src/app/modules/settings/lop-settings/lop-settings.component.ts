import {Component, OnInit} from '@angular/core';
import {lop} from "../../overview/lop/store/lop.model";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {deleteLop, loadLop, loadSpinner} from "../../overview/lop/store/lop.actions";
import {getLopInfo} from "../../overview/lop/store/lop.selectors";
import {MatDialog} from "@angular/material/dialog";
import {AddLopComponent} from "./add-lop/add-lop.component";

@Component({
  selector: 'app-lop-settings',
  templateUrl: './lop-settings.component.html',
  styleUrl: './lop-settings.component.scss'
})
export class LopSettingsComponent implements OnInit{

  lopSettings !: lop;
  displayedColumns: string[] = ['Aktion','Aufnahme', 'LOP']
  isLoading = false;

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));
    setTimeout(()=>{
      this.store.dispatch(loadLop())
      this.store.select(getLopInfo).subscribe(data=>{
        this.lopSettings=data;
      });
    }, 5000);

  }

  addLop(){
    this.openPopup(0,"LOP Hinzufügen", false);
  }

  editLop(id:any){
    console.log(id)
    this.openPopup(id,"LOP Bearbeiten", true);
  }

  deleteLop(id:any){
    console.log(id)
    if(confirm("Wirklich löschen? Vorgang kann nicht Rückgängig gemacht werden")){
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(deleteLop({id:id}))
    }
  }

  openPopup(id:any, title:any, isEdit=false){
    this.dialog.open(AddLopComponent,{
      width:'40%',
      data:{
        id:id,
        title: title,
        isEdit:isEdit
      }
    })
  }
}
