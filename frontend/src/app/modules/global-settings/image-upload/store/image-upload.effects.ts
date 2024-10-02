import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {ImageUploadService} from "../service/image-upload.service";
import {
  deleteImage, deleteImageSuccess,
  LOAD_UPLOAD_LIST,
  loadUploadListFail,
  loadUploadListSuccess,
  uploadImage,
  uploadImageSuccess
} from "./image-upload.actions";
import {
  addSettingControl,
  addSettingControlSuccess
} from "../../../settings/control-settings/store/controlSetting.actions";
import {controlSettingModel} from "../../../settings/control-settings/store/controlSetting.model";
import {uploadModel} from "./image-upload.model";

@Injectable()
export class UploadEffects {
  constructor(private action$:Actions,
              private service:ImageUploadService,) {

  }

  _getUploads=createEffect(()=>
    this.action$.pipe(
      ofType(LOAD_UPLOAD_LIST),
      switchMap(action=>
        this.service.getUploadList().pipe(
          switchMap(data=> of(
            loadUploadListSuccess({uploadList:data}),
            loadSpinner({isLoading:false})
          )),
          catchError((error)=> of(loadUploadListFail({errorText:error}), loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _uploadImage=createEffect(()=>
    this.action$.pipe(
      ofType(uploadImage),
      switchMap(action=>
        this.service.uploadImage(action.image).pipe(
          switchMap(data=> of(
            uploadImageSuccess({upload:data as uploadModel}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Bild erfolgreich hochgeladen', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Upload fehlgeschlagen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );

  _deleteImage=createEffect(()=>
    this.action$.pipe(
      ofType(deleteImage),
      switchMap(action=>
        this.service.deleteImage(action.imageName).pipe(
          switchMap(data=> of(
            deleteImageSuccess({imageName:action.imageName}),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Bild erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Bild löschen fehlgeschlagen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
