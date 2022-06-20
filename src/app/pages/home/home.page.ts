import { Component, NgZone, OnInit, ViewChild } from '@angular/core';

import { IonRouterOutlet, MenuController, NavController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';

import { ModalController, AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { ProductInfoPage } from '../product-info/product-info.page';
import { VendedorService } from 'src/app/services/vendedor.service';
import { ModalCategoriaPage } from '../modal-categoria/modal-categoria.page';
import { ModalSearchPage } from '../modal-search/modal-search.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PedidosListPage } from '../pedidos-list/pedidos-list.page';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  productos = [];
  vendedores = [];
  name_prod: string;

  textoBuscar = '';
  listadoProducto: unknown[];
  constructor(
    private afAuth: AngularFireAuth,
    private menu: MenuController,
    private prodService: ProductoService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private afs: AngularFireDatabase,
    private navCtr: NavController,
    private vendedorService: VendedorService,
    private auth: AngularFireAuth,
    private plataform: Platform,
    private location: Location,
    public alertController: AlertController,
    public prodServ: ProductoService
  ) {
    this.backEvent();
  }

  ngOnInit() {
    //this.getProducto()
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.getEmpresa();
        this.getCategoria();
        this.getPrepedidos();
      } else {
        this.navCtrl.navigateBack('/login');
      }
    });
  }
  resCategorias;
  getCategoria() {
    this.afs
      .list('categoria/')
      .valueChanges()
      .subscribe((data) => {
        this.resCategorias = data;
      });
  }

  async getPrepedidos() {
    this.auth.onAuthStateChanged((user) => {
      this.afs
        .list('prepedido/' + user.uid + '/')
        .valueChanges()
        .subscribe((data) => {
          this.listadoProducto = data;
          // console.log('el valor de lso datos son ', this.listadoProducto);
          if (this.listadoProducto.length == 0) {
            document.getElementById('boton_pedido').style.display = 'none';
          } else {
            document.getElementById('boton_pedido').style.display = 'block';
          }
        });
    });
  }

  private zone: NgZone;
  buscar(event: CustomEvent) {
    this.textoBuscar = event.detail.value;
    //console.log("busqueda: "+this.textoBuscar)
  }
  getEmpresa() {
    this.auth.onAuthStateChanged((user) => {
      if (user != null) {
        this.vendedorService.getVendedor().subscribe((list) => {
          this.vendedores = list.map((item) => {
            return {
              $key: item.key,
              ...item.payload.val(),
            };
          });

          this.vendedores = this.vendedores.filter(
            (value) => value.estado == true
          );
          this.vendedores.map((item) => {
            item.nombre_empresa;
            item.image_vendedor;
            item.direccion_vendedor;
            item.telefono_vendedor;
            item.uid_vendedor;
            //console.log("nombre: "+item.nombre_empresa)
          });
        });
      }
    });
  }

  /*
    getProducto(){
    this.prodService.getProduct().subscribe(
      list => {
        this.productos = list.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          }
        })
        this.productos.map(item => {
          item.nombre_producto
          item.descripcion_producto
          item.cantidad_producto
          item.precio_producto
          item.categoria_producto
          item.id_prod
        })
      }
    )
  }

  */

  toggleMenu() {
    this.menu.toggle();
  }

  async modalSearch() {
    const modal = await this.modalCtrl.create({
      component: ModalSearchPage,
    });
    return await modal.present();
  }

  async showCategoria(nombre) {
    //console.log("categorias: "+nombre)
    const modal = await this.modalCtrl.create({
      component: ModalCategoriaPage,
      componentProps: {
        categoria: nombre,
      },
    });
    return await modal.present();
  }
  async goToPedidoList() {
    //console.log("empresa1: "+this.nom_empresa)
    const modal = await this.modalCtrl.create({
      component: PedidosListPage,
    });
    await modal.present();
  }
  async showDetails(id_empresa, image_empresa, nombre_empresa) {
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

  backEvent() {
    this.plataform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet.canGoBack()) {
        this.backAlert();
      } else {
        this.location.back();
      }
    });
  }

  async backAlert() {
    const alert = await this.alertController.create({
      animated: true,
      cssClass: 'alert',
      header: '¿Seguro que desea salir?',
      message: 'Al salir se cerrará su cuenta',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Close App',
          handler: () => {
            this.auth.onAuthStateChanged((user) => {
              this.prodServ.deleteprepedidos(user.uid);
            });
            navigator['app'].exitApp();
            this.modalCtrl.dismiss();
          },
        },
      ],
    });

    await alert.present();
  }
}
