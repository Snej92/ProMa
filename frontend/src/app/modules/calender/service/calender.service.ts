import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {assignmentModel} from "../store/calender.model";

@Injectable({
  providedIn: 'root'
})
export class CalenderService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getAssignment(date:string):Observable<assignmentModel[]>{
    console.log("get Assignment")
    return this.http.get<assignmentModel[]>(this.API_URL + "/assignment/" + date);
  }

  updateAssignment(assignment:assignmentModel){
    return this.http.put(this.API_URL + "/assignment", assignment)
  }
}
