import {headerDataSettingModel} from "../../../settings/HeaderData-settings/store/headerDataSetting.model";

export interface headerDataModel {
  id : number,
  data : string,
  headerDataSetting : headerDataSettingModel
}

export interface editHeaderDataModel {
  headerData:headerDataModel,
  isEdit: boolean,
}

export interface headerData {
  headerDataList : headerDataModel[],
  errorMessage : string
}
