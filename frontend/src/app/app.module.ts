import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbar } from "@angular/material/toolbar";
import {NgOptimizedImage} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import { SysToolbarComponent } from './page-template/sys-toolbar/sys-toolbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTooltip} from "@angular/material/tooltip";
import { UserAdministrationComponent } from './modules/userAdministration/components/user-administration/user-administration.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatDivider} from "@angular/material/divider";
import { UserFormComponent } from './modules/userAdministration/components/user-form/user-form.component';
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './modules/dashboard/components/dashboard.component';
import {Action, ActionReducerMap, StoreModule} from "@ngrx/store";
import {USER_ADMINISTRATION_STORE_KEY} from "./modules/userAdministration/store/user-administration.reducers";
import * as fromUserAdministration from "./modules/userAdministration/store/user-administration.reducers";
import {UserAdministrationEffects} from "./modules/userAdministration/store/user-administration.effects";
import {EffectsModule} from "@ngrx/effects";
import { ThemeToggleComponent } from './page-template/theme-toggle/theme-toggle.component';
import { CounterComponent } from './modules/counter/counter.component';
import {counterReducer} from "./modules/counter/store/counter.reducer";
import { CounterDisplayComponent } from './modules/counter/counter-display/counter-display.component';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import { CustomCounterComponent } from './modules/counter/custom-counter/custom-counter.component';
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import { SysSidenavComponent } from './page-template/sys-sidenav/sys-sidenav.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import { CustomSidenavComponent } from './page-template/sys-sidenav/custom-sidenav/custom-sidenav.component';
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";

const reducers: ActionReducerMap<unknown, Action>= {
  [USER_ADMINISTRATION_STORE_KEY]: fromUserAdministration.userAdministrationReducer,
};
const effects = [
  UserAdministrationEffects
];

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081',
        realm: 'ProMa',
        clientId: 'backend'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    SysToolbarComponent,
    UserAdministrationComponent,
    UserFormComponent,
    DashboardComponent,
    ThemeToggleComponent,
    CounterComponent,
    CounterDisplayComponent,
    CustomCounterComponent,
    SysSidenavComponent,
    CustomSidenavComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    KeycloakAngularModule,
    HttpClientModule,
    StoreModule.forRoot({counter: counterReducer}),
    // EffectsModule.forRoot(effects),


    MatToolbar,
    NgOptimizedImage,
    MatButton,
    MatIcon,
    MatIconButton,
    NgbModule,
    MatTooltip,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCard,
    MatCardHeader,
    MatCardContent,
    FormsModule,
    MatDivider,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatLabel,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    MatListItemIcon
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}