import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendedorModalPage } from './vendedor-modal.page';

const routes: Routes = [
  {
    path: '',
    component: VendedorModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendedorModalPageRoutingModule {}
