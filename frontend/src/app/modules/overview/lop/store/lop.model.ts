export enum lopStatus{
  INARBEIT = 'INARBEIT',
  ERLEDIGT = 'ERLEDIGT',
  OFFEN = 'OFFEN'
}

export interface lopModel{
  id : number,
  startDate : string,
  endDate : string,
  item : string,
  status : string,
  userAcronym : string
}

export interface lop{
  lopList:lopModel[],
  errorMessage:string
}
