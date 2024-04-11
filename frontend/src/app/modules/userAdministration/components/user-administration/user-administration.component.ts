import {Component, OnInit} from '@angular/core';
import {UserAdministrationService} from "../../services/user-administration.service";
import {user} from "../../models/user-Administration.model";
import {USERS} from "../../../../dummy/mock-user";
import {MatDialog} from "@angular/material/dialog";
import {UserFormComponent} from "../user-form/user-form.component";
import {MatTableDataSource} from "@angular/material/table";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrl: './user-administration.component.scss'
})
export class UserAdministrationComponent implements OnInit {

  users: user[] = [];
  dataSource = new MatTableDataSource<user>()


  constructor(
    private _userAdministrationService: UserAdministrationService,
    private _dialog: MatDialog,
    ){
  }

  openUserForm(){
    this._dialog.open(UserFormComponent);
  }

  getUsers(): void{
    this.dataSource.data = this._userAdministrationService.getUsers();
  }

  ngOnInit(): void{
    this.getUsers();
  }

  displayedColumns: string[] = ['firstname', 'lastname', 'acronym', 'email', 'phone' , 'username', 'password']
}

