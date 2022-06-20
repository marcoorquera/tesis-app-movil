import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { FiltroProdPipe } from './filtro-prod.pipe';
import { FiltroCategoryPipe } from './filtro-category.pipe';



@NgModule({
  declarations: [
    FiltroPipe,
    FiltroProdPipe,
    FiltroCategoryPipe
  ],
  exports: [
    FiltroPipe,
    FiltroProdPipe,
    FiltroCategoryPipe
  ]
})
export class PipesModule { }
