import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {versionModel, versionStationModel} from "../../store/version.model";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Store} from "@ngrx/store";
import {addVersion, updateVersion} from "../../store/version.actions";
import {getVersionById} from "../../store/version.selectors";
import {loadSpinner} from "../../../../core/store/app.action";

@Component({
  selector: 'app-add-version',
  templateUrl: './add-version.component.html',
  styleUrl: './add-version.component.scss'
})
export class AddVersionComponent implements OnInit{

  versionTitle='';
  editVersionId=0;
  editData!:versionModel;

  constructor(private dialog:MatDialogRef<AddVersionComponent>,
              private builder:FormBuilder,
              private store:Store<AppStateModel>,
              @Inject(MAT_DIALOG_DATA)public data:any) {
  }

  closePopup(){
    this.dialog.close()
  }

  versionForm=this.builder.group({
    id:this.builder.control(0),
    date:this.builder.control(''),
    version:this.builder.control('', Validators.required),
    toDo:this.builder.control('', Validators.required),
    done:this.builder.control(false),
    versionStation: this.builder.array([])
    }
  )

  saveVersion(){
    if(this.versionForm.valid){
      const versionInput:versionModel={
        id:0,
        date:this.versionForm.value.date as string,
        version:this.versionForm.value.version as string,
        toDo:this.versionForm.value.toDo as string,
        done:this.versionForm.value.done as boolean,
        versionStation: this.versionForm.value.versionStation as versionStationModel[]
      };
      this.store.dispatch(loadSpinner({isLoading:true}));
      if(this.data.isedit){
        versionInput.id=this.versionForm.value.id as number;
        console.log(versionInput)
        console.log("update version")
        this.store.dispatch(updateVersion({versionInput:versionInput}))
      }else{
        console.log(versionInput)
        console.log("add version")
        this.store.dispatch(addVersion({versionInput:versionInput}))
      }
      this.closePopup();
    }
  }

  ngOnInit(): void {
    this.versionTitle=this.data.version;
    if(this.data.isedit){
      this.editVersionId=this.data.id;
      this.store.select(getVersionById(this.editVersionId)).subscribe(data=>{
        this.editData=data;
        // Create a FormArray from the editData.versionStation array
        const versionStationArray = this.editData.versionStation.map(station => this.builder.group({
          id: [station.id],
          stationName: [station.stationName, Validators.required],
          done: [station.done, Validators.required]
        }))

        this.versionForm.setValue({
          id:this.editData.id,
          date:this.editData.date,
          version:this.editData.version,
          toDo:this.editData.toDo,
          done:this.editData.done,
          versionStation: []
        })

        // @ts-ignore
        this.versionForm.setControl('versionStation', this.builder.array(versionStationArray));
      })
    }
  }
}
