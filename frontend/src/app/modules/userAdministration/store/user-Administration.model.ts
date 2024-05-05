export interface userRole {
  id : number,
  admin : boolean,
  project : boolean,
  user : boolean
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
  role : userRole
}

export interface user{
  userList:userModel[],
  errorMessage:string
}
