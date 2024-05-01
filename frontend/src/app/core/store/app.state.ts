import {versionReducer} from "../../modules/version/store/version.reducers";
import {lopReducer} from "../../modules/overview/lop/store/lop.reducers";


export const AppState={
  version:versionReducer,
  lop:lopReducer,
}
