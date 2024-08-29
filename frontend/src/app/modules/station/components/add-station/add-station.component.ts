import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {filter, Subscription, take} from "rxjs";
import {additionalHeaderDataModel, stationViewModel} from "../../store/stationView.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {addStationView, updateStation} from "../../store/stationView.actions";
import {getStationById} from "../../store/stationView.selectors";
import {loadSpinner} from "../../../../core/store/app.action";
import {user} from "../../../userAdministration/store/user-Administration.model";
import {loadUser} from "../../../userAdministration/store/user-administration.actions";
import {getUserInfo} from "../../../userAdministration/store/user-administration.selectors";
import {loadSettingHeaderData} from "../../../settings/HeaderData-settings/store/headerDataSetting.actions";
import {getSettingHeaderDataInfo} from "../../../settings/HeaderData-settings/store/headerDataSetting.selectors";
import {
  editHeaderDataSettingModel,
  headerDataSetting
} from "../../../settings/HeaderData-settings/store/headerDataSetting.model";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrl: './add-station.component.scss'
})
export class AddStationComponent implements OnInit, OnDestroy{
  private onInitSub!:Subscription;
  editData!:stationViewModel;
  user!:user;
  headerDataSettings : headerDataSetting = {
    headerDataSettingList:[],
    errorMessage:''
  };
  dynamicControls: string[] = [];
  headerDataInput : additionalHeaderDataModel[] = [];
  private subscriptions: Subscription[] = [];

  stationForm=this.builder.group({
    id:this.builder.control(0),
    name:this.builder.control('', Validators.required),
    description:this.builder.control(''),
    issuerAcronym:this.builder.control('', Validators.required),
    issuerName:this.builder.control('', Validators.required),
    status:this.builder.control('', Validators.required),
    version:this.builder.control('1.0'),
    totalProgress:this.builder.control(0),
    lopTotal:this.builder.control(0),
    lopDone:this.builder.control(0),
    lopToDo:this.builder.control(0),
    lopProgress:this.builder.control(0),
    documentationTotal:this.builder.control(0),
    documentationDone:this.builder.control(0),
    documentationToDo:this.builder.control(0),
    documentationProgress:this.builder.control(0),
    specificationTotal:this.builder.control(0),
    specificationDone:this.builder.control(0),
    specificationToDo:this.builder.control(0),
    specificationProgress:this.builder.control(0),
    controlTotal:this.builder.control(0),
    controlDone:this.builder.control(0),
    controlToDo:this.builder.control(0),
    controlProgress:this.builder.control(0),
    projectionTotal:this.builder.control(0),
    projectionDone:this.builder.control(0),
    projectionToDo:this.builder.control(0),
    projectionProgress:this.builder.control(0),
  }) as FormGroup;

