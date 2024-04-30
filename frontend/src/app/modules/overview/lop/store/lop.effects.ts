import {Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";
import {LopService} from "../service/lop.service";


@Injectable()
export class LopEffects{
  constructor(private action$:Actions, private service:LopService) {
  }
}
