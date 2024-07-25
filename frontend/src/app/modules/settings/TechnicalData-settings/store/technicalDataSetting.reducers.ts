import {createReducer, on} from "@ngrx/store";
import {
  addSettingTechnicalDataSuccess,
  deleteSettingTechnicalData,
  loadSettingTechnicalData,
  loadSettingTechnicalDataFail,
  loadSettingTechnicalDataSuccess,
  updateSettingTechnicalDataSuccess
} from "./technicalDataSetting.actions";
import {technicalDataSettingModel} from "./technicalDataSetting.model";
import {technicalDataSettingState} from "./technicalDataSetting.state";


const _technicalDataSettingReducer = createReducer(
  technicalDataSettingState,

  on(loadSettingTechnicalData, (state) => {
    return{
      ...state
    };
  }),

  on(loadSettingTechnicalDataSuccess, (state,action) => {
    return{
      ...state,
      technicalDataSettingList:[...action.technicalDataSettingList],
      errorMessage:''
    };
  }),

  on(loadSettingTechnicalDataFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      technicalDataSettingList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateSettingTechnicalDataSuccess, (state,action) => {
    const _technicalDataSetting={...action.technicalDataSettingInput};
    const updatedSettingTechnicalData=state.technicalDataSettingList.map(technicalDataSetting=>{
      return _technicalDataSetting.id===technicalDataSetting.id?_technicalDataSetting:technicalDataSetting;
    });
    return{
      ...state,
      technicalDataSettingList:updatedSettingTechnicalData
    };
  }),

  on(deleteSettingTechnicalData, (state,action) => {
    const updatedSettingTechnicalData=state.technicalDataSettingList.filter((data:technicalDataSettingModel)=>{
      return data.id!==action.id
    });
    return{
      ...state,
      technicalDataSettingList:updatedSettingTechnicalData
    };
  }),

  on(addSettingTechnicalDataSuccess, (state,action) => {
    const technicalData={...action.technicalDataSettingInput};
    return{
      ...state,
      technicalDataSettingList:[...state.technicalDataSettingList,technicalData]
    };
  }),

);

export function technicalDataSettingReducer(state: any , action: any) {
  return _technicalDataSettingReducer(state, action);
}
