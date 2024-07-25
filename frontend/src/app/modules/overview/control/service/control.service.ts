import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {controlModel} from "../store/control.model";

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getStationControl(stationId:number):Observable<controlModel[]>{
    console.log("Fetch station control")
    return this.http.get<controlModel[]>(this.API_URL + "/control/station/"+stationId)
  }

  updateStationControl(controlInput:controlModel){
    return this.http.put(this.API_URL + "/control/station" , controlInput);
  }
}
