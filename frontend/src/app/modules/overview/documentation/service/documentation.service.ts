import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {documentationModel} from "../store/documentation.model";

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getStationDocumentation(stationId:number):Observable<documentationModel[]>{
    console.log("Fetch station documentation")
    return this.http.get<documentationModel[]>(this.API_URL + "/documentation/station/"+stationId)
  }

  updateStationDocumentation(documentationInput:documentationModel){
    console.log(documentationInput)
    return this.http.put(this.API_URL + "/documentation/station" , documentationInput);
  }
}
