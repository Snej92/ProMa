import {createReducer, on} from "@ngrx/store";
import {
  addSettingProjectionSuccess,
  deleteSettingProjection,
  loadSettingProjection,
  loadSettingProjectionFail,
  loadSettingProjectionSuccess,
  updateSettingProjectionSuccess
} from "./projectionSetting.actions";
import {projectionSettingModel} from "./projectionSetting.model";
import {projectionSettingState} from "./projectionSetting.state";


const _projectionSettingReducer = createReducer(
  projectionSettingState,

  on(loadSettingProjection, (state) => {
    return{
      ...state
    };
  }),

  on(loadSettingProjectionSuccess, (state,action) => {
    return{
      ...state,
      projectionSettingList:[...action.projectionSettingList],
      errorMessage:''
    };
  }),

  on(loadSettingProjectionFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      projectionSettingList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateSettingProjectionSuccess, (state,action) => {
    const _projectionSetting={...action.projectionSettingInput};
    const updatedSettingProjection=state.projectionSettingList.map(projectionSetting=>{
      return _projectionSetting.id===projectionSetting.id?_projectionSetting:projectionSetting;
    });
    return{
      ...state,
      projectionSettingList:updatedSettingProjection
    };
  }),

  on(deleteSettingProjection, (state,action) => {
    const updatedSettingProjection=state.projectionSettingList.filter((data:projectionSettingModel)=>{
      return data.id!==action.id
    });
    return{
      ...state,
      projectionSettingList:updatedSettingProjection
    };
  }),

  on(addSettingProjectionSuccess, (state,action) => {
    const projection={...action.projectionSettingInput};
    return{
      ...state,
      projectionSettingList:[...state.projectionSettingList,projection]
    };
  }),

);

export function projectionSettingReducer(state: any , action: any) {
  return _projectionSettingReducer(state, action);
}
