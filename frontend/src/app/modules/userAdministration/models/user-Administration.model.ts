
export type role = {
  id : number,
  admin : boolean,
  project : boolean,
  user : boolean
}

export type user = {
  id : number,
  sub : string,
  firstname : string,
  lastname : string,
  acronym : string,
  email : string,
  phone : string,
  username : string,
  password : string,
  role : role
}
