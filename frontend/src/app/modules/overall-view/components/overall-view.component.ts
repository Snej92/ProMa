import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {stationOverallView} from "../store/stationOverallView.model";
import {loadSpinner} from "../../../core/store/app.action";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {getStationOverallViewInfo} from "../store/stationOverallView.selectors";
import {loadStationOverallView} from "../store/stationOverallView.actions";
import {headerData} from "../../overview/headerData/store/headerData.model";
import {getLoggedUserInfo} from "../../../core/logged-user/logged-user.selectors";
import {loggedUser} from "../../../core/logged-user/logged-user.model";

@Component({
  selector: 'app-overall-view',
  templateUrl: './overall-view.component.html',
  styleUrl: './overall-view.component.scss'
})
export class OverallViewComponent implements OnInit, OnDestroy{
  loggedUser!:loggedUser;
  private subscriptions: Subscription[] = [];
  stationOverallView!:stationOverallView;
  generalColumns: String[] = ['general', 'headerData', 'specification', 'projection', 'control', 'docu', 'technicalData'];

  displayedColumns: String[] = ['Station', 'Bearbeiter', 'Status', 'Version', 'Gesamtfortschritt', 'LOPfortschritt'];
  headerDataColumns: String[] = [];
  specificationColumns: String[] = [];
  projectionColumns: String[] = [];
  documentationColumns: String[] = [];
  controlColumns: String[] = [];
  technicalDataColumns: String[] = [];

  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.subscriptions.push(
      this.store.select(getLoggedUserInfo).pipe()
        .subscribe(data =>{
          this.loggedUser=data;
        })
    )
    this.store.dispatch(loadStationOverallView())
    this.subscriptions.push(
      this.store.select(getStationOverallViewInfo).pipe()
        .subscribe(data =>{
          this.stationOverallView=data;
          this.headerDataColumns = [];
          this.displayedColumns = ['Station', 'Bearbeiter', 'Status', 'Version', 'Gesamtfortschritt', 'LOPfortschritt'];
          for(let val of this.stationOverallView.stationOverallViewList){
            this.headerDataColumns = [];
            this.specificationColumns = [];
            this.projectionColumns = [];
            this.controlColumns = [];
            this.documentationColumns = [];
            this.technicalDataColumns = [];
            this.displayedColumns = ['Station', 'Bearbeiter', 'Status', 'Version', 'Gesamtfortschritt', 'LOPfortschritt'];
            for(let header of val.headerData){
              this.headerDataColumns.push(header.headerDataSetting.item);
              this.displayedColumns.push(header.headerDataSetting.item);
            }
            for(let specification of val.specification){
              this.specificationColumns.push(specification.taskSetting.item);
              this.displayedColumns.push(specification.taskSetting.item);
            }
            for(let projection of val.projection){
              this.projectionColumns.push(projection.taskSetting.item);
              this.displayedColumns.push(projection.taskSetting.item);
            }
            for(let control of val.control){
              this.controlColumns.push(control.taskSetting.item);
              this.displayedColumns.push(control.taskSetting.item);
            }
            for(let documentation of val.documentation){
              this.documentationColumns.push(documentation.taskSetting.item);
              this.displayedColumns.push(documentation.taskSetting.item);
            }
            for(let technicalData of val.technicalData){
              this.technicalDataColumns.push(technicalData.technicalDataSetting.item);
              this.displayedColumns.push(technicalData.technicalDataSetting.item);
            }
          }
        })
    )
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
