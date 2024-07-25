import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {projectionModel} from "../store/projection.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getStationProjection(stationId:number):Observable<projectionModel[]>{
    console.log("Fetch station projection")
    return this.http.get<projectionModel[]>(this.API_URL + "/projection/station/"+stationId)
  }

  updateStationProjection(projectionInput:projectionModel){
    return this.http.put(this.API_URL + "/projection/station" , projectionInput);
  }
}
