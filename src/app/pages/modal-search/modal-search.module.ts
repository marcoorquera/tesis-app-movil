import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSearchPageRoutingModule } from './modal-search-routing.module';

import { ModalSearchPage } from './modal-search.page';



import { PipesModule } from 'src/app/pipes/pipes.module';
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';
import { ModalPedidoPageModule } from '../modal-pedido/modal-pedido.module';
import { ProductInfoPageModule } from '../product-info/product-info.module';
import { ProductInfoPage } from '../product-info/product-info.page';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ModalInfoPageModule } from '../modal-info/modal-info.module';

@NgModule({
  entryComponents:[
    ProductInfoPage,
    ModalPedidoPage,
    ModalInfoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ModalInfoPageModule,
    ProductInfoPageModule,
    ModalSearchPageRoutingModule,
    ReactiveFormsModule,
    ModalPedidoPageModule
  
  ],
  declarations: [ModalSearchPage]
})
export class ModalSearchPageModule {}
