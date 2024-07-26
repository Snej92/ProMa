import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {editLopModel, lop, lopModel} from "../store/lop.model";
import {getLopById, getLopInfo} from "../store/lop.selectors";
import {deleteLop, loadLop, updateLop} from "../store/lop.actions";
import {loadSpinner} from "../../../../core/store/app.action";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";
import {AddLopComponent} from "./add-lop/add-lop.component";

@Component({
  selector: 'app-lop',
  templateUrl: './lop.component.html',
  styleUrl: './lop.component.scss'
})
export class LopComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  lop !: lop;
  editData!:lopModel;
  displayedColumns: string[] = ['Aktion', 'Aufnahme','von','Übermittlungsart', 'ToDo', 'Zusatz', 'Status', 'Erledigt', 'Benutzer'];
  editLops: { [key: number]: editLopModel } = {};
  lopStatus: string[] = ['OFFEN', 'INARBEIT', 'ERLEDIGT'];
  @Input() stationId!:number;

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  ngOnInit(): void {
    console.log(this.stationId)
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadLop({stationId:this.stationId}))
    this.subscriptions.push(
      this.store.select(getLopInfo).pipe()
        .subscribe(data =>{
          this.lop=data;
          this.editLops = data.lopList.reduce((acc, item) => {
            acc[item.id] = {
              lop: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editLopModel });
        })
    )
  }

  addLop(){
    this.openPopup(0,"LOP Punkt Hinzufügen", false, this.stationId, 'Hinzufügen');
  }

  editLop(lopId:any){
    this.openPopup(lopId,"LOP Punkt Bearbeiten", true, this.stationId, 'Aktualisieren');
  }

  deleteLop(id:any, deleteName:any){
    console.log(id)
    this.openConfirm('LOP Punkt', deleteName, 'Löschen', id);
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
        this.store.dispatch(deleteLop({id:id}))
      }
    })
  }

  openPopup(id:any, title:any, isEdit=false, stationId:any, button:any){
    this.dialog.open(AddLopComponent,{
      width:'40%',
      data:{
        id:id,
        title:title,
        isEdit:isEdit,
        stationId:stationId,
        button:button,
      }
    })
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

  changeLOPStatus(status:string, id:any){
    this.store.select(getLopById(id)).subscribe(data=>{
      this.editData=data;
    })
    if(this.editData.status!=status){
      const lopInput:lopModel={
        id:this.editData.id,
        startDate:this.editData.startDate,
        issuer:this.editData.issuer,
        transmissionType:this.editData.transmissionType,
        item:this.editData.item,
        addition:this.editData.addition,
        endDate:this.editData.endDate,
        status:status,
        userAcronym:this.editData.userAcronym,
      }
      console.log(lopInput)
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(updateLop({lopInput:lopInput}))
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
