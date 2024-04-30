import {APP_INITIALIZER, NgModule, isDevMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbar } from "@angular/material/toolbar";
import {NgOptimizedImage} from "@angular/common";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
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
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OverviewComponent } from './modules/overview/components/overview.component';
import { VersionComponent } from './modules/version/components/version.component';
import { StationComponent } from './modules/station/components/station.component';
import { SettingsComponent } from './modules/settings/components/settings.component';
import {versionReducer} from "./modules/version/store/version.reducers";
import {AppState} from "./core/store/app.state";
import { AddVersionComponent } from './modules/version/components/add-version/add-version.component';
import { SysButtonComponent } from './page-template/sys-button/sys-button.component';
import { LopComponent } from './modules/overview/lop/lop.component';

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
    CustomSidenavComponent,
    OverviewComponent,
    VersionComponent,
    StationComponent,
    SettingsComponent,
    AddVersionComponent,
    SysButtonComponent,
    LopComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    KeycloakAngularModule,
    HttpClientModule,
    StoreModule.forRoot(AppState),
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
    MatListItemIcon,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    MatCardActions,
    ReactiveFormsModule,
    MatMiniFabButton
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
