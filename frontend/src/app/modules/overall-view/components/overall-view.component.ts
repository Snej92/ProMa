import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription, take} from "rxjs";
import {stationOverallView, stationOverallViewFilter} from "../store/stationOverallView.model";
import {loadSpinner} from "../../../core/store/app.action";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../core/store/appState.model";
import {getStationOverallViewInfo} from "../store/stationOverallView.selectors";
import {loadStationOverallView} from "../store/stationOverallView.actions";
import {getLoggedUserInfo} from "../../../core/logged-user/logged-user.selectors";
import {loggedUser} from "../../../core/logged-user/logged-user.model";
import {MatOption} from "@angular/material/select";
import {Router} from "@angular/router";

@Component({
  selector: 'app-overall-view',
  templateUrl: './overall-view.component.html',
  styleUrl: './overall-view.component.scss'
})
export class OverallViewComponent implements OnInit, OnDestroy{
  @Output() selectedOverviewEmitted = new EventEmitter<number>();

  loggedUser!:loggedUser;
  private subscriptions: Subscription[] = [];
  stationOverallView!:stationOverallView;
  generalColumns: String[] = ['general', 'headerData', 'specification', 'projection', 'control', 'docu', 'technicalData'];

  displayedColumns: String[] = ['Station', 'Bearbeiter', 'Status', 'Version', 'Gesamtfortschritt', 'LOPfortschritt'];
  headerDataColumns: String[] = [];
  specificationColumns: String[] = [];
  projectionColumns: String[] = [];
  documentationColumns: String[] = [];
  controlColumns: String[] = [];
  technicalDataColumns: String[] = [];

  //Filter for columns
  showHeaderData : boolean = true;
  showSpecification : boolean = true;
  showProjection : boolean = true;
  showDocumentation : boolean = true;
  showControl : boolean = true;
  showTechnicalData : boolean = true;
  //selected
  selectedHeaderData: String[] = [];
  selectedSpecification: String[] = [];
  selectedProjection: String[] = [];
  selectedControl: String[] = [];
  selectedDocumentation: String[] = [];
  selectedTechnicalData: String[] = [];

  //Filter for rows options
  stationNames : String[] = [];
  issuerNames : String[] = [];
  status : String [] = ["AUSGELAGERT", "EINGELAGERT", "INARBEIT"];
  versions : String [] = []

  //selected
  selectedStationNames : String[] = [];
  selectedIssuerNames : String[] = [];
  selectedStatus : String [] = [];
  selectedVersions : String [] = []
  selectedMinTotalProgress : number = 0;
  selectedMaxTotalProgress : number = 100;
  selectedMinLopProgress : number = 0;
  selectedMaxLopProgress : number = 100;

  stationOverallViewFilter : stationOverallViewFilter = {
    name: [],
    issuerName: [],
    status: [],
    version : [],

    minTotalProgress : 0,
    maxTotalProgress : 100,
    minLopProgress : 0,
    maxLopProgress : 100
  };


  constructor(private store:Store<AppStateModel>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.showHeaderData = localStorage.getItem('showHeaderData') === 'true';
    this.showSpecification = localStorage.getItem('showSpecification') === 'true';
    this.showProjection = localStorage.getItem('showProjection') === 'true';
    this.showDocumentation = localStorage.getItem('showDocumentation') === 'true';
    this.showControl = localStorage.getItem('showControl') === 'true';
    this.showTechnicalData = localStorage.getItem('showTechnicalData') === 'true';

    this.loadStationOverallView();

    this.initSelects();
  }

  //region loadStationOverallView
  loadStationOverallView(){
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.subscriptions.push(
      this.store.select(getLoggedUserInfo).pipe()
        .subscribe(data =>{
          this.loggedUser=data;
        })
    )
    this.store.dispatch(loadStationOverallView({stationOverallViewFilter:this.stationOverallViewFilter}))
    this.subscriptions.push(
      this.store.select(getStationOverallViewInfo).pipe()
        .subscribe(data =>{
          this.stationOverallView=data;

          this.initFilter();
          this.initTableColumns();
          this.initProgress();

          if(this.stationOverallView?.stationOverallViewList?.length){
            this.subscriptions.forEach(sub => sub.unsubscribe());
          }
        })
    )
  }
  //endregion

  initFilter(){
    this.stationNames = [];
    this.issuerNames = [];
    this.versions = [];

    for(let station of this.stationOverallView.stationOverallViewList){
      if(!this.stationNames.includes(station.name)){
        this.stationNames.push(station.name)
      }

      if(!this.issuerNames.includes(station.issuerName)){
        this.issuerNames.push(station.issuerName)
      }

      if(!this.versions.includes(station.version)){
        this.versions.push(station.version)
      }
    }
  }

  initTableColumns(){
    //Init Column Headers
    this.headerDataColumns = [];
    this.specificationColumns = [];
    this.projectionColumns = [];
    this.controlColumns = [];
    this.documentationColumns = [];
    this.technicalDataColumns = [];

    this.displayedColumns = ['Station', 'Bearbeiter', 'Status', 'Version', 'Gesamtfortschritt', 'LOPfortschritt'];

    //HeaderData
    if(this.stationOverallView?.stationOverallViewList?.at(0)?.headerData !== undefined){
      const headerData = this.stationOverallView?.stationOverallViewList?.at(0)?.headerData!; // Assertion that it's not undefined
      for (let header of headerData) {
        this.headerDataColumns.push(header.headerDataSetting.item);
        this.displayedColumns.push(header.headerDataSetting.item);
      }
    }
    //Specification
    if(this.stationOverallView?.stationOverallViewList?.at(0)?.specification !== undefined){
      const specification = this.stationOverallView?.stationOverallViewList?.at(0)?.specification!; // Assertion that it's not undefined
      for (let specificationItem of specification) {
        this.specificationColumns.push(specificationItem.taskSetting.item);
        this.displayedColumns.push(specificationItem.taskSetting.item);
      }
    }

    //Projection
    if(this.stationOverallView?.stationOverallViewList?.at(0)?.projection !== undefined){
      const projection = this.stationOverallView?.stationOverallViewList?.at(0)?.projection!; // Assertion that it's not undefined
      for (let projectionItem of projection) {
        this.projectionColumns.push(projectionItem.taskSetting.item);
        this.displayedColumns.push(projectionItem.taskSetting.item);
      }
    }

    //Control
    if(this.stationOverallView?.stationOverallViewList?.at(0)?.control !== undefined){
      const control = this.stationOverallView?.stationOverallViewList?.at(0)?.control!; // Assertion that it's not undefined
      for (let controlItem of control) {
        this.controlColumns.push(controlItem.taskSetting.item);
        this.displayedColumns.push(controlItem.taskSetting.item);
      }
    }

    //Documentation
    if(this.stationOverallView?.stationOverallViewList?.at(0)?.documentation !== undefined){
      const documentation = this.stationOverallView?.stationOverallViewList?.at(0)?.documentation!; // Assertion that it's not undefined
      for (let documentationItem of documentation) {
        this.documentationColumns.push(documentationItem.taskSetting.item);
        this.displayedColumns.push(documentationItem.taskSetting.item);
      }
    }

    //Technical Data
    if(this.stationOverallView?.stationOverallViewList?.at(0)?.technicalData !== undefined){
      const technicalData = this.stationOverallView?.stationOverallViewList?.at(0)?.technicalData!; // Assertion that it's not undefined
      for (let technicalDataItem of technicalData) {
        this.technicalDataColumns.push(technicalDataItem.technicalDataSetting.item);
        this.displayedColumns.push(technicalDataItem.technicalDataSetting.item);
      }
    }
  }

