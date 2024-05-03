import {createReducer, on} from "@ngrx/store";
import {lopState} from "./lop.state";
import {
  addLop,
  addLopSuccess,
  deleteLop,
  loadLop,
  loadLopFail,
  loadLopSuccess, loadSpinner,
  updateLop,
  updateLopSuccess
} from "./lop.actions";
import {lopModel} from "./lop.model";


const _lopReducer = createReducer(
  lopState,

  on(loadLop, (state) => {
    return{
      ...state,
      isLoading:false
    };
  }),

  on(loadLopSuccess, (state,action) => {
    return{
      ...state,
      lopList:[...action.lopList],
      errorMessage:'',
      isLoading:false
    };
  }),

  on(loadLopFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      lopList:[],
      errorMessage:action.errorText.message,
      isLoading:false
    };
  }),

  on(updateLopSuccess, (state,action) => {
    const _lop={...action.lopInput};
    const updatedLop=state.lopList.map(lop=>{
      return _lop.id===lop.id?_lop:lop;
    });
    return{
      ...state,
      lopList:updatedLop,
      isLoading:false
    };
  }),

  on(deleteLop, (state,action) => {
    const updatedLop=state.lopList.filter((data:lopModel)=>{
      return data.id!==action.id
    });
    return{
      ...state,
      lopList:updatedLop,
      isLoading:false
    };
  }),

  on(addLopSuccess, (state,action) => {
    const lop={...action.lopInput};
    return{
      ...state,
      lopList:[...state.lopList,lop],
      isLoading:false
    };
  }),

  on(loadSpinner, (state,action) => {
    return{
      ...state,
      isLoading:action.isLoading,
    };
  }),
);

export function lopReducer(state: any , action: any) {
  return _lopReducer(state, action);
}
