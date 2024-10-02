import {createReducer, on} from "@ngrx/store";
import {uploadState} from "./image-upload.state";
import {
  deleteImage, deleteImageSuccess,
  loadUploadList,
  loadUploadListFail,
  loadUploadListSuccess,
  uploadImageSuccess
} from "./image-upload.actions";
import {controlSettingModel} from "../../../settings/control-settings/store/controlSetting.model";
import {uploadModel} from "./image-upload.model";

const _uploadReducer = createReducer(
  uploadState,

  on(loadUploadList, (state) => {
    return{
      ...state
    };
  }),

  on(loadUploadListSuccess, (state,action) => {
    return{
      ...state,
      uploadList:[...action.uploadList],
      errorMessage:''
    };
  }),

  on(loadUploadListFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      uploadList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(uploadImageSuccess, (state, action) => {
    const newUpload ={...action.upload}
    return {
      ...state,
      uploadList:[...state.uploadList, newUpload]
    };
  }),

  on(deleteImageSuccess, (state, action) => {
    const updatedUploadList =state.uploadList.filter((data:uploadModel) => {
      return data.fileName!==action.imageName
    })

    return {
      ...state,
      uploadList:updatedUploadList
    };
  })
);

export function uploadReducer(state: any , action: any) {
  return _uploadReducer(state, action);
}
