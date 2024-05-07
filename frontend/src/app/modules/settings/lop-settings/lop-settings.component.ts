import {Component, OnDestroy, OnInit} from '@angular/core';
import {lop} from "../../overview/lop/store/lop.model";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {deleteLop, loadLop} from "../../overview/lop/store/lop.actions";
import {getLopInfo} from "../../overview/lop/store/lop.selectors";
import {MatDialog} from "@angular/material/dialog";
import {AddLopComponent} from "./add-lop/add-lop.component";
import {loadSpinner} from "../../../core/store/app.action";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-lop-settings',
  templateUrl: './lop-settings.component.html',
  styleUrl: './lop-settings.component.scss'
})
export class LopSettingsComponent implements OnInit, OnDestroy{

  lopSettings !: lop;
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['Aktion','Aufnahme', 'LOP']

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(loadLop())
    this.subscriptions.push(
      this.store.select(getLopInfo).pipe()
        .subscribe(data=>{
        this.lopSettings=data;
      })
    )
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
        title:title,
        isEdit:isEdit
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
