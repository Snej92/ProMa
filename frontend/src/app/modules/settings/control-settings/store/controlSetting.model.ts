export interface controlSettingModel {
  id : number,
  item : string,
  type : string,
}

export interface editControlSettingModel{
  controlSetting:controlSettingModel,
  isEdit : boolean,
}

export interface controlSetting {
  controlSettingList:controlSettingModel[],
  errorMessage:string
}
