import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {editSpecificationModel, specification} from "../store/specification.model";
import {loadStationSpecification, updateStationSpecification} from "../store/specification.actions";
import {getSpecificationById, getSpecificationInfo} from "../store/specification.selectors";

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrl: './specification.component.scss'
})
export class SpecificationComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];
  specification !: specification;
  editSpecification: { [key: number]: editSpecificationModel } = {};
  displayedColumns: string[] = ['Vorgabe', 'Erledigt', 'Übergeben', 'Zusatz', 'Datum'];
  @Input() stationId!:number;
  @ViewChild('inputField', {static: false}) inputField!: ElementRef;


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
    this.store.dispatch(updateStationSpecification({specificationStationInput:this.editSpecification[id].specification}))
  }

  updateStationSpecification(id:any){
    console.log("update header data")
    this.editSpecification[id].isEdit = !this.editSpecification[id].isEdit
    console.log(this.editSpecification[id].specification);
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationSpecification({specificationStationInput:this.editSpecification[id].specification}))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
