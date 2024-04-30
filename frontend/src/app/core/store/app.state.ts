import {counterReducer} from "../../modules/counter/store/counter.reducer";
import {versionReducer} from "../../modules/version/store/version.reducers";
import {lopReducer} from "../../modules/overview/lop/store/lop.reducers";


export const AppState={
  counter:counterReducer,
  version:versionReducer,
  lop:lopReducer,
}
