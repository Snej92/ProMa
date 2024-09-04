
export interface selectedMonth{
  month:string,
  value:number
}

export interface assignmentModel{
  id:number,
  projectId:number,
  projectAcronym:string,
  userId:number,
  userAcronym:string,
  date:string,
  color:string
}

export interface assignment {
  assignmentList:assignmentModel[],
  errorMessage:string
}
