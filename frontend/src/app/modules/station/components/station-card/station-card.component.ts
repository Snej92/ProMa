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
  @Input() stationView: stationViewModel | undefined;

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
