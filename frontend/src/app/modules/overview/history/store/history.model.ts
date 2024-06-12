
export interface historyModel {
  id : number,
  date : string,
  item : string,
  userAcronym : string,
  filename : string
}

export interface history {
  historyList : historyModel[],
  errormessage : string
}
