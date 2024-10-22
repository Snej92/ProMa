import {Component, OnDestroy, OnInit} from '@angular/core';
import {user} from "../../store/user-Administration.model";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Subscription} from "rxjs";
import {loadUser, deleteUser} from "../../store/user-administration.actions";
import {getUserInfo} from "../../store/user-administration.selectors";
import {loadSpinner} from "../../../../core/store/app.action";
import {MatDialog} from "@angular/material/dialog";
import {AddUserComponent} from "../add-user/add-user.component";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrl: './user-administration.component.scss'
})
export class UserAdministrationComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  user!:user;
  displayedColumns: string[] = ['Aktion','Vorname','Nachname', 'Kürzel', 'E-Mail', 'Telefon', 'Benutzername', 'Passwort']

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  deleteUser(sub:any, deleteName:any){
    this.openConfirm('Benutzer', deleteName, 'Löschen', sub);
  }

  openConfirm(title:any, confirmName:any, button:any, sub:any){
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
        console.log(sub)
        this.store.dispatch(loadSpinner({isLoading:true}));
        this.store.dispatch(deleteUser({sub:sub}))
      }
    })
  }

  editUser(id:any){
    console.log(id)
    this.openPopup(id,'Benutzer bearbeiten', true,'Aktualisieren')
  }

  addUser(){
    this.openPopup(0,'Benutzer hinzufügen', false, 'Hinzufügen')
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(loadUser())
    this.subscriptions.push(
      this.store.select(getUserInfo).pipe()
        .subscribe(data =>{
          this.user=data;
        })
    )
  }

  openPopup(id:any, title:any, isEdit=false, button:any){
    this.dialog.open(AddUserComponent,{
      width:'30%',
      disableClose: true,
      data:{
        id:id,
        title: title,
        isEdit:isEdit,
        button:button
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
