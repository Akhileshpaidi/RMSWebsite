import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { CreateUpdateManufacturerComponent } from './create-update-manufacturer/create-update-manufacturer.component';

const routes: Routes = [
  {
    path: '',
    component: ManufacturerListComponent,
    children: [
      { path: '', component: ManufacturerListComponent },

      {
        path: 'create-update-manufacturer',
        component: CreateUpdateManufacturerComponent,
        pathMatch: 'full',
      }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturerRoutingModule { }
