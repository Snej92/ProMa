import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {historyModel} from "../store/history.model";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getStationHistory(stationId:number):Observable<historyModel[]>{
    console.log("Fetch station history")
    return this.http.get<historyModel[]>(this.API_URL + "/history/station/"+stationId)
  }

  addHistory(historyInput:historyModel, stationId:number){
    return this.http.post(this.API_URL + "/history/station/"+stationId, historyInput);
  }
}
