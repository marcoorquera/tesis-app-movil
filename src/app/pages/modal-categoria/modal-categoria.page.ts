import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';
import { PedidosListPage } from '../pedidos-list/pedidos-list.page';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.page.html',
  styleUrls: ['./modal-categoria.page.scss'],
})
export class ModalCategoriaPage implements OnInit {
  @Input() categoria;
  textoBuscarProd = '';
  productos = [];
  prepedidoIsEmpty: boolean = true;
  constructor(
    private modalCtrl: ModalController,
    public alertController: AlertController,
    public prodServ: ProductoService,
    private auth: AngularFireAuth,
    private afs: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.getProd();
    this.prepedidosExist();
  }

  buscarProd(event: CustomEvent) {
    this.textoBuscarProd = event.detail.value;
  }

  async getProd() {
    this.prodServ.getProduct().subscribe((data) => {
      data.map((item) => {
        if (item.categoria_producto === this.categoria) {
          this.productos.push({
            nombre_producto: item.nombre_producto,
            descripcion_producto: item.descripcion_producto,
            cantidad_producto: item.cantidad_producto,
            categoria_producto: item.categoria_producto,
            empresa_proveedor: item.empresa_proveedor,
            precio_producto: item.precio_producto,
            image_producto: item.image_producto,
            image_empresa: item.image_empresa,
            estado: item.estado,
            id_prod: item.id_prod,
            uid_user: item.uid_user,
            estadoP: item.estadoP,
          });

          this.productos = this.productos.filter((value) => value.estado == 1 && value.estadoP ==1);
        }
      });
    });
  }

  @Input() nombre;
  @Input() proveedor;
  @Input() descripcion;
  @Input() categoria_prod;
  @Input() precio;
  @Input() cantidad;
  @Input() image;
  @Input() id;
  @Input() nombre_empresa;
  empresa_producto = '';
  image_empresa = '';
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
  async validationExit() {
      this.modalCtrl.dismiss();
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

  producto: boolean = true;
  async goToPedidoList() {
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
}
