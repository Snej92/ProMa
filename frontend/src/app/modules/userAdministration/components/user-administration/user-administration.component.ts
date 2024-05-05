import {Component, OnInit} from '@angular/core';
import {user} from "../../store/user-Administration.model";

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrl: './user-administration.component.scss'
})
export class UserAdministrationComponent implements OnInit{

  user!:user;
  displayedColumns: string[] = ['Vorname','Nachname', 'Kürzel', 'E-Mail', 'Telefon', 'Benutzername', 'Passwort']

  openUserForm(){

  }

  ngOnInit(): void {
    console.log(this.user)
  }
}
