import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './screens/auth/auth.component';
import { AuthGuard } from './screens/auth/auth-guard.service';
import { ReportComponent } from './screens/report/report.component';

const routes: Routes = [
  { path: 'auth/:type', component: AuthComponent },
  {
    path: '',
    component: ReportComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
