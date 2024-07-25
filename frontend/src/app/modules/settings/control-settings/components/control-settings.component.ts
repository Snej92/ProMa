import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateModel} from "../../../../core/store/appState.model";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {controlSetting, editControlSettingModel} from "../store/controlSetting.model";
import {Subscription} from "rxjs";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";
import {loadSpinner} from "../../../../core/store/app.action";
import {deleteSettingControl, loadSettingControl, updateSettingControl} from "../store/controlSetting.actions";
import {AddControlComponent} from "./add-control/add-control.component";
import {getSettingControlById, getSettingControlInfo} from "../store/controlSetting.selectors";


@Component({
  selector: 'app-control-settings',
  templateUrl: './control-settings.component.html',
  styleUrl: './control-settings.component.scss'
})
export class ControlSettingsComponent implements OnInit, OnDestroy{
//Inits
  controlSettings: controlSetting={
    controlSettingList:[],
    errorMessage:''
  };
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['Aktion','Kontrolle'];
  editControlSettings: { [key: number]: editControlSettingModel } = {};

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  addControlSetting(){
    this.openPopup(0,"Kontrolle Hinzufügen", false);
  }

  deleteControl(id:any, deleteName:any){
    console.log(id)
    this.openConfirm('Kontrolle', deleteName, 'Löschen', id);
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
        this.store.dispatch(deleteSettingControl({id:id}))
      }
    })
  }

  openPopup(id:any, title:any, isEdit=false){
    this.dialog.open(AddControlComponent,{
      width:'40%',
      data:{
        id:id,
        title:title,
        isEdit:isEdit
      }
    })
  }

  editControlSetting(id:any){
    if (this.editControlSettings[id]) {
      this.editControlSettings[id].isEdit = !this.editControlSettings[id].isEdit;
      this.store.select(getSettingControlById(id)).subscribe(data => {
        if (data) {
          this.editControlSettings[id] = {
            ...this.editControlSettings[id],
            controlSetting: { ...data },
          };
        }
      });
    } else{
      console.error('Invalid ID:', id);
    }
  }

  updateControlSetting(id:any){
    if (this.editControlSettings[id]) {
      this.editControlSettings[id].isEdit = !this.editControlSettings[id].isEdit;
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(updateSettingControl({controlSettingInput:this.editControlSettings[id].controlSetting}));
    } else{
      console.error('Invalid ID:', id);
    }
  }

  cancelEditControlSetting(id:any){
    if (this.editControlSettings[id]) {
      this.editControlSettings[id].isEdit = !this.editControlSettings[id].isEdit;
      this.editControlSettings[id].controlSetting.item = "";
      this.editControlSettings[id].controlSetting.type = "";
    } else{
      console.error('Invalid ID:', id);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadSettingControl())
    this.subscriptions.push(
      this.store.select(getSettingControlInfo).pipe()
        .subscribe(data=>{
          this.controlSettings=data;
          this.editControlSettings = data.controlSettingList.reduce((acc, item) => {
            acc[item.id] = {
              controlSetting: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editControlSettingModel });
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
