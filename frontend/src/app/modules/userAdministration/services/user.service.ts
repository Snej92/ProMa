import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {userModel} from "../store/user-Administration.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getAllUsers():Observable<userModel[]>{
    console.log("fetch users")
    return this.http.get<userModel[]>(this.API_URL + "/user/all")
  }

  getLoggedUser():Observable<userModel>{
    console.log("get logged user")
    return this.http.get<userModel>(this.API_URL + "/user")
  }

  updateLoggedUser(userInput:userModel):Observable<userModel> {
    return this.http.put<userModel>(this.API_URL + "/user", userInput);
  }

  addUser(userInput:userModel){
    return this.http.post(this.API_URL + "/keycloak", userInput);
  }

  updateUser(userInput:userModel){
    return this.http.put(this.API_URL + "/keycloak", userInput);
  }

  deleteUser(sub:string){
    return this.http.delete(this.API_URL + "/keycloak/"+sub);
  }
}
