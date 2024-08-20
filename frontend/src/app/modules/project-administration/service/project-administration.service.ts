import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {projectViewModel} from "../store/project-administration.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectAdministrationService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }


  getAllProjects(archive:boolean):Observable<projectViewModel[]>{
    console.log('Fetch Projects')
    return this.http.get<projectViewModel[]>(this.API_URL + "/project/all/"+archive)
  }

  getProject():Observable<projectViewModel>{
    console.log("Fetch active Project")
    return this.http.get<projectViewModel>(this.API_URL + "/project")
  }

  addProject(projectViewInput:projectViewModel, template:string){
    return this.http.post(this.API_URL + "/project/"+template, projectViewInput);
  }

  updateProject(projectViewInput:projectViewModel){
    return this.http.put(this.API_URL + "/project", projectViewInput);
  }

  deleteProject(id:number){
    return this.http.delete(this.API_URL + "/project/"+id);
  }
}
