import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {specificationModel} from "../store/specification.model";

@Injectable({
  providedIn: 'root'
})
export class SpecificationService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getStationSpecification(stationId:number):Observable<specificationModel[]>{
    console.log("Fetch station specification")
    return this.http.get<specificationModel[]>(this.API_URL + "/specification/station/"+stationId)
  }

  updateStationSpecification(specificationInput:specificationModel){
    return this.http.put(this.API_URL + "/specification/station" , specificationInput);
  }
}
