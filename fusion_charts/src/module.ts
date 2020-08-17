//our root app component
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {App} from './app'

// Fix for "Expression has changed after it was checked. Previous value: container-"
import {enableProdMode} from '@angular/core'
enableProdMode();

import {FusionChartsModule} from 'angular2-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load Ocean theme
import * as Fint from 'fusioncharts/themes/fusioncharts.theme.fint';

@NgModule({
  imports: [
    BrowserModule,
    FusionChartsModule.forRoot(FusionCharts, Charts, Fint)
  ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}