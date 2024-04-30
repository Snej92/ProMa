import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lopModel} from "../store/lop.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LopService {

  constructor(private http:HttpClient) { }


  getAllLops():Observable<lopModel[]>{
    return this.http.get<lopModel[]>("http://localhost:8080/api/lop")
  }
}
