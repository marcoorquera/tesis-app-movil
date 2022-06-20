import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendedorModalPageRoutingModule } from './vendedor-modal-routing.module';

import { VendedorModalPage } from './vendedor-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendedorModalPageRoutingModule
  ],
  declarations: [VendedorModalPage]
})
export class VendedorModalPageModule {}
