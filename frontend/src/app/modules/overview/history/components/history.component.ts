import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Subscription} from "rxjs";
import {history} from "../store/history.model";
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
  displayedColumns: string[] = ['Aktion', 'Zeitstempel', 'Historie', 'Benutzer', 'Dateiname'];
  @Input() stationId!:number;


  historyInfo:string = "Helles Grün: Datei erhalten \n Helles Rot: Datei übergeben \n Grün: EPLAN eingelagert \n Rot: EPLAN ausgelagert";

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
    this.openPopup(0,"Manueller Eintrag", false, this.stationId);
  }

  updateHistory(id:any){
    this.openPopup(id,"Eintrag bearbeiten", true, this.stationId);
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
