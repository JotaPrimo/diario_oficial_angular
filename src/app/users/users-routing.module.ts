import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/guards/auth.guard';

/** Components */
import { LayoutPageComponent, ListComponent, CreateComponent, EditComponent } from './pages/index';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'list', component: ListComponent, canActivate: [AuthGuard], data: {name: 'UsersList'} },
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard], data: {name: 'UsersCreate'} },
      { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard], data: {name: 'UsersEdit'} },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
