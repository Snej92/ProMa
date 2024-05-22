import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {lop, lopModel} from "../store/lop.model";
import {getLopById, getLopInfo} from "../store/lop.selectors";
import {loadStationLop, updateStationLop} from "../store/lop.actions";
import {loadSpinner} from "../../../../core/store/app.action";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-lop',
  templateUrl: './lop.component.html',
  styleUrl: './lop.component.scss'
})
export class LopComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  lop !: lop;
  editData!:lopModel;
  displayedColumns: string[] = ['Aufnahme', 'LOP', 'Status', 'Erledigt', 'Benutzer'];
  lopStatus: string[] = ['OFFEN', 'INARBEIT', 'ERLEDIGT'];
  @Input() stationId!:number;

  constructor(private store:Store<AppStateModel>) {
  }

  //todo add lazy load

  ngOnInit(): void {
    console.log(this.stationId)
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadStationLop({stationId:this.stationId}))
    this.subscriptions.push(
      this.store.select(getLopInfo).pipe()
        .subscribe(data =>{
          this.lop=data;
        })
    )
  }

  changeLOPStatus(status:string, id:any){
    this.store.select(getLopById(id)).subscribe(data=>{
      this.editData=data;
    })
    if(this.editData.status!=status){
      const lopInput:lopModel={
        id:this.editData.id,
        startDate:this.editData.startDate,
        endDate:this.editData.endDate,
        item: this.editData.item,
        status:status,
        userAcronym:this.editData.userAcronym,
      }
      console.log(lopInput)
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(updateStationLop({lopInput:lopInput}))
    }
  }

  changeToOFFEN(id:any){
    this.changeLOPStatus(this.lopStatus[0],id)
  }

  changeToINARBEIT(id:any){
    this.changeLOPStatus(this.lopStatus[1],id)
  }

  changeToERLEDIGT(id:any){
    this.changeLOPStatus(this.lopStatus[2],id)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
