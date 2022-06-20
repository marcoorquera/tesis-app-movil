import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialpedidosPageRoutingModule } from './historialpedidos-routing.module';

import { HistorialpedidosPage } from './historialpedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialpedidosPageRoutingModule
  ],
  declarations: [HistorialpedidosPage]
})
export class HistorialpedidosPageModule {}
