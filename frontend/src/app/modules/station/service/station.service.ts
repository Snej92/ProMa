import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  additionalHeaderDataModel,
  stationFavViewModel,
  stationViewModel,
  stationViewRequest
} from "../store/stationView.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) {}

  getAllStations():Observable<stationFavViewModel[]>{
    console.log('Fetch Stations')
    return this.http.get<stationFavViewModel[]>(this.API_URL + "/station/all")
  }

  addStation(stationViewInput:stationFavViewModel, headerDataInput:additionalHeaderDataModel[]){
    const stationRequest:stationViewRequest = {
      stationFavView:stationViewInput,
      headerDataInput:headerDataInput
    }
    console.log(stationRequest)
    return this.http.post(this.API_URL + "/station", stationRequest);
  }

  updateStation(stationViewInput:stationFavViewModel){
    return this.http.put(this.API_URL + "/station", stationViewInput);
  }

  deleteStation(id:number){
    return this.http.delete(this.API_URL + "/station/"+id);
  }
}
