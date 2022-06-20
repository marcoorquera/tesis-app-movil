import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import { PedidosListPage } from '../pedidos-list/pedidos-list.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { isNgTemplate } from '@angular/compiler';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.page.html',
  styleUrls: ['./modal-pedido.page.scss'],
})
export class ModalPedidoPage implements OnInit {
  @Input() nombre;
  @Input() proveedor;
  @Input() descripcion;
  @Input() categoria_prod;
  @Input() precio;
  @Input() cantidad;
  @Input() image;
  @Input() id;
  @Input() nombre_empresa;
  @Input() url3D;

  isDisabled = false;
  isDisabled_resta = false;
  isDisabled_suma = false;
  pedido: number = 1;
  total_prod: number = 0;
  user_id: string;

  productos = [];
  prepedidos: unknown[];
  constructor(
    private modalCrtl: ModalController,
    private alertCtrl: AlertController,
    private prodServ: ProductoService,
    private auth: AngularFireAuth,
    private afs: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      this.user_id = user.uid;
      this.total_prod = Math.round(this.pedido * this.precio * 100) / 100;
      console.log('modal pedidos nombre empresa', this.nombre_empresa,this.url3D);
      if(this.url3D=="#" || this.url3D=="" ||  this.url3D==undefined){
      this.s="true"
      }
      else{
        this.s="false"

      }
    });


  }

  suma() {
    let stock = 1;
    stock = this.cantidad - this.pedido;
    //console.log("stock: "+stock)
    this.pedido = this.pedido + 1;
    //console.log("pedido: "+this.pedido)
    //return Math.round(num * 100) / 100 ;
    this.total_prod = Math.round(this.pedido * this.precio * 100) / 100;
    //console.log("total"+this.total_prod)
  }

  resta() {
    let stock = 1;
    this.pedido = this.pedido - 1;

    //console.log("decremento: "+this.pedido)
    stock = this.cantidad - this.pedido;
    if (this.pedido - 1 <= 0) {
      this.pedido = 1;
    }
    this.total_prod = Math.round(this.pedido * this.precio * 100) / 100;
  }

  pedidoExiste;
  productos_rep = [];
  id_prepe = [];
  cantidad_nuevo;
  val = 0;
  contactoEmpresa(
    id_usuario,
    nombre_producto,
    precio,
    cantidad,
    imagen,
    subtotal
  ) {
    this.prodServ.addeditPedidos(
      id_usuario,
      this.nombre_empresa,
      this.id,
      this.categoria_prod,
      nombre_producto,
      precio,
      cantidad,
      imagen,
      subtotal,
      this.precio
    );

    this.pedido_guardado();
    this.modalCrtl.dismiss();
  }

  async pedido_guardado() {
    const alert = await this.alertCtrl.create({
      header: 'Pedido guardado',
      message: 'Producto añadido al pedido.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async emptyStock() {
    const alert = await this.alertCtrl.create({
      header: 'Stock Agotado',
      subHeader: 'Lo sentimos',
      message: 'El stock se ha acabado.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  exit() {
    this.modalCrtl.dismiss();
  }

s1
s
  estadoButon(){
    
    this.s1 = true;
  }

  abrir(){
    window.open('https://global-muebles.marcoorquera.repl.co/', '_blank'); //Abre la URL en el navegador de InAppBrowser
  }

}
