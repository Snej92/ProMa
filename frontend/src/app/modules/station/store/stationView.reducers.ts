import {createReducer, on} from "@ngrx/store";
import {stationViewState} from "./stationView.state";
import {
  addStationViewSuccess,
  deleteStation,
  loadStationView,
  loadStationViewFail,
  loadStationViewSuccess, updateStationFavoriteSuccess, updateStationSuccess
} from "./stationView.actions";
import {stationFavViewModel, stationViewModel} from "./stationView.model";
import {updateProjectFavoriteSuccess} from "../../project-administration/store/project-administration.actions";

const _stationReducer = createReducer(
  stationViewState,

  on(loadStationView, (state) => {
    return{
      ...state
    };
  }),

  on(loadStationViewSuccess, (state,action) => {
    return{
      ...state,
      stationViewList:[...action.stationViewList],
      errorMessage:''
    };
  }),

  on(loadStationViewFail, (state,action) => {
    console.log(action.errorText)
    return{
      ...state,
      stationViewList:[],
      errorMessage:action.errorText.message
    };
  }),

  on(addStationViewSuccess, (state,action) => {
    const station={...action.stationViewInput};
    return{
      ...state,
      stationViewList:[...state.stationViewList,station]
    };
  }),

  on(updateStationSuccess, (state,action) => {
    const stationViewOld={...action.stationViewOld};
    const stationViewNew={...action.stationViewNew};
    const updatedStation=state.stationViewList.map(stationView=>{
      return stationViewOld.station.id===stationView.station.id?stationViewNew:stationView;
    });
    return{
      ...state,
      stationViewList:updatedStation
    };
  }),


  on(deleteStation, (state,action) => {
    const updatedStation=state.stationViewList.filter((data:stationFavViewModel)=>{
      return data.station.id!==action.id
    });
    return{
      ...state,
      stationViewList:updatedStation
    };
  }),

  on(updateStationFavoriteSuccess, (state, action) => {
    return{
      ...state,
      stationViewList: state.stationViewList.map(stationFavViewModel =>
        stationFavViewModel.station.id === action.stationId
          ? {
            ...stationFavViewModel,
            isFavorite: !action.remove
          }
          : stationFavViewModel
      ),
    };
  }),
);

export function stationViewReducer(state: any , action: any) {
  return _stationReducer(state, action);
}
