import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditComponent} from './component/edit/edit.component';
import {LoginComponent} from './component/login/login.component';
import {RouteCanActivate} from './route-can-activate';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'edit', component: EditComponent, canActivate: [RouteCanActivate]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteCanActivate]
})
export class AppRoutingModule {
}



