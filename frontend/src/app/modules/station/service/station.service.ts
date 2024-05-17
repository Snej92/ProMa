import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {stationViewModel} from "../store/station.model";

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http:HttpClient) {}

  getAllStations():Observable<stationViewModel[]>{
    console.log('Fetch Stations')
    return this.http.get<stationViewModel[]>("http://localhost:8080/api/station/all")
  }

  getStation():Observable<stationViewModel>{
    console.log("Fetch selected Station")
    return this.http.get<stationViewModel>("http://localhost:8080/api/station")
  }

  addStation(stationViewInput:stationViewModel){
    return this.http.post("http://localhost:8080/api/station", stationViewInput);
  }

  updateStation(stationViewInput:stationViewModel){
    return this.http.put("http://localhost:8080/api/station", stationViewInput);
  }

  deleteStation(id:number){
    return this.http.delete("http://localhost:8080/api/station/"+id);
  }
}
