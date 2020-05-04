import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InlineComponent } from './pages/inline/inline.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'index', component: InlineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
