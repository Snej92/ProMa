import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";

import {Store} from "@ngrx/store";
import {AppStateModel} from "./core/store/appState.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'ProMa - SYSPROTEC';

  public constructor(private titleService: Title,
                     private store:Store<AppStateModel>){}

  public setTitle(newTitle: string){
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    console.log('Init Page')
    this.setTitle(this.title);
  }

  ngOnDestroy(): void {

  }
}
