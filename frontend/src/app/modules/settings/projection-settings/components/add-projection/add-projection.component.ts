import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {projectionSettingModel} from "../../store/projectionSetting.model";
import {loadSpinner} from "../../../../../core/store/app.action";
import {addSettingProjection, updateSettingProjection} from "../../store/projectionSetting.actions";



@Component({
  selector: 'app-add-projection',
  templateUrl: './add-projection.component.html',
  styleUrl: './add-projection.component.scss'
})
export class AddProjectionComponent {

  constructor(private dialogRef:MatDialogRef<AddProjectionComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }



  closePopup(){
    this.dialogRef.close()
  }

  projectionSettingForm=this.builder.group({
    id:this.builder.control(0),
    item:this.builder.control('', Validators.required),
    type:this.builder.control(''),
  })

  saveProjection(){
    if(this.projectionSettingForm.valid){
      const projectionSettingInput:projectionSettingModel={
        id:0,
        item:this.projectionSettingForm.value.item as string,
        type: this.projectionSettingForm.value.type as string,
      }
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        projectionSettingInput.id=this.projectionSettingForm.value.id as number
        this.store.dispatch(updateSettingProjection({projectionSettingInput:projectionSettingInput}))
      }else{
        this.store.dispatch(addSettingProjection({projectionSettingInput:projectionSettingInput}))
      }
      this.closePopup();
    }
  }
}
