

export interface versionStationModel{
  id : number,
  stationName : string,
  state : number,
}

export interface editVersionTemp{
  version:versionModel,
  isEdit:boolean
}

export interface editVersionModel {
  id: number;
  date: string;
  version: string;
  toDo: string;
  done: boolean;
  versionStation: { [key: string]: versionStationModel };
}

export interface editVersion{
  version:editVersionModel,
  isEdit:boolean
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
