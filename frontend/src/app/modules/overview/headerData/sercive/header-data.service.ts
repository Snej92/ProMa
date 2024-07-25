import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {headerDataModel} from "../store/headerData.model";

@Injectable({
  providedIn: 'root'
})
export class HeaderDataService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getStationHeaderData(stationId:number):Observable<headerDataModel[]>{
    console.log("Fetch station headerData")
    return this.http.get<headerDataModel[]>(this.API_URL + "/headerData/station/"+stationId)
  }

  updateStationHeaderData(headerDataInput:headerDataModel){
    return this.http.put(this.API_URL + "/headerData/station" , headerDataInput);
  }
}
