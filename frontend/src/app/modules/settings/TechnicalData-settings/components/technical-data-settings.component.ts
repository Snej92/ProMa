import {Component, OnDestroy, OnInit} from '@angular/core';
import {editTechnicalDataSettingModel, technicalDataSetting} from "../store/technicalDataSetting.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";
import {loadSpinner} from "../../../../core/store/app.action";
import {
  deleteSettingTechnicalData,
  loadSettingTechnicalData,
  updateSettingTechnicalData
} from "../store/technicalDataSetting.actions";
import {AddTechnicalDataComponent} from "./add-technical-data/add-technical-data.component";
import {getSettingTechnicalDataById, getSettingTechnicalDataInfo} from "../store/technicalDataSetting.selectors";

@Component({
  selector: 'app-technical-data-settings',
  templateUrl: './technical-data-settings.component.html',
  styleUrl: './technical-data-settings.component.scss'
})
export class TechnicalDataSettingsComponent implements OnInit, OnDestroy{
//Inits
  technicalDataSettings : technicalDataSetting = {
    technicalDataSettingList:[],
    errorMessage:''
  };
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['Aktion','Technische Daten', 'Maßeinheit'];
  editTechnicalDataSettings: { [key: number]: editTechnicalDataSettingModel } = {};

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  addTechnicalDataSetting(){
    this.openPopup(0,"Technische Daten Hinzufügen", false);
  }

  deleteTechnicalData(id:any, deleteName:any){
    console.log(id)
    this.openConfirm('Technische Daten', deleteName, 'Löschen', id);
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
        this.store.dispatch(deleteSettingTechnicalData({id:id}))
      }
    })
  }

  openPopup(id:any, title:any, isEdit=false){
    this.dialog.open(AddTechnicalDataComponent,{
      width:'40%',
      disableClose: true,
      data:{
        id:id,
        title:title,
        isEdit:isEdit
      }
    })
  }

  editTechnicalDataSetting(id:any){
    if (this.editTechnicalDataSettings[id]) {
      this.editTechnicalDataSettings[id].isEdit = !this.editTechnicalDataSettings[id].isEdit;
      this.store.select(getSettingTechnicalDataById(id)).subscribe(data => {
        if (data) {
          this.editTechnicalDataSettings[id] = {
            ...this.editTechnicalDataSettings[id],
            technicalDataSetting: { ...data },
          };
        }
      });
    } else{
      console.error('Invalid ID:', id);
    }
  }

  updateTechnicalDataSetting(id:any){
    if (this.editTechnicalDataSettings[id]) {
      this.editTechnicalDataSettings[id].isEdit = !this.editTechnicalDataSettings[id].isEdit;
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(updateSettingTechnicalData({technicalDataSettingInput:this.editTechnicalDataSettings[id].technicalDataSetting}));
    } else{
      console.error('Invalid ID:', id);
    }
  }

  cancelEditTechnicalDataSetting(id:any){
    if (this.editTechnicalDataSettings[id]) {
      this.editTechnicalDataSettings[id].isEdit = !this.editTechnicalDataSettings[id].isEdit;
      this.editTechnicalDataSettings[id].technicalDataSetting.item = "";
      this.editTechnicalDataSettings[id].technicalDataSetting.unit = "";
    } else{
      console.error('Invalid ID:', id);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadSettingTechnicalData())
    this.subscriptions.push(
      this.store.select(getSettingTechnicalDataInfo).pipe()
        .subscribe(data=>{
          this.technicalDataSettings=data;
          this.editTechnicalDataSettings = data.technicalDataSettingList.reduce((acc, item) => {
            acc[item.id] = {
              technicalDataSetting: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editTechnicalDataSettingModel });
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
