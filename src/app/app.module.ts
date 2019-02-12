import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {EditorComponent} from './editor/editor.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatSnackBarModule,
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {CreateFileDialogComponent} from './dialog/create-file-dialog.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {TuiModule} from 'ngx-tui-editor';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'editor', component: EditorComponent}
];

@NgModule({
  entryComponents: [
    CreateFileDialogComponent
  ],
  declarations: [
    EditorComponent,
    CreateFileDialogComponent,
    LoginComponent,
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes),
    TuiModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
