import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiCacheModule } from '@tyris/ngx-api-cache';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApiCacheModule.forRoot({}),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
