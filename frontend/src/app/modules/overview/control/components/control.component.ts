import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {control, editControlModel} from "../store/control.model";
import {loadStationControl, updateStationControl} from "../store/control.actions";
import {getControlById, getControlInfo} from "../store/control.selectors";

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
  displayedColumns: string[] = ['Kontrolle', 'Zusatz', 'Erledigt', 'Datum erledigt'];
  @Input() stationId!:number;
  @ViewChild('inputField', {static: false}) inputField!: ElementRef;
  @ViewChild('inputFieldDateDone', {static: false}) inputFieldDateDone!: ElementRef;


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
    console.log("update control date done")
    this.editControlDateDone[id].isEdit = !this.editControlDateDone[id].isEdit
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationControl({controlInput:this.editControlDateDone[id].control}))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}