  applyFilter(){
    this.stationOverallViewFilter = {
      name: [],
      issuerName: [],
      status: [],
      version : [],

      minTotalProgress : 0,
      maxTotalProgress : 100,
      minLopProgress : 0,
      maxLopProgress : 100
    };

    this.stationOverallViewFilter.name = [...this.selectedStationNames];
    this.stationOverallViewFilter.issuerName = [...this.selectedIssuerNames];
    this.stationOverallViewFilter.status = [...this.selectedStatus];
    this.stationOverallViewFilter.version = [...this.selectedVersions];

    this.stationOverallViewFilter.minTotalProgress = this.selectedMinTotalProgress;
    this.stationOverallViewFilter.maxTotalProgress = this.selectedMaxTotalProgress;
    this.stationOverallViewFilter.minLopProgress = this.selectedMinLopProgress;
    this.stationOverallViewFilter.maxLopProgress = this.selectedMaxLopProgress;

    this.stationOverallViewFilter.name = this.stationOverallViewFilter.name.filter(item => item !== "all");
    this.stationOverallViewFilter.issuerName = this.stationOverallViewFilter.issuerName.filter(item => item !== "all");
    this.stationOverallViewFilter.status = this.stationOverallViewFilter.status.filter(item => item !== "all");
    this.stationOverallViewFilter.version = this.stationOverallViewFilter.version.filter(item => item !== "all");

    console.log(this.stationOverallViewFilter)

    this.getFilteredStationOverallView();
  }

  getFilteredStationOverallView(){
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.subscriptions.push(
      this.store.select(getLoggedUserInfo).pipe()
        .subscribe(data =>{
          this.loggedUser=data;
        })
    )
    this.store.dispatch(loadStationOverallView({stationOverallViewFilter:this.stationOverallViewFilter}))
    this.subscriptions.push(
      this.store.select(getStationOverallViewInfo).pipe()
        .subscribe(data => {
          this.stationOverallView = data;
        }
        )
    );
  }

  toggleHeaderDataVisibility(){
    this.showHeaderData = !this.showHeaderData;
    localStorage.setItem('showHeaderData', this.showHeaderData.toString())
  }

  toggleSpecificationVisibility(){
    this.showSpecification = !this.showSpecification;
    localStorage.setItem('showSpecification', this.showSpecification.toString())
  }

  toggleProjectionVisibility(){
    this.showProjection = !this.showProjection;
    localStorage.setItem('showProjection', this.showProjection.toString())
  }

  toggleControlVisibility(){
    this.showControl = !this.showControl;
    localStorage.setItem('showControl', this.showControl.toString())
  }

  toggleDocumentationVisibility(){
    this.showDocumentation = !this.showDocumentation;
    localStorage.setItem('showDocumentation', this.showDocumentation.toString())
  }

  toggleTechnicalDataVisibility(){
    this.showTechnicalData = !this.showTechnicalData;
    localStorage.setItem('showTechnicalData', this.showTechnicalData.toString())
  }

  initSelects(){
    //Rows
    this.initSelectedStationNames()
    this.initSelectedIssuerNames()
    this.initSelectedStatus()
    this.initSelectedVersion()

    //Columns
    this.initSelectedHeaderData()
    this.initSelectedProjection()
    this.initSelectedSpecification()
    this.initSelectedControl()
    this.initSelectedDocumentation()
    this.initSelectedTechnicalData()
  }


  //Rows Filter
  //region Selected Station
  initSelectedStationNames(){
    const selectedStationNames = localStorage.getItem('selectedStationNames')
    if(selectedStationNames){
      try{
        this.selectedStationNames = JSON.parse(selectedStationNames);
      } catch(e){
        console.info('Error parsing JSON from localStorage for selectedStationNames')
        this.selectedStationNames = [];
      }
    }
  }

  onChangeSelectStationNames(event: any){
    if(event.value.includes('all')){
      if(this.isAllStationNamesSelected()){
        return;
      }
      this.selectedStationNames = this.selectedStationNames.filter(item => item !== 'all');
      this.updateLocalStorageSelectedStationNames();
      return;
    }
    this.updateLocalStorageSelectedStationNames();
  }

  toggleSelectAllStationNames(allSelected: MatOption){
    allSelected.select()
    if(this.isAllStationNamesSelected()){
      this.selectedStationNames = [];
      this.updateLocalStorageSelectedStationNames();
    } else {
      allSelected.select()
      this.selectedStationNames = this.stationNames.slice();
      this.selectedStationNames.push('all')
      this.updateLocalStorageSelectedStationNames();
    }
  }

  isAllStationNamesSelected(){
    return this.selectedStationNames.length > this.stationNames.length;
  }

