import {createReducer, on} from "@ngrx/store";
import {
  loadStationSpecification,
  loadStationSpecificationFail,
  loadStationSpecificationSuccess, updateStationSpecificationSuccess
} from "./specification.actions";
import {specificationState} from "./specification.state";

const _specificationReducer = createReducer(
  specificationState,

  on(loadStationSpecification, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationSpecificationSuccess, (state,action) => {
    return{
      ...state,
      specificationList:[...action.specificationList],
      errorMessage:''
    };
  }),

  on(loadStationSpecificationFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      specificationList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateStationSpecificationSuccess, (state,action) => {
    const _specification={...action.specificationStationInput};
    const updatedSpecification=state.specificationList.map(specification=>{
      return _specification.id===specification.id?_specification:specification;
    });
    return{
      ...state,
      specificationList:updatedSpecification
    };
  }),
);

export function specificationReducer(state: any , action: any) {
  return _specificationReducer(state, action);
}
