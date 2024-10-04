import { Routes, RouterModule } from '@angular/router';

/** Guard */
import { AuthGuard } from '../auth/guards/auth.guard';

/** Componentes */
import { LayoutPageComponent } from '../users/pages';
import { ListComponent, CreateComponent, EditComponent, ShowComponent } from './index';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'list', component: ListComponent, data: {name: 'ListComponent'} },
      { path: 'create', component: CreateComponent, data: {name: 'CreateComponent'} },
      { path: 'edit/:id', component: EditComponent, data: {name: 'EditComponent'} },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

export const OrgaoGovernamentalRoutes = RouterModule.forChild(routes);
