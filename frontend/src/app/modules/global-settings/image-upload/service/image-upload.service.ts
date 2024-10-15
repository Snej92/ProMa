import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {uploadModel} from "../store/image-upload.model";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) { }

  uploadImage(formData : FormData, typ:number):Observable<uploadModel>{
    return this.http.post<uploadModel>(this.API_URL + '/upload/image/'+typ, formData);
  }

  getUploadList(typ:number):Observable<uploadModel[]>{
    return this.http.get<uploadModel[]>(this.API_URL + '/upload/image/'+ typ);
  }

  deleteImage(filename:string, typ:number):Observable<string>{
    return this.http.delete<string>(this.API_URL + '/upload/image/' + filename + '/'+ typ);
  }
}
