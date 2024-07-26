import {createReducer, on} from "@ngrx/store";
import {lopState} from "./lop.state";
import {
  addLopSuccess,
  deleteLop,
  loadLop, loadLopFail, loadLopSuccess,
  updateLopSuccess
} from "./lop.actions";
import {lopModel} from "./lop.model";


const _lopReducer = createReducer(
  lopState,

  on(loadLop, (state) => {
    return{
      ...state
    };
  }),

  on(loadLopSuccess, (state,action) => {
    return{
      ...state,
      lopList:[...action.lopList],
      errorMessage:''
    };
  }),

  on(loadLopFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      lopList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateLopSuccess, (state,action) => {
    const lopOld = {...action.lopOld};
    const lopNew = {...action.lopNew};
    const updatedLop = state.lopList.map(lop => {
      return lopOld.id === lop.id?lopNew:lop;
    });
    return {
      ...state,
      lopList: updatedLop
    };
  }),

  on(deleteLop, (state,action) => {
    const updatedLop=state.lopList.filter((data:lopModel)=>{
      return data.id!==action.id
    });
    return{
      ...state,
      lopList:updatedLop
    };
  }),

  on(addLopSuccess, (state,action) => {
    const control={...action.lopInput};
    return{
      ...state,
      lopList:[...state.lopList,control]
    };
  }),
);

export function lopReducer(state: any , action: any) {
  return _lopReducer(state, action);
}
