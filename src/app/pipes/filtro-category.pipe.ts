import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCategory'
})
export class FiltroCategoryPipe implements PipeTransform {

  transform(
    arreglo: any[], 
    texto: string,
    columna: string
    ): any {
    
    if(texto === ''){
      return arreglo;
    }
    texto = texto.toLowerCase();    
    return arreglo.filter(item => {
      //console.log("producto"+item[columna].toLowerCase())
      //console.log("producto"+JSON.stringify(item[columna].toLowerCase()))
      
      return item[columna].toLowerCase().includes(texto); 
      
    })    
    //console.log(arreglo)
  }

  /*
    transform(arreglo: any[], textoBuscarCat: string): any {
    if(textoBuscarCat === ''){
      return arreglo;
    }
    return arreglo.filter(arreglo => {
      arreglo.categoria.toLowerCase().includes(textoBuscarCat.toLocaleLowerCase()) || arreglo.empresa.toLowerCase().includes(textoBuscarCat.toLocaleLowerCase())
    })
  }
  */
  

}
