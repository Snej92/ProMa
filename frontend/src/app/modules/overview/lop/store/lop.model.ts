import {lopSettingModel} from "../../../settings/lop-settings/store/lopSetting.model";

export interface lopModel {
  id : number,
  lopSetting: lopSettingModel,
  endDate : string,
  status : string,
  userAcronym : string
}

export interface lop{
  lopList:lopModel[],
  errorMessage:string
}
