import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialpedidosPage } from './historialpedidos.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialpedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialpedidosPageRoutingModule {}
