import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsMovieComponent } from './pages/details-movie/details-movie.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path: 'movies/detail', component: DetailsMovieComponent}
  //{path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
