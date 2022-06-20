import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCategoriaPage } from './modal-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCategoriaPageRoutingModule {}
