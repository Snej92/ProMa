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
import { format, parse } from "date-fns";
import {matDatepickerAnimations} from "@angular/material/datepicker";

@Component({
  selector: 'app-add-version',
  templateUrl: './add-version.component.html',
  styleUrl: './add-version.component.scss',
  animations: [
    matDatepickerAnimations.fadeInCalendar, matDatepickerAnimations.transformPanel
  ]
})
export class AddVersionComponent implements OnInit{

  versionTitle='';
  editVersionId=0;
  editData!:versionModel;


  constructor(private dialog:MatDialogRef<AddVersionComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA)public data:any) {
  }

  //Datepicker
  public showPicker = false;
  public selectedDate = new Date();
  private dateFormat = new RegExp(
    /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  );
  //Datepicker

  versionForm=this.builder.group({
      id:this.builder.control(0),
      date:this.builder.control('', [
        Validators.required,
        Validators.pattern(this.dateFormat)
      ]),
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

  setDateToToday() {
    const today = new Date();
    this.setDateToInputField(today)
  }

  //Datepicker
  private parseDateInput(date: string, format: string) {
    return parse(date, format, new Date());
  }

  public togglePicker($event: any): void {
    $event.stopPropagation();
    this.showPicker = !this.showPicker;

    if (this.showPicker) {
      this.setDateToPicker()
    }
  }

  private setDateToPicker(): void {
    const userInput = this.versionForm.get('date')?.value;

    if (userInput) {
      this.selectedDate = this.parseDateInput(userInput, "dd.MM.yyyy");
    } else {
      this.selectedDate = new Date()
    }
  }

  public setDateToInputField(date: Date | null): void {
    if(date){
      this.selectedDate = date;
      const constDate = format(date, "dd.MM.yyyy");
      this.versionForm.get('date')?.patchValue(constDate);
    } else {
      this.selectedDate = new Date();
    }
    this.showPicker = false;
  }
  //Datepicker

  closePopup(){
    this.dialog.close()
  }

  saveVersion(){
    if(this.versionForm.valid){
      const versionInput:versionModel={
        id:0,
        date:this.versionForm.value.date as string,
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
