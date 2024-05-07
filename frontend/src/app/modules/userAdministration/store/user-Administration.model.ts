export interface userRole {
  id : number,
  adminRole : boolean,
  projectRole : boolean,
  userRole : boolean
}

export interface userModel{
  id : number,
  activeProject: number,
  sub : string,
  firstname : string,
  lastname : string,
  acronym : string,
  email : string,
  phone : string,
  username : string,
  password : string,
  roles : userRole
}

export interface user{
  userList:userModel[],
  errorMessage:string
}
