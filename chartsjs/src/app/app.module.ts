import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PusherService} from './pusher.service';
import { ChartsComponent } from './charts/charts.component';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule

  ],
  providers: [PusherService],
  bootstrap: [AppComponent]
})
export class AppModule { }