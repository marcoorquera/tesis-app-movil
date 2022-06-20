import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosListPageRoutingModule } from './pedidos-list-routing.module';

import { PedidosListPage } from './pedidos-list.page';

import { PedidoFinalPage } from '../pedido-final/pedido-final.page';
import { PedidoFinalPageModule } from '../pedido-final/pedido-final.module';


@NgModule({
  entryComponents: [
    PedidoFinalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoFinalPageModule,
    ReactiveFormsModule,
    PedidosListPageRoutingModule
  ],
  declarations: [PedidosListPage]
})
export class PedidosListPageModule {}
