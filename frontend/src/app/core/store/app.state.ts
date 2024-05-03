import {versionReducer} from "../../modules/version/store/version.reducers";
import {lopReducer} from "../../modules/overview/lop/store/lop.reducers";
import {appReducer} from "./app.reducer";


export const AppState={
  version:versionReducer,
  lop:lopReducer,
  app:appReducer,
}
