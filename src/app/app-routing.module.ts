import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EditComponent} from './component/edit/edit.component';
import {LoginComponent} from './component/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'edit', component: EditComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
