import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {versionModel, versionStationModel} from "../../store/version.model";
import {AppStateModel} from "../../../../core/store/appState.model";
import {Store} from "@ngrx/store";
import {addVersion, updateVersion} from "../../store/version.actions";
import {getVersionById} from "../../store/version.selectors";

@Component({
  selector: 'app-add-version',
  templateUrl: './add-version.component.html',
  styleUrl: './add-version.component.scss'
})
export class AddVersionComponent implements OnInit{

  versionTitle='';
  editVersionId=0;
  editData!:versionModel;
  dummyVersionStation!:versionStationModel[];

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
    todo:this.builder.control('', Validators.required),
    done:this.builder.control(false)
    }
  )

  saveVersion(){
    if(this.versionForm.valid){
      const _versionInput:versionModel={
        id:0,
        date:this.versionForm.value.date as string,
        version:this.versionForm.value.version as string,
        todo:this.versionForm.value.todo as string,
        done:this.versionForm.value.done as boolean,
        versionStation:this.dummyVersionStation
      }
      if(this.data.isedit){
        console.log('Update')
        _versionInput.id=this.versionForm.value.id as number;
        this.store.dispatch(updateVersion({versionInput:_versionInput}))
      }else{
        console.log('New')
        this.store.dispatch(addVersion({versionInput:_versionInput}))
      }
      this.closePopup();
    }
  }

  ngOnInit(): void {
    this.versionTitle=this.data.version;
    if(this.data.isedit){
      this.editVersionId=this.data.id;
      this.store.select(getVersionById(this.editVersionId)).subscribe(_data=>{
        this.editData=_data;
        this.versionForm.setValue({
          id:this.editData.id,
          date:this.editData.date,
          version:this.editData.version,
          todo:this.editData.todo,
          done:this.editData.done})
      })
    }
  }
}
