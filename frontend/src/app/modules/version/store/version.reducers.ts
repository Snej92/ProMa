import {createReducer, on} from "@ngrx/store";
import {versionState} from "./version.state";
import {addVersion, deleteVersion, getVersion, updateVersion} from "./version.actions";
import {versionModel} from "./version.model";


const _versionReducer = createReducer(
  versionState,

  on(getVersion, (state) => {
    return{
      ...state
    };
  }),

  on(addVersion, (state, action) => {
    const _version={...action.versionInput}
    _version.id=state.versionList.length+1;
    return{
      ...state,
      versionList:[...state.versionList, _version],
    };
  }),

  on(updateVersion, (state, action) => {
    const _version={...action.versionInput}
    const updatedVersion=state.versionList.map(version=>{
      return _version.id===version.id?_version:version;
    });
    return{
      ...state,
      versionList:updatedVersion
    };
  }),

  on(deleteVersion, (state, action) => {
    const updatedVersion=state.versionList.filter((data:versionModel)=>{
      return data.id !== action.id
    })
    return{
      ...state,
      versionList:updatedVersion
    };
  }),
);

export function versionReducer(state: any , action: any) {
  return _versionReducer(state, action);
}
