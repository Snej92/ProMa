import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LopService} from "../service/lop.service";
import {LOAD_LOP, loadLopSuccess} from "./lop.actions";
import {catchError, EMPTY, exhaustMap, map} from "rxjs";


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
          catchError(()=>EMPTY)
        )
      })
    )
  );

}
