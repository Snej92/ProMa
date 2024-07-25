import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";

import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {editProjectionModel, projection} from "../store/projection.model";
import {loadStationProjection, updateStationProjection} from "../store/projection.actions";
import {getProjectionById, getProjectionInfo} from "../store/projection.selectors";


@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrl: './projection.component.scss'
})
export class ProjectionComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];
  projection !: projection;
  editProjection: { [key: number]: editProjectionModel } = {};
  displayedColumns: string[] = ['Projektierung', 'Erledigt', 'Übergeben', 'Zusatz', 'Datum'];
  @Input() stationId!:number;
  @ViewChild('inputField', {static: false}) inputField!: ElementRef;


  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    console.log('Station ID: ' + this.stationId);
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadStationProjection({stationId:this.stationId}));
    this.subscriptions.push(
      this.store.select(getProjectionInfo).pipe()
        .subscribe(data =>{
          this.projection=data;
          this.editProjection = data.projectionList.reduce((acc, item) => {
            acc[item.id] = {
              projection: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editProjectionModel });
        })
    )
  }

  setEdit(id:any){
    console.log("enable edit ID: "+ id);
    this.editProjection[id].isEdit = !this.editProjection[id].isEdit
    setTimeout(()=> {
      this.inputField.nativeElement.focus();
    }, 0);
  }

  updateStationProjectionCheckbox(event: MatCheckboxChange, id:any, field: string){
    console.log("update projection")
    this.store.select(getProjectionById(id)).subscribe(data => {
      this.editProjection[id].projection = {...data};
    })
    if(field == "done"){
      this.editProjection[id].projection.done = event.checked;
    }

    if(field == "commited"){
      this.editProjection[id].projection.commited = event.checked;
    }
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationProjection({projectionStationInput:this.editProjection[id].projection}))
  }

  updateStationProjection(id:any){
    console.log("update header data")
    this.editProjection[id].isEdit = !this.editProjection[id].isEdit
    console.log(this.editProjection[id].projection);
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationProjection({projectionStationInput:this.editProjection[id].projection}))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
