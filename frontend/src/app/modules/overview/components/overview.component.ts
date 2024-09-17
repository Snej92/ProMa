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
  stationView!:stationView;
  loggedUser!:loggedUser;

  stationId: number = 0;

  selectedOverview!:number;
  receivedSelectedOverview!:number;

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
      const idParam = params.get('id');

      if(idParam === null){
        console.log('ID is null')
        this.selectedOverview = Number(localStorage.getItem('selectedOverview')) || 1; // Default to 1 if no value is found
      } else {
        // @ts-ignore
        this.stationId = +params.get('id');
        this.stationId -= 1;
        console.log('ID is: ', this.stationId)
        this.selectedOverview = 1;
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
          this.stationView=data;
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
