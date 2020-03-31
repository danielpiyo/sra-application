import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DetailsmModal } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatCardModule, MatChipsModule, MatButtonModule, MatCheckboxModule, MatRadioModule,
   MatIconModule, MatListModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, DetailsmModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule,
    BrowserAnimationsModule, MatCardModule, MatChipsModule, MatButtonModule, MatCheckboxModule, MatRadioModule,
    MatListModule, MatIconModule, MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    DetailsmModal
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
