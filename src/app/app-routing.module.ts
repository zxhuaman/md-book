import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'edit', pathMatch: 'full'},
  {path: 'edit', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
