import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPedidoPageRoutingModule } from './modal-pedido-routing.module';

import { ModalPedidoPage } from './modal-pedido.page';
import { PedidosListPage } from '../pedidos-list/pedidos-list.page';
import { PedidosListPageModule } from '../pedidos-list/pedidos-list.module';
@NgModule({
  entryComponents: [
    PedidosListPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosListPageModule,
    ModalPedidoPageRoutingModule
  ],
  declarations: [ModalPedidoPage]
})
export class ModalPedidoPageModule {}
