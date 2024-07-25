export interface technicalDataSettingModel {
  id : number,
  item : string,
  unit : string,
}

export interface editTechnicalDataSettingModel{
  technicalDataSetting:technicalDataSettingModel,
  isEdit : boolean,
}

export interface technicalDataSetting {
  technicalDataSettingList:technicalDataSettingModel[],
  errorMessage:string
}
