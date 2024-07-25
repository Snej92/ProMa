import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {loadSpinner} from "../../../../../core/store/app.action";
import {technicalDataSettingModel} from "../../store/technicalDataSetting.model";
import {addSettingTechnicalData, updateSettingTechnicalData} from "../../store/technicalDataSetting.actions";


@Component({
  selector: 'app-add-technical-data',
  templateUrl: './add-technical-data.component.html',
  styleUrl: './add-technical-data.component.scss'
})
export class AddTechnicalDataComponent {
  constructor(private dialogRef:MatDialogRef<AddTechnicalDataComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }



  closePopup(){
    this.dialogRef.close()
  }

  technicalDataSettingForm=this.builder.group({
    id:this.builder.control(0),
    item:this.builder.control('', Validators.required),
    unit:this.builder.control('', Validators.required),
  })

  saveTechnicalData(){
    if(this.technicalDataSettingForm.valid){
      const technicalDataSettingInput:technicalDataSettingModel={
        id:0,
        item:this.technicalDataSettingForm.value.item as string,
        unit: this.technicalDataSettingForm.value.unit as string,
      }
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        technicalDataSettingInput.id=this.technicalDataSettingForm.value.id as number
        this.store.dispatch(updateSettingTechnicalData({technicalDataSettingInput:technicalDataSettingInput}))
      }else{
        this.store.dispatch(addSettingTechnicalData({technicalDataSettingInput:technicalDataSettingInput}))
      }
      this.closePopup();
    }
  }
}
