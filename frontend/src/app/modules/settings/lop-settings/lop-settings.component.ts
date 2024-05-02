import {Component, OnInit} from '@angular/core';
import {lop, lopModel} from "../../overview/lop/store/lop.model";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {loadLop} from "../../overview/lop/store/lop.actions";
import {getLop, getLopInfo} from "../../overview/lop/store/lop.selectors";
import {MatDialog} from "@angular/material/dialog";
import {AddLopComponent} from "./add-lop/add-lop.component";
import {Observable} from "rxjs";
import {LopService} from "../../overview/lop/service/lop.service";

@Component({
  selector: 'app-lop-settings',
  templateUrl: './lop-settings.component.html',
  styleUrl: './lop-settings.component.scss'
})
export class LopSettingsComponent implements OnInit{

  lopListSettings !: lopModel[];
  lopSettings !: lop;
  displayedColumns: string[] = ['Aktion','Aufnahme', 'LOP']

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private service: LopService) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadLop())
    this.store.select(getLopInfo).subscribe(data=>{
      this.lopSettings=data;
    })
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
