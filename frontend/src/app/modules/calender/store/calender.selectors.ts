import {createFeatureSelector, createSelector} from "@ngrx/store";
import {assignment, assignmentModel} from "./calender.model";



const getAssignmentState=createFeatureSelector<assignment>('assignment')

export const getAssignment=createSelector(getAssignmentState,(state)=>{
  return state.assignmentList;
});

export const getAssignmentInfo=createSelector(getAssignmentState,(state)=>{
  return state;
});

export const getAssignmentById = (assignmentId:number) =>
  createSelector(getAssignmentState,(state)=>{
  return state.assignmentList.find((assignment:assignmentModel)=>
    assignment.id===assignmentId
  ) as assignmentModel;
});

export const getAssignmentByUserIdAndDate=(userId:number, date:string) =>
  createSelector(getAssignmentState, (state)=>{
  return state.assignmentList.find((assignment:assignmentModel) =>
  assignment.userId===userId && assignment.date === date
  ) as assignmentModel
})
