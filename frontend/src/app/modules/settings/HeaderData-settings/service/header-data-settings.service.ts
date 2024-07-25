import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {headerDataSettingModel} from "../store/headerDataSetting.model";

@Injectable({
  providedIn: 'root'
})
export class HeaderDataSettingsService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getSettingHeaderData():Observable<headerDataSettingModel[]>{
    console.log("fetch setting headerData")
    return this.http.get<headerDataSettingModel[]>(this.API_URL + "/headerData/setting")
  }

  addSettingHeaderData(headerDataSettingInput:headerDataSettingModel){
    return this.http.post(this.API_URL + "/headerData/setting", headerDataSettingInput);
  }

  updateSettingHeaderData(headerDataSettingInput:headerDataSettingModel){
    return this.http.put(this.API_URL + "/headerData/setting", headerDataSettingInput);
  }

  deleteSettingHeaderData(headerDataId:number){
    return this.http.delete(this.API_URL + "/headerData/setting/"+headerDataId);
  }
}
