import {versionReducer} from "../../modules/version/store/version.reducers";
import {lopReducer} from "../../modules/overview/lop/store/lop.reducers";
import {appReducer} from "./app.reducer";
import {
  projectViewReducer
} from "../../modules/project-administration/components/store/project-administration.reducers";
import {userReducer} from "../../modules/userAdministration/store/user-administration.reducers";


export const AppState={
  version:versionReducer,
  lop:lopReducer,
  app:appReducer,
  projectView:projectViewReducer,
  user:userReducer,
}
