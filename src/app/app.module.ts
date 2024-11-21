import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DetailsMovieComponent } from './pages/details-movie/details-movie.component';
import { IdiomPipe } from './pipes/idiom.pipe';
import { MatIconModule } from '@angular/material/icon';
import { PeopleComponent } from './pages/people/people.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { PersonSexPipe } from './pipes/person-sex.pipe';
import { SeriesComponent } from './pages/series/series.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeriesHeaderComponent } from './components/series-header/series-header.component';
import { MatSliderModule } from '@angular/material/slider';
import { SerieDetailsComponent } from './pages/serie-details/serie-details.component'; // Add this line
import { DateFormaterPipe } from './pipes/date-formater.pipe';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MatSelectModule } from '@angular/material/select';
import { OrderTriggerPipe } from './pipes/order-trigger.pipe';
import { ApprovedComponent } from './components/approved/approved.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    DetailsMovieComponent,
    IdiomPipe,
    PeopleComponent,
    PersonDetailsComponent,
    PersonSexPipe,
    SeriesComponent,
    SeriesHeaderComponent,
    SerieDetailsComponent,
    DateFormaterPipe,
    MovieListComponent,
    OrderTriggerPipe,
    ApprovedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatIconModule,
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
      MatSelectModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: 'circleProgressConfig', useValue: {} },
    DateFormaterPipe,
    OrderTriggerPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
