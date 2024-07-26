import {createReducer, on} from "@ngrx/store";
import {versionState} from "./version.state";
import {
  addVersionSuccess,
  deleteVersion,
  loadVersion,
  loadVersionFail,
  loadVersionSuccess, loadVersionSuccess2,
  updateVersionSuccess
} from "./version.actions";
import {versionModel} from "./version.model";




const _versionReducer = createReducer(
  versionState,

  on(loadVersion, (state) => {
    return{
      ...state
    };
  }),

  on(loadVersionSuccess, (state,action) => {
    return{
      ...state,
      versionList:[...action.versionList],
      errorMessage:''
    };
  }),

  on(loadVersionFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      versionList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(addVersionSuccess, (state,action) => {
    const version={...action.versionInput};
    return{
      ...state,
      versionList:[...state.versionList,version]
    };
  }),

  on(updateVersionSuccess, (state,action) => {
    const versionOld={...action.versionOld};
    const versionNew={...action.versionNew};
    const updatedVersion=state.versionList.map(version=>{
      return versionOld.id===version.id?versionNew:version;
    });
    return{
      ...state,
      versionList:updatedVersion
    };
  }),

  on(deleteVersion, (state,action) => {
    const updatedVersion=state.versionList.filter((data:versionModel)=>{
      return data.id!==action.id
    });
    return{
      ...state,
      versionList:updatedVersion
    };
  }),
);

export function versionReducer(state: any , action: any) {
  return _versionReducer(state, action);
}
