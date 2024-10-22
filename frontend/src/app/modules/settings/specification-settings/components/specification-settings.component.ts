import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  editSpecificationSettingModel,
  specificationSetting,
  specificationSettingModel
} from "../store/specificationSetting.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";
import {loadSpinner} from "../../../../core/store/app.action";
import {
  deleteSettingSpecification,
  loadSettingSpecification,
  updateSettingSpecification
} from "../store/specificationSetting.actions";
import {AddSpecificationComponent} from "./add-specification/add-specification.component";
import {getSettingSpecificationById, getSettingSpecificationInfo} from "../store/specificationSetting.selectors";

@Component({
  selector: 'app-specification-settings',
  templateUrl: './specification-settings.component.html',
  styleUrl: './specification-settings.component.scss'
})
export class SpecificationSettingsComponent implements OnInit, OnDestroy{
//Inits
  specificationSettings : specificationSetting = {
    specificationSettingList:[],
    errorMessage:''
  };
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['Aktion','Vorgabe'];
  editSpecificationSettings: { [key: number]: editSpecificationSettingModel } = {};

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  addSpecificationSetting(){
    this.openPopup(0,"Vorgabe Hinzufügen", false);
  }

  deleteSpecification(id:any, deleteName:any){
    console.log(id)
    this.openConfirm('Doku', deleteName, 'Löschen', id);
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
        this.store.dispatch(deleteSettingSpecification({id:id}))
      }
    })
  }

  openPopup(id:any, title:any, isEdit=false){
    this.dialog.open(AddSpecificationComponent,{
      width:'40%',
      disableClose: true,
      data:{
        id:id,
        title:title,
        isEdit:isEdit
      }
    })
  }

  editSpecificationSetting(id:any){
    if (this.editSpecificationSettings[id]) {
      this.editSpecificationSettings[id].isEdit = !this.editSpecificationSettings[id].isEdit;
      this.store.select(getSettingSpecificationById(id)).subscribe(data => {
        if (data) {
          this.editSpecificationSettings[id] = {
            ...this.editSpecificationSettings[id],
            specificationSetting: { ...data },
          };
        }
      });
    } else{
      console.error('Invalid ID:', id);
    }
  }

  updateSpecificationSetting(id:any){
    if (this.editSpecificationSettings[id]) {
      this.editSpecificationSettings[id].isEdit = !this.editSpecificationSettings[id].isEdit;
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(updateSettingSpecification({specificationSettingInput:this.editSpecificationSettings[id].specificationSetting}));
    } else{
      console.error('Invalid ID:', id);
    }
  }

  cancelEditSpecificationSetting(id:any){
    if (this.editSpecificationSettings[id]) {
      this.editSpecificationSettings[id].isEdit = !this.editSpecificationSettings[id].isEdit;
      this.editSpecificationSettings[id].specificationSetting.item = "";
      this.editSpecificationSettings[id].specificationSetting.type = "";
    } else{
      console.error('Invalid ID:', id);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadSettingSpecification())
    this.subscriptions.push(
      this.store.select(getSettingSpecificationInfo).pipe()
        .subscribe(data=>{
          this.specificationSettings=data;
          this.editSpecificationSettings = data.specificationSettingList.reduce((acc, item) => {
            acc[item.id] = {
              specificationSetting: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editSpecificationSettingModel });
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
