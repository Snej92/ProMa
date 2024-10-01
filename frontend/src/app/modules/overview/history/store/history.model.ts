
export interface historyModel {
  id : number,
  date : string,
  item : string,
  userAcronym : string,
  filename : string,
  fileTransfer : boolean,
  transferType : number,
  eplan : boolean,
  eplanCopy : boolean,

  //update
  updated : boolean,
  updateDate : string,
  updateItem : string,
  updateUserAcronym : string,
  updateFilename : string,
  updateFileTransfer : boolean,
  updateTransferType : number,
  updateEplan : boolean,
  updateEplanCopy : boolean,
}

export interface history {
  historyList : historyModel[],
  errorMessage : string
}
