import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Subscription} from "rxjs";
import {history, historyModel} from "../store/history.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {loadStationHistory} from "../store/history.actions";
import {getHistoryInfo} from "../store/history.selectors";
import {MatDialog} from "@angular/material/dialog";
import {AddHistoryComponent} from "./add-history/add-history.component";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  history !: history;
  editData!:historyModel;
  displayedColumns: string[] = ['Zeitstempel', 'Historie', 'Benutzer', 'Dateiname'];
  @Input() stationId!:number;

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog) {
  }

  ngOnInit(): void {
    console.log(this.stationId)
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadStationHistory({stationId:this.stationId}))
    this.subscriptions.push(
      this.store.select(getHistoryInfo).pipe()
        .subscribe(data =>{
          this.history=data;
        })
    )
  }

  addHistory(){
    this.openPopup(0,"Datei übergeben", false, this.stationId);
  }

  openPopup(id:any, title:any, isEdit=false, stationId:any){
    this.dialog.open(AddHistoryComponent,{
      width:'40%',
      data:{
        id:id,
        title:title,
        isEdit:isEdit,
        stationId:stationId
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}