  updateLocalStorageSelectedStationNames(){
    console.log(this.selectedStationNames);

    const selectedStationNamesString = JSON.stringify(this.selectedStationNames);
    localStorage.setItem('selectedStationNames',selectedStationNamesString)
  }

  isStationNamesColumnSelected(column: String): boolean {
    return this.selectedStationNames.includes(column);
  }
  //endregion

  //region Selected Issuer
  initSelectedIssuerNames(){
    const selectedIssuerNames = localStorage.getItem('selectedIssuerNames')
    if(selectedIssuerNames){
      try{
        this.selectedIssuerNames = JSON.parse(selectedIssuerNames);
      } catch(e){
        console.info('Error parsing JSON from localStorage for selectedIssuerNames')
        this.selectedIssuerNames = [];
      }
    }
  }

  onChangeSelectIssuerNames(event: any){
    if(event.value.includes('all')){
      if(this.isAllIssuerNamesSelected()){
        return;
      }
      this.selectedIssuerNames = this.selectedIssuerNames.filter(item => item !== 'all');
      this.updateLocalStorageSelectedIssuerNames();
      return;
    }
    this.updateLocalStorageSelectedIssuerNames();
  }

  toggleSelectAllIssuerNames(allSelected: MatOption){
    allSelected.select()
    if(this.isAllIssuerNamesSelected()){
      this.selectedIssuerNames = [];
      this.updateLocalStorageSelectedIssuerNames();
    } else {
      allSelected.select()
      this.selectedIssuerNames = this.issuerNames.slice();
      this.selectedIssuerNames.push('all')
      this.updateLocalStorageSelectedIssuerNames();
    }
  }

  isAllIssuerNamesSelected(){
    return this.selectedIssuerNames.length > this.issuerNames.length;
  }

  updateLocalStorageSelectedIssuerNames(){
    console.log(this.selectedIssuerNames);

    const selectedIssuerNamesString = JSON.stringify(this.selectedIssuerNames);
    localStorage.setItem('selectedIssuerNames',selectedIssuerNamesString)
  }

  isIssuerNamesColumnSelected(column: String): boolean {
    return this.selectedIssuerNames.includes(column);
  }
  //endregion

  //region Selected Status
  initSelectedStatus(){
    const selectedStatus = localStorage.getItem('selectedStatus')
    if(selectedStatus){
      try{
        this.selectedStatus = JSON.parse(selectedStatus);
      } catch(e){
        console.info('Error parsing JSON from localStorage for selectedStatus')
        this.selectedStatus = [];
      }
    }
  }

  onChangeSelectStatus(event: any){
    if(event.value.includes('all')){
      if(this.isAllStatusSelected()){
        return;
      }
      this.selectedStatus = this.selectedStatus.filter(item => item !== 'all');
      this.updateLocalStorageSelectedStatus();
      return;
    }
    this.updateLocalStorageSelectedStatus();
  }

  toggleSelectAllStatus(allSelected: MatOption){
    allSelected.select()
    if(this.isAllStatusSelected()){
      this.selectedStatus = [];
      this.updateLocalStorageSelectedStatus();
    } else {
      allSelected.select()
      this.selectedStatus = this.status.slice();
      this.selectedStatus.push('all')
      this.updateLocalStorageSelectedStatus();
    }
  }

  isAllStatusSelected(){
    return this.selectedStatus.length > this.status.length;
  }

  updateLocalStorageSelectedStatus(){
    console.log(this.selectedStatus);

    const selectedStatusString = JSON.stringify(this.selectedStatus);
    localStorage.setItem('selectedStatus',selectedStatusString)
  }

  isStatusColumnSelected(column: String): boolean {
    return this.selectedStatus.includes(column);
  }
  //endregion

  //region Selected Version
  initSelectedVersion(){
    const selectedVersion = localStorage.getItem('selectedVersion')
    if(selectedVersion){
      try{
        this.selectedVersions = JSON.parse(selectedVersion);
      } catch(e){
        console.info('Error parsing JSON from localStorage for selectedVersion')
        this.selectedVersions = [];
      }
    }
  }

