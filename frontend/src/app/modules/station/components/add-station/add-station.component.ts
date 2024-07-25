import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {stationViewModel} from "../../store/stationView.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {addStationView, updateStation} from "../../store/stationView.actions";
import {getStationById} from "../../store/stationView.selectors";

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrl: './add-station.component.scss'
})
export class AddStationComponent implements OnInit{
  private onInitSub!:Subscription;
  editData!:stationViewModel;

  constructor(private dialogRef:MatDialogRef<AddStationComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit(): void {
    if(this.data.isEdit){
      this.onInitSub = this.store.select(getStationById(this.data.id)).subscribe(data=>{
        this.editData=data;
        this.stationForm.setValue({
          id:this.editData.id,
          name: this.editData.name,
          description: this.editData.description,
          issuer:this.editData.issuer,
          status:this.editData.status,
          version:this.editData.version,
          totalProgress:this.editData.totalProgress,
          lopTotal:this.editData.lopTotal,
          lopDone:this.editData.lopDone,
          lopToDo:this.editData.lopToDo,
          lopProgress:this.editData.lopProgress,
          documentationTotal:this.editData.documentationTotal,
          documentationDone:this.editData.documentationDone,
          documentationToDo:this.editData.documentationToDo,
          documentationProgress:this.editData.documentationProgress,
          specificationTotal:this.editData.specificationTotal,
          specificationDone:this.editData.specificationDone,
          specificationToDo:this.editData.specificationToDo,
          specificationProgress:this.editData.specificationProgress,
          controlTotal:this.editData.controlTotal,
          controlDone:this.editData.controlDone,
          controlToDo:this.editData.controlToDo,
          controlProgress:this.editData.controlProgress
        })
      })
      this.onInitSub.unsubscribe();
    }
  }

  stationForm=this.builder.group({
    id:this.builder.control(0),
    name:this.builder.control('', Validators.required),
    description:this.builder.control(''),
    issuer:this.builder.control(''),
    status:this.builder.control(''),
    version:this.builder.control('V1.0'),
    totalProgress:this.builder.control(0),
    lopTotal:this.builder.control(0),
    lopDone:this.builder.control(0),
    lopToDo:this.builder.control(0),
    lopProgress:this.builder.control(0),
    documentationTotal:this.builder.control(0),
    documentationDone:this.builder.control(0),
    documentationToDo:this.builder.control(0),
    documentationProgress:this.builder.control(0),
    specificationTotal:this.builder.control(0),
    specificationDone:this.builder.control(0),
    specificationToDo:this.builder.control(0),
    specificationProgress:this.builder.control(0),
    controlTotal:this.builder.control(0),
    controlDone:this.builder.control(0),
    controlToDo:this.builder.control(0),
    controlProgress:this.builder.control(0),
  })


  saveStation() {
    const stationInput : stationViewModel = {
      id:0,
      name:this.stationForm.value.name as string,
      description:this.stationForm.value.description as string,
      issuer:this.stationForm.value.issuer as string,
      status:this.stationForm.value.status as string,
      version:this.stationForm.value.version as string,
      totalProgress:this.stationForm.value.totalProgress as number,
      lopTotal:this.stationForm.value.lopTotal as number,
      lopDone:this.stationForm.value.lopDone as number,
      lopToDo:this.stationForm.value.lopToDo as number,
      lopProgress:this.stationForm.value.lopProgress as number,
      documentationTotal:this.stationForm.value.documentationTotal as number,
      documentationDone:this.stationForm.value.documentationDone as number,
      documentationToDo:this.stationForm.value.documentationToDo as number,
      documentationProgress:this.stationForm.value.documentationProgress as number,
      specificationTotal:this.stationForm.value.specificationTotal as number,
      specificationDone:this.stationForm.value.specificationDone as number,
      specificationToDo:this.stationForm.value.specificationToDo as number,
      specificationProgress:this.stationForm.value.specificationProgress as number,
      controlTotal:this.stationForm.value.controlTotal as number,
      controlDone:this.stationForm.value.controlDone as number,
      controlToDo:this.stationForm.value.controlToDo as number,
      controlProgress:this.stationForm.value.controlProgress as number
    }
    // this.store.dispatch(loadSpinner({isLoading:true}));
    if(this.data.isEdit){
      stationInput.id = this.stationForm.value.id as number
      console.log(stationInput)
      this.store.dispatch(updateStation({stationViewInput:stationInput}))
    }else{
      console.log(stationInput)
      this.store.dispatch(addStationView({stationViewInput:stationInput}))
    }
    this.closePopup();
  }

  closePopup(){
    this.dialogRef.close();
  }
}
