import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {filter, Subscription, take} from "rxjs";
import {additionalHeaderDataModel, stationFavViewModel, stationViewModel} from "../../store/stationView.model";
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
  editData!:stationFavViewModel;
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
    totalProgress:this.builder.control(0),
    version:this.builder.control('1.0'),
    image:this.builder.control(''),
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
    note:this.builder.control(""),
    isFavorite:this.builder.control(false)
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
          id:this.editData.station.id,
          name: this.editData.station.name,
          description: this.editData.station.description,
          issuerAcronym:this.editData.station.issuerAcronym,
          issuerName:this.editData.station.issuerName,
          status:this.editData.station.status,
          totalProgress:this.editData.station.totalProgress,
          version:this.editData.station.version,
          image:this.editData.station.image,
          lopTotal:this.editData.station.lopTotal,
          lopDone:this.editData.station.lopDone,
          lopToDo:this.editData.station.lopToDo,
          lopProgress:this.editData.station.lopProgress,
          documentationTotal:this.editData.station.documentationTotal,
          documentationDone:this.editData.station.documentationDone,
          documentationToDo:this.editData.station.documentationToDo,
          documentationProgress:this.editData.station.documentationProgress,
          specificationTotal:this.editData.station.specificationTotal,
          specificationDone:this.editData.station.specificationDone,
          specificationToDo:this.editData.station.specificationToDo,
          specificationProgress:this.editData.station.specificationProgress,
          controlTotal:this.editData.station.controlTotal,
          controlDone:this.editData.station.controlDone,
          controlToDo:this.editData.station.controlToDo,
          controlProgress:this.editData.station.controlProgress,
          projectionTotal:this.editData.station.projectionTotal,
          projectionDone:this.editData.station.projectionDone,
          projectionToDo:this.editData.station.projectionToDo,
          projectionProgress:this.editData.station.projectionProgress,
          isFavorite:this.editData.isFavorite,
          note:this.editData.station.note
        })
      })
      this.onInitSub.unsubscribe();
    }
  }

  saveStation() {
    const station : stationViewModel = {
      id:0,
      name:this.stationForm.value.name as string,
      description:this.stationForm.value.description as string,
      issuerAcronym:this.stationForm.value.issuerAcronym as string,
      issuerName:this.stationForm.value.issuerName as string,
      status:this.stationForm.value.status as string,
      totalProgress:this.stationForm.value.totalProgress as number,
      version:this.stationForm.value.version as string,
      image:this.stationForm.value.image as string,
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
      note:this.stationForm.value.note as string
    }

    const stationInput : stationFavViewModel = {
      station:station,
      isFavorite: this.stationForm.value.isFavorite as boolean
    }

    this.iterateDynamicControls();

    if(this.data.isEdit){
      station.id = this.stationForm.value.id as number
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
