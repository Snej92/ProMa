import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {lopSettingModel} from "../store/lopSetting.model";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LopSettingService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }


  getSettingLops():Observable<lopSettingModel[]>{
    console.log("fetch setting lops")
    return this.http.get<lopSettingModel[]>(this.API_URL + "/lop/setting")
  }

  addSettingLop(lopSettingInput:lopSettingModel){
    return this.http.post(this.API_URL + "/lop/setting", lopSettingInput);
  }

  updateSettingLop(lopSettingInput:lopSettingModel){
    return this.http.put(this.API_URL + "/lop/setting", lopSettingInput);
  }

  deleteSettingLop(lopId:number){
    return this.http.delete(this.API_URL + "/lop/setting/"+lopId);
  }
}
