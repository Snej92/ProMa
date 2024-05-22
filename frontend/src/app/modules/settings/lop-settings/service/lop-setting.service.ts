import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {lopSettingModel} from "../store/lopSetting.model";

@Injectable({
  providedIn: 'root'
})
export class LopSettingService {

  constructor(private http:HttpClient) { }


  getSettingLops():Observable<lopSettingModel[]>{
    console.log("fetch setting lops")
    return this.http.get<lopSettingModel[]>("http://localhost:8080/api/lop/setting")
  }

  addSettingLop(lopSettingInput:lopSettingModel){
    return this.http.post("http://localhost:8080/api/lop/setting", lopSettingInput);
  }

  updateSettingLop(lopSettingInput:lopSettingModel){
    return this.http.put("http://localhost:8080/api/lop/setting", lopSettingInput);
  }

  deleteSettingLop(lopId:number){
    return this.http.delete("http://localhost:8080/api/lop/setting/"+lopId);
  }
}
