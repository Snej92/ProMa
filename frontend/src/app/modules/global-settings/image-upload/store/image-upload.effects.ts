import {Injectable} from "@angular/core";
import {act, Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, of, switchMap} from "rxjs";
import {loadSpinner, showAlert} from "../../../../core/store/app.action";
import {ImageUploadService} from "../service/image-upload.service";
import {
  deleteImage, deleteImageSuccess,
  LOAD_UPLOAD_LIST, loadUploadList,
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
import {loadStationViewFavorite} from "../../../dashboard/station/store/station-favorite.actions";
import {updateStation} from "../../../station/store/stationView.actions";
import {stationFavViewModel} from "../../../station/store/stationView.model";

@Injectable()
export class UploadEffects {
  constructor(private action$:Actions,
              private service:ImageUploadService,) {

  }

  _getUploads=createEffect(()=>
    this.action$.pipe(
      ofType(loadUploadList),
      switchMap(action=>
        this.service.getUploadList(action.typ).pipe(
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
        this.service.uploadImage(action.image, action.typ).pipe(
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
        this.service.deleteImage(action.imageName, action.typ).pipe(
          switchMap(data=> of(
            deleteImageSuccess({imageName:action.imageName}),
            loadStationViewFavorite(),
            loadSpinner({isLoading:false}),
            showAlert({message: 'Bild erfolgreich gelöscht', actionResult:'pass'})
          )),
          catchError((error)=> of(showAlert({message: 'Bild löschen fehlgeschlagen '+error.message, actionResult:'fail'}),loadSpinner({isLoading:false})))
        )
      )
    )
  );
}
