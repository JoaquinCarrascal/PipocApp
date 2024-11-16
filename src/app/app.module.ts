import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DateFormaterPipe } from './pipes/date-formater.pipe';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    DateFormaterPipe,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgCircleProgressModule.forRoot({
      "radius": 25,
      "space": -20,
      "unitsColor": "#09273c",
      "outerStrokeWidth": 7,
      "outerStrokeColor": "#00ffae",
      "innerStrokeWidth": 0,
      "titleColor": "#09273c",
      "titleFontSize": "22",
      "showSubtitle": false,
      "showUnits": false,
      "showBackground": false,
      "showInnerStroke": false,
      "startFromZero": false}),
    MatSelectModule,
    MatSliderModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    DateFormaterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
