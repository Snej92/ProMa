import {Component, OnDestroy, OnInit,} from '@angular/core';
import {loadStationView} from "../../station/store/stationView.actions";
import {getStationViewInfo} from "../../station/store/stationView.selectors";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {Subscription} from "rxjs";
import {stationView} from "../../station/store/stationView.model";
import {loadSpinner} from "../../../core/store/app.action";
import {loggedUser} from "../../../core/logged-user/logged-user.model";
import {getLoggedUserInfo} from "../../../core/logged-user/logged-user.selectors";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit,OnDestroy{

  private subscriptions: Subscription[] = [];
  stationFavView!:stationView;
  loggedUser!:loggedUser;

  stationId: number = 0;
  stationIdDashboard: number = 0;
  dashboard: boolean = false;

  selectedOverview!:number;

  constructor(private store:Store<AppStateModel>,
              private route: ActivatedRoute) {
  }

  receiveSelectedOverview(value : number){
    console.log("received value: " + value);
    this.selectOverview(value);
  }

  selectOverview(input:number){
    this.selectedOverview = input;
    localStorage.setItem('selectedOverview', String(this.selectedOverview));
  }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const idParamString = params.get('id');
      const selectedOverviewString = params.get('selectedOverview');
      const dashboard = params.get('dashboard');
      console.log("selectedOverviewString: ", selectedOverviewString)
      console.log("dashboard: ", dashboard)

      if(dashboard !== null){
        this.dashboard = params.get('dashboard') === 'true';
      }

      if(idParamString === null){
        console.log('ID is null')
        this.selectedOverview = Number(localStorage.getItem('selectedOverview')) || 1; // Default to 1 if no value is found
      } else {
        if(!this.dashboard){
          // @ts-ignore
          this.stationId = +params.get('id');
          console.log('ID is: ', this.stationId)
        } else{
          // @ts-ignore
          this.stationIdDashboard = +params.get('id');
          console.log('ID is: ', this.stationId)
        }
        if(selectedOverviewString === null){
          this.selectedOverview = Number(localStorage.getItem('selectedOverview')) || 1; // Default to 1 if no value is found
        } else {
          // @ts-ignore
          this.selectedOverview = +params.get('selectedOverview');
          localStorage.setItem('selectedOverview', String(this.selectedOverview));
        }
      }
    })

    this.store.dispatch(loadSpinner({isLoading:true}))
    this.subscriptions.push(
      this.store.select(getLoggedUserInfo).pipe()
        .subscribe(data =>{
          this.loggedUser=data;
        })
    )

    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadStationView())
    this.subscriptions.push(
      this.store.select(getStationViewInfo).pipe()
        .subscribe(data =>{
          this.stationFavView=data;
          if(this.dashboard){
            for(let i = 0; i < this.stationFavView.stationViewList.length; i++){
              if(this.stationFavView.stationViewList.at(i)){
                // @ts-ignore
                if(this.stationIdDashboard == this.stationFavView.stationViewList.at(i).station.id){
                  // @ts-ignore
                  console.log(this.stationFavView.stationViewList.at(i).station.name)
                  this.stationId = i;
                }
              }
            }
          }
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
