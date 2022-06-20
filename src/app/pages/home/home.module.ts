import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import {PipesModule} from '../../pipes/pipes.module';

import { ProductInfoPageModule } from '../product-info/product-info.module';
import { ProductInfoPage } from '../product-info/product-info.page';
import { ModalSearchPage } from '../modal-search/modal-search.page';
import { ModalCategoriaPage } from '../modal-categoria/modal-categoria.page';
import { ModalCategoriaPageModule } from '../modal-categoria/modal-categoria.module';
import { ModalSearchPageModule } from '../modal-search/modal-search.module';
@NgModule({
  entryComponents: [
    ProductInfoPage,
    ModalCategoriaPage,
    ModalSearchPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PipesModule,
    ProductInfoPageModule,
    ModalCategoriaPageModule,
    ModalSearchPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
