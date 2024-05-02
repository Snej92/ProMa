import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lopModel} from "../store/lop.model";
import {Observable, tap} from "rxjs";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Store} from "@ngrx/store";
import {getLop} from "../store/lop.selectors";

@Injectable({
  providedIn: 'root'
})
export class LopService {

  constructor(private http:HttpClient,
              private store:Store<AppStateModel>) { }


  getAllLops():Observable<lopModel[]>{
    console.log("fetch lops")
    return this.http.get<lopModel[]>("http://localhost:8080/api/lop")
  }

  addLop(lopInput:lopModel){
    return this.http.post("http://localhost:8080/api/lop", lopInput)
      .pipe(
      tap(()=>{
        this.http.get<lopModel>("http://localhost:8080/api/lop/latest");
      })
    )
  }
}
