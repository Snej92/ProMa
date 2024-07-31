import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {stationViewModel} from "../../../station/store/stationView.model";

@Injectable({
  providedIn: 'root'
})
export class StationViewOverviewService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) {}

  getStation(id:number):Observable<stationViewModel>{
    return this.http.get<stationViewModel>(this.API_URL + "/station/"+id)
  }
}
