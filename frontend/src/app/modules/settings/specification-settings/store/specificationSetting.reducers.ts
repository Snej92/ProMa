import {createReducer, on} from "@ngrx/store";
import {
  addSettingSpecificationSuccess,
  deleteSettingSpecification,
  loadSettingSpecification,
  loadSettingSpecificationFail,
  loadSettingSpecificationSuccess,
  updateSettingSpecificationSuccess
} from "./specificationSetting.actions";
import {specificationSettingModel} from "./specificationSetting.model";
import {specificationSettingState} from "./specificationSetting.state";


const _specificationSettingReducer = createReducer(
  specificationSettingState,

  on(loadSettingSpecification, (state) => {
    return{
      ...state
    };
  }),

  on(loadSettingSpecificationSuccess, (state,action) => {
    return{
      ...state,
      specificationSettingList:[...action.specificationSettingList],
      errorMessage:''
    };
  }),

  on(loadSettingSpecificationFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      specificationSettingList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(updateSettingSpecificationSuccess, (state,action) => {
    const _specificationSetting={...action.specificationSettingInput};
    const updatedSettingSpecification=state.specificationSettingList.map(specificationSetting=>{
      return _specificationSetting.id===specificationSetting.id?_specificationSetting:specificationSetting;
    });
    return{
      ...state,
      specificationSettingList:updatedSettingSpecification
    };
  }),

  on(deleteSettingSpecification, (state,action) => {
    const updatedSettingSpecification=state.specificationSettingList.filter((data:specificationSettingModel)=>{
      return data.id!==action.id
    });
    return{
      ...state,
      specificationSettingList:updatedSettingSpecification
    };
  }),

  on(addSettingSpecificationSuccess, (state,action) => {
    const specification={...action.specificationSettingInput};
    return{
      ...state,
      specificationSettingList:[...state.specificationSettingList,specification]
    };
  }),

);

export function specificationSettingReducer(state: any , action: any) {
  return _specificationSettingReducer(state, action);
}
