import { NgModule } from '@angular/core';

// components
import { CardBodyComponent, CardFooterComponent, CardHeaderComponent } from './components/card';
import { FooterComponent } from './components/footer';
import { NavSidebarComponent } from './components/nav-sidebar';
import { NavSuperiorComponent } from './components/nav-superior';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardBodyComponent,
    CardFooterComponent,
    CardHeaderComponent,
    FooterComponent,
    LoadingComponent,
    NavSidebarComponent,
    NavSuperiorComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CardBodyComponent,
    CardFooterComponent,
    CardHeaderComponent,
    FooterComponent,
    NavSidebarComponent,
    NavSuperiorComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
