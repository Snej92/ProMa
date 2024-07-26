import {versionReducer} from "../../modules/settings/version/store/version.reducers";
import {lopReducer} from "../../modules/overview/lop/store/lop.reducers";
import {appReducer} from "./app.reducer";
import {
  projectViewReducer
} from "../../modules/project-administration/store/project-administration.reducers";
import {userReducer} from "../../modules/userAdministration/store/user-administration.reducers";
import {loggedUserReducer} from "../logged-user/logged-user.reducers";
import {activeProjectViewReducer} from "../active-project/active-project.reducer";
import {stationViewReducer} from "../../modules/station/store/stationView.reducers";
import {historyReducer} from "../../modules/overview/history/store/history.reducers";
import {
  documentationSettingReducer
} from "../../modules/settings/documentation-settings/store/documentationSetting.reducers";
import {controlSettingReducer} from "../../modules/settings/control-settings/store/controlSetting.reducers";
import {
  specificationSettingReducer
} from "../../modules/settings/specification-settings/store/specificationSetting.reducers";
import {projectionSettingReducer} from "../../modules/settings/projection-settings/store/projectionSetting.reducers";
import {headerDataSettingReducer} from "../../modules/settings/HeaderData-settings/store/headerDataSetting.reducers";
import {
  technicalDataSettingReducer
} from "../../modules/settings/TechnicalData-settings/store/technicalDataSetting.reducers";
import {documentationReducer} from "../../modules/overview/documentation/store/documentation.reducers";
import {specificationReducer} from "../../modules/overview/specification/store/specification.reducers";
import {projectionReducer} from "../../modules/overview/projection/store/projection.reducers";
import {controlReducer} from "../../modules/overview/control/store/control.reducers";
import {headerDataReducer} from "../../modules/overview/headerData/store/headerData.reducers";
import {technicalDataReducer} from "../../modules/overview/technicalData/store/technicalData.reducers";


export const AppState={
  version:versionReducer,
  lop:lopReducer,
  app:appReducer,
  projectView:projectViewReducer,
  user:userReducer,
  loggedUser:loggedUserReducer,
  activeProjectView:activeProjectViewReducer,
  stationView:stationViewReducer,
  history:historyReducer,
  documentationSetting:documentationSettingReducer,
  controlSetting:controlSettingReducer,
  specificationSetting:specificationSettingReducer,
  projectionSetting:projectionSettingReducer,
  headerDataSetting:headerDataSettingReducer,
  technicalDataSetting:technicalDataSettingReducer,
  documentation:documentationReducer,
  specification:specificationReducer,
  projection:projectionReducer,
  control:controlReducer,
  headerData:headerDataReducer,
  technicalData:technicalDataReducer
}
