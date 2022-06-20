import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], textoBuscar: string): any{
    if(textoBuscar === ''){
      return arreglo;
    }
    return arreglo.filter(arreglo =>
      arreglo.nombre_empresa.toLowerCase().includes(textoBuscar.toLocaleLowerCase()) 
    )
  }
  

  /*
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
      console.log("producto"+JSON.stringify(item[columna].toLowerCase()))
      
      return JSON.stringify(item).toLowerCase() 
      //item[columna].toLowerCase().includes(texto);
    })    
    //console.log(arreglo)
  }

  
  */

}
