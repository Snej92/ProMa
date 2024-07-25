import {createReducer, on} from "@ngrx/store";
import {
  addSettingHeaderDataSuccess,
  deleteSettingHeaderData,
  loadSettingHeaderData,
  loadSettingHeaderDataFail,
  loadSettingHeaderDataSuccess,
  updateSettingHeaderDataSuccess
} from "./headerDataSetting.actions";
import {headerDataSettingModel} from "./headerDataSetting.model";
import {headerDataSettingState} from "./headerDataSetting.state";


const _headerDataSettingReducer = createReducer(
  headerDataSettingState,

  on(loadSettingHeaderData, (state) => {
    return{
      ...state
    };
  }),

  on(loadSettingHeaderDataSuccess, (state,action) => {
    return{
      ...state,
      headerDataSettingList:[...action.headerDataSettingList],
      errorMessage:''
    };
  }),

  on(loadSettingHeaderDataFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      headerDataSettingList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateSettingHeaderDataSuccess, (state,action) => {
    const _headerDataSetting={...action.headerDataSettingInput};
    const updatedSettingHeaderData=state.headerDataSettingList.map(headerDataSetting=>{
      return _headerDataSetting.id===headerDataSetting.id?_headerDataSetting:headerDataSetting;
    });
    return{
      ...state,
      headerDataSettingList:updatedSettingHeaderData
    };
  }),

  on(deleteSettingHeaderData, (state,action) => {
    const updatedSettingHeaderData=state.headerDataSettingList.filter((data:headerDataSettingModel)=>{
      return data.id!==action.id
    });
    return{
      ...state,
      headerDataSettingList:updatedSettingHeaderData
    };
  }),

  on(addSettingHeaderDataSuccess, (state,action) => {
    const headerData={...action.headerDataSettingInput};
    return{
      ...state,
      headerDataSettingList:[...state.headerDataSettingList,headerData]
    };
  }),

);

export function headerDataSettingReducer(state: any , action: any) {
  return _headerDataSettingReducer(state, action);
}
