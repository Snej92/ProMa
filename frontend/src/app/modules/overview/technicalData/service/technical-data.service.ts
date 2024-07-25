import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {technicalDataModel} from "../store/technicalData.model";

@Injectable({
  providedIn: 'root'
})
export class TechnicalDataService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getStationTechnicalData(stationId:number):Observable<technicalDataModel[]>{
    console.log("Fetch station technicalData")
    return this.http.get<technicalDataModel[]>(this.API_URL + "/technicalData/station/"+stationId)
  }

  updateStationTechnicalData(technicalDataInput:technicalDataModel){
    return this.http.put(this.API_URL + "/technicalData/station" , technicalDataInput);
  }
}
