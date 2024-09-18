import {createReducer, on} from "@ngrx/store";
import {
  addSettingControlSuccess,
  deleteSettingControl,
  loadSettingControl,
  loadSettingControlFail,
  loadSettingControlSuccess,
  updateSettingControlSuccess, updateSettingControlWebsocket
} from "./controlSetting.actions";
import {controlSettingModel} from "./controlSetting.model";
import {controlSettingState} from "./controlSetting.state";


const _controlSettingReducer = createReducer(
  controlSettingState,

  on(loadSettingControl, (state) => {
    return{
      ...state
    };
  }),

  on(loadSettingControlSuccess, (state,action) => {
    return{
      ...state,
      controlSettingList:[...action.controlSettingList],
      errorMessage:''
    };
  }),

  on(loadSettingControlFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      controlSettingList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateSettingControlSuccess, (state,action) => {
    const _controlSetting={...action.controlSettingInput};
    const updatedSettingControl=state.controlSettingList.map(controlSetting=>{
      return _controlSetting.id===controlSetting.id?_controlSetting:controlSetting;
    });
    return{
      ...state,
      controlSettingList:updatedSettingControl
    };
  }),

  on(deleteSettingControl, (state,action) => {
    const updatedSettingControl=state.controlSettingList.filter((data:controlSettingModel)=>{
      return data.id!==action.id
    });
    return{
      ...state,
      controlSettingList:updatedSettingControl
    };
  }),

  on(addSettingControlSuccess, (state,action) => {
    const control={...action.controlSettingInput};
    return{
      ...state,
      controlSettingList:[...state.controlSettingList,control]
    };
  }),

  //Websocket
  on(updateSettingControlWebsocket, (state,action) => {
    return{
      ...state,
      controlSettingList:[...action.controlSettingList],
      errorMessage:''
    };
  }),

);

export function controlSettingReducer(state: any , action: any) {
  return _controlSettingReducer(state, action);
}
