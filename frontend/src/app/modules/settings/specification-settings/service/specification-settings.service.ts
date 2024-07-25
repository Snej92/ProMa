import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {specificationSettingModel} from "../store/specificationSetting.model";

@Injectable({
  providedIn: 'root'
})
export class SpecificationSettingsService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getSettingSpecifications():Observable<specificationSettingModel[]>{
    console.log("fetch setting specifications")
    return this.http.get<specificationSettingModel[]>(this.API_URL + "/specification/setting")
  }

  addSettingSpecification(specificationSettingInput:specificationSettingModel){
    return this.http.post(this.API_URL + "/specification/setting", specificationSettingInput);
  }

  updateSettingSpecification(specificationSettingInput:specificationSettingModel){
    return this.http.put(this.API_URL + "/specification/setting", specificationSettingInput);
  }

  deleteSettingSpecification(specificationId:number){
    return this.http.delete(this.API_URL + "/specification/setting/"+specificationId);
  }
}
