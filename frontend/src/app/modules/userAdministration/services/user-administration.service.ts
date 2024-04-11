import {Injectable} from '@angular/core';
import {user} from "../models/user-Administration.model";
import {USERS} from "../../../dummy/mock-user";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserAdministrationService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  getUsers(): user[]{
    return USERS;
  }

  // getUsersAPI(): Observable<user[]>{
  //   return this.http.get<user[]>(this.API_URL + "/user/all")
  // }
}
