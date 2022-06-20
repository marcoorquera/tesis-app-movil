import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresaSelectedPageRoutingModule } from './empresa-selected-routing.module';

import { EmpresaSelectedPage } from './empresa-selected.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresaSelectedPageRoutingModule
  ],
  declarations: [EmpresaSelectedPage]
})
export class EmpresaSelectedPageModule {}
