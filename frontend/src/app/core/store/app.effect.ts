import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MatSnackBar} from "@angular/material/snack-bar";
import {emptyAction, showAlert} from "./app.action";
import {exhaustMap, map} from "rxjs";


@Injectable()
export class AppEffect{

  constructor(private action$:Actions,
              private snackBar:MatSnackBar) {
  }

  _showAlert=createEffect(()=>
    this.action$.pipe(
      ofType(showAlert),
      exhaustMap((action)=>{
        return this.showSnackBarAlert(action.message, action.actionResult)
          .afterDismissed()
          .pipe(
            map(()=>{
              return emptyAction();
            })
          )
      })
    )
  );


  showSnackBarAlert(message:string, actionResult:string='fail'){
    let _class=actionResult=='pass'?'pass-snackbar':'fail-snackbar'
    let _duration=actionResult=='pass'?3000:12000
    return this.snackBar.open(message,'OK',{
      duration:_duration,
      verticalPosition:'bottom',
      horizontalPosition:'end',
      panelClass:[_class]
    })
  }
}
