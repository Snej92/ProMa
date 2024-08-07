
export interface historyModel {
  id : number,
  date : string,
  item : string,
  userAcronym : string,
  filename : string,
  fileTransfer : boolean,
  transferType : number,
  eplan : boolean
}

export interface history {
  historyList : historyModel[],
  errorMessage : string
}
