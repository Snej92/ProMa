export interface headerDataSettingModel {
  id : number,
  item : string,
  type : string,
}

export interface editHeaderDataSettingModel{
  headerDataSetting:headerDataSettingModel,
  isEdit : boolean,
}

export interface headerDataSetting {
  headerDataSettingList:headerDataSettingModel[],
  errorMessage:string
}
