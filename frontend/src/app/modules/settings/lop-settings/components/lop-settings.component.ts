import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {AddLopComponent} from "./add-lop/add-lop.component";
import {loadSpinner} from "../../../../core/store/app.action";
import {Subscription} from "rxjs";
import {deleteSettingLop, loadSettingLop} from "../store/lopSetting.actions";
import {getSettingLopInfo} from "../store/lopSetting.selectors";
import {lopSetting} from "../store/lopSetting.model";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";


@Component({
  selector: 'app-lop-settings',
  templateUrl: './lop-settings.component.html',
  styleUrl: './lop-settings.component.scss'
})
export class LopSettingsComponent implements OnInit, OnDestroy{

  lopSettings:lopSetting={
    lopSettingList:[],
    errorMessage:''
  }

  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['Aktion','Aufnahme', 'LOP']

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadSettingLop())
    this.subscriptions.push(
      this.store.select(getSettingLopInfo).pipe()
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

  deleteLop(id:any, deleteName:any){
    console.log(id)
    this.openConfirm('LOP', deleteName, 'Löschen', id);
  }

  openConfirm(title:any, confirmName:any, button:any, id:any){
    const confirmRef = this.confirm.open(SysConfirmationComponent, {
      width: '30%',
      data:{
        title: title,
        confirmName: confirmName,
        button:button
      }
    });
    confirmRef.afterClosed().subscribe((confirmed:boolean)=> {
      if(confirmed){
        console.log(id)
        this.store.dispatch(loadSpinner({isLoading:true}));
        this.store.dispatch(deleteSettingLop({id:id}))
      }
    })
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
