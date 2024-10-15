import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Subscription, take} from "rxjs";
import {projectFavViewModel, projectViewModel} from "../../store/project-administration.model";
import {addProjectView, updateProject} from "../../store/project-administration.actions";
import {getProjectById} from "../../store/project-administration.selectors";
import {loadSpinner} from "../../../../core/store/app.action";
import {loadUploadList} from "../../../global-settings/image-upload/store/image-upload.actions";
import {getUploadInfo} from "../../../global-settings/image-upload/store/image-upload.selectors";
import {upload} from "../../../global-settings/image-upload/store/image-upload.model";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent implements OnInit, OnDestroy{
  editData!:projectFavViewModel;
  upload!:upload;
  template!:string;
  private subscriptions: Subscription[] = [];


  showPicker:boolean = false;
  color: string = '#ffffff'; // Default color

  constructor(private dialogRef:MatDialogRef<AddProjectComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  projectForm=this.builder.group({
    id:this.builder.control(0),
    archived:this.builder.control(false),
    color:this.builder.control('#ffffff'),
    acronym:this.builder.control('', Validators.required),
    name:this.builder.control('', Validators.required),
    description:this.builder.control(''),
    amountStations:this.builder.control(0),
    inProgressStations: this.builder.control(0),
    storedStations:this.builder.control(0),
    notStoredStations:this.builder.control(0),
    template:this.builder.control('', Validators.required),
    isFavorite:this.builder.control(false),
    image:this.builder.control(""),
  })

  saveProject(){
    if(this.projectForm.valid || (this.projectForm.controls["name"].valid && this.data.isEdit)){
      const project: projectViewModel = {
        id:0,
        archived:this.projectForm.value.archived as boolean,
        color:this.projectForm.value.color as string,
        acronym:this.projectForm.value.acronym as string,
        name:this.projectForm.value.name as string,
        description:this.projectForm.value.description as string,
        amountStations:this.projectForm.value.amountStations as number,
        inProgressStations:this.projectForm.value.inProgressStations as number,
        storedStations:this.projectForm.value.storedStations as number,
        notStoredStations:this.projectForm.value.notStoredStations as number,
        image:this.projectForm.value.image as string,
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
    this.store.dispatch(loadUploadList({typ:1}));
    this.subscriptions.push(
      this.store.select(getUploadInfo).pipe()
        .subscribe(data=> {
          this.upload = data;
        })
    );

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
        if(data.project.color != null){
          this.color = data.project.color;
        } else {
          this.color = "#ffffff";
        }

        this.projectForm.setValue({
          id: this.editData.project.id,
          archived: this.editData.project.archived,
          color: this.color,
          acronym: this.editData.project.acronym,
          name: this.editData.project.name,
          description: this.editData.project.description,
          amountStations: this.editData.project.amountStations,
          inProgressStations: this.editData.project.inProgressStations,
          storedStations: this.editData.project.storedStations,
          notStoredStations: this.editData.project.notStoredStations,
          template: '',
          isFavorite: this.editData.isFavorite,
          image: this.editData.project.image
        })
      })
    }
  }

  toggleColorPicker(){
    this.showPicker = !this.showPicker;
  }

  onColorChange(hexColor: string) {
    this.color = hexColor;
    this.projectForm.get('color')?.setValue(hexColor);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
