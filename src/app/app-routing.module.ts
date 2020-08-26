import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindComponent } from './components/find/find.component';
import { ResultComponent } from './components/result/result.component';
import { AuthguardService } from './services/authguard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  { path: '', component: HomeComponent},
  {path:'find', component:FindComponent},
  { path: 'result', component: ResultComponent, canActivate: [AuthguardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
