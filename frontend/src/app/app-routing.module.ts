import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth-guard.guard";
import {UserAdministrationComponent} from "./modules/userAdministration/components/user-administration/user-administration.component";
import {DashboardComponent} from "./modules/dashboard/components/dashboard.component";
import {OverviewComponent} from "./modules/overview/components/overview.component";
import {VersionComponent} from "./modules/settings/version/components/version.component";
import {StationComponent} from "./modules/station/components/station.component";
import {SettingsComponent} from "./modules/settings/components/settings.component";
import {ProjectAdministrationComponent} from "./modules/project-administration/components/project-administration.component";
import {OverallViewComponent} from "./modules/overall-view/components/overall-view.component";
import {CalenderComponent} from "./modules/calender/components/calender.component";

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: "dashboard"},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},
  {path: 'version', component: VersionComponent, canActivate: [AuthGuard]},
  {path: 'station', component: StationComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data:{roles:['project', 'admin']}},
  {path: 'overall', component: OverallViewComponent, canActivate: [AuthGuard]},
  {path: 'userAdministration', component: UserAdministrationComponent, canActivate: [AuthGuard], data:{roles:['admin']}},
  {path: 'projectAdministration/:archive', component: ProjectAdministrationComponent, canActivate: [AuthGuard]},
  {path: 'calender', component: CalenderComponent, canActivate: [AuthGuard], data:{roles:['admin']}},
  {path: '**', component: DashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
