import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {editVersion, editVersionTemp, versionModel, versions, versionStationModel} from "../store/version.model";
import {Store} from "@ngrx/store";
import {getVersionById, getVersionInfo} from "../store/version.selectors";
import {AppStateModel} from "../../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {AddVersionComponent} from "./add-version/add-version.component";
import {deleteVersion, loadVersion, updateVersion} from "../store/version.actions";
import {Subscription} from "rxjs";
import {loadSpinner} from "../../../../core/store/app.action";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";
import {state} from "@angular/animations";



@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrl: './version.component.scss'
})
export class VersionComponent implements OnInit, OnDestroy {

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  private subscriptions: Subscription[] = [];
  displayedColumns: String[] = ['Aktion', 'Datum', 'Version', 'Aufgabe', 'Status'];
  extraColumns: String[] = [];
  editVersion: { [key: number]: editVersion } = {};
  editVersionTemp: { [key: number]: editVersionTemp } = {};
  editVersionDeepCopy: { [key: number]: editVersionTemp } = {};
  editVersionStation: { [key: number]: versionStationModel } = {};
  version : versions = {
    versionList:[],
    errorMessage:''
  };


  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadVersion())
    this.subscriptions.push(
      this.store.select(getVersionInfo).pipe()
        .subscribe(data =>{
          this.version=data;
          this.editVersion = data.versionList.reduce((acc, item) => {

            this.editVersionStation = item.versionStation.reduce((acc, item2) => {
              acc[item2.id] = {...item2};
              return acc;
            }, {} as { [key: number]: versionStationModel});

            acc[item.id] = {
              version: {
                ...item,
                versionStation:this.editVersionStation},
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editVersion });

          this.editVersionTemp = data.versionList.reduce((acc, item) => {
            acc[item.id] = {
              version: {...item},
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editVersionTemp });

          this.editVersionDeepCopy = structuredClone(this.editVersionTemp);

          for(let val of this.version.versionList){
            this.extraColumns = [];
            this.displayedColumns = ['Aktion', 'Datum', 'Version', 'Aufgabe', 'Status'];
            for(let val2 of val.versionStation){
              this.extraColumns.push(val2.stationName);
              this.displayedColumns.push(val2.stationName);
            }
          }
        })
    )
  }

  addVersion(){
    this.OpenPopup(0,'Version hinzufügen', false, 'Hinzufügen')
  }

  deleteVersion(id:any, deleteName:any){
    console.log(id)
    this.openConfirm('Version', deleteName, 'Löschen', id);
  }

  updateVersion(id:any){
    console.log('version bearbeiten')
    this.OpenPopup(id, 'Version bearbeiten', true, 'Aktualisieren')
  }

  updateVersionStation(versionStationId:any, versionId:any, colIndex:any){

    this.editVersion[versionId].version.versionStation[versionStationId] = this.editVersionDeepCopy[versionId].version.versionStation[colIndex];

    const updateVersionModel:versionModel =  {
      id:this.editVersion[versionId].version.id,
      date:this.editVersion[versionId].version.date,
      toDo:this.editVersion[versionId].version.toDo,
      done:this.editVersion[versionId].version.done,
      version:this.editVersion[versionId].version.version,
      versionStation: Object.values(this.editVersion[versionId].version.versionStation),
    }
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(updateVersion({versionInput:updateVersionModel}));
  }

  OpenPopup(id:any,version:any,isEdit=false, button:any){
    this.dialog.open(AddVersionComponent,{
      width: '25%',
      disableClose: true,
      data:{
        id:id,
        version:version,
        isEdit:isEdit,
        button:button
      }
    })
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
        this.store.dispatch(deleteVersion({id:id}))
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected readonly state = state;

}
