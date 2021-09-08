import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StorageModule } from './storage/storage.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, StorageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
