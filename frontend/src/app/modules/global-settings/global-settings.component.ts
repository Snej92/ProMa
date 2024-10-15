import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../core/store/appState.model";
import {upload} from "./image-upload/store/image-upload.model";
import {loadSpinner} from "../../core/store/app.action";
import {deleteImage, loadUploadList, uploadImage} from "./image-upload/store/image-upload.actions";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {getUploadInfo} from "./image-upload/store/image-upload.selectors";
import {SysConfirmationComponent} from "../../core/sys-confirmation/sys-confirmation.component";
import {deleteSettingControl} from "../settings/control-settings/store/controlSetting.actions";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrl: './global-settings.component.scss'
})
export class GlobalSettingsComponent implements OnInit, OnDestroy{

  constructor(private store:Store<AppStateModel>,
              private confirm:MatDialog) {
  }

  upload!:upload;
  selectedFile: File | null = null;
  protected API_URL= environment.API_URL;
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.store.dispatch(loadUploadList({typ:1}));
    this.subscriptions.push(
      this.store.select(getUploadInfo).pipe()
        .subscribe(data=> {
          this.upload = data;
        })
    );
  }

  onFileSelected(fileInputEvent: any) {
    const input:HTMLInputElement = fileInputEvent.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(uploadImage({image:formData, typ:1}));
    }
  }

  deleteImage(fileName : string){
    this.openConfirm('Bild', fileName, 'Löschen', fileName)
  }

  openConfirm(title:any, confirmName:any, button:any, fileName:any){
    const confirmRef = this.confirm.open(SysConfirmationComponent, {
      width: '30%',
      data:{
        title: title,
        confirmName: confirmName,
        button:button
      }
    });
    confirmRef.afterClosed().subscribe((confirmed:boolean)=> {
      if(confirmed){
        this.store.dispatch(loadSpinner({isLoading:true}));
        this.store.dispatch(deleteImage({imageName:fileName, typ:1}))
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
