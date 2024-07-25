import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {loadSpinner} from "../../../../../core/store/app.action";
import {controlSettingModel} from "../../store/controlSetting.model";
import {addSettingControl, updateSettingControl} from "../../store/controlSetting.actions";


@Component({
  selector: 'app-add-control',
  templateUrl: './add-control.component.html',
  styleUrl: './add-control.component.scss'
})
export class AddControlComponent {

  constructor(private dialogRef:MatDialogRef<AddControlComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }



  closePopup(){
    this.dialogRef.close()
  }

  controlSettingForm=this.builder.group({
    id:this.builder.control(0),
    item:this.builder.control('', Validators.required),
    type:this.builder.control(''),
  })

  saveControl(){
    if(this.controlSettingForm.valid){
      const controlSettingInput:controlSettingModel={
        id:0,
        item:this.controlSettingForm.value.item as string,
        type: this.controlSettingForm.value.type as string,
      }
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        controlSettingInput.id=this.controlSettingForm.value.id as number
        this.store.dispatch(updateSettingControl({controlSettingInput:controlSettingInput}))
      }else{
        this.store.dispatch(addSettingControl({controlSettingInput:controlSettingInput}))
      }
      this.closePopup();
    }
  }
}
