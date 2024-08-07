import {documentationModel} from "../../overview/documentation/store/documentation.model";
import {controlModel} from "../../overview/control/store/control.model";
import {headerDataModel} from "../../overview/headerData/store/headerData.model";
import {specificationModel} from "../../overview/specification/store/specification.model";
import {projectionModel} from "../../overview/projection/store/projection.model";
import {technicalDataModel} from "../../overview/technicalData/store/technicalData.model";

export interface stationOverallViewModel {
  id:number,
  name:string,
  description:string,
  issuer:string,
  status:string,
  version:string,
  totalProgress:number,
  //LOP
  lopTotal:number,
  lopDone:number,
  lopToDo:number,
  lopProgress:number,
  //Documentation
  documentationTotal:number,
  documentationDone:number,
  documentationToDo:number,
  documentationProgress:number,
  //Specification
  specificationTotal:number,
  specificationDone:number,
  specificationToDo:number,
  specificationProgress:number,
  //Control
  controlTotal:number,
  controlDone:number,
  controlToDo:number,
  controlProgress:number,
  //Projection
  projectionTotal:number,
  projectionDone:number,
  projectionToDo:number,
  projectionProgress:number,

  documentation:documentationModel[],
  control:controlModel[],
  headerData:headerDataModel[],
  specification:specificationModel[],
  projection:projectionModel[],
  technicalData:technicalDataModel[]
}

export interface stationOverallView{
  stationOverallViewList:stationOverallViewModel[],
  errorMessage:string,
}
