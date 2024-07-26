import {controlSettingModel} from "../../../settings/control-settings/store/controlSetting.model";

export interface lopModel {
  id : number,
  startDate : string,
  issuer : string,
  transmissionType : string,
  item : string,
  addition : string,
  endDate : string,
  status : string,
  userAcronym : string
}

export interface editLopModel{
  lop: lopModel,
  isEdit : boolean,
}

export interface lop{
  lopList:lopModel[],
  errorMessage:string
}
