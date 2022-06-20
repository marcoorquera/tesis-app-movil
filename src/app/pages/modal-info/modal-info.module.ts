import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoPageRoutingModule } from './modal-info-routing.module';

import { ModalInfoPage } from './modal-info.page';
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';
import { ModalPedidoPageModule } from '../modal-pedido/modal-pedido.module';
@NgModule({
  entryComponents: [
    ModalPedidoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoPageRoutingModule,
    ModalPedidoPageModule
  ],
  declarations: [ModalInfoPage]
})
export class ModalInfoPageModule {}
