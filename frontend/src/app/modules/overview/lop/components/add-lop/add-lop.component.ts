import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators,} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {loadSpinner} from "../../../../../core/store/app.action";
import {lopModel} from "../../store/lop.model";
import {addLop, updateLop} from "../../store/lop.actions";
import {getLopById} from "../../store/lop.selectors";

@Component({
  selector: 'app-add-lop',
  templateUrl: './add-lop.component.html',
  styleUrl: './add-lop.component.scss'
})
export class AddLopComponent implements OnInit{

  constructor(private dialogRef:MatDialogRef<AddLopComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  editData!:lopModel;
  startDate!: string;
  endDate!: string;


  ngOnInit(): void {
    console.log(this.data)
    if(this.data.isEdit){
      this.store.select(getLopById(this.data.id)).subscribe(data=>{
        this.editData=data;
        this.startDate=this.editData.startDate;
        this.endDate=this.editData.endDate;
        this.lopForm.setValue({
          id:this.editData.id,
          startDate:this.editData.startDate,
          issuer:this.editData.issuer,
          transmissionType:this.editData.transmissionType,
          item:this.editData.item,
          addition:this.editData.addition,
          endDate:this.editData.endDate,
          status:this.editData.status,
          userAcronym:this.editData.userAcronym
        })
      })
    } else{
      this.setStartDayToToday();
    }
  }

  closePopup(){
    this.dialogRef.close()
  }

  lopForm=this.builder.group({
    id:this.builder.control(0),
    startDate:this.builder.control(''),
    issuer:this.builder.control(''),
    transmissionType:this.builder.control(''),
    item:this.builder.control('', Validators.required),
    addition:this.builder.control(''),
    endDate:this.builder.control(''),
    status:this.builder.control('OFFEN'),
    userAcronym:this.builder.control(''),
  })

  saveLop(){
      const lopInput:lopModel={
        id:0,
        startDate:this.startDate,
        issuer:this.lopForm.value.issuer as string,
        transmissionType:this.lopForm.value.transmissionType as string,
        item:this.lopForm.value.item as string,
        addition:this.lopForm.value.addition as string,
        endDate:this.endDate,
        status:this.lopForm.value.status as string,
        userAcronym:this.lopForm.value.userAcronym as string
      }
      if(this.data.isEdit){
        lopInput.id=this.lopForm.value.id as number
        this.store.dispatch(loadSpinner({isLoading:true}));
        this.store.dispatch(updateLop({lopInput:lopInput}))
        this.closePopup();
      }else if(!this.data.isEdit && this.lopForm.valid){
        this.store.dispatch(loadSpinner({isLoading:true}));
        this.store.dispatch(addLop({lopInput:lopInput, stationId:this.data.stationId}))
        this.closePopup();
      }
  }

  setStartDayToToday() {
    const today = new Date();
    this.onLopStartDateChange(today);
  }

  onLopStartDateChange(selectedDate: Date) {
    if (selectedDate){
      const year = selectedDate.getFullYear();
      const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2); // Pad month with leading zero
      const day = ('0' + selectedDate.getDate()).slice(-2); // Pad day with leading zero
      this.startDate = `${day}.${month}.${year}`;
    } else {
      this.startDate = '';
    }
  }

  onLopEndDateChange(selectedDate: Date) {
    if (selectedDate){
      const year = selectedDate.getFullYear();
      const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2); // Pad month with leading zero
      const day = ('0' + selectedDate.getDate()).slice(-2); // Pad day with leading zero
      this.endDate = `${day}.${month}.${year}`;
    } else {
      this.endDate = '';
    }
  }
}
