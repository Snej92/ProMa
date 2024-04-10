import { Component } from '@angular/core';
import {role, user} from "../../models/user-Administration.model";

const roles: role[] = [
  {id: 1, user: true, project: true, admin: true},
  {id: 2, user: true, project: true, admin: false},
  {id: 3, user: true, project: false, admin: false},
]

const users: user[] = [
  {id: 1, sub: 'testSub', firstname: 'Andreas', lastname: 'Elsner', acronym:'AEL', email:'a.elsner@sysprotec.de', phone:'+49 911 6005797 13', username: 'a.elsner', password:'IchChefDuNix', role: roles[1]},
  {id: 2, sub: 'testSub2', firstname: 'Bernd', lastname: 'Waegner', acronym:'BWA', email:'b.waegner@sysprotec.de', phone:'+49 911 6005797 17', username: 'b.wagner', password:'42gLeberkas', role: roles[2]}
]


@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrl: './user-administration.component.scss'
})
export class UserAdministrationComponent {
  displayedColumns: string[] = ['firstname', 'lastname', 'acronym', 'email', 'phone' , 'username', 'password']
  dataSource = users;
}
