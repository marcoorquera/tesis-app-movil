import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProd'
})
export class FiltroProdPipe implements PipeTransform {

  transform(arreglo: any[], textoBuscarProd: string): any{
  
    if(textoBuscarProd === ''){
      return arreglo;
    
    }
    return arreglo.filter(arreglo =>    
      arreglo.nombre_producto && arreglo.nombre_producto.toLowerCase().includes(textoBuscarProd.toLocaleLowerCase())
    )
  }

}
