import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Guard */


/** Componentes */
import { LayoutPageComponent } from '../users/pages';
import { ListComponent, CreateComponent, EditComponent, ShowComponent } from './index';

const routes: Routes = [
  {
    path: 'orgao-governamental',
    // component: LayoutPageComponent,
    children: [
      { path: 'list', component: ListComponent, data: { name: 'ListComponent' } },
      { path: 'create', component: CreateComponent, data: { name: 'CreateComponent' } },
      { path: 'edit/:id', component: EditComponent, data: { name: 'EditComponent' } },
      { path: 'show/:id', component: ShowComponent, data: { name: 'ShowComponent' } },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgaoGovernamentalRoutingModule { }
