import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {documentationSettingModel} from "../store/documentationSetting.model";

@Injectable({
  providedIn: 'root'
})
export class DocumentationSettingsService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getSettingDocumentations():Observable<documentationSettingModel[]>{
    console.log("fetch setting documentations")
    return this.http.get<documentationSettingModel[]>(this.API_URL + "/documentation/setting")
  }

  addSettingDocumentation(documentationSettingInput:documentationSettingModel){
    return this.http.post(this.API_URL + "/documentation/setting", documentationSettingInput);
  }

  updateSettingDocumentation(documentationSettingInput:documentationSettingModel){
    return this.http.put(this.API_URL + "/documentation/setting", documentationSettingInput);
  }

  deleteSettingDocumentation(documentationId:number){
    return this.http.delete(this.API_URL + "/documentation/setting/"+documentationId);
  }
}
