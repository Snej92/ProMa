import {versions} from "../../modules/version/store/version.model";
import {lop} from "../../modules/overview/lop/store/lop.model";


export interface AppStateModel{
  version:versions,
  lop:lop
}
