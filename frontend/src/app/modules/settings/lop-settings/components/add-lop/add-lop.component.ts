import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {Store} from "@ngrx/store";
import {loadSpinner} from "../../../../../core/store/app.action";
import {addSettingLop, updateSettingLop} from "../../store/lopSetting.actions";
import {lopSettingModel} from "../../store/lopSetting.model";
import {getSettingLopById} from "../../store/lopSetting.selectors";

@Component({
  selector: 'app-add-lop',
  templateUrl: './add-lop.component.html',
  styleUrl: './add-lop.component.scss'
})
export class AddLopComponent implements OnInit{
  editData!:lopSettingModel;

  constructor(private dialogRef:MatDialogRef<AddLopComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  closePopup(){
    this.dialogRef.close()
  }

  lopSettingForm=this.builder.group({
    id:this.builder.control(0),
    startDate:this.builder.control('', Validators.required),
    item:this.builder.control('', Validators.required),
  })

  saveLop(){
    if(this.lopSettingForm.valid){
      const lopSettingInput:lopSettingModel={
        id:0,
        startDate:this.lopSettingForm.value.startDate as string,
        item: this.lopSettingForm.value.item as string,
      }
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        lopSettingInput.id=this.lopSettingForm.value.id as number
        this.store.dispatch(updateSettingLop({lopSettingInput:lopSettingInput}))
      }else{
        this.store.dispatch(addSettingLop({lopSettingInput:lopSettingInput}))
      }
      this.closePopup();
    }
  }

  ngOnInit(): void {
    console.log(this.data)
    if(this.data.isEdit){
      this.store.select(getSettingLopById(this.data.id)).subscribe(data=>{
        this.editData=data;
        this.lopSettingForm.setValue({
          id:this.editData.id,
          startDate:this.editData.startDate,
          item:this.editData.item,
        })
      })
    }
  }
}
