import {Component, Input} from '@angular/core';
import {stationViewModel} from "../../store/stationView.model";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";
import {loadSpinner} from "../../../../core/store/app.action";
import {deleteStation} from "../../store/stationView.actions";
import {AddStationComponent} from "../add-station/add-station.component";

@Component({
  selector: 'app-station-card',
  templateUrl: './station-card.component.html',
  styleUrl: './station-card.component.scss'
})
export class StationCardComponent {
  @Input() stationView: stationViewModel ={
    id:0,
    name:'',
    description:'',
    issuerAcronym:'',
    issuerName:'',
    status:'',
    version:'',
    totalProgress:0,
    //LOP
    lopTotal:0,
    lopDone:0,
    lopToDo:0,
    lopProgress:0,
    //Documentation
    documentationTotal:0,
    documentationDone:0,
    documentationToDo:0,
    documentationProgress:0,
    //Specification
    specificationTotal:0,
    specificationDone:0,
    specificationToDo:0,
    specificationProgress:0,
    //Control
    controlTotal:0,
    controlDone:0,
    controlToDo:0,
    controlProgress:0,
    //Projection
    projectionTotal:0,
    projectionDone:0,
    projectionToDo:0,
    projectionProgress:0,
  };

  @Input() favorite : boolean = false;

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  editStation(id:any){
    console.log(id)
    this.openPopup(id, 'Station Bearbeiten', true, 'Aktualisieren')
  }

  deleteStation(id:any, deleteName:any){
    console.log(id)
    this.openConfirm('Station', deleteName, 'Löschen', id);
  }

  openConfirm(title:any, confirmName:any, button:any, id:any){
    const confirmRef = this.confirm.open(SysConfirmationComponent, {
      width: '30%',
      data:{
        title: title,
        confirmName: confirmName,
        button:button
      }
    });

    confirmRef.afterClosed().subscribe((confirmed:boolean)=> {
      if(confirmed){
        console.log(id)
        this.store.dispatch(loadSpinner({isLoading:true}));
        this.store.dispatch(deleteStation({id:id}))
      }
    })
  }

  openPopup(id:any, title:any, isEdit=false, button:any){
    this.dialog.open(AddStationComponent,{
      width:'30%',
      data:{
        id:id,
        title: title,
        isEdit:isEdit,
        button:button
      }
    })
  }
}
