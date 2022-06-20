import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPedidoPage } from './modal-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPedidoPageRoutingModule {}
