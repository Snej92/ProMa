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
  displayedColumns: string[] = ['Doku', 'Erledigt', 'Übergeben', 'Zusatz', 'Datum'];
  @Input() stationId!:number;
  @ViewChild('inputField', {static: false}) inputField!: ElementRef;


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
        })
    )
  }

  setEdit(id:any){
    console.log("enable edit ID: "+ id);
    this.editDocumentation[id].isEdit = !this.editDocumentation[id].isEdit
    setTimeout(()=> {
      this.inputField.nativeElement.focus();
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
    this.store.dispatch(updateStationDocumentation({documentationStationInput:this.editDocumentation[id].documentation}))
  }

  updateStationDocumentation(id:any){
    console.log("update header data")
    this.editDocumentation[id].isEdit = !this.editDocumentation[id].isEdit
    console.log(this.editDocumentation[id].documentation);
    this.store.dispatch(loadSpinner({isLoading:true}))
    this.store.dispatch(updateStationDocumentation({documentationStationInput:this.editDocumentation[id].documentation}))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
