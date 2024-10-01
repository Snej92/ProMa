import {Component, Input} from '@angular/core';
import {stationFavViewModel, stationViewModel} from "../../store/stationView.model";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";
import {loadSpinner} from "../../../../core/store/app.action";
import {deleteStation} from "../../store/stationView.actions";
import {AddStationComponent} from "../add-station/add-station.component";
import {Router} from "@angular/router";
import {updateProjectFavorite} from "../../../dashboard/project/store/project-favorite.actions";
import {updateStationFavorite} from "../../../dashboard/station/store/station-favorite.actions";

@Component({
  selector: 'app-station-card',
  templateUrl: './station-card.component.html',
  styleUrl: './station-card.component.scss'
})
export class StationCardComponent {

  @Input() stationFavView !: stationFavViewModel;

  @Input() favorite : boolean = false;
  @Input() currentIndex : number = 0;
  @Input() dashboard : boolean = false;

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog,
              private router: Router) {
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

  navigateToStation(stationId: number, selectedOverview: number, dashboard : boolean): void {
    this.router.navigate(['/overview'], {
      queryParams: {
        id: stationId,
        selectedOverview: selectedOverview,
        dashboard : dashboard
      }
    });
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

  editFavorite(event: MouseEvent, id:any, isFavorite:any){
    event.stopPropagation();

    console.log("add " + id + " to favorites");
    this.store.dispatch(loadSpinner({ isLoading: true }));
    if(isFavorite){
      this.store.dispatch(updateStationFavorite({stationId:id, remove:true}))
    } else {
      this.store.dispatch(updateStationFavorite({stationId:id, remove:false}))
    }
  }
}
