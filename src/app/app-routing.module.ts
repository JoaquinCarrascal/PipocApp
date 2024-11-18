import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SeriesComponent } from './pages/series/series.component';
import { SerieDetailsComponent } from './pages/serie-details/serie-details.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path : 'series', component : SeriesComponent},
  {path: 'series/details/:idSerie', component: SerieDetailsComponent},

  //{path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
