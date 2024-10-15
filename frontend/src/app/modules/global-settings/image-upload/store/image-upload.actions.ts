import {createAction, props} from "@ngrx/store";
import {uploadModel} from "./image-upload.model";
import {stationFavViewModel} from "../../../station/store/stationView.model";


export const LOAD_UPLOAD_LIST='[upload global settings page] load upload list'
export const LOAD_UPLOAD_LIST_SUCCESS='[upload global settings page] load upload list success'
export const LOAD_UPLOAD_LIST_FAIL='[upload global settings page] load upload list fail'

export const UPLOAD_IMAGE ='[upload global settings page] upload image'
export const UPLOAD_IMAGE_SUCCESS ='[upload global settings page] upload image success'

export const DELETE_IMAGE ='[upload global settings page] delete image'
export const DELETE_IMAGE_SUCCESS ='[upload global settings page] delete image success'


export const loadUploadList=createAction(LOAD_UPLOAD_LIST, props<{typ:number}>());
export const loadUploadListSuccess=createAction(LOAD_UPLOAD_LIST_SUCCESS, props<{uploadList:uploadModel[]}>())
export const loadUploadListFail=createAction(LOAD_UPLOAD_LIST_FAIL, props<{errorText:any}>())

export const uploadImage =createAction(UPLOAD_IMAGE, props<{image:FormData, typ:number}>())
export const uploadImageSuccess =createAction(UPLOAD_IMAGE_SUCCESS, props<{upload:uploadModel}>())

export const deleteImage =createAction(DELETE_IMAGE, props<{imageName:string, typ:number}>())
export const deleteImageSuccess =createAction(DELETE_IMAGE_SUCCESS, props<{imageName:string}>())
