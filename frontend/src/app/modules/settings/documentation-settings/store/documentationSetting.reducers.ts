import {createReducer, on} from "@ngrx/store";
import {
  addSettingDocumentationSuccess,
  deleteSettingDocumentation,
  loadSettingDocumentation,
  loadSettingDocumentationFail,
  loadSettingDocumentationSuccess,
  updateSettingDocumentationSuccess
} from "./documentationSetting.actions";
import {documentationSettingModel} from "./documentationSetting.model";
import {documentationSettingState} from "./documentationSetting.state";


const _documentationSettingReducer = createReducer(
  documentationSettingState,

  on(loadSettingDocumentation, (state) => {
    return{
      ...state
    };
  }),

  on(loadSettingDocumentationSuccess, (state,action) => {
    return{
      ...state,
      documentationSettingList:[...action.documentationSettingList],
      errorMessage:''
    };
  }),

  on(loadSettingDocumentationFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      documentationSettingList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateSettingDocumentationSuccess, (state,action) => {
    const _documentationSetting={...action.documentationSettingInput};
    const updatedSettingDocumentation=state.documentationSettingList.map(documentationSetting=>{
      return _documentationSetting.id===documentationSetting.id?_documentationSetting:documentationSetting;
    });
    return{
      ...state,
      documentationSettingList:updatedSettingDocumentation
    };
  }),

  on(deleteSettingDocumentation, (state,action) => {
    const updatedSettingDocumentation=state.documentationSettingList.filter((data:documentationSettingModel)=>{
      return data.id!==action.id
    });
    return{
      ...state,
      documentationSettingList:updatedSettingDocumentation
    };
  }),

  on(addSettingDocumentationSuccess, (state,action) => {
    const documentation={...action.documentationSettingInput};
    return{
      ...state,
      documentationSettingList:[...state.documentationSettingList,documentation]
    };
  }),

);

export function documentationSettingReducer(state: any , action: any) {
  return _documentationSettingReducer(state, action);
}
