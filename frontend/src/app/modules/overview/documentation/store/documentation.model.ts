import {documentationSettingModel} from "../../../settings/documentation-settings/store/documentationSetting.model";

export interface documentationModel {
  id : number,
  date : string,
  addition : string,
  done : boolean,
  commited : boolean,
  taskSetting : documentationSettingModel
}

export interface editDocumentationModel {
  documentation:documentationModel,
  isEdit: boolean,
}

export interface documentation {
  documentationList : documentationModel[],
  errorMessage : string
}
