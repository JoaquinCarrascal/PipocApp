import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SeriesComponent } from './pages/series/series.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path : 'series', component : SeriesComponent}


  //{path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
