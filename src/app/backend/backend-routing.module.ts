import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackendComponent } from './backend.component';
import { AuthGuard } from '@appBackend/auth/auth.guard';

const backendRoutes: Routes = [
  {
    path: '', component: BackendComponent, children: [
      { path: '', loadChildren: '@appBackend/auth/auth.module#AuthModule' },
      { path: 'dashboard', canActivate: [AuthGuard], loadChildren: '@appBackend/dashboard/dashboard.module#DashboardModule' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(backendRoutes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
