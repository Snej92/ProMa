import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {projectionSettingModel} from "../../projection-settings/store/projectionSetting.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectionSettingsService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getSettingProjections():Observable<projectionSettingModel[]>{
    console.log("fetch setting projections")
    return this.http.get<projectionSettingModel[]>(this.API_URL + "/projection/setting")
  }

  addSettingProjection(projectionSettingInput:projectionSettingModel){
    return this.http.post(this.API_URL + "/projection/setting", projectionSettingInput);
  }

  updateSettingProjection(projectionSettingInput:projectionSettingModel){
    return this.http.put(this.API_URL + "/projection/setting", projectionSettingInput);
  }

  deleteSettingProjection(projectionId:number){
    return this.http.delete(this.API_URL + "/projection/setting/"+projectionId);
  }
}
