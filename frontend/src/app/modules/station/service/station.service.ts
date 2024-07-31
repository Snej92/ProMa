import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {stationViewModel} from "../store/stationView.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) {}

  getAllStations():Observable<stationViewModel[]>{
    console.log('Fetch Stations')
    return this.http.get<stationViewModel[]>(this.API_URL + "/station/all")
  }

  addStation(stationViewInput:stationViewModel){
    return this.http.post(this.API_URL + "/station", stationViewInput);
  }

  updateStation(stationViewInput:stationViewModel){
    return this.http.put(this.API_URL + "/station", stationViewInput);
  }

  deleteStation(id:number){
    return this.http.delete(this.API_URL + "/station/"+id);
  }
}
