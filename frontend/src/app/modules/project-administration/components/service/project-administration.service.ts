import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {projectViewModel} from "../store/project-administration.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectAdministrationService {

  constructor(private http:HttpClient) { }


  getAllProjects():Observable<projectViewModel[]>{
    console.log('Fetch Projects')
    return this.http.get<projectViewModel[]>("http://localhost:8080/api/project/all")
  }
}