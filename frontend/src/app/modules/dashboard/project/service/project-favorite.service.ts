import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {projectFavViewModel} from "../../../project-administration/store/project-administration.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectFavoriteService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  editProjectFavorite(projectId:number, remove:boolean){
    return this.http.get(this.API_URL + "/project/favorite/"+ projectId + "/" + remove)
  }

  getProjectFavorite():Observable<projectFavViewModel[]>{
    console.log("fetch favorite projects")
    return this.http.get<projectFavViewModel[]>(this.API_URL + "/project/favorite");
  }
}
