import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexmonsterPivotModule } from "ng-flexmonster";
import { GoogleChartsModule } from "angular-google-charts";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FlexmonsterPivotModule,
    BrowserAnimationsModule,
    GoogleChartsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
