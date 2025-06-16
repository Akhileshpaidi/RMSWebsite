import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoleComponent } from './create-role/create-role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleComponent } from './role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    children: [
      { path: '', component: RoleListComponent },
      { path: 'role-list', component: RoleListComponent },

      {
        path: 'create-role',
        component: CreateRoleComponent,
        pathMatch: 'full',
      },
      {
        path: 'update-role',
        component: UpdateRoleComponent,
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule {}
