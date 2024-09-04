import {createAction, props} from "@ngrx/store";
import {assignmentModel} from "./calender.model";


export const LOAD_ASSIGNMENT_SUCCESS='[assignment s page] load assignment success'
export const LOAD_ASSIGNMENT_FAIL='[assignment s page] load assignment fail'
export const LOAD_ASSIGNMENT='[assignment s page] get assignment'
export const UPDATE_ASSIGNMENT='[assignment s page] update assignment'
export const UPDATE_ASSIGNMENT_SUCCESS='[assignment s page] update assignment success'


export const loadAssignment=createAction(LOAD_ASSIGNMENT, props<{date:string}>());
export const loadAssignmentSuccess=createAction(LOAD_ASSIGNMENT_SUCCESS, props<{assignment:assignmentModel[]}>())
export const loadAssignmentFail=createAction(LOAD_ASSIGNMENT_FAIL, props<{errorText:any}>())


export const updateAssignment=createAction(UPDATE_ASSIGNMENT, props<{assignmentInput:assignmentModel}>())
export const updateAssignmentSuccess=createAction(UPDATE_ASSIGNMENT_SUCCESS, props<{assignmentNew:assignmentModel, assignmentOld:assignmentModel}>())
