import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListVendedoresPageRoutingModule } from './list-vendedores-routing.module';

import { ListVendedoresPage } from './list-vendedores.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ListVendedoresPageRoutingModule
  ],
  declarations: [ListVendedoresPage]
})
export class ListVendedoresPageModule {}
