import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SeriesComponent } from './pages/series/series.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeriesHeaderComponent } from './components/series-header/series-header.component';
import { MatSliderModule } from '@angular/material/slider'; // Add this line

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    SeriesComponent,
    SeriesHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
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
      MatSliderModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: 'circleProgressConfig', useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
