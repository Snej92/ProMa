import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {stationOverallViewFilter, stationOverallViewModel} from "../store/stationOverallView.model";

@Injectable({
  providedIn: 'root'
})
export class StationOverallViewService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) {}

  getStationOverallView(stationFilter:stationOverallViewFilter):Observable<stationOverallViewModel[]>{
    return this.http.post<stationOverallViewModel[]>(this.API_URL + "/station/overall", stationFilter);
  }
}
