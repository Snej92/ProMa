import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {versionModel} from "../store/version.model";

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http:HttpClient) { }

  getVersions():Observable<versionModel[]>{
    console.log('Fetch Versions')
    return this.http.get<versionModel[]>("http://localhost:8080/api/version")
  }

  addVersion(versionInput:versionModel){
    return this.http.post("http://localhost:8080/api/version", versionInput);
  }

  updateVersion(versionInput:versionModel){
    return this.http.put("http://localhost:8080/api/version", versionInput);
  }

  deleteVersion(id:number){
    return this.http.delete("http://localhost:8080/api/version/"+id);
  }
}
