import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lopModel} from "../store/lop.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LopService {

  constructor(private http:HttpClient) { }

  getStationLops(stationId:number):Observable<lopModel[]>{
    console.log("fetch station lops")
    return this.http.get<lopModel[]>("http://localhost:8080/api/lop/station/"+stationId)
  }

  updateStationLop(lopInput:lopModel){
    return this.http.put("http://localhost:8080/api/lop/station", lopInput);
  }
}
