import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth-guard.guard";
import {UserAdministrationComponent} from "./modules/userAdministration/components/user-administration/user-administration.component";
import {DashboardComponent} from "./modules/dashboard/components/dashboard.component";
import {CounterComponent} from "./modules/counter/counter.component";
import {OverviewComponent} from "./modules/overview/components/overview.component";
import {VersionComponent} from "./modules/version/components/version.component";
import {StationComponent} from "./modules/station/components/station.component";
import {SettingsComponent} from "./modules/settings/components/settings.component";

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: "dashboard"},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'overview', component: OverviewComponent},
  {path: 'version', component: VersionComponent},
  {path: 'station', component: StationComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'userAdministration', component: UserAdministrationComponent, canActivate: [AuthGuard]},

  {path: 'test', component: CounterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
