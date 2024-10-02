import {createFeatureSelector, createSelector} from "@ngrx/store";
import {upload, uploadModel} from "./image-upload.model";

const getUploadState=createFeatureSelector<upload>('upload')

export const getUpload=createSelector(getUploadState,(state)=>{
  return state.uploadList;
});

export const getUploadInfo=createSelector(getUploadState,(state)=>{
  return state;
});
