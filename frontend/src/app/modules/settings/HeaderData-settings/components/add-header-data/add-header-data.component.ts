import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {loadSpinner} from "../../../../../core/store/app.action";
import {headerDataSettingModel} from "../../store/headerDataSetting.model";
import {addSettingHeaderData, updateSettingHeaderData} from "../../store/headerDataSetting.actions";


@Component({
  selector: 'app-add-header-data',
  templateUrl: './add-header-data.component.html',
  styleUrl: './add-header-data.component.scss'
})
export class AddHeaderDataComponent {
  constructor(private dialogRef:MatDialogRef<AddHeaderDataComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }



  closePopup(){
    this.dialogRef.close()
  }

  headerDataSettingForm=this.builder.group({
    id:this.builder.control(0),
    item:this.builder.control('', Validators.required),
    type:this.builder.control('TEXTFELD'),
  })

  saveHeaderData(){
    if(this.headerDataSettingForm.valid){
      const headerDataSettingInput:headerDataSettingModel={
        id:0,
        item:this.headerDataSettingForm.value.item as string,
        type: this.headerDataSettingForm.value.type as string,
      }
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        headerDataSettingInput.id=this.headerDataSettingForm.value.id as number
        this.store.dispatch(updateSettingHeaderData({headerDataSettingInput:headerDataSettingInput}))
      }else{
        this.store.dispatch(addSettingHeaderData({headerDataSettingInput:headerDataSettingInput}))
      }
      this.closePopup();
    }
  }
}
