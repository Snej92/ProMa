import {APP_INITIALIZER, NgModule, isDevMode, LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbar } from "@angular/material/toolbar";
import {NgOptimizedImage, registerLocaleData} from "@angular/common";
import {MatAnchor, MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTooltip, TooltipComponent} from "@angular/material/tooltip";
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
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDivider} from "@angular/material/divider";
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './modules/dashboard/components/dashboard.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { ThemeToggleComponent } from './page-template/theme-toggle/theme-toggle.component';
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import { SysSidenavComponent } from './page-template/sys-sidenav/sys-sidenav.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import { CustomSidenavComponent } from './page-template/sys-sidenav/custom-sidenav/custom-sidenav.component';
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OverviewComponent } from './modules/overview/components/overview.component';
import { VersionComponent } from './modules/settings/version/components/version.component';
import { StationComponent } from './modules/station/components/station.component';
import { SettingsComponent } from './modules/settings/components/settings.component';
import {AppState} from "./core/store/app.state";
import { AddVersionComponent } from './modules/settings/version/components/add-version/add-version.component';
import { SysButtonComponent } from './page-template/sys-button/sys-button.component';
import { LopComponent } from './modules/overview/lop/components/lop.component';
import {LopEffects} from "./modules/overview/lop/store/lop.effects";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import { SysNavButtonComponent } from './page-template/sys-nav-button/sys-nav-button.component';
import {AppEffect} from "./core/store/app.effect";
import { SysLoadingspinnerComponent } from './page-template/sys-loadingspinner/sys-loadingspinner.component';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import { ProjectAdministrationComponent } from './modules/project-administration/components/project-administration.component';
import { ProjectCardComponent } from './modules/project-administration/components/project-card/project-card.component';
import {
  ProjectAdministrationEffects
} from "./modules/project-administration/store/project-administration.effects";
import {UserAdministrationEffects} from "./modules/userAdministration/store/user-administration.effects";
import { AddUserComponent } from './modules/userAdministration/components/add-user/add-user.component';
import {MatCheckbox} from "@angular/material/checkbox";
import { HoverElevationDirective } from './page-template/directives/project-elevation/hover-elevation.directive';
import {LoggedUserEffects} from "./core/logged-user/logged-user.effects";
import {ActiveProjectEffects} from "./core/active-project/active-project.effects";
import { AddProjectComponent } from './modules/project-administration/components/add-project/add-project.component';
import { SysConfirmationComponent } from './core/sys-confirmation/sys-confirmation.component';
import {MatDialogClose} from "@angular/material/dialog";
import { StationCardComponent } from './modules/station/components/station-card/station-card.component';
import {StationViewEffects} from "./modules/station/store/stationView.effects";
import { AddStationComponent } from './modules/station/components/add-station/add-station.component';
import {MatTab, MatTabContent, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {VersionEffects} from "./modules/settings/version/store/version.effects";
import {CdkScrollable} from "@angular/cdk/overlay";
import { SysStatusLedComponent } from './page-template/sys-status-led/sys-status-led.component';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule, MatRipple,
  provideNativeDateAdapter
} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HistoryComponent } from './modules/overview/history/components/history.component';
import {HistoryEffects} from "./modules/overview/history/store/history.effects";
import { AddHistoryComponent } from './modules/overview/history/components/add-history/add-history.component';
import { ControlSettingsComponent } from './modules/settings/control-settings/components/control-settings.component';
import { DocumentationSettingsComponent } from './modules/settings/documentation-settings/components/documentation-settings.component';
import {
  DocumentationSettingEffects
} from "./modules/settings/documentation-settings/store/documentationSetting.effects";
import { AddDocumentationComponent } from './modules/settings/documentation-settings/components/add-documentation/add-documentation.component';
import { ProjectionSettingsComponent } from './modules/settings/projection-settings/components/projection-settings.component';
import { SpecificationSettingsComponent } from './modules/settings/specification-settings/components/specification-settings.component';
import {ControlSettingEffects} from "./modules/settings/control-settings/store/controlSetting.effects";
import {ProjectionSettingEffects} from "./modules/settings/projection-settings/store/projectionSetting.effects";
import {
  SpecificationSettingEffects
} from "./modules/settings/specification-settings/store/specificationSetting.effects";
import { AddControlComponent } from './modules/settings/control-settings/components/add-control/add-control.component';
import { AddProjectionComponent } from './modules/settings/projection-settings/components/add-projection/add-projection.component';
import { AddSpecificationComponent } from './modules/settings/specification-settings/components/add-specification/add-specification.component';
import { TechnicalDataSettingsComponent } from './modules/settings/TechnicalData-settings/components/technical-data-settings.component';
import { HeaderDataSettingsComponent } from './modules/settings/HeaderData-settings/components/header-data-settings.component';
import { AddHeaderDataComponent } from './modules/settings/HeaderData-settings/components/add-header-data/add-header-data.component';
import { AddTechnicalDataComponent } from './modules/settings/TechnicalData-settings/components/add-technical-data/add-technical-data.component';
import {HeaderDataSettingEffects} from "./modules/settings/HeaderData-settings/store/headerDataSetting.effects";
import {
  TechnicalDataSettingEffects
} from "./modules/settings/TechnicalData-settings/store/technicalDataSetting.effects";
import { DocumentationComponent } from './modules/overview/documentation/components/documentation.component';
import {DocumentationEffects} from "./modules/overview/documentation/store/documentation.effects";
import { ControlComponent } from './modules/overview/control/components/control.component';
import { ProjectionComponent } from './modules/overview/projection/components/projection.component';
import { SpecificationComponent } from './modules/overview/specification/components/specification.component';
import {ControlEffects} from "./modules/overview/control/store/control.effects";
import {SpecificationEffects} from "./modules/overview/specification/store/specification.effects";
import {ProjectionEffects} from "./modules/overview/projection/store/projection.effects";
import { HeaderDataComponent } from './modules/overview/headerData/components/header-data.component';
import { TechnicalDataComponent } from './modules/overview/technicalData/components/technical-data.component';
import {HeaderDataEffects} from "./modules/overview/headerData/store/headerData.effects";
import {TechnicalDataEffects} from "./modules/overview/technicalData/store/technicalData.effects";
import { StationOverviewComponent } from './modules/overview/station/components/station-overview.component';
import { StationOverviewGeneralComponent } from './modules/overview/station/components/station-overview-general/station-overview-general.component';
import {
  StationOverviewDocumentationComponent
} from "./modules/overview/station/components/station-overview-documentation/station-overview-documentation.component";
import {
  StationOverviewSpecificationComponent
} from "./modules/overview/station/components/station-overview-specification/station-overview-specification.component";
import {
  StationOverviewControlComponent
} from "./modules/overview/station/components/station-overview-control/station-overview-control.component";
import {
  StationOverviewLopComponent
} from "./modules/overview/station/components/station-overview-lop/station-overview-lop.component";
import { AddLopComponent } from './modules/overview/lop/components/add-lop/add-lop.component';
import {StationViewOverviewEffects} from "./modules/overview/station/store/stationViewOverview.effects";
import { StationOverviewProjectionComponent } from './modules/overview/station/components/station-overview-projection/station-overview-projection.component';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import { OverallViewComponent } from './modules/overall-view/components/overall-view.component';
import {StationOverallViewEffects} from "./modules/overall-view/store/stationOverallView.effects";
import { ThreeStateButtonComponent } from './page-template/three-state-button/three-state-button.component';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import localeDe from '@angular/common/locales/de';
import {GermanDateAdapter} from "./core/GermanDateAdapter";
import { CalenderComponent } from './modules/calender/components/calender.component';
import {CalenderEffects} from "./modules/calender/store/calender.effects";
import {ColorChromeModule} from "ngx-color/chrome";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { VersionOverviewComponent } from './modules/overview/version-overview/version-overview.component';
import {ProjectFavoriteEffects} from "./modules/dashboard/project/store/project-favorite.effects";
import {MatSlider, MatSliderRangeThumb} from "@angular/material/slider";

