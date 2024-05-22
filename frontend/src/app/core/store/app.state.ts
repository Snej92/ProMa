import {versionReducer} from "../../modules/version/store/version.reducers";
import {lopReducer} from "../../modules/overview/lop/store/lop.reducers";
import {appReducer} from "./app.reducer";
import {
  projectViewReducer
} from "../../modules/project-administration/store/project-administration.reducers";
import {userReducer} from "../../modules/userAdministration/store/user-administration.reducers";
import {loggedUserReducer} from "../logged-user/logged-user.reducers";
import {activeProjectViewReducer} from "../active-project/active-project.reducer";
import {stationViewReducer} from "../../modules/station/store/stationView.reducers";
import {lopSettingReducer} from "../../modules/settings/lop-settings/store/lopSetting.reducers";


export const AppState={
  version:versionReducer,
  lop:lopReducer,
  lopSetting:lopSettingReducer,
  app:appReducer,
  projectView:projectViewReducer,
  user:userReducer,
  loggedUser:loggedUserReducer,
  activeProjectView:activeProjectViewReducer,
  stationView:stationViewReducer,
}
