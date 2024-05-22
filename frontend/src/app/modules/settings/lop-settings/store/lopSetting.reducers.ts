import {createReducer, on} from "@ngrx/store";
import {
  addSettingLopSuccess,
  deleteSettingLop,
  loadSettingLop,
  loadSettingLopFail,
  loadSettingLopSuccess,
  updateSettingLopSuccess
} from "./lopSetting.actions";
import {lopSettingModel} from "./lopSetting.model";
import {lopSettingState} from "./lopSetting.state";


const _lopSettingReducer = createReducer(
  lopSettingState,

  on(loadSettingLop, (state) => {
    return{
      ...state
    };
  }),

  on(loadSettingLopSuccess, (state,action) => {
    return{
      ...state,
      lopSettingList:[...action.lopSettingList],
      errorMessage:''
    };
  }),

  on(loadSettingLopFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      lopSettingList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateSettingLopSuccess, (state,action) => {
    const _lopSetting={...action.lopSettingInput};
    const updatedSettingLop=state.lopSettingList.map(lopSetting=>{
      return _lopSetting.id===lopSetting.id?_lopSetting:lopSetting;
    });
    return{
      ...state,
      lopSettingList:updatedSettingLop
    };
  }),

  on(deleteSettingLop, (state,action) => {
    const updatedSettingLop=state.lopSettingList.filter((data:lopSettingModel)=>{
      return data.id!==action.id
    });
    return{
      ...state,
      lopSettingList:updatedSettingLop
    };
  }),

  on(addSettingLopSuccess, (state,action) => {
    const lop={...action.lopSettingInput};
    return{
      ...state,
      lopSettingList:[...state.lopSettingList,lop]
    };
  }),

);

export function lopSettingReducer(state: any , action: any) {
  return _lopSettingReducer(state, action);
}
