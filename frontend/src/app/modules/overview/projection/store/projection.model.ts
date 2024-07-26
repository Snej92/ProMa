import {projectionSettingModel} from "../../../settings/projection-settings/store/projectionSetting.model";

export interface projectionModel {
  id : number,
  dateDone : string,
  dateCommited : string,
  addition : string,
  done : boolean,
  commited : boolean,
  taskSetting : projectionSettingModel
}

export interface editProjectionModel {
  projection:projectionModel,
  isEdit: boolean,
}

export interface projection {
  projectionList : projectionModel[],
  errorMessage : string
}
