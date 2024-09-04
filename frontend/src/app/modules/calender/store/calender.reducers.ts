import {createReducer, on} from "@ngrx/store";
import {calenderState} from "./calender.state";
import {loadAssignment, loadAssignmentFail, loadAssignmentSuccess, updateAssignmentSuccess} from "./calender.actions";
import {updateVersionSuccess} from "../../settings/version/store/version.actions";



const _assignmentReducer = createReducer(
  calenderState,

  on(loadAssignment, (state) => {
    return{
      ...state
    };
  }),

  on(loadAssignmentSuccess, (state,action) => {
    return{
      ...state,
      assignmentList:[...action.assignment],
      errorMessage:''
    };
  }),

  on(loadAssignmentFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      assignmentList:[],
      errorMessage:action.errorText.message
    };
  }),

  // on(updateAssignmentSuccess, (state,action) => {
  //   const _Assignment={...action.assignmentInput};
  //   const updatedAssignment=state.assignmentList.map(Assignment=>{
  //     return _Assignment.id===Assignment.id?_Assignment:Assignment;
  //   });
  //   return{
  //     ...state,
  //     assignmentList:updatedAssignment
  //   };
  // }),

  on(updateAssignmentSuccess, (state,action) => {
    const assignmentOld={...action.assignmentOld};
    const assignmentNew={...action.assignmentNew};
    const updatedAssignment=state.assignmentList.map(version=>{
      return assignmentOld.id===version.id?assignmentNew:version;
    });
    return{
      ...state,
      assignmentList:updatedAssignment
    };
  }),
);

export function assignmentReducer(state: any , action: any) {
  return _assignmentReducer(state, action);
}
