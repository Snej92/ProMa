import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {documentationSettingModel} from "../../store/documentationSetting.model";
import {loadSpinner} from "../../../../../core/store/app.action";
import {addSettingDocumentation, updateSettingDocumentation} from "../../store/documentationSetting.actions";

@Component({
  selector: 'app-add-documentation',
  templateUrl: './add-documentation.component.html',
  styleUrl: './add-documentation.component.scss'
})
export class AddDocumentationComponent {

  constructor(private dialogRef:MatDialogRef<AddDocumentationComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }



  closePopup(){
    this.dialogRef.close()
  }

  documentationSettingForm=this.builder.group({
    id:this.builder.control(0),
    item:this.builder.control('', Validators.required),
    type:this.builder.control(''),
  })

  saveDocumentation(){
    if(this.documentationSettingForm.valid){
      const documentationSettingInput:documentationSettingModel={
        id:0,
        item:this.documentationSettingForm.value.item as string,
        type: this.documentationSettingForm.value.type as string,
      }
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        documentationSettingInput.id=this.documentationSettingForm.value.id as number
        this.store.dispatch(updateSettingDocumentation({documentationSettingInput:documentationSettingInput}))
      }else{
        console.log(documentationSettingInput)
        this.store.dispatch(addSettingDocumentation({documentationSettingInput:documentationSettingInput}))
      }
      this.closePopup();
    }
  }

}
