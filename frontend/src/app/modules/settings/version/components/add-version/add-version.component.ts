import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {versionModel, versionStationModel} from "../../store/version.model";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {Store} from "@ngrx/store";
import {addVersion, updateVersion} from "../../store/version.actions";
import {getVersionById} from "../../store/version.selectors";
import {loadSpinner} from "../../../../../core/store/app.action";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-version',
  templateUrl: './add-version.component.html',
  styleUrl: './add-version.component.scss'
})
export class AddVersionComponent implements OnInit{

  versionTitle='';
  editVersionId=0;
  editData!:versionModel;
  date!: string;
  datePipe = new DatePipe('de-DE');
  manualDateInput : boolean = false;

  constructor(private dialog:MatDialogRef<AddVersionComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA)public data:any) {
  }

  versionForm=this.builder.group({
      id:this.builder.control(0),
      date:this.builder.control(''),
      version:this.builder.control('', Validators.required),
      toDo:this.builder.control('', Validators.required),
      done:this.builder.control(false),
      versionStation: this.builder.array([])
    }
  )

  ngOnInit(): void {
    this.versionTitle=this.data.version;
    this.initializeForm();
    if(this.data.isEdit){
      this.editVersionId=this.data.id;
      const subscription = this.store.select(getVersionById(this.editVersionId)).subscribe(data=>{
        this.editData=data;
        this.populateForm()
      })
      subscription.unsubscribe();
    } else{
      this.setDateToToday();
    }
  }

  initializeForm() {
    this.versionForm = this.builder.group({
      id: this.builder.control(0),
      date: this.builder.control(''),
      version: this.builder.control('', Validators.required),
      toDo: this.builder.control('', Validators.required),
      done: this.builder.control(false),
      versionStation: this.builder.array([])
    });
  }

  populateForm() {
    // Create a FormArray from the editData.versionStation array
    const versionStationArray = this.editData.versionStation.map(station => this.builder.group({
      id: [station.id],
      stationName: [station.stationName, Validators.required],
      done: [station.state, Validators.required]
    }));

    this.versionForm.setValue({
      id: this.editData.id,
      date: this.editData.date,
      version: this.editData.version,
      toDo: this.editData.toDo,
      done: this.editData.done,
      versionStation: []
    });

    // @ts-ignore
    this.versionForm.setControl('versionStation', this.builder.array(versionStationArray));
  }

  onDateChange(selectedDate: Date) {
    if(!this.manualDateInput){
      if (selectedDate){
        console.log("selectedDate: " + selectedDate)
        const year = selectedDate.getFullYear();
        const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2); // Pad month with leading zero
        const day = ('0' + selectedDate.getDate()).slice(-2); // Pad day with leading zero
        // this.date = `${day}.${month}.${year}`;
        this.date = this.datePipe.transform(selectedDate, 'dd.MM.yyyy')!;
      } else {
        this.date = '';
      }
      console.log("onDateChange: "+ this.date)
    }
    this.manualDateInput = false;
  }

  onInputChange(event: Event){
    this.manualDateInput = true;
    console.log("manual date input");
    this.date = (event.target as HTMLInputElement).value;
  }

  setDateToToday() {
    const today = new Date();
    this.onDateChange(today);
  }

  closePopup(){
    this.dialog.close()
  }

  saveVersion(){
    if(this.versionForm.valid){
      const versionInput:versionModel={
        id:0,
        date:this.date,
        version:this.versionForm.value.version as string,
        toDo:this.versionForm.value.toDo as string,
        done:this.versionForm.value.done as boolean,
        versionStation: this.versionForm.value.versionStation as versionStationModel[]
      };
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        versionInput.id=this.versionForm.value.id as number;
        console.log(versionInput)
        console.log("update version")
        this.store.dispatch(updateVersion({versionInput:versionInput}))
      }else{
        console.log(versionInput)
        console.log("add version")
        this.store.dispatch(addVersion({versionInput:versionInput}))
      }
      this.closePopup();
    }
  }
}
