export interface lopSettingModel {
  id : number,
  startDate : string,
  item : string,
}

export interface lopSetting{
  lopSettingList:lopSettingModel[],
  errorMessage:string
}
