import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {lopModel} from "../../../overview/lop/store/lop.model";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Store} from "@ngrx/store";
import {addLop, updateLop} from "../../../overview/lop/store/lop.actions";
import {getLopById} from "../../../overview/lop/store/lop.selectors";
import {loadSpinner} from "../../../../core/store/app.action";

@Component({
  selector: 'app-add-lop',
  templateUrl: './add-lop.component.html',
  styleUrl: './add-lop.component.scss'
})
export class AddLopComponent implements OnInit{
  editData!:lopModel;

  constructor(private dialogRef:MatDialogRef<AddLopComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  closePopup(){
    this.dialogRef.close()
  }

  lopForm=this.builder.group({
    id:this.builder.control(0),
    startDate:this.builder.control('', Validators.required),
    endDate:this.builder.control(''),
    item:this.builder.control('', Validators.required),
    status:this.builder.control('OFFEN'),
    userAcronym:this.builder.control('JAR')
  })

  saveLop(){
    if(this.lopForm.valid){
      const lopInput:lopModel={
        id:0,
        startDate:this.lopForm.value.startDate as string,
        endDate:this.lopForm.value.endDate as string,
        item: this.lopForm.value.item as string,
        status:this.lopForm.value.status as string,
        userAcronym:this.lopForm.value.userAcronym as string,
      }
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        lopInput.id=this.lopForm.value.id as number
        this.store.dispatch(updateLop({lopInput:lopInput}))
      }else{
        this.store.dispatch(addLop({lopInput:lopInput}))
      }
      this.closePopup();
    }
  }

  ngOnInit(): void {
    console.log(this.data)
    if(this.data.isEdit){
      this.store.select(getLopById(this.data.id)).subscribe(data=>{
        this.editData=data;
        this.lopForm.setValue({
          id:this.editData.id,
          startDate:this.editData.startDate,
          endDate:this.editData.endDate,
          item:this.editData.item,
          status:this.editData.status,
          userAcronym:this.editData.userAcronym
        })
      })
    }
  }
}
