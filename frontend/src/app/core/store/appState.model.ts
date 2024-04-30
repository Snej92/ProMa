import {counterState} from "../../modules/counter/store/counter.model";
import {versions} from "../../modules/version/store/version.model";
import {lop} from "../../modules/overview/lop/store/lop.model";


export interface AppStateModel{
  counter:counterState,
  version:versions,
  lop:lop
}
