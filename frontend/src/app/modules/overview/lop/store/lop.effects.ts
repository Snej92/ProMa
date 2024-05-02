import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LopService} from "../service/lop.service";
import {
  addLop,
  addLopSuccess,
  LOAD_LOP,
  loadLopFail,
  loadLopSuccess,
} from "./lop.actions";
import {catchError, exhaustMap, map, of} from "rxjs";
import {lopModel} from "./lop.model";


@Injectable()
export class LopEffects{
  constructor(private action$:Actions, private service:LopService) {

  }

  getLop=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_LOP),
      exhaustMap((action)=>{
        return this.service.getAllLops().pipe(
          map((data)=>{
            return loadLopSuccess({lopList:data});
          }),
          catchError((error)=> of(loadLopFail({errorText:error})))
        )
      })
    )
  );

  addLop=createEffect(()=>
    this.action$.pipe(
      ofType(addLop),
      exhaustMap((action)=>{
        return this.service.addLop(action.lopInput).pipe(
          map((data)=>{
            return addLopSuccess({lopInput:data as lopModel})
          }),
          catchError((error)=> of(loadLopFail({errorText:error})))
        )
      })
    ));

}
