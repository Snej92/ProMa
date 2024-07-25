import {createReducer, on} from "@ngrx/store";
import {
  loadStationHeaderData,
  loadStationHeaderDataFail,
  loadStationHeaderDataSuccess
} from "./headerData.actions";
import {headerDataState} from "./headerData.state";
import {updateStationHeaderDataSuccess} from "../../headerData/store/headerData.actions";

const _headerDataReducer = createReducer(
  headerDataState,

  on(loadStationHeaderData, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationHeaderDataSuccess, (state,action) => {
    return{
      ...state,
      headerDataList:[...action.headerDataList],
      errorMessage:''
    };
  }),

  on(loadStationHeaderDataFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      headerDataList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateStationHeaderDataSuccess, (state,action) => {
    const _headerData={...action.headerDataStationInput};
    const updatedHeaderData=state.headerDataList.map(headerData=>{
      return _headerData.id===headerData.id?_headerData:headerData;
    });
    return{
      ...state,
      headerDataList:updatedHeaderData
    };
  }),
);

export function headerDataReducer(state: any , action: any) {
  return _headerDataReducer(state, action);
}
