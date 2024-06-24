import { NgModule } from '@angular/core';

// components
import { CardBodyComponent, CardFooterComponent, CardHeaderComponent } from './components/card';
import { FooterComponent } from './components/footer';
import { NavSidebarComponent } from './components/nav-sidebar';
import { NavSuperiorComponent } from './components/nav-superior';



@NgModule({
  declarations: [
    CardBodyComponent,
    CardFooterComponent,
    CardHeaderComponent,
    FooterComponent,
    NavSidebarComponent,
    NavSuperiorComponent
  ],
  exports: [
    CardBodyComponent,
    CardFooterComponent,
    CardHeaderComponent,
    FooterComponent,
    NavSidebarComponent,
    NavSuperiorComponent
  ]
})
export class SharedModule { }
