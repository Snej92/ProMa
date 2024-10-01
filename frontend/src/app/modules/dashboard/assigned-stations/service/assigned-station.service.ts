import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {stationFavViewModel} from "../../../station/store/stationView.model";

@Injectable({
  providedIn: 'root'
})
export class AssignedStationService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getAssignedStations():Observable<stationFavViewModel[]>{
    console.log("fetch assigned stations")
    return this.http.get<stationFavViewModel[]>(this.API_URL + "/station/assigned");
  }
}
