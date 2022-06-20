import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosListPage } from './pedidos-list.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosListPageRoutingModule {}
