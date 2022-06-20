import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoPageRoutingModule } from './pedido-routing.module';

import { HistorialpedidosPage } from '../historialpedidos/historialpedidos.page';
import { HistorialpedidosPageModule } from '../historialpedidos/historialpedidos.module';
import { PedidoPage } from './pedido.page';
@NgModule({
  entryComponents: [
    HistorialpedidosPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPageRoutingModule,
    HistorialpedidosPageModule
  ],
  declarations: [PedidoPage]
})
export class PedidoPageModule {}
