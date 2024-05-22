export enum LopStatus{
  INARBEIT = 'OFFEN',
  ERLEDIGT = 'INARBEIT',
  OFFEN = 'ERLEDIGT'
}

export interface lopModel {
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
