import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {stationViewOverview} from "../../store/stationViewOverview.model";
import {loadSpinner} from "../../../../../core/store/app.action";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../../core/store/appState.model";
import {updateStation} from "../../../../station/store/stationView.actions";
import {Editor, Toolbar} from "ngx-editor";



@Component({
  selector: 'app-station-overview-note',
  templateUrl: './station-overview-note.component.html',
  styleUrl: './station-overview-note.component.scss'
})
export class StationOverviewNoteComponent implements OnChanges, OnInit, OnDestroy{

  constructor(private store:Store<AppStateModel>) {
  }

  @Input() stationViewInput!:stationViewOverview;
  stationViewEdit!:stationViewOverview;

  isEdit : boolean = false;
  editNote : string = "";
  stationNote: string = "";

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    // ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // or, set options for link:
    //[{ link: { showOpenInNewTab: false } }, 'image'],
    // ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    // ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
  ];

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stationViewInput'] && this.stationViewInput) {
      this.stationNote = this.stationViewInput.stationViewOverview.station.note;
    }
  }

  toggleEditMode(event: Event)
  {
    this.isEdit = !this.isEdit;
    if(this.isEdit)
    {
      this.editNote = this.stationViewInput.stationViewOverview.station.note;
    }
    else
    {
      this.stationViewEdit = {
        stationViewOverview: {
          station: {
            id: this.stationViewInput.stationViewOverview.station.id,
            name: this.stationViewInput.stationViewOverview.station.name,
            description: this.stationViewInput.stationViewOverview.station.description,
            issuerAcronym: this.stationViewInput.stationViewOverview.station.issuerAcronym,
            issuerName: this.stationViewInput.stationViewOverview.station.issuerName,
            status: this.stationViewInput.stationViewOverview.station.status,
            totalProgress: this.stationViewInput.stationViewOverview.station.totalProgress,
            version: this.stationViewInput.stationViewOverview.station.version,
            image: this.stationViewInput.stationViewOverview.station.image,
            lopTotal: this.stationViewInput.stationViewOverview.station.lopTotal,
            lopDone: this.stationViewInput.stationViewOverview.station.lopDone,
            lopToDo: this.stationViewInput.stationViewOverview.station.lopToDo,
            lopProgress: this.stationViewInput.stationViewOverview.station.lopProgress,
            documentationTotal: this.stationViewInput.stationViewOverview.station.documentationTotal,
            documentationDone: this.stationViewInput.stationViewOverview.station.documentationDone,
            documentationToDo: this.stationViewInput.stationViewOverview.station.documentationToDo,
            documentationProgress: this.stationViewInput.stationViewOverview.station.documentationProgress,
            specificationTotal: this.stationViewInput.stationViewOverview.station.specificationTotal,
            specificationDone: this.stationViewInput.stationViewOverview.station.specificationDone,
            specificationToDo: this.stationViewInput.stationViewOverview.station.specificationToDo,
            specificationProgress: this.stationViewInput.stationViewOverview.station.specificationProgress,
            controlTotal: this.stationViewInput.stationViewOverview.station.controlTotal,
            controlDone: this.stationViewInput.stationViewOverview.station.controlDone,
            controlToDo: this.stationViewInput.stationViewOverview.station.controlToDo,
            controlProgress: this.stationViewInput.stationViewOverview.station.controlProgress,
            projectionTotal: this.stationViewInput.stationViewOverview.station.projectionTotal,
            projectionDone: this.stationViewInput.stationViewOverview.station.projectionDone,
            projectionToDo: this.stationViewInput.stationViewOverview.station.projectionToDo,
            projectionProgress: this.stationViewInput.stationViewOverview.station.projectionProgress,
            note: this.stationNote
          } ,
          isFavorite: this.stationViewInput.stationViewOverview.isFavorite
        },
        errorMessage: this.stationViewInput.errorMessage
      };

      this.stationViewEdit.stationViewOverview.station.note = this.stationNote;
      console.log(this.stationViewEdit);
      this.store.dispatch(loadSpinner({isLoading:true}));
      this.store.dispatch(updateStation({stationViewInput:this.stationViewEdit.stationViewOverview}))
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
