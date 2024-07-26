import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {loadStationDocumentation, updateStationDocumentation} from "../store/documentation.actions";
import {getDocumentationById, getDocumentationInfo} from "../store/documentation.selectors";
import {documentation, editDocumentationModel} from "../store/documentation.model";
import {MatCheckboxChange} from "@angular/material/checkbox";



@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];
  documentation !: documentation;
  editDocumentation: { [key: number]: editDocumentationModel } = {};
  editDocumentationDateDone: { [key: number]: editDocumentationModel } = {};
  editDocumentationDateCommited: { [key: number]: editDocumentationModel } = {};
  displayedColumns: string[] = ['Doku', 'Zusatz', 'Erledigt', 'Datum erledigt', 'Übergeben', 'Datum übergeben'];
  @Input() stationId!:number;
  @ViewChild('inputField', {static: false}) inputFieldAddition!: ElementRef;
  @ViewChild('inputFieldDateDone', {static: false}) inputFieldDateDone!: ElementRef;
  @ViewChild('inputFieldDateCommited', {static: false}) inputFieldDateCommited!: ElementRef;


  constructor(private store:Store<AppStateModel>) {
  }

  ngOnInit(): void {
    console.log('Station ID: ' + this.stationId);
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadStationDocumentation({stationId:this.stationId}));
    this.subscriptions.push(
      this.store.select(getDocumentationInfo).pipe()
        .subscribe(data =>{
          this.documentation=data;
          this.editDocumentation = data.documentationList.reduce((acc, item) => {
            acc[item.id] = {
              documentation: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editDocumentationModel });
          this.editDocumentationDateDone = data.documentationList.reduce((acc, item) => {
            acc[item.id] = {
              documentation: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editDocumentationModel });
          this.editDocumentationDateCommited = data.documentationList.reduce((acc, item) => {
            acc[item.id] = {
              documentation: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editDocumentationModel });
        })
    )
  }

  setEditAddition(id:any){
    console.log("enable edit ID: "+ id);
    this.editDocumentation[id].isEdit = !this.editDocumentation[id].isEdit
    setTimeout(()=> {
      this.inputFieldAddition.nativeElement.focus();
    }, 0);
  }

  setEditDateDone(id:any){
    console.log("enable edit ID: "+ id);
    this.editDocumentationDateDone[id].isEdit = !this.editDocumentationDateDone[id].isEdit
    setTimeout(()=> {
      this.inputFieldDateDone.nativeElement.focus();
    }, 0);
  }

  setEditDateCommited(id:any){
    console.log("enable edit ID: "+ id);
    this.editDocumentationDateCommited[id].isEdit = !this.editDocumentationDateCommited[id].isEdit
    setTimeout(()=> {
      this.inputFieldDateCommited.nativeElement.focus();
    }, 0);
  }

  updateStationDocumentationCheckbox(event: MatCheckboxChange, id:any, field: string){
    console.log("update documentation")
    this.store.select(getDocumentationById(id)).subscribe(data => {
      this.editDocumentation[id].documentation = {...data};
    })
    if(field == "done"){
      this.editDocumentation[id].documentation.done = event.checked;
    }

    if(field == "commited"){
      this.editDocumentation[id].documentation.commited = event.checked;
    }
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationDocumentation({documentationInput:this.editDocumentation[id].documentation}))
  }

  updateStationDocumentation(id:any){
    console.log("update documentation")
    this.editDocumentation[id].isEdit = !this.editDocumentation[id].isEdit
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationDocumentation({documentationInput:this.editDocumentation[id].documentation}))
  }

  updateStationDocumentationDateDone(id:any){
    console.log("update documentation date done")
    this.editDocumentationDateDone[id].isEdit = !this.editDocumentationDateDone[id].isEdit
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationDocumentation({documentationInput:this.editDocumentationDateDone[id].documentation}))
  }

  updateStationDocumentationDateCommited(id:any){
    console.log("update documentation date commited")
    this.editDocumentationDateCommited[id].isEdit = !this.editDocumentationDateCommited[id].isEdit
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationDocumentation({documentationInput:this.editDocumentationDateCommited[id].documentation}))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
