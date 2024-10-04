import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** componentes */
import { ListComponent, CreateComponent, EditComponent, ShowComponent, SearchComponent } from './index';

/** Importar as rotas */
import { OrgaoGovernamentalRoutes } from './orgao-governamental.routing';


@NgModule({
  imports: [
    CommonModule,
    OrgaoGovernamentalRoutes
  ],
  declarations: [
    ListComponent, CreateComponent, EditComponent, ShowComponent, SearchComponent
  ]
})
export class OrgaoGovernamentalModule { }
