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

  getLoggedUser():Observable<userModel>{
    console.log("get logged user")
    return this.http.get<userModel>("http://localhost:8080/api/user")
  }

  updateLoggedUser(userInput:userModel):Observable<userModel> {
    return this.http.put<userModel>("http://localhost:8080/api/user", userInput);
  }

  addUser(userInput:userModel){
    return this.http.post("http://localhost:8080/api/keycloak", userInput);
  }

  updateUser(userInput:userModel){
    return this.http.put("http://localhost:8080/api/keycloak", userInput);
  }

  deleteUser(sub:string){
    return this.http.delete("http://localhost:8080/api/keycloak/"+sub);
  }
}
