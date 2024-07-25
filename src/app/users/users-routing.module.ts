import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/guards/auth.guard';

import { LayoutPageComponent, ListComponent, CreateComponent } from './pages/index';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'list', component: ListComponent, canActivate: [AuthGuard], data: {name: 'UsersList'} },
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard], data: {name: 'UsersCreate'} },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
