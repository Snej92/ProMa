import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Subscription, take} from "rxjs";
import {projectFavViewModel, projectView, projectViewModel} from "../../store/project-administration.model";
import {addProjectView, updateProject} from "../../store/project-administration.actions";
import {getProjectById} from "../../store/project-administration.selectors";
import {loadSpinner} from "../../../../core/store/app.action";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent implements OnInit{
  editData!:projectFavViewModel;
  template!:string;

  constructor(private dialogRef:MatDialogRef<AddProjectComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  projectForm=this.builder.group({
    id:this.builder.control(0),
    archived:this.builder.control(false),
    name:this.builder.control('', Validators.required),
    description:this.builder.control(''),
    amountStations:this.builder.control(0),
    inProgressStations: this.builder.control(0),
    storedStations:this.builder.control(0),
    notStoredStations:this.builder.control(0),
    template:this.builder.control('', Validators.required),
    isFavorite:this.builder.control(false)
  })

  saveProject(){
    if(this.projectForm.valid || (this.projectForm.controls["name"].valid && this.data.isEdit)){
      const project: projectViewModel = {
        id:0,
        archived:this.projectForm.value.archived as boolean,
        name:this.projectForm.value.name as string,
        description:this.projectForm.value.description as string,
        amountStations:this.projectForm.value.amountStations as number,
        inProgressStations:this.projectForm.value.inProgressStations as number,
        storedStations:this.projectForm.value.storedStations as number,
        notStoredStations:this.projectForm.value.notStoredStations as number,
      }
      const projectInput:projectFavViewModel={
        project:project,
        isFavorite:this.projectForm.value.isFavorite as boolean
      }
      this.template = this.projectForm.value.template as string;
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isEdit){
        projectInput.project.id=this.projectForm.value.id as number
        console.log(projectInput)
        this.store.dispatch(updateProject({projectViewInput:projectInput}))
      }else {
        console.log(projectInput)
        console.log(this.template)
        this.store.dispatch(addProjectView({projectViewInput:projectInput, template:this.template}));
      }
      this.closePopup();
    }
  }

  closePopup(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.store.select(getProjectById(this.data.id)).pipe(
        take(1)
      ).subscribe(data => {
        this.editData = {
          ...data,
          project: {
            ...data.project,
            archived: false
          }
        };
        this.projectForm.setValue({
          id: this.editData.project.id,
          archived: this.editData.project.archived,
          name: this.editData.project.name,
          description: this.editData.project.description,
          amountStations: this.editData.project.amountStations,
          inProgressStations: this.editData.project.inProgressStations,
          storedStations: this.editData.project.storedStations,
          notStoredStations: this.editData.project.notStoredStations,
          template: '',
          isFavorite: this.editData.isFavorite
        })
      })
    }

  }
}
