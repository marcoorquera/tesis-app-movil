import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductInfoPageRoutingModule } from './product-info-routing.module';
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';
import { ModalPedidoPageModule } from '../modal-pedido/modal-pedido.module';
import { PedidosListPage } from '../pedidos-list/pedidos-list.page';
import { PedidosListPageModule } from '../pedidos-list/pedidos-list.module';
import { ProductInfoPage } from './product-info.page';

import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  entryComponents:[    
    ModalPedidoPage,
    PedidosListPage
  ],
  imports: [
    PipesModule, 
    CommonModule,
    FormsModule,
    IonicModule,
    ProductInfoPageRoutingModule,
    ReactiveFormsModule,
    PedidosListPageModule,
    ModalPedidoPageModule
  ],
  declarations: [ProductInfoPage]
})
export class ProductInfoPageModule {}
