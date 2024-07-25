import {technicalDataSettingModel} from "../../../settings/TechnicalData-settings/store/technicalDataSetting.model";


export interface technicalDataModel {
  id : number,
  value : string,
  technicalDataSetting : technicalDataSettingModel
}

export interface editTechnicalDataModel {
  technicalData:technicalDataModel,
  isEdit: boolean,
}

export interface technicalData {
  technicalDataList : technicalDataModel[],
  errorMessage : string
}
