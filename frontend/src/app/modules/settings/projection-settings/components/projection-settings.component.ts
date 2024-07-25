import {Component, OnDestroy, OnInit} from '@angular/core';
import {editProjectionSettingModel, projectionSetting, projectionSettingModel} from "../store/projectionSetting.model";
import {Subscription} from "rxjs";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";
import {loadSpinner} from "../../../../core/store/app.action";
import {
  deleteSettingProjection,
  loadSettingProjection,
  updateSettingProjection
} from "../store/projectionSetting.actions";
import {AddProjectionComponent} from "./add-projection/add-projection.component";
import {getSettingProjectionById, getSettingProjectionInfo} from "../store/projectionSetting.selectors";


@Component({
  selector: 'app-projection-settings',
  templateUrl: './projection-settings.component.html',
  styleUrl: './projection-settings.component.scss'
})
export class ProjectionSettingsComponent implements OnInit, OnDestroy{
//Inits
  projectionSettings : projectionSetting = {
    projectionSettingList:[],
    errorMessage:''
  };
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['Aktion','Projektierung'];
  editProjectionSettings: { [key: number]: editProjectionSettingModel } = {};

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  addProjectionSetting(){
    this.openPopup(0,"Projektierung Hinzufügen", false);
  }

  deleteProjection(id:any, deleteName:any){
    console.log(id)
    this.openConfirm('Projektierung', deleteName, 'Löschen', id);
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
        this.store.dispatch(deleteSettingProjection({id:id}))
      }
    })
  }

  openPopup(id:any, title:any, isEdit=false){
    this.dialog.open(AddProjectionComponent,{
      width:'40%',
      data:{
        id:id,
        title:title,
        isEdit:isEdit
      }
    })
  }

  editProjectionSetting(id:any){
    if (this.editProjectionSettings[id]) {
      this.editProjectionSettings[id].isEdit = !this.editProjectionSettings[id].isEdit;
      this.store.select(getSettingProjectionById(id)).subscribe(data => {
        if (data) {
          this.editProjectionSettings[id] = {
            ...this.editProjectionSettings[id],
            projectionSetting: { ...data },
          };
        }
      });
    } else{
      console.error('Invalid ID:', id);
    }
  }

  updateProjectionSetting(id:any){
    if (this.editProjectionSettings[id]) {
      this.editProjectionSettings[id].isEdit = !this.editProjectionSettings[id].isEdit;
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(updateSettingProjection({projectionSettingInput:this.editProjectionSettings[id].projectionSetting}));
    } else{
      console.error('Invalid ID:', id);
    }
  }

  cancelEditProjectionSetting(id:any){
    if (this.editProjectionSettings[id]) {
      this.editProjectionSettings[id].isEdit = !this.editProjectionSettings[id].isEdit;
      this.editProjectionSettings[id].projectionSetting.item = "";
      this.editProjectionSettings[id].projectionSetting.type = "";
    } else{
      console.error('Invalid ID:', id);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadSettingProjection())
    this.subscriptions.push(
      this.store.select(getSettingProjectionInfo).pipe()
        .subscribe(data=>{
          this.projectionSettings=data;
          this.editProjectionSettings = data.projectionSettingList.reduce((acc, item) => {
            acc[item.id] = {
              projectionSetting: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editProjectionSettingModel });
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
