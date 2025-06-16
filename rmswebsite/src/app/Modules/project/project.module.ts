import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjetComponent } from './project.component';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { CreateUpdateprojectComponent } from './create-update-project/create-update-project.component';


@NgModule({
  declarations: [
    ProjetComponent,
    ProjectlistComponent,
    CreateUpdateprojectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    RouterModule,
    SharedMaterialModule
  ],
  providers: [ProjetComponent],
  exports: [ProjetComponent],
})
export class ProjectModule { }