const config: SocketIoConfig = { url: 'http://localhost:7081/ws-endpoint', options: {} };


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://kc.snejcloud.de/',
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

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    UserAdministrationComponent,
    DashboardComponent,
    ThemeToggleComponent,
    SysSidenavComponent,
    CustomSidenavComponent,
    OverviewComponent,
    VersionComponent,
    StationComponent,
    SettingsComponent,
    AddVersionComponent,
    SysButtonComponent,
    LopComponent,
    SysNavButtonComponent,
    SysLoadingspinnerComponent,
    ProjectAdministrationComponent,
    ProjectCardComponent,
    AddUserComponent,
    HoverElevationDirective,
    AddProjectComponent,
    SysConfirmationComponent,
    StationCardComponent,
    AddStationComponent,
    SysStatusLedComponent,
    HistoryComponent,
    AddHistoryComponent,
    ControlSettingsComponent,
    DocumentationSettingsComponent,
    AddDocumentationComponent,
    ProjectionSettingsComponent,
    SpecificationSettingsComponent,
    AddControlComponent,
    AddProjectionComponent,
    AddSpecificationComponent,
    TechnicalDataSettingsComponent,
    HeaderDataSettingsComponent,
    AddHeaderDataComponent,
    AddTechnicalDataComponent,
    DocumentationComponent,
    ControlComponent,
    ProjectionComponent,
    SpecificationComponent,
    HeaderDataComponent,
    TechnicalDataComponent,
    StationOverviewComponent,
    StationOverviewGeneralComponent,
    StationOverviewDocumentationComponent,
    StationOverviewSpecificationComponent,
    StationOverviewControlComponent,
    StationOverviewLopComponent,
    AddLopComponent,
    StationOverviewProjectionComponent,
    OverallViewComponent,
    ThreeStateButtonComponent,
    CalenderComponent,
    VersionOverviewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    KeycloakAngularModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    StoreModule.forRoot(AppState),
    EffectsModule.forRoot([
      LopEffects,
      AppEffect,
      ProjectAdministrationEffects,
      UserAdministrationEffects,
      LoggedUserEffects,
      ActiveProjectEffects,
      StationViewEffects,
      VersionEffects,
      HistoryEffects,
      DocumentationSettingEffects,
      ControlSettingEffects,
      ProjectionSettingEffects,
      SpecificationSettingEffects,
      HeaderDataSettingEffects,
      TechnicalDataSettingEffects,
      DocumentationEffects,
      ControlEffects,
      SpecificationEffects,
      ProjectionEffects,
      HeaderDataEffects,
      TechnicalDataEffects,
      StationViewOverviewEffects,
      StationOverallViewEffects,
      CalenderEffects,
      ProjectFavoriteEffects]),


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
    MatMiniFabButton,
    MatGridList,
    MatGridTile,
    MatProgressSpinner,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatCheckbox,
    MatCardSubtitle,
    MatDialogClose,
    MatTabNav,
    MatTabLink,
    MatTabGroup,
    MatTab,
    MatTabNavPanel,
    MatTabContent,
    CdkScrollable,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatHint,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSuffix,
    MatSlideToggle,
    MatRadioGroup,
    MatRadioButton,
    TooltipComponent,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatError,
    MatAnchor,
    ColorChromeModule,
    MatRipple,
    MatAccordion,
    MatSlider,
    MatSliderRangeThumb
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    { provide: DateAdapter, useClass: GermanDateAdapter },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
