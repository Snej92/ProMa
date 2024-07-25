import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {controlSettingModel} from "../../control-settings/store/controlSetting.model";

@Injectable({
  providedIn: 'root'
})
export class ControlSettingsService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getSettingControls():Observable<controlSettingModel[]>{
    console.log("fetch setting controls")
    return this.http.get<controlSettingModel[]>(this.API_URL + "/control/setting")
  }

  addSettingControl(controlSettingInput:controlSettingModel){
    return this.http.post(this.API_URL + "/control/setting", controlSettingInput);
  }

  updateSettingControl(controlSettingInput:controlSettingModel){
    return this.http.put(this.API_URL + "/control/setting", controlSettingInput);
  }

  deleteSettingControl(controlId:number){
    return this.http.delete(this.API_URL + "/control/setting/"+controlId);
  }
}
