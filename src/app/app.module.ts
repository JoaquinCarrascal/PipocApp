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
import { MatSliderModule } from '@angular/material/slider';
import { SerieDetailsComponent } from './pages/serie-details/serie-details.component'; // Add this line
import { DateFormaterPipe } from './pipes/date-formater.pipe';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MatSelectModule } from '@angular/material/select';
import { OrderTriggerPipe } from './pipes/order-trigger.pipe';
import { ApprovedComponent } from './pages/approved/approved.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { RatingModule } from 'primeng/rating';
import { RatedSeriesComponent } from './pages/rated-series-movies/rated-series-movies.component';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatMenuModule } from '@angular/material/menu';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {MatExpansionModule} from '@angular/material/expansion';
import { ShowStatusPipe } from './pipes/show-status.pipe';
import { FavListComponent } from './pages/fav-list/fav-list.component';

import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { AuthService } from './services/auth.service';

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
    SerieDetailsComponent,
    DateFormaterPipe,
    MovieListComponent,
    OrderTriggerPipe,
    ApprovedComponent,
    MyListComponent,
    RatedSeriesComponent,
    ShowStatusPipe,
    FavListComponent,
    WatchlistComponent
  ],
  imports: [
    ToastModule,
    ButtonModule,
    RippleModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RatingModule,
    MatIconModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
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
      "startFromZero": false
    }),
    MatSliderModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: 'circleProgressConfig', useValue: {} },
    DateFormaterPipe,
    OrderTriggerPipe,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
