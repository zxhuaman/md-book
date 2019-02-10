import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
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
import {CreateFileDialogComponent} from './create-file-dialog/create-file-dialog.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  entryComponents: [
    CreateFileDialogComponent
  ],
  declarations: [
    AppComponent,
    CreateFileDialogComponent,
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
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
