import { Component, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';

import { ModalController, NumericValueAccessor } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import { VendedorService } from 'src/app/services/vendedor.service';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map, reduce } from 'rxjs/operators';
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';
import { ProductInfoPage } from '../product-info/product-info.page';
import { Observable } from 'rxjs';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { PedidosListPage } from '../pedidos-list/pedidos-list.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.page.html',
  styleUrls: ['./modal-search.page.scss'],
})
export class ModalSearchPage implements OnInit {
  productList: AngularFireList<any>;
  prodCategoryList: AngularFireList<any>;

  empresasEnable: boolean = true;
  CategoriasEnable: boolean = true;
  productosEnable: boolean = true;
  producto: boolean = true;

  itemRef: AngularFireList<any>;
  item: Observable<any[]>;
  data: Observable<any[]>;
  resultadosHidden: boolean = true;
  prepedidosFiltrExist: any[];
  prepedidosFiltr: any[];
  prepedidosExistAngularList: AngularFireList<any>;
  filtrPrepedidosExist: any[];
  filtrPrepedidos: any[];
  prepedidosAngularList: AngularFireList<any>;
  observador: boolean = true;
  
  prepedidoIsEmpty: boolean = true;

  categorias = [];
  busqueda = [];
  productos = [];
  duplicados = [];
  categoria_buscar = [];
  categoriaprod = [];
  proveedores = [];
  uniqueprods = [];
  textoBuscarCat = '';
  textoBuscar = '';
  textoBuscarProd = '';
  empresa_producto = '';
  image_empresa = '';
  constructor(
    private modalCtrl: ModalController,
    public alertController: AlertController,
    public vendedorService: VendedorService,
    public productService: ProductoService,
    private afs: AngularFireDatabase,
    private auth: AngularFireAuth,
    private prodServ: ProductoService
  ) {}

  ngOnInit() {
    this.showEmpresas();
    this.showProductos();
    this.prepedidosExist();
  }

  buscarProducto(event) {
    this.textoBuscarProd = event.detail.value;
  }

  buscarCategory(event) {
    this.textoBuscarCat = event.detail.value;
  }
  buscar(event: CustomEvent) {
    this.textoBuscar = event.detail.value;
  }

  showEmpresas() {
    this.empresasEnable = false;
    this.CategoriasEnable = true;
    this.productosEnable = true;
    this.vendedorService.getVendedor().subscribe((list) => {
      this.proveedores = list.map((item) => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
      this.proveedores = this.proveedores.filter(
        (value) => value.estado == true
      );
      this.proveedores.map((item) => {
        item.nombre_empresa,
          item.image_vendedor,
          item.direccion_vendedor,
          item.telefono_vendedor,
          item.uid_vendedor;
      });
    });
  }

  async detailCategoria(image, categoria, empresa) {
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {
        categoria: categoria,
        image: image,
        empresa: empresa,
      },
    });
    return await modal.present();
  }

  async showDetailesProds(id_empresa, image_empresa, nombre_empresa) {
    const modal = await this.modalCtrl.create({
      component: ProductInfoPage,
      componentProps: {
        id: id_empresa,
        img_empresa: image_empresa,
        nom_empresa: nombre_empresa,
      },
    });
    return await modal.present();
  }

  async modalPedido(
    nombre_producto,
    nombre_proveedor,
    descripcion_producto,
    categoria_producto,
    cantidad_producto,
    precio_producto,
    uid_user,
    image_producto,
    empresa_proveedor,
    id_prod,
    image_empresa,url3D
  ) {

    this.auth.onAuthStateChanged((user) => {
      this.afs
        .list('prepedido/' + user.uid + '/')
        .valueChanges()
        .subscribe((data) => {
          this.prepedidos = data;
          
          // this.prepedidos=this.prepedidos.filter((value)=>value.id_prod==id_prod).map((item=>{
            
            
          // }))
          
        });
        
        for (var i = 0; i < this.prepedidos.length; i++) {
          if(this.prepedidos[i].id_prod==id_prod){
            this.productosRepetidos()
          break;
        
        }
        }
        console.log(this.prepedidos,'prepedidos')
       
        //console.log(this.prepedidos.id_prod,'prepedidos')
    });
    this.empresa_producto = empresa_proveedor;
    this.image_empresa = image_empresa;
    const modal = await this.modalCtrl.create({
      component: ModalPedidoPage,
      componentProps: {
        nombre: nombre_producto,
        proveedor: nombre_proveedor,
        descripcion: descripcion_producto,
        cantidad: cantidad_producto,
        precio: precio_producto,
        id_user: uid_user,
        image: image_producto,
        nombre_empresa: empresa_proveedor,
        id: id_prod,
        categoria_prod: categoria_producto,
        url3D:url3D
      },
    });
    //this.prepedidosExist();
    return await modal.present();
  }

  prepedidos;
  async prepedidosExist() {
    this.auth.onAuthStateChanged((user) => {
      this.afs
        .list('prepedido/' + user.uid + '/')
        .valueChanges()
        .subscribe((data) => {
          this.prepedidos = data;
          if (this.prepedidos.length > 0) {
            this.prepedidoIsEmpty = false;
            //document.getElementById('boton_pedido').style.display = 'block';
          } else {
            this.prepedidoIsEmpty = true;
            //document.getElementById('boton_pedido').style.display = 'none';
          }
        });
    });
  }

  showProductos() {
    this.productosEnable = false;
    this.CategoriasEnable = true;
    this.empresasEnable = true;
    this.productList = this.afs.list('/producto');
    this.productList.snapshotChanges().subscribe((list) => {
      this.productos = list.map((item) => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
      this.productos = this.productos.filter((value) => value.estado == 1 && value.estadoP==1);
      this.productos.map((item) => {
        item.nombre_producto,
          item.empresa_proveedor,
          item.categoria_producto,
          item.cantidad_producto,
          item.descripcion_producto,
          item.id_prod,
          item.precio_producto,
          item.uid_user,
          item.image_producto,
          item.image_empresa;
      });
    });
  }

  async goToPedidoList() {
    //console.log("empresa1: "+this.nom_empresa)
    const modal = await this.modalCtrl.create({
      component: PedidosListPage,
      componentProps: {
        producto: this.producto,
        empresa_prepedido: this.empresa_producto,
        imagen_empresa: this.image_empresa,
      },
    });
    await modal.present();
  }

  async validationExit() {

      this.modalCtrl.dismiss();
  }

  async productosRepetidos() {
    const alert = await this.alertController.create({
      header: 'Ya en tu Lista',
      subHeader: 'Lo sentimos',
      message: 'Este producto ya lo tienes en tu lista.',
      
      buttons: [
        {
          text: 'Ok',
          role: 'ok',

          handler: () => {
            this.modalCtrl.dismiss();
          },
        },
      ],
      backdropDismiss: false
      
    });

    await alert.present();
  }

  async salir() {
    const alert = await this.alertController.create({
      animated: true,
      cssClass: 'alert',
      header: '¿Seguro que desea salir?',
      message: 'Al salir su pedido se eliminará',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this.auth.onAuthStateChanged((user) => {
              this.prodServ.deleteprepedidos(user.uid);
            });

            this.modalCtrl.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }
}
