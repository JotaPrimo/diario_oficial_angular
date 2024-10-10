import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ListComponent, CreateComponent, EditComponent, SearchComponent } from './pages/index';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    LayoutPageComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    SearchComponent
  ]
})
export class UsersModule { }
