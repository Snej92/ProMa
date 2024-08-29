import {controlSettingModel} from "../../../settings/control-settings/store/controlSetting.model";

export interface controlModel {
  id : number,
  dateDone : string,
  dateCommited : string,
  addition : string,
  done : boolean,
  commited : boolean,
  issuerAcronym : string,
  issuerName : string,
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
