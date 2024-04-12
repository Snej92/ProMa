import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth-guard.guard";
import {UserAdministrationComponent} from "./modules/userAdministration/components/user-administration/user-administration.component";
import {DashboardComponent} from "./modules/dashboard/components/dashboard.component";

const routes: Routes = [
  {path: 'userAdministration', component: UserAdministrationComponent, canActivate: [AuthGuard]},
  {path: 'home', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
