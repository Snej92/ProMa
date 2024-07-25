import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {technicalDataSettingModel} from "../store/technicalDataSetting.model";


@Injectable({
  providedIn: 'root'
})
export class TechnicalDataSettingsService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getSettingTechnicalData():Observable<technicalDataSettingModel[]>{
    console.log("fetch setting technicalData")
    return this.http.get<technicalDataSettingModel[]>(this.API_URL + "/technicalData/setting")
  }

  addSettingTechnicalData(technicalDataSettingInput:technicalDataSettingModel){
    return this.http.post(this.API_URL + "/technicalData/setting", technicalDataSettingInput);
  }

  updateSettingTechnicalData(technicalDataSettingInput:technicalDataSettingModel){
    return this.http.put(this.API_URL + "/technicalData/setting", technicalDataSettingInput);
  }

  deleteSettingTechnicalData(technicalDataId:number){
    return this.http.delete(this.API_URL + "/technicalData/setting/"+technicalDataId);
  }
}
