import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DataResolver } from './services/data.resolver';

const routes: Routes = [
  { path: '', component: LoadingComponent },
  { path: 'home', component: HomeComponent, resolve: [DataResolver] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
