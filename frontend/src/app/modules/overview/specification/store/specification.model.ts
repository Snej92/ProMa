import {specificationSettingModel} from "../../../settings/specification-settings/store/specificationSetting.model";

export interface specificationModel {
  id : number,
  dateDone : string,
  dateCommited : string,
  addition : string,
  done : boolean,
  commited : boolean,
  taskSetting : specificationSettingModel
}

export interface editSpecificationModel {
  specification:specificationModel,
  isEdit: boolean,
}

export interface specification {
  specificationList : specificationModel[],
  errorMessage : string
}
