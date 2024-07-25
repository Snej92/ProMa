export interface projectionSettingModel {
  id : number,
  item : string,
  type : string,
}

export interface editProjectionSettingModel{
  projectionSetting:projectionSettingModel,
  isEdit : boolean,
}

export interface projectionSetting {
  projectionSettingList:projectionSettingModel[],
  errorMessage:string
}
