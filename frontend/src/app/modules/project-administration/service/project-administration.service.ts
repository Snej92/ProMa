import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {projectFavViewModel} from "../store/project-administration.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectAdministrationService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }


  getAllProjects(archive:boolean):Observable<projectFavViewModel[]>{
    console.log('Fetch Projects')
    return this.http.get<projectFavViewModel[]>(this.API_URL + "/project/all/"+archive)
  }

  getProject():Observable<projectFavViewModel>{
    console.log("Fetch active Project")
    return this.http.get<projectFavViewModel>(this.API_URL + "/project")
  }

  addProject(projectViewInput:projectFavViewModel, template:string){
    return this.http.post(this.API_URL + "/project/"+template, projectViewInput);
  }

  updateProject(projectViewInput:projectFavViewModel){
    return this.http.put(this.API_URL + "/project", projectViewInput);
  }

  deleteProject(id:number){
    return this.http.delete(this.API_URL + "/project/"+id);
  }

  editProjectFavorite(projectId:number, remove:boolean){
    return this.http.get(this.API_URL + "/project/favorite"+ projectId + "/" + remove)
  }

  getProjectFavorite():Observable<projectFavViewModel[]>{
    return this.http.get<projectFavViewModel[]>(this.API_URL + "/project/favorite");
  }
}
