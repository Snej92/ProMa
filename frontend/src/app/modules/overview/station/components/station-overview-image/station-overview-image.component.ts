import {Component, input, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {loadSpinner} from "../../../../../core/store/app.action";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {MatDialog} from "@angular/material/dialog";
import {deleteImage, uploadImage} from "../../../../global-settings/image-upload/store/image-upload.actions";
import {stationViewOverview} from "../../store/stationViewOverview.model";
import {environment} from "../../../../../../environments/environment";
import {SysConfirmationComponent} from "../../../../../core/sys-confirmation/sys-confirmation.component";
import {stationFavViewModel, stationViewModel} from "../../../../station/store/stationView.model";
import {filter, take} from "rxjs";
import {updateStation} from "../../../../station/store/stationView.actions";

@Component({
  selector: 'app-station-overview-image',
  templateUrl: './station-overview-image.component.html',
  styleUrl: './station-overview-image.component.scss'
})
export class StationOverviewImageComponent implements OnInit, OnDestroy, OnChanges{
  constructor(private store:Store<AppStateModel>,
              private confirm:MatDialog) {
  }

  @Input() stationViewInput!:stationViewOverview;

  stationImageUrl: string | null = null;
  selectedFile: File | null = null;

  stationView!:stationFavViewModel;

  private API_URL= environment.API_URL;

  ngOnInit(): void {
    this.stationImageUrl = "";
  }

  onFileSelected(fileInputEvent: any) {
    const input:HTMLInputElement = fileInputEvent.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile.name);
      this.uploadImage();
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(uploadImage({image:formData, typ:2}));

      this.updateStation(this.selectedFile.name);
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
        this.store.dispatch(deleteImage({imageName:fileName, typ:2}))

        this.stationView = {
          ...this.stationViewInput.stationViewOverview,
          station: {
            ...this.stationViewInput.stationViewOverview.station,
            image: "" // delete the image
          }
        };
        this.store.dispatch(loadSpinner({isLoading:true}));
        this.store.dispatch(updateStation({stationViewInput:this.stationView}))
      }
    })
  }

  initStationImageUrl(){
    if(this.stationViewInput){
      if(this.stationViewInput.stationViewOverview.station.image){
        this.stationImageUrl = this.API_URL + "/upload/image/" + this.stationViewInput.stationViewOverview.station.image + "/2"
      }
    }
  }

  updateStation(image:string){
    this.store.dispatch(loadSpinner({isLoading:true}));
    this.stationView = {
      ...this.stationViewInput.stationViewOverview,
      station: {
        ...this.stationViewInput.stationViewOverview.station,
        image: image // Update the image
      }
    };
    console.log(this.stationView)
    this.store.dispatch(updateStation({stationViewInput:this.stationView}))
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stationViewInput'] && this.stationViewInput) {
      this.initStationImageUrl();
    }
  }
}
