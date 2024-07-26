import {createReducer, on} from "@ngrx/store";
import {
  loadStationDocumentation,
  loadStationDocumentationFail,
  loadStationDocumentationSuccess, updateStationDocumentationSuccess
} from "./documentation.actions";
import {documentationState} from "./documentation.state";

const _documentationReducer = createReducer(
  documentationState,

  on(loadStationDocumentation, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationDocumentationSuccess, (state,action) => {
    return{
      ...state,
      documentationList:[...action.documentationList],
      errorMessage:''
    };
  }),

  on(loadStationDocumentationFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      documentationList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateStationDocumentationSuccess, (state,action) => {
    const documentationOld = {...action.documentationOld};
    const documentationNew = {...action.documentationNew};
    const updatedDocumentation = state.documentationList.map(documentation => {
      return documentationOld.id === documentation.id?documentationNew:documentation;
    });
    return {
      ...state,
      documentationList: updatedDocumentation
    };
  }),
);

export function documentationReducer(state: any , action: any) {
  return _documentationReducer(state, action);
}
