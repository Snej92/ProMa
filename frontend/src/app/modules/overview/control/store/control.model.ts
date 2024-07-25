import {controlSettingModel} from "../../../settings/control-settings/store/controlSetting.model";

export interface controlModel {
  id : number,
  date : string,
  addition : string,
  done : boolean,
  commited : boolean,
  taskSetting : controlSettingModel
}

export interface editControlModel {
  control:controlModel,
  isEdit: boolean,
}

export interface control {
  controlList : controlModel[],
  errorMessage : string
}
