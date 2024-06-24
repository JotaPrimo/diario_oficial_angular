import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListComponent } from './pages/list/list.component';
import { NavSidebarComponent } from '../shared/components/nav-sidebar';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [
    LayoutPageComponent,
    ListComponent
  ]
})
export class UsersModule { }
