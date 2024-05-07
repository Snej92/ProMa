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
              private dialog:MatDialog) {
  }

  deleteUser(sub:any){
    console.log(sub)
    if(confirm("Benutzer wirklich löschen? Vorgang kann nicht Rückgängig gemacht werden")){
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(deleteUser({sub:sub}))
    }
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
