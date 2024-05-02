import {createReducer, on} from "@ngrx/store";
import {lopState} from "./lop.state";
import {addLop, addLopSuccess, loadLop, loadLopFail, loadLopSuccess, updateLop} from "./lop.actions";


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

  on(updateLop, (state,action) => {
    const _lop={...action.lopInput};
    const updatedLop=state.lopList.map(lop=>{
      return _lop.id===lop.id?_lop:lop;
    })
    return{
      ...state,
      lopList:updatedLop
    };
  }),

  on(addLopSuccess, (state,action) => {
    const lop={...action.lopInput};
    return{
      ...state,
      lopList:[...state.lopList,lop],
    };
  }),
);

export function lopReducer(state: any , action: any) {
  return _lopReducer(state, action);
}
