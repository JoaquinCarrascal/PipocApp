import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SeriesComponent } from './pages/series/series.component';
import { SerieDetailsComponent } from './pages/serie-details/serie-details.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'movie-list', component: MovieListComponent},
  {path : 'series', component : SeriesComponent},
  {path: 'series/details/:idSerie', component: SerieDetailsComponent},
  {path: '' , redirectTo: '/home', pathMatch: 'full'},

  //{path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
