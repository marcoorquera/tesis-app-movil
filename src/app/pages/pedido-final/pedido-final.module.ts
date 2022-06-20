import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoFinalPageRoutingModule } from './pedido-final-routing.module';

import { PedidoFinalPage } from './pedido-final.page';

import { EmpresaSelectedPage } from '../empresa-selected/empresa-selected.page';
import { EmpresaSelectedPageModule } from '../empresa-selected/empresa-selected.module';
@NgModule({
  entryComponents: [
    EmpresaSelectedPage
  ],  
  imports: [
    CommonModule,
    FormsModule,
    EmpresaSelectedPageModule,
    IonicModule,
    PedidoFinalPageRoutingModule
  ],
  declarations: [PedidoFinalPage]
})
export class PedidoFinalPageModule {}
