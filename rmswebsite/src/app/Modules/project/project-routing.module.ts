import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { CreateUpdateprojectComponent } from './create-update-project/create-update-project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectlistComponent,
    children: [
      { path: '', component: ProjectlistComponent },

      {
        path: 'create-update-project',
        component: CreateUpdateprojectComponent,
        pathMatch: 'full',
      }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
