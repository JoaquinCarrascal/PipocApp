import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {PeopleComponent } from './pages/people/people.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path: 'people', component: PeopleComponent}
  //{path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
