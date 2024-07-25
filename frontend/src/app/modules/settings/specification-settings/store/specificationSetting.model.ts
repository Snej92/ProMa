export interface specificationSettingModel {
  id : number,
  item : string,
  type : string,
}

export interface editSpecificationSettingModel{
  specificationSetting:specificationSettingModel,
  isEdit : boolean,
}

export interface specificationSetting {
  specificationSettingList:specificationSettingModel[],
  errorMessage:string
}
