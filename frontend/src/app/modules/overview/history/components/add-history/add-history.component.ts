import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {historyModel} from "../../store/history.model";
import {loadSpinner} from "../../../../../core/store/app.action";
import {addStationHistory} from "../../store/history.actions";

@Component({
  selector: 'app-add-history',
  templateUrl: './add-history.component.html',
  styleUrl: './add-history.component.scss'
})
export class AddHistoryComponent {
  editData!:historyModel;
  date!: string;


  constructor(private dialogRef:MatDialogRef<AddHistoryComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  closePopup(){
    this.dialogRef.close()
  }

  historyForm=this.builder.group({
    id:this.builder.control(0),
    date:this.builder.control(''),
    item:this.builder.control('', Validators.required),
    userAcronym:this.builder.control(''),
    filename:this.builder.control('', Validators.required)
  })

  saveHistory(){
    if(this.historyForm.valid){
      const historyInput:historyModel={
        id:0,
        date:this.date,
        item: this.historyForm.value.item as string,
        userAcronym: this.historyForm.value.userAcronym as string,
        filename: this.historyForm.value.filename as string,
      }
      // this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        historyInput.id=this.historyForm.value.id as number
      }else{
        console.log(historyInput)
        console.log(this.data.stationId)
        this.store.dispatch(addStationHistory({historyInput:historyInput, stationId:this.data.stationId}));
      }
      this.closePopup();
    }
  }
}
