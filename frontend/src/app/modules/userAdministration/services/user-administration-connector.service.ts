import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {user} from "../models/user-Administration.model";


@Injectable({
  providedIn: 'root'
})
export class UserAdministrationConnectorService {
  private API_URL= environment.API_URL;
  constructor(private http : HttpClient) { }

  getUsers() : Observable<user[]>{
    return this.http.get<user[]>(this.API_URL + '/user/all')
  }
}
