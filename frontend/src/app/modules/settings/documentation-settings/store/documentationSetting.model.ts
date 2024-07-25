export interface documentationSettingModel {
  id : number,
  item : string,
  type : string,
}

export interface editDocumentationSettingModel{
  documentationSetting:documentationSettingModel,
  isEdit : boolean,
}

export interface documentationSetting {
  documentationSettingList:documentationSettingModel[],
  errorMessage:string
}
