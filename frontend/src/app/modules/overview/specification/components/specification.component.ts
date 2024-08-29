import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {editSpecificationModel, specification} from "../store/specification.model";
import {loadStationSpecification, updateStationSpecification} from "../store/specification.actions";
import {getSpecificationById, getSpecificationInfo} from "../store/specification.selectors";
import {DatePipe} from "@angular/common";
import {global} from "../../../../core/store/app.model";
import {MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrl: './specification.component.scss'
})
export class SpecificationComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];
  specification !: specification;
  editSpecification: { [key: number]: editSpecificationModel } = {};
  editSpecificationDateDone: { [key: number]: editSpecificationModel } = {};
  displayedColumns: string[] = ['Vorgabe', 'Zusatz', 'Erledigt', 'Datum erledigt', 'Benutzer'];
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
    this.store.dispatch(loadStationSpecification({stationId:this.stationId}));
    this.subscriptions.push(
      this.store.select(getSpecificationInfo).pipe()
        .subscribe(data =>{
          this.specification=data;
          this.editSpecification = data.specificationList.reduce((acc, item) => {
            acc[item.id] = {
              specification: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editSpecificationModel });
          this.editSpecificationDateDone = data.specificationList.reduce((acc, item) => {
            acc[item.id] = {
              specification: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editSpecificationModel });
        })
    )
  }

  setEdit(id:any){
    console.log("enable edit ID: "+ id);
    this.editSpecification[id].isEdit = !this.editSpecification[id].isEdit
    setTimeout(()=> {
      this.inputField.nativeElement.focus();
    }, 0);
  }

  setEditDateDone(id:any){
    console.log("enable edit ID: "+ id);
    this.editSpecificationDateDone[id].isEdit = !this.editSpecificationDateDone[id].isEdit
    setTimeout(()=> {
      this.inputFieldDateDone.nativeElement.focus();
    }, 0);
  }

  updateStationSpecificationCheckbox(event: MatCheckboxChange, id:any, field: string){
    console.log("update specification")
    this.store.select(getSpecificationById(id)).subscribe(data => {
      this.editSpecification[id].specification = {...data};
    })
    if(field == "done"){
      this.editSpecification[id].specification.done = event.checked;
    }

    if(field == "commited"){
      this.editSpecification[id].specification.commited = event.checked;
    }
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationSpecification({specificationInput:this.editSpecification[id].specification}))
  }

  updateStationSpecification(id:any){
    console.log("update specification")
    this.editSpecification[id].isEdit = !this.editSpecification[id].isEdit
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationSpecification({specificationInput:this.editSpecification[id].specification}))
  }

  updateStationSpecificationDateDone(id:any){
    if(this.validDate){
      console.log("update specification date done")
      this.editSpecificationDateDone[id].isEdit = !this.editSpecificationDateDone[id].isEdit
      this.editSpecificationDateDone[id].specification.dateDone = this.date;
      this.store.dispatch(loadSpinner({isLoading:true}))
      this.store.dispatch(updateStationSpecification({specificationInput:this.editSpecificationDateDone[id].specification}))
    }
  }

  //Datepicker
  onDateChange(selectedDate: Date, id:any) {
    if(!this.manualDateInput){
      if (selectedDate){
        this.date = this.datePipe.transform(selectedDate, 'dd.MM.yyyy')!;
        this.validDate = global.dateRegex.test(this.date);
        this.updateStationSpecificationDateDone(id);
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
          this.updateStationSpecificationDateDone(id);
        } else {
          setTimeout(()=> {
            this.inputFieldDateDone.nativeElement.focus();
          }, 0);
        }
      }
    }, 200);
  }

  leaveEdit(id:any){
    this.editSpecificationDateDone[id].isEdit = false
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
