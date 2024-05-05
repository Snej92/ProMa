import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {userModel} from "../store/user-Administration.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<userModel[]>{
    console.log("fetch users")
    return this.http.get<userModel[]>("http://localhost:8080/api/user/all")
  }
}
