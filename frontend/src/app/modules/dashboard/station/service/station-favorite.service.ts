import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {stationFavViewModel} from "../../../station/store/stationView.model";


@Injectable({
  providedIn: 'root'
})
export class StationFavoriteService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  editStationFavorite(stationId:number, remove:boolean){
    return this.http.get(this.API_URL + "/station/favorite/"+ stationId + "/" + remove)
  }

  getStationFavorite():Observable<stationFavViewModel[]>{
    console.log("fetch favorite stations")
    return this.http.get<stationFavViewModel[]>(this.API_URL + "/station/favorite");
  }
}
