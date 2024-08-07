import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
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
export class AddHistoryComponent implements OnInit{
  date!: string;

  historyForm!: FormGroup;
  dialogResult:boolean = false;

  constructor(private dialogRef:MatDialogRef<AddHistoryComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {

    this.historyForm=this.builder.group({
      id:this.builder.control(0),
      date:this.builder.control(''),
      item:this.builder.control('', Validators.required),
      userAcronym:this.builder.control(''),
      filename:this.builder.control(''),
      fileTransfer:this.builder.control(false),
      transferType:this.builder.control(0, this.transferTypeValidator),
      eplan:this.builder.control(false)
    })

    console.log(this.historyForm.get('transferType')?.value);
  }

  ngOnInit(): void {
    this.historyForm.get('transferType')?.disable();
    this.historyForm.get('eplan')?.disable();
    this.dialogResult = false;
  }

  initTransferType(){
    if(this.historyForm.get('transferType')?.disabled){
      this.historyForm.get('transferType')?.enable();
      this.historyForm.get('eplan')?.enable();
      this.historyForm.get('transferType')?.setValidators(Validators.required);
      this.historyForm.get('filename')?.setValidators(Validators.required);
    } else {
      this.historyForm.get('transferType')?.disable();
      this.historyForm.get('eplan')?.disable();
      this.historyForm.get('transferType')?.removeValidators(Validators.required);
      this.historyForm.get('filename')?.removeValidators(Validators.required);
    }
    console.log(this.historyForm.get('transferType')?.value);
  }

  transferTypeValidator(control: AbstractControl): ValidationErrors | null {
    const validValues = [1, 2];
    if (!validValues.includes(control.value)) {
      return { invalidTransferType: true };
    }
    return null;
  }

  closePopup(result:boolean){
    this.dialogRef.close(result)
  }


  saveHistory(){
    if(this.historyForm.valid){
      const historyInput:historyModel={
        id:0,
        date:this.date,
        item: this.historyForm.value.item as string,
        userAcronym: this.historyForm.value.userAcronym as string,
        filename: this.historyForm.value.filename as string,
        fileTransfer: this.historyForm.value.fileTransfer as boolean,
        transferType: this.historyForm.value.transferType as number,
        eplan: this.historyForm.value.eplan as boolean,
      }
      if(!this.historyForm.value.fileTransfer){
        historyInput.transferType = 0;
        historyInput.eplan = false;
      }
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        historyInput.id=this.historyForm.value.id as number
        this.dialogResult = true;
      }else{
        // console.log(historyInput)
        // console.log(this.data.stationId)
        this.store.dispatch(addStationHistory({historyInput:historyInput, stationId:this.data.stationId}));
        this.dialogResult = true;
      }
      this.closePopup(this.dialogResult);
    }
  }
}
