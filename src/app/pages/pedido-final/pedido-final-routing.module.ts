import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoFinalPage } from './pedido-final.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoFinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoFinalPageRoutingModule {}
