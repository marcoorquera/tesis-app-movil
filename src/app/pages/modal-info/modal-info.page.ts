import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';
@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {
  @Input() categoria;
  @Input() image;
  @Input() empresa;

  productsCategory = [];

  constructor(private modalCtrl: ModalController,
              private productService: ProductoService) { }

  ngOnInit() {
    this.showProductsByCategory();
  }

  async modalPedido(nombre_producto,nombre_proveedor, descripcion_producto, categoria_producto, cantidad_producto, precio_producto, uid_user,image_producto){
    const modal = await this.modalCtrl.create({
      component: ModalPedidoPage,
      componentProps: {
        nombre: nombre_producto,
        proveedor: nombre_proveedor,
        descripcion: descripcion_producto,
        categoria: categoria_producto,
        cantidad: cantidad_producto,
        precio: precio_producto, 
        id_user: uid_user,
        image: image_producto
      }
    })
    return await modal.present();
  }
  

  showProductsByCategory(){
    this.productService.getProduct().subscribe(data => {
      data.map((item) => {
        if((item.categoria_producto === this.categoria) && (item.empresa_proveedor === this.empresa)){
          this.productsCategory.push({
            nombre_producto: item.nombre_producto,
            nombre_empresa: item.empresa_proveedor,
            categoria: item.categoria_producto,
            cantidad: item.cantidad_producto,
            descripcion: item.descripcion_producto,
            id_prod: item.id_prod,
            precio: item.precio_producto,
            uid: item.uid_user,
            image_prod: item.image_producto,
            image_empresa: item.image_empresa
            
          })
        }
      })
    })

  }

  salir(){
    this.modalCtrl.dismiss();
  }

}
