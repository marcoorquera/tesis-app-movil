import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productList: AngularFireList<any>
  categoryList: AngularFireList<any>
  prepedidoList: AngularFireList<any>
  pedidoList: AngularFireList<any>
  pedidoFinalList: AngularFireList<any>
  constructor(
    private afs: AngularFireDatabase,
    
  ) { }

  getCategory(){
    this.categoryList = this.afs.list('/categoria');
    return this.categoryList.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({
          key: c.payload,
          ...c.payload.val()
        }))
      )
    )
  }

  getPedidoFinal(uid){
    this.pedidoFinalList = this.afs.list('pedido_final/'+uid+"/");
    return this.pedidoFinalList.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({
          key: c.payload,
          ...c.payload.val()
        }))
      )
    )
  }



  

    
  addPedidoFinal(id_usuario: string, id_pedido,nombre: string, precio: number, categoria: string, cantidad: number, empresa: string, imagen: string, id_prod: string, subtotal: number, imagen_empresa, id_prepedido){
    const pedido = this.afs.database.ref('/pedido_final/'+id_usuario+"/")
    const id_pedido_generate = pedido.push().key
    var dta=Date.now()
    this.afs.object('/pedido_final/'+id_usuario+"/"+id_pedido).update({
      id_pedido: id_prepedido,
      id_usuario: id_usuario,
      nombre_pedido: nombre,
      precio_pedido: precio,
      categoria_pedido: categoria,
      cantidad_pedido: cantidad,
      empresa_pedido: empresa,
      imagen_pedido: imagen,
      id_prod: id_prod,
      subtotal: subtotal,
      imagen_empresa: imagen_empresa,
      fecha_pedido: ("0" + new Date(dta).getDate()).slice(-2) + '/' + (("0" + (new Date(dta).getMonth() + 1)).slice(-2)
      ) + '/' + new Date(dta).getFullYear()+' '+ (new Date(dta).getHours()< 10 ? "0" + new Date(dta).getHours() : +new Date(dta).getHours())+':'+(new Date(dta).getMinutes()< 10 ? "0" + new Date(dta).getMinutes() : +new Date(dta).getMinutes())+':'+(new Date(dta).getSeconds()< 10 ? "0" + new Date(dta).getSeconds() : +new Date(dta).getSeconds())
    
    })
  }


  addPedidos(id_usuario: string, id_pedido,nombre: string, precio: number, categoria: string, cantidad: number, empresa: string, imagen: string, id_prod: string, subtotal: number, imagen_empresa, id_prepedido,var_nombre,var_apellido,var_imagen,var_correo,var_telefono){
    
    var dta=Date.now()
    this.afs.object('/pedidos/'+id_pedido).update({
      id_pedido: id_prepedido,
      id_usuario: id_usuario,
      nombre_pedido: nombre,
      precio_pedido: precio,
      categoria_pedido: categoria,
      cantidad_pedido: cantidad,
      empresa_pedido: empresa,
      imagen_pedido: imagen,
      id_prod: id_prod,
      subtotal: subtotal,
      imagen_empresa: imagen_empresa,
      fecha_pedido: ("0" + new Date(dta).getDate()).slice(-2) + '/' + (("0" + (new Date(dta).getMonth() + 1)).slice(-2)
      ) + '/' + new Date(dta).getFullYear()+' '+ (new Date(dta).getHours()< 10 ? "0" + new Date(dta).getHours() : +new Date(dta).getHours())+':'+(new Date(dta).getMinutes()< 10 ? "0" + new Date(dta).getMinutes() : +new Date(dta).getMinutes())+':'+(new Date(dta).getSeconds()< 10 ? "0" + new Date(dta).getSeconds() : +new Date(dta).getSeconds())
    
    })
  }
  pedidoExiste
  addeditPedidos(id_usuario: string,nombre_empresa: string, id: string, categoria: string, nombre: string, precio: number, cantidad: number, imagen: string, subtotal: number, precio_unit:number){
    
    
    const prepedido = this.afs.database.ref('/prepedido/'+id_usuario+"/")
    const id_prepedido = prepedido.push().key
  
    this.afs.object('prepedido/'+id_usuario+"/"+id_prepedido).update({
      id_prepedido: id_prepedido,
      id_prod: id,
      id_usuario: id_usuario,
      empresa: nombre_empresa,
      categoria_pedido: categoria,
      nombre_pedido: nombre,
      precio_pedido: subtotal,
      cantidad_pedido: cantidad,
      imagen_pedido: imagen,
      subtotal: subtotal,
      prepedido:1,
      precio_unit:precio_unit
    })   
    console.log('ids',id_usuario,id)

    // this.obtenerPrepedidos(id_usuario).subscribe((list) => {
    //   this.vendedores = list.map((item) => {
    //     return {
    //       $key: item.key,
    //       ...item.payload.val(),
    //     };
    //   });

    //   this.vendedores = this.vendedores.filter(
    //     (value) => value.nombre_empresa == item.empresa_pedido
    //   );

    // this.afs.object('/prepedido/'+id_usuario+"/").valueChanges().subscribe(data=>{
    //   this.pedidoExiste=data
    //   this.pedidoExiste
    //   console.log('data',this.pedidoExiste)
    // })
    /*
      this.prepedidoList = this.afs.list('/prepedido/')    
    this.prepedidoList.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({
          key: c.payload,
          ...c.payload.val()
        }))  
      )
    ).subscribe(
      data => {
        data.map((item => {
          if(item.nombre_pedido === nombre){
            console.log("pedido repetido")
            this.afs.database.ref('/prepedido/'+id_prepedido).remove()
          }else{
            console.log("pedido guardado")
            this.afs.object('prepedido/'+id_prepedido).set({
              id_prepedido: id_prepedido,
              id_prod: id,
              id_usuario: id_usuario,
              empresa: nombre_empresa,
              categoria_pedido: categoria,
              nombre_pedido: nombre,
              precio_pedido: precio / cantidad,
              cantidad_pedido: cantidad,
              imagen_pedido: imagen,
              subtotal: subtotal 
            })  
          }
        }))
      }
    )
    */
    
  }


  deleteprepedidos(id_prepedido){
    
    this.afs.database.ref('/prepedido/'+id_prepedido).remove()
    
  }

  // addPedidos(nombre_pedido: string, cantidad_pedido: number, precio_pedido: number, imagen_pedido: string, empresa: string){
  //   console.log("anadiendo a prepedidos")
  //   const pedido = this.afs.database.ref('/pedidos/')
  //   const id_pedido = pedido.push().key
  //   this.afs.object('/pedidos/'+id_pedido).update({
  //     id_pedido: id_pedido,
  //     nombre_pedido: nombre_pedido,
  //     cantidad_pedido: cantidad_pedido,
  //     precio_pedido: precio_pedido,
  //     imagen_pedido: imagen_pedido,
  //     empresa: empresa
  //   })
    
  // }

  geteditPedidos(){
    this.prepedidoList = this.afs.list('/prepedido/')
    return this.prepedidoList.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({
          key: c.payload,
          ...c.payload.val()
        }))
      )
    )
  }
  prodList: AngularFireList<any>
  obtenerPrepedidos(uid){
    this.prodList = this.afs.list('/prepedido/'+uid+"/");
    console.log(this.prodList)
    return this.prodList.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({
          key: c.payload,
          ...c.payload.val()
        }))
      )
    )
      
  
  }

  
  getPedidos(){
    this.pedidoList = this.afs.list('/pedidos/')
    return this.pedidoList.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({
          key: c.payload,
          ...c.payload.val()
        }))
      )
    )
  }

  getProduct(){
    this.productList = this.afs.list('/producto');
    return this.productList.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({
          key: c.payload,
          ...c.payload.val()
        }))
      )
    )
      
  }
categorias
  getCategor(){
   this.categorias= this.afs.list("/categoria").snapshotChanges()

   return this.categorias
} 
}
