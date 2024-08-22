import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadStationViewOverview} from "../store/stationViewOverview.actions";
import {getStationViewOverviewInfo} from "../store/stationViewOverview.selectors";
import {loadSpinner} from "../../../../core/store/app.action";
import {stationViewModel} from "../../../station/store/stationView.model";
import {stationViewOverview} from "../store/stationViewOverview.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddHistoryComponent} from "../../history/components/add-history/add-history.component";

@Component({
  selector: 'app-station-overview',
  templateUrl: './station-overview.component.html',
  styleUrl: './station-overview.component.scss'
})
export class StationOverviewComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  @Input() stationId!:number;
  @Input() stationViewInput!:stationViewModel;
  stationViewOverview!:stationViewOverview
  @Output() selectedOverviewEmitted = new EventEmitter<number>();

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog) {
  }

  ngOnInit(): void {
    console.log("Init station overview")
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadStationViewOverview({id:this.stationId}))
    this.subscriptions.push(
      this.store.select(getStationViewOverviewInfo).pipe()
        .subscribe(data =>{
          this.stationViewOverview=data;
        })
    )
  }

  addHistory(){
    this.openPopup(0,"Historie Eintrag", false, this.stationId);
  }

  openPopup(id:any, title:any, isEdit=false, stationId:any){
    const dialogRef = this.dialog.open(AddHistoryComponent,{
      width:'40%',
      data:{
        id:id,
        title:title,
        isEdit:isEdit,
        stationId:stationId
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(loadStationViewOverview({id:this.stationId}))
      }
    })
  }

  sendSelectedOverview(id:number){
    this.selectedOverviewEmitted.emit(id);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