  onChangeSelectVersion(event: any){
    if(event.value.includes('all')){
      if(this.isAllVersionsSelected()){
        return;
      }
      this.selectedVersions = this.selectedVersions.filter(item => item !== 'all');
      this.updateLocalStorageSelectedVersion();
      return;
    }
    this.updateLocalStorageSelectedVersion();
  }

  toggleSelectAllVersions(allSelected: MatOption){
    allSelected.select()
    if(this.isAllVersionsSelected()){
      this.selectedVersions = [];
      this.updateLocalStorageSelectedVersion();
    } else {
      allSelected.select()
      this.selectedVersions = this.versions.slice();
      this.selectedVersions.push('all')
      this.updateLocalStorageSelectedVersion();
    }
  }

  isAllVersionsSelected(){
    return this.selectedVersions.length > this.versions.length;
  }

  updateLocalStorageSelectedVersion(){
    console.log(this.selectedVersions);

    const selectedVersionString = JSON.stringify(this.selectedVersions);
    localStorage.setItem('selectedVersion',selectedVersionString)
  }

  isVersionColumnSelected(column: String): boolean {
    return this.selectedVersions.includes(column);
  }
  //endregion


  initProgress(){
    const storedMinTotalProgress = localStorage.getItem('minTotalProgress');
    this.selectedMinTotalProgress = storedMinTotalProgress ? parseFloat(storedMinTotalProgress) : 0;

    const storedMaxTotalProgress = localStorage.getItem('maxTotalProgress');
    this.selectedMaxTotalProgress = storedMaxTotalProgress ? parseFloat(storedMaxTotalProgress) : 100;

    const storedMinLopProgress = localStorage.getItem('minLopProgress');
    this.selectedMinLopProgress = storedMinLopProgress ? parseFloat(storedMinLopProgress) : 0;

    const storedMaxLopProgress = localStorage.getItem('maxLopProgress');
    this.selectedMaxLopProgress = storedMaxLopProgress ? parseFloat(storedMaxLopProgress) : 100;
  }

  //Columns Filter
  //region Selected Header Data
  initSelectedHeaderData(){
    const selectedHeaderData = localStorage.getItem('selectedHeaderData')
    if(selectedHeaderData){
      try{
        this.selectedHeaderData = JSON.parse(selectedHeaderData);
      } catch(e){
        console.info('Error parsing JSON from localStorage for selectedHeaderData')
        this.selectedHeaderData = [];
      }
    }
  }

  onChangeSelectHeaderData(event: any){
    if(event.value.includes('all')){
      if(this.isAllHeaderDataSelected()){
        return;
      }
      this.selectedHeaderData = this.selectedHeaderData.filter(item => item !== 'all');
      this.updateLocalStorageSelectedHeaderData();
      return;
    }
    this.updateLocalStorageSelectedHeaderData();
  }

  toggleSelectAllHeaderData(allSelected: MatOption){
    allSelected.select()
    if(this.isAllHeaderDataSelected()){
      this.selectedHeaderData = [];
      this.updateLocalStorageSelectedHeaderData();
    } else {
      allSelected.select()
      this.selectedHeaderData = this.headerDataColumns.slice();
      this.selectedHeaderData.push('all')
      this.updateLocalStorageSelectedHeaderData();
    }
  }

  isAllHeaderDataSelected(){
    return this.selectedHeaderData.length > this.headerDataColumns.length;
  }

  updateLocalStorageSelectedHeaderData(){
    console.log(this.selectedHeaderData);

    const selectedHeaderDataString = JSON.stringify(this.selectedHeaderData);
    localStorage.setItem('selectedHeaderData',selectedHeaderDataString)
  }

  isHeaderDataColumnSelected(column: String): boolean {
    return this.selectedHeaderData.includes(column);
  }
  //endregion

  //region Selected Specification
  initSelectedSpecification(){
    const selectedSpecification = localStorage.getItem('selectedSpecification')
    if(selectedSpecification){
      try{
        this.selectedSpecification = JSON.parse(selectedSpecification);
      } catch(e){
        console.info('Error parsing JSON from localStorage for selectedSpecification')
        this.selectedSpecification = [];
      }
    }
  }

