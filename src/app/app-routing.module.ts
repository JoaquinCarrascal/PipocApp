import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsMovieComponent } from './pages/details-movie/details-movie.component';
import { PeopleComponent } from './pages/people/people.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { SeriesComponent } from './pages/series/series.component';
import { SerieDetailsComponent } from './pages/serie-details/serie-details.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { ApprovedComponent } from './pages/approved/approved.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { RatedSeriesComponent } from './pages/rated-series-movies/rated-series-movies.component';
import { FavListComponent } from './pages/fav-list/fav-list.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'movie-list', component: MovieListComponent},
  {path: 'details-movie/:idMovie', component: DetailsMovieComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'person/:id', component: PersonDetailsComponent},
  {path: 'series', component : SeriesComponent},
  {path: 'series/details/:idSerie', component: SerieDetailsComponent},
  {path : 'series/rated', component: RatedSeriesComponent},
  {path: 'home/approved' , component: ApprovedComponent},
  {path: 'user-lists' , component: MyListComponent},
  {path: 'fav-list', component: FavListComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  

  //{path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
