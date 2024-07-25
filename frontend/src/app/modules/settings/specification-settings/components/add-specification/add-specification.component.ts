import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {loadSpinner} from "../../../../../core/store/app.action";
import {specificationSettingModel} from "../../store/specificationSetting.model";
import {addSettingSpecification, updateSettingSpecification} from "../../store/specificationSetting.actions";


@Component({
  selector: 'app-add-specification',
  templateUrl: './add-specification.component.html',
  styleUrl: './add-specification.component.scss'
})
export class AddSpecificationComponent {

  constructor(private dialogRef:MatDialogRef<AddSpecificationComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }



  closePopup(){
    this.dialogRef.close()
  }

  specificationSettingForm=this.builder.group({
    id:this.builder.control(0),
    item:this.builder.control('', Validators.required),
    type:this.builder.control(''),
  })

  saveSpecification(){
    if(this.specificationSettingForm.valid){
      const specificationSettingInput:specificationSettingModel={
        id:0,
        item:this.specificationSettingForm.value.item as string,
        type: this.specificationSettingForm.value.type as string,
      }
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        specificationSettingInput.id=this.specificationSettingForm.value.id as number
        this.store.dispatch(updateSettingSpecification({specificationSettingInput:specificationSettingInput}))
      }else{
        this.store.dispatch(addSettingSpecification({specificationSettingInput:specificationSettingInput}))
      }
      this.closePopup();
    }
  }

}
