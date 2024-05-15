import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Subscription} from "rxjs";
import {projectViewModel} from "../store/project-administration.model";
import {userModel} from "../../../userAdministration/store/user-Administration.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {addProjectView} from "../store/project-administration.actions";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent implements OnInit{
  private onInitSub!:Subscription;
  editData!:projectViewModel;

  constructor(private dialogRef:MatDialogRef<AddProjectComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  projectForm=this.builder.group({
    id:this.builder.control(0),
    name:this.builder.control('', Validators.required),
    description:this.builder.control(''),
    favorite:this.builder.control(false),
    amountStations:this.builder.control(0),
    inProgressStations: this.builder.control(0),
    storedStations:this.builder.control(0),
    notStoredStations:this.builder.control(0)
  })

  ngOnInit(): void {
  }

  saveProject(){
    const projectInput: projectViewModel = {
      id:0,
      name:this.projectForm.value.name as string,
      description:this.projectForm.value.description as string,
      favorite:this.projectForm.value.favorite as boolean,
      amountStations:this.projectForm.value.amountStations as number,
      inProgressStations:this.projectForm.value.inProgressStations as number,
      storedStations:this.projectForm.value.storedStations as number,
      notStoredStations:this.projectForm.value.notStoredStations as number,
    }
    // this.store.dispatch(loadSpinner({isLoading:true}));
    if(this.data.isEdit){
      projectInput.id=this.projectForm.value.id as number
      console.log(projectInput)
    }else {
      console.log(projectInput)
      this.store.dispatch(addProjectView({projectViewInput:projectInput}));
    }
    this.closePopup();
  }

  closePopup(){
    this.dialogRef.close();
  }
}
