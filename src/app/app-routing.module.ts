import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindComponent } from './components/find/find.component';
import { ResultComponent } from './components/result/result.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [

  { path: '', component: FindComponent },
  { path: 'result', component: ResultComponent, canActivate: [AuthguardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