  onChangeSelectSpecification(event: any){
    if(event.value.includes('all')){
      if(this.isAllSpecificationSelected()){
        return;
      }
      this.selectedSpecification = this.selectedSpecification.filter(item => item !== 'all');
      this.updateLocalStorageSelectedSpecification();
      return;
    }
    this.updateLocalStorageSelectedSpecification();
  }

  toggleSelectAllSpecification(allSelected: MatOption){
    allSelected.select()
    if(this.isAllSpecificationSelected()){
      this.selectedSpecification = [];
      this.updateLocalStorageSelectedSpecification();
    } else {
      allSelected.select()
      this.selectedSpecification = this.specificationColumns.slice();
      this.selectedSpecification.push('all')
      this.updateLocalStorageSelectedSpecification();
    }
  }

  isAllSpecificationSelected(){
    return this.selectedSpecification.length > this.specificationColumns.length;
  }

  updateLocalStorageSelectedSpecification(){
    console.log(this.selectedSpecification);

    const selectedSpecificationString = JSON.stringify(this.selectedSpecification);
    localStorage.setItem('selectedSpecification',selectedSpecificationString)
  }

  isSpecificationColumnSelected(column: String): boolean {
    return this.selectedSpecification.includes(column);
  }
  //endregion

  //region Selected Projection
  initSelectedProjection(){
    const selectedProjection = localStorage.getItem('selectedProjection')
    if(selectedProjection){
      try{
        this.selectedProjection = JSON.parse(selectedProjection);
      } catch(e){
        console.info('Error parsing JSON from localStorage for selectedProjection')
        this.selectedProjection = [];
      }
    }
  }

  onChangeSelectProjection(event: any){
    if(event.value.includes('all')){
      if(this.isAllProjectionSelected()){
        return;
      }
      this.selectedProjection = this.selectedProjection.filter(item => item !== 'all');
      this.updateLocalStorageSelectedProjection();
      return;
    }
    this.updateLocalStorageSelectedProjection();
  }

  toggleSelectAllProjection(allSelected: MatOption){
    allSelected.select()
    if(this.isAllProjectionSelected()){
      this.selectedProjection = [];
      this.updateLocalStorageSelectedProjection();
    } else {
      allSelected.select()
      this.selectedProjection = this.projectionColumns.slice();
      this.selectedProjection.push('all')
      this.updateLocalStorageSelectedProjection();
    }
  }

  isAllProjectionSelected(){
    return this.selectedProjection.length > this.projectionColumns.length;
  }

  updateLocalStorageSelectedProjection(){
    console.log(this.selectedProjection);

    const selectedProjectionString = JSON.stringify(this.selectedProjection);
    localStorage.setItem('selectedProjection',selectedProjectionString)
  }

  isProjectionColumnSelected(column: String): boolean {
    return this.selectedProjection.includes(column);
  }
  //endregion

  //region Selected Control
  initSelectedControl(){
    const selectedControl = localStorage.getItem('selectedControl')
    if(selectedControl){
      try{
        this.selectedControl = JSON.parse(selectedControl);
      } catch(e){
        console.info('Error parsing JSON from localStorage for selectedControl')
        this.selectedControl = [];
      }
    }
  }

  onChangeSelectControl(event: any){
    if(event.value.includes('all')){
      if(this.isAllControlSelected()){
        return;
      }
      this.selectedControl = this.selectedControl.filter(item => item !== 'all');
      this.updateLocalStorageSelectedControl();
      return;
    }
    this.updateLocalStorageSelectedControl();
  }

  toggleSelectAllControl(allSelected: MatOption){
    allSelected.select()
    if(this.isAllControlSelected()){
      this.selectedControl = [];
      this.updateLocalStorageSelectedControl();
    } else {
      allSelected.select()
      this.selectedControl = this.controlColumns.slice();
      this.selectedControl.push('all')
      this.updateLocalStorageSelectedControl();
    }
  }

  isAllControlSelected(){
    return this.selectedControl.length > this.controlColumns.length;
  }

  updateLocalStorageSelectedControl(){
    console.log(this.selectedControl);

    const selectedControlString = JSON.stringify(this.selectedControl);
    localStorage.setItem('selectedControl',selectedControlString)
  }

  isControlColumnSelected(column: String): boolean {
    return this.selectedControl.includes(column);
  }
  //endregion

