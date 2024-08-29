import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {control, editControlModel} from "../store/control.model";
import {loadStationControl, updateStationControl} from "../store/control.actions";
import {getControlById, getControlInfo} from "../store/control.selectors";
import {global} from "../../../../core/store/app.model";
import {DatePipe} from "@angular/common";
import {MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss'
})
export class ControlComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];
  control !: control;
  editControl: { [key: number]: editControlModel } = {};
  editControlDateDone: { [key: number]: editControlModel } = {};
  displayedColumns: string[] = ['Kontrolle', 'Zusatz', 'Erledigt', 'Datum erledigt', 'Benutzer'];
  @Input() stationId!:number;
  @ViewChild('inputField', {static: false}) inputField!: ElementRef;
  @ViewChild('inputFieldDateDone', {static: false}) inputFieldDateDone!: ElementRef;
  manualDateInput : boolean = false;
  validDate : boolean = false;
  date!: string;
  datePipe = new DatePipe('de-DE');


  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    console.log('Station ID: ' + this.stationId);
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadStationControl({stationId:this.stationId}));
    this.subscriptions.push(
      this.store.select(getControlInfo).pipe()
        .subscribe(data =>{
          this.control=data;
          this.editControl = data.controlList.reduce((acc, item) => {
            acc[item.id] = {
              control: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editControlModel });
          this.editControlDateDone = data.controlList.reduce((acc, item) => {
            acc[item.id] = {
              control: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editControlModel });
        })
    )
  }

  setEdit(id:any){
    console.log("enable edit ID: "+ id);
    this.editControl[id].isEdit = !this.editControl[id].isEdit
    this.date = this.editControl[id].control.dateDone
    setTimeout(()=> {
      this.inputField.nativeElement.focus();
    }, 0);
  }

  setEditDateDone(id:any){
    console.log("enable edit ID: "+ id);
    this.editControlDateDone[id].isEdit = !this.editControlDateDone[id].isEdit
    setTimeout(()=> {
      this.inputFieldDateDone.nativeElement.focus();
    }, 0);
  }

  updateStationControlCheckbox(event: MatCheckboxChange, id:any, field: string){
    console.log("update control")
    this.store.select(getControlById(id)).subscribe(data => {
      this.editControl[id].control = {...data};
    })
    if(field == "done"){
      this.editControl[id].control.done = event.checked;
    }

    if(field == "commited"){
      this.editControl[id].control.commited = event.checked;
    }
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationControl({controlInput:this.editControl[id].control}))
  }

  updateStationControl(id:any){
    console.log("update control")
    this.editControl[id].isEdit = !this.editControl[id].isEdit
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationControl({controlInput:this.editControl[id].control}))
  }

  updateStationControlDateDone(id:any){
    if(this.validDate){
      console.log("update control date done")
      this.editControlDateDone[id].isEdit = !this.editControlDateDone[id].isEdit
      this.editControlDateDone[id].control.dateDone = this.date;
      this.store.dispatch(loadSpinner({isLoading:true}))
      this.store.dispatch(updateStationControl({controlInput:this.editControlDateDone[id].control}))
    }
  }

  //Datepicker
  onDateChange(selectedDate: Date, id:any) {
    if(!this.manualDateInput){
      if (selectedDate){
        this.date = this.datePipe.transform(selectedDate, 'dd.MM.yyyy')!;
        this.validDate = global.dateRegex.test(this.date);
        this.updateStationControlDateDone(id);
      } else {
        this.date = '';
      }
    }
    this.manualDateInput = false;
  }

  onInputChange(event: Event){
    this.manualDateInput = true;
    console.log("manual date input");
    this.date = (event.target as HTMLInputElement).value;
    this.validDate = global.dateRegex.test(this.date);
  }

  onBlur(picker: MatDatepicker<any>, id:any){
    setTimeout(() => {
      if (!picker.opened) {
        if(this.validDate){
          this.updateStationControlDateDone(id);
        } else {
          setTimeout(()=> {
            this.inputFieldDateDone.nativeElement.focus();
          }, 0);
        }
      }
    }, 200);
  }

  leaveEdit(id:any){
    this.editControlDateDone[id].isEdit = false
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
