import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {projectViewModel} from "../store/project-administration.model";
import {userModel} from "../../../userAdministration/store/user-Administration.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectAdministrationService {

  constructor(private http:HttpClient) { }


  getAllProjects():Observable<projectViewModel[]>{
    console.log('Fetch Projects')
    return this.http.get<projectViewModel[]>("http://localhost:8080/api/project/all")
  }

  getProject():Observable<projectViewModel>{
    console.log("Fetch active Project")
    return this.http.get<projectViewModel>("http://localhost:8080/api/project")
  }

  addProject(projectViewInput:projectViewModel){
    return this.http.post("http://localhost:8080/api/project", projectViewInput);
  }
}
