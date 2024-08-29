import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {loadStationDocumentation, updateStationDocumentation} from "../store/documentation.actions";
import {getDocumentationById, getDocumentationInfo} from "../store/documentation.selectors";
import {documentation, editDocumentationModel} from "../store/documentation.model";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {DatePipe} from "@angular/common";
import {global} from "../../../../core/store/app.model";
import {MatDatepicker} from "@angular/material/datepicker";



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
  displayedColumns: string[] = ['Doku', 'Zusatz', 'Erledigt', 'Datum erledigt', 'Übergeben', 'Datum übergeben', 'Benutzer'];
  @Input() stationId!:number;
  @ViewChild('inputField', {static: false}) inputFieldAddition!: ElementRef;
  @ViewChild('inputFieldDateDone', {static: false}) inputFieldDateDone!: ElementRef;
  @ViewChild('inputFieldDateCommited', {static: false}) inputFieldDateCommited!: ElementRef;
  manualDateInputDone : boolean = false;
  manualDateInputCommited : boolean = false;
  validDateDone : boolean = false;
  validDateCommited : boolean = false;
  dateDone!: string;
  dateCommited!: string;
  datePipe = new DatePipe('de-DE');

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
    if(this.validDateDone){
      console.log("update documentation date done")
      this.editDocumentationDateDone[id].isEdit = !this.editDocumentationDateDone[id].isEdit
      this.editDocumentationDateDone[id].documentation.dateDone = this.dateDone;
      this.store.dispatch(loadSpinner({isLoading:true}))
      this.store.dispatch(updateStationDocumentation({documentationInput:this.editDocumentationDateDone[id].documentation}))
    }
  }

  updateStationDocumentationDateCommited(id:any){
    if(this.validDateCommited){
      console.log("update documentation date commited")
      this.editDocumentationDateCommited[id].isEdit = !this.editDocumentationDateCommited[id].isEdit
      this.editDocumentationDateCommited[id].documentation.dateCommited = this.dateCommited;
      this.store.dispatch(loadSpinner({isLoading:true}))
      this.store.dispatch(updateStationDocumentation({documentationInput:this.editDocumentationDateCommited[id].documentation}))
    }
  }

  //Datepicker
  //Done
  onDateChangeDone(selectedDate: Date, id:any) {
    if(!this.manualDateInputDone){
      if (selectedDate){
        this.dateDone = this.datePipe.transform(selectedDate, 'dd.MM.yyyy')!;
        this.validDateDone = global.dateRegex.test(this.dateDone);
        this.updateStationDocumentationDateDone(id);
      } else {
        this.dateDone = '';
      }
    }
    this.manualDateInputDone = false;
  }

  onInputChangeDone(event: Event){
    this.manualDateInputDone = true;
    console.log("manual date input");
    this.dateDone = (event.target as HTMLInputElement).value;
    this.validDateDone = global.dateRegex.test(this.dateDone);
  }

  //Commited
  onDateChangeCommited(selectedDate: Date, id:any) {
    if(!this.manualDateInputCommited){
      if (selectedDate){
        this.dateCommited = this.datePipe.transform(selectedDate, 'dd.MM.yyyy')!;
        this.validDateCommited = global.dateRegex.test(this.dateCommited);
        this.updateStationDocumentationDateCommited(id);
      } else {
        this.dateCommited = '';
      }
    }
    this.manualDateInputCommited = false;
  }

  onInputChangeCommited(event: Event){
    this.manualDateInputCommited = true;
    console.log("manual date input");
    this.dateCommited = (event.target as HTMLInputElement).value;
    this.validDateCommited = global.dateRegex.test(this.dateCommited);
  }

  onBlurCommited(picker: MatDatepicker<any>, id:any){
    setTimeout(() => {
      if (!picker.opened) {
        if(this.validDateCommited){
          this.updateStationDocumentationDateCommited(id);
        } else {
          setTimeout(()=> {
            this.inputFieldDateCommited.nativeElement.focus();
          }, 0);
        }
      }
    }, 200);
  }

  onBlurDone(picker: MatDatepicker<any>, id:any){
    setTimeout(() => {
      if (!picker.opened) {
        if(this.validDateDone){
          this.updateStationDocumentationDateDone(id);
        } else {
          setTimeout(()=> {
            this.inputFieldDateDone.nativeElement.focus();
          }, 0);
        }
      }
    }, 200);
  }

  leaveEditCommited(id:any){
    this.editDocumentationDateCommited[id].isEdit = false
  }

  leaveEditDone(id:any){
    this.editDocumentationDateDone[id].isEdit = false
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
