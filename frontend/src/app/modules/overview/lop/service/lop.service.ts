import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lopModel} from "../store/lop.model";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LopService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getStationLops(stationId:number):Observable<lopModel[]>{
    console.log("Fetch station lops")
    return this.http.get<lopModel[]>(this.API_URL + "/lop/station/"+stationId)
  }

  updateStationLop(lopInput:lopModel){
    return this.http.put(this.API_URL + "/lop/station", lopInput);
  }

  addLop(lopInput:lopModel, stationId:number){
    console.log(lopInput)
    return this.http.post(this.API_URL + "/lop/station/"+stationId, lopInput);
  }

  deleteLop(lopId:number){
    return this.http.delete(this.API_URL + "/lop/station/"+lopId);
  }
}
