import {createReducer, on} from "@ngrx/store";
import {
  loadStationProjection,
  loadStationProjectionFail,
  loadStationProjectionSuccess, updateStationProjectionSuccess
} from "./projection.actions";
import {projectionState} from "./projection.state";

const _projectionReducer = createReducer(
  projectionState,

  on(loadStationProjection, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationProjectionSuccess, (state,action) => {
    return{
      ...state,
      projectionList:[...action.projectionList],
      errorMessage:''
    };
  }),

  on(loadStationProjectionFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      projectionList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateStationProjectionSuccess, (state,action) => {
    const _projection={...action.projectionStationInput};
    const updatedProjection=state.projectionList.map(projection=>{
      return _projection.id===projection.id?_projection:projection;
    });
    return{
      ...state,
      projectionList:updatedProjection
    };
  }),
);

export function projectionReducer(state: any , action: any) {
  return _projectionReducer(state, action);
}
