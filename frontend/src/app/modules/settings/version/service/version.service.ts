import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {versionModel} from "../store/version.model";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  getVersions():Observable<versionModel[]>{
    console.log('Fetch Versions')
    return this.http.get<versionModel[]>( this.API_URL + "/version")
  }

  addVersion(versionInput:versionModel){
    return this.http.post(this.API_URL + "/version", versionInput);
  }

  updateVersion(versionInput:versionModel){
    return this.http.put(this.API_URL + "/version", versionInput);
  }

  deleteVersion(id:number){
    return this.http.delete(this.API_URL + "/version/"+id);
  }
}
