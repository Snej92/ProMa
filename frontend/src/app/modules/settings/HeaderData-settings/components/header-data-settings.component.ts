import {Component, OnDestroy, OnInit} from '@angular/core';
import {editHeaderDataSettingModel, headerDataSetting} from "../store/headerDataSetting.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";
import {loadSpinner} from "../../../../core/store/app.action";
import {
  deleteSettingHeaderData,
  loadSettingHeaderData,
  updateSettingHeaderData
} from "../store/headerDataSetting.actions";
import {AddHeaderDataComponent} from "./add-header-data/add-header-data.component";
import {getSettingHeaderDataById, getSettingHeaderDataInfo} from "../store/headerDataSetting.selectors";

@Component({
  selector: 'app-header-data-settings',
  templateUrl: './header-data-settings.component.html',
  styleUrl: './header-data-settings.component.scss'
})
export class HeaderDataSettingsComponent implements OnInit, OnDestroy{
//Inits
  headerDataSettings : headerDataSetting = {
    headerDataSettingList:[],
    errorMessage:''
  };
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['Aktion','Kopfdaten'];
  editHeaderDataSettings: { [key: number]: editHeaderDataSettingModel } = {};

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  addHeaderDataSetting(){
    this.openPopup(0,"Kopfdaten Hinzufügen", false);
  }

  deleteHeaderData(id:any, deleteName:any){
    console.log(id)
    this.openConfirm('Kopfdaten', deleteName, 'Löschen', id);
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
        this.store.dispatch(deleteSettingHeaderData({id:id}))
      }
    })
  }

  openPopup(id:any, title:any, isEdit=false){
    this.dialog.open(AddHeaderDataComponent,{
      width:'40%',
      data:{
        id:id,
        title:title,
        isEdit:isEdit
      }
    })
  }

  editHeaderDataSetting(id:any){
    if (this.editHeaderDataSettings[id]) {
      this.editHeaderDataSettings[id].isEdit = !this.editHeaderDataSettings[id].isEdit;
      this.store.select(getSettingHeaderDataById(id)).subscribe(data => {
        if (data) {
          this.editHeaderDataSettings[id] = {
            ...this.editHeaderDataSettings[id],
            headerDataSetting: { ...data },
          };
        }
      });
    } else{
      console.error('Invalid ID:', id);
    }
  }

  updateHeaderDataSetting(id:any){
    if (this.editHeaderDataSettings[id]) {
      this.editHeaderDataSettings[id].isEdit = !this.editHeaderDataSettings[id].isEdit;
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(updateSettingHeaderData({headerDataSettingInput:this.editHeaderDataSettings[id].headerDataSetting}));
    } else{
      console.error('Invalid ID:', id);
    }
  }

  cancelEditHeaderDataSetting(id:any){
    if (this.editHeaderDataSettings[id]) {
      this.editHeaderDataSettings[id].isEdit = !this.editHeaderDataSettings[id].isEdit;
      this.editHeaderDataSettings[id].headerDataSetting.item = "";
      this.editHeaderDataSettings[id].headerDataSetting.type = "";
    } else{
      console.error('Invalid ID:', id);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadSettingHeaderData())
    this.subscriptions.push(
      this.store.select(getSettingHeaderDataInfo).pipe()
        .subscribe(data=>{
          this.headerDataSettings=data;
          this.editHeaderDataSettings = data.headerDataSettingList.reduce((acc, item) => {
            acc[item.id] = {
              headerDataSetting: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editHeaderDataSettingModel });
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
