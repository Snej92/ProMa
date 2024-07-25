import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStateModel} from "../../../../core/store/appState.model";
import {
  documentationSetting,
  editDocumentationSettingModel
} from "../store/documentationSetting.model";
import {loadSpinner} from "../../../../core/store/app.action";
import {
  deleteSettingDocumentation,
  loadSettingDocumentation, updateSettingDocumentation,
} from "../store/documentationSetting.actions";
import {getSettingDocumentationById, getSettingDocumentationInfo} from "../store/documentationSetting.selectors";
import {MatDialog} from "@angular/material/dialog";
import {AddDocumentationComponent} from "./add-documentation/add-documentation.component";
import {SysConfirmationComponent} from "../../../../core/sys-confirmation/sys-confirmation.component";


@Component({
  selector: 'app-documentation-settings',
  templateUrl: './documentation-settings.component.html',
  styleUrl: './documentation-settings.component.scss'
})
export class DocumentationSettingsComponent implements OnInit, OnDestroy{

  //Inits
  documentationSettings : documentationSetting = {
    documentationSettingList:[],
    errorMessage:''
  };
  private subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['Aktion','Doku'];
  editDocumentationSettings: { [key: number]: editDocumentationSettingModel } = {};

  constructor(private store:Store<AppStateModel>,
              private dialog:MatDialog,
              private confirm:MatDialog) {
  }

  addDocumentationSetting(){
    this.openPopup(0,"Doku Hinzufügen", false);
  }

  deleteDocumentation(id:any, deleteName:any){
    console.log(id)
    this.openConfirm('Doku', deleteName, 'Löschen', id);
  }

  openConfirm(title:any, confirmName:any, button:any, id:any){
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
        console.log(id)
        this.store.dispatch(loadSpinner({isLoading:true}));
        this.store.dispatch(deleteSettingDocumentation({id:id}))
      }
    })
  }

  openPopup(id:any, title:any, isEdit=false){
    this.dialog.open(AddDocumentationComponent,{
      width:'40%',
      data:{
        id:id,
        title:title,
        isEdit:isEdit
      }
    })
  }

  editDocumentationSetting(id:any){
    if (this.editDocumentationSettings[id]) {
      this.editDocumentationSettings[id].isEdit = !this.editDocumentationSettings[id].isEdit;
      this.store.select(getSettingDocumentationById(id)).subscribe(data => {
        if (data) {
          this.editDocumentationSettings[id] = {
            ...this.editDocumentationSettings[id],
            documentationSetting: { ...data },
          };
        }
      });
    } else{
      console.error('Invalid ID:', id);
    }
  }

  updateDocumentationSetting(id:any){
    if (this.editDocumentationSettings[id]) {
      console.log(this.editDocumentationSettings[id])
      this.editDocumentationSettings[id].isEdit = !this.editDocumentationSettings[id].isEdit;
          this.store.dispatch(loadSpinner({isLoading:true}));
          this.store.dispatch(updateSettingDocumentation({documentationSettingInput:this.editDocumentationSettings[id].documentationSetting}));
    } else{
      console.error('Invalid ID:', id);
    }
  }

  cancelEditDocumentationSetting(id:any){
    if (this.editDocumentationSettings[id]) {
      this.editDocumentationSettings[id].isEdit = !this.editDocumentationSettings[id].isEdit;
      this.editDocumentationSettings[id].documentationSetting.item = "";
      this.editDocumentationSettings[id].documentationSetting.type = "";
    } else{
      console.error('Invalid ID:', id);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoading: true}));
    this.store.dispatch(loadSettingDocumentation());
    this.subscriptions.push(
      this.store.select(getSettingDocumentationInfo).pipe()
        .subscribe(data => {
          this.documentationSettings = data;
          this.editDocumentationSettings = data.documentationSettingList.reduce((acc, item) => {
            acc[item.id] = {
              documentationSetting: { ...item },
              isEdit: false,
            };
            return acc;
          }, {} as { [key: number]: editDocumentationSettingModel });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