  //region Selected Documentation
  initSelectedDocumentation(){
    const selectedDocumentation = localStorage.getItem('selectedDocumentation')
    if(selectedDocumentation){
      try{
        this.selectedDocumentation = JSON.parse(selectedDocumentation);
      } catch(e){
        console.info('Error parsing JSON from localStorage for selectedDocumentation')
        this.selectedDocumentation = [];
      }
    }
  }

  onChangeSelectDocumentation(event: any){
    if(event.value.includes('all')){
      if(this.isAllDocumentationSelected()){
        return;
      }
      this.selectedDocumentation = this.selectedDocumentation.filter(item => item !== 'all');
      this.updateLocalStorageSelectedDocumentation();
      return;
    }
    this.updateLocalStorageSelectedDocumentation();
  }

  toggleSelectAllDocumentation(allSelected: MatOption){
    allSelected.select()
    if(this.isAllDocumentationSelected()){
      this.selectedDocumentation = [];
      this.updateLocalStorageSelectedDocumentation();
    } else {
      allSelected.select()
      this.selectedDocumentation = this.documentationColumns.slice();
      this.selectedDocumentation.push('all')
      this.updateLocalStorageSelectedDocumentation();
    }
  }

  isAllDocumentationSelected(){
    return this.selectedDocumentation.length > this.documentationColumns.length;
  }

  updateLocalStorageSelectedDocumentation(){
    console.log(this.selectedDocumentation);

    const selectedDocumentationString = JSON.stringify(this.selectedDocumentation);
    localStorage.setItem('selectedDocumentation',selectedDocumentationString)
  }

  isDocumentationColumnSelected(column: String): boolean {
    return this.selectedDocumentation.includes(column);
  }
  //endregion

  //region Selected TechnicalData
  initSelectedTechnicalData(){
    const selectedTechnicalData = localStorage.getItem('selectedTechnicalData')
    if(selectedTechnicalData){
      try{
        this.selectedTechnicalData = JSON.parse(selectedTechnicalData);
      } catch(e){
        console.info('Error parsing JSON from localStorage for selectedTechnicalData')
        this.selectedTechnicalData = [];
      }
    }
  }

  onChangeSelectTechnicalData(event: any){
    if(event.value.includes('all')){
      if(this.isAllTechnicalDataSelected()){
        return;
      }
      this.selectedTechnicalData = this.selectedTechnicalData.filter(item => item !== 'all');
      this.updateLocalStorageSelectedTechnicalData();
      return;
    }
    this.updateLocalStorageSelectedTechnicalData();
  }

  toggleSelectAllTechnicalData(allSelected: MatOption){
    allSelected.select()
    if(this.isAllTechnicalDataSelected()){
      this.selectedTechnicalData = [];
      this.updateLocalStorageSelectedTechnicalData();
    } else {
      allSelected.select()
      this.selectedTechnicalData = this.technicalDataColumns.slice();
      this.selectedTechnicalData.push('all')
      this.updateLocalStorageSelectedTechnicalData();
    }
  }

  isAllTechnicalDataSelected(){
    return this.selectedTechnicalData.length > this.technicalDataColumns.length;
  }

  updateLocalStorageSelectedTechnicalData(){
    console.log(this.selectedTechnicalData);

    const selectedTechnicalDataString = JSON.stringify(this.selectedTechnicalData);
    localStorage.setItem('selectedTechnicalData',selectedTechnicalDataString)
  }

  isTechnicalDataColumnSelected(column: String): boolean {
    return this.selectedTechnicalData.includes(column);
  }
  //endregion

  navigateToStation(stationId: number, selectedOverview: number): void {
    this.router.navigate(['/overview'], {
      queryParams: {
        id: stationId,
        selectedOverview: selectedOverview
      }
    });
  }

  ngOnDestroy(): void {

    localStorage.setItem('minTotalProgress', this.selectedMinTotalProgress.toString())
    localStorage.setItem('maxTotalProgress', this.selectedMaxTotalProgress.toString())
    localStorage.setItem('minLopProgress', this.selectedMinLopProgress.toString())
    localStorage.setItem('maxLopProgress', this.selectedMaxLopProgress.toString())

    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
