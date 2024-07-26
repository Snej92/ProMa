export interface versionStationModel{
  id : number,
  stationName : string,
  done : boolean,
}

export interface versionModel{
  id : number,
  date : string,
  version : string,
  toDo : string,
  done : boolean,
  versionStation : versionStationModel[]
}


export interface versions{
  versionList:versionModel[]
  errorMessage:string,
}