  constructor(private dialogRef:MatDialogRef<AddStationComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit(): void {
    this.headerDataInput = [];
    this.dynamicControls = [];
    //User
    this.store.dispatch(loadUser())
    this.subscriptions.push(
      this.store.select(getUserInfo).pipe()
        .subscribe(data =>{
          this.user=data;
        })
    )

    //HeaderData
    if(!this.data.isEdit){
      this.store.dispatch(loadSettingHeaderData())
      this.subscriptions.push(
        this.store.select(getSettingHeaderDataInfo).pipe()
          .subscribe(data=>{
            this.headerDataSettings=data;
            this.addAdditionalControls(this.headerDataSettings)
          })
      )
    }

    this.stationForm.get('issuerName')?.setValue('Select Eingabe');

    if(this.data.isEdit){
      this.onInitSub = this.store.select(getStationById(this.data.id)).subscribe(data=>{
        this.editData=data;
        this.stationForm.setValue({
          id:this.editData.id,
          name: this.editData.name,
          description: this.editData.description,
          issuerAcronym:this.editData.issuerAcronym,
          issuerName:this.editData.issuerName,
          status:this.editData.status,
          version:this.editData.version,
          totalProgress:this.editData.totalProgress,
          lopTotal:this.editData.lopTotal,
          lopDone:this.editData.lopDone,
          lopToDo:this.editData.lopToDo,
          lopProgress:this.editData.lopProgress,
          documentationTotal:this.editData.documentationTotal,
          documentationDone:this.editData.documentationDone,
          documentationToDo:this.editData.documentationToDo,
          documentationProgress:this.editData.documentationProgress,
          specificationTotal:this.editData.specificationTotal,
          specificationDone:this.editData.specificationDone,
          specificationToDo:this.editData.specificationToDo,
          specificationProgress:this.editData.specificationProgress,
          controlTotal:this.editData.controlTotal,
          controlDone:this.editData.controlDone,
          controlToDo:this.editData.controlToDo,
          controlProgress:this.editData.controlProgress,
          projectionTotal:this.editData.projectionTotal,
          projectionDone:this.editData.projectionDone,
          projectionToDo:this.editData.projectionToDo,
          projectionProgress:this.editData.projectionProgress
        })
      })
      this.onInitSub.unsubscribe();
    }
  }

  saveStation() {
    const stationInput : stationViewModel = {
      id:0,
      name:this.stationForm.value.name as string,
      description:this.stationForm.value.description as string,
      issuerAcronym:this.stationForm.value.issuerAcronym as string,
      issuerName:this.stationForm.value.issuerName as string,
      status:this.stationForm.value.status as string,
      version:this.stationForm.value.version as string,
      totalProgress:this.stationForm.value.totalProgress as number,
      lopTotal:this.stationForm.value.lopTotal as number,
      lopDone:this.stationForm.value.lopDone as number,
      lopToDo:this.stationForm.value.lopToDo as number,
      lopProgress:this.stationForm.value.lopProgress as number,
      documentationTotal:this.stationForm.value.documentationTotal as number,
      documentationDone:this.stationForm.value.documentationDone as number,
      documentationToDo:this.stationForm.value.documentationToDo as number,
      documentationProgress:this.stationForm.value.documentationProgress as number,
      specificationTotal:this.stationForm.value.specificationTotal as number,
      specificationDone:this.stationForm.value.specificationDone as number,
      specificationToDo:this.stationForm.value.specificationToDo as number,
      specificationProgress:this.stationForm.value.specificationProgress as number,
      controlTotal:this.stationForm.value.controlTotal as number,
      controlDone:this.stationForm.value.controlDone as number,
      controlToDo:this.stationForm.value.controlToDo as number,
      controlProgress:this.stationForm.value.controlProgress as number,
      projectionTotal:this.stationForm.value.projectionTotal as number,
      projectionDone:this.stationForm.value.projectionDone as number,
      projectionToDo:this.stationForm.value.projectionToDo as number,
      projectionProgress:this.stationForm.value.projectionProgress as number,
    }

    this.iterateDynamicControls();

    if(this.data.isEdit){
      stationInput.id = this.stationForm.value.id as number
      console.log(stationInput)
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(updateStation({stationViewInput:stationInput}))
      this.closePopup();
    }else if(!this.data.isEdit && this.stationForm.valid){
      console.log(stationInput)
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(addStationView({stationViewInput:stationInput,headerDataInput:this.headerDataInput}))
      this.closePopup();
    }
  }

  closePopup(){
    this.dialogRef.close();
  }

  addAdditionalControls(additionalHeaderData: headerDataSetting) {
    if(this.dynamicControls.length <= 0){
      for (const header of additionalHeaderData.headerDataSettingList){
        this.stationForm.addControl(header.item, this.builder.control(''));
        this.dynamicControls.push(header.item);
      }
    }
  }

  iterateDynamicControls(){
    this.headerDataInput = [];
    this.dynamicControls.forEach((controlName,index) => {
      const control = this.stationForm.get(controlName);
      // console.log(`Index: ${index}, Control Name: ${controlName}, Value: ${control?.value}`);
      this.headerDataInput.push({
        item: controlName,
        data: control?.value
      });
    })
  }

  onManualInputChange(event: MatCheckboxChange){
    if(!event.checked){
      this.stationForm.get('issuerName')?.setValue('Select Eingabe');
    } else {
      this.stationForm.get('issuerName')?.setValue('');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
