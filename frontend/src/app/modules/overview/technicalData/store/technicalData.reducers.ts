import {createReducer, on} from "@ngrx/store";
import {
  loadStationTechnicalData,
  loadStationTechnicalDataFail,
  loadStationTechnicalDataSuccess
} from "./technicalData.actions";
import {technicalDataState} from "./technicalData.state";
import {updateStationTechnicalDataSuccess} from "../../technicalData/store/technicalData.actions";

const _technicalDataReducer = createReducer(
  technicalDataState,

  on(loadStationTechnicalData, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationTechnicalDataSuccess, (state,action) => {
    return{
      ...state,
      technicalDataList:[...action.technicalDataList],
      errorMessage:''
    };
  }),

  on(loadStationTechnicalDataFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      technicalDataList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateStationTechnicalDataSuccess, (state,action) => {
    const _technicalData={...action.technicalDataStationInput};
    const updatedTechnicalData=state.technicalDataList.map(technicalData=>{
      return _technicalData.id===technicalData.id?_technicalData:technicalData;
    });
    return{
      ...state,
      technicalDataList:updatedTechnicalData
    };
  }),
);

export function technicalDataReducer(state: any , action: any) {
  return _technicalDataReducer(state, action);
}
