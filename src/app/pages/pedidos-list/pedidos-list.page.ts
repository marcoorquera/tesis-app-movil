import { Component, OnInit, Input } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import {
  AngularFireDatabase,
  AngularFireDatabaseModule,
  AngularFireList,
} from '@angular/fire/compat/database';
import { ProductInfoPage } from '../product-info/product-info.page';
import { PedidoFinalPage } from '../pedido-final/pedido-final.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { alertController } from '@ionic/core';
import { VendedorService } from 'src/app/services/vendedor.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.page.html',
  styleUrls: ['./pedidos-list.page.scss'],
})
export class PedidosListPage implements OnInit {
  @Input() empresa_prepedido;
  @Input() imagen_empresa;
  @Input() producto;
  pedidos = [];
  subtotal = [];
  sub = 0;
  pedidos_duplicados = [];

  cantidad_pedido: number = 0;
  sub_TotalFinal = null;
  nombre_empresa_pedido: string;
  user_id: string;

  //prepedidos
  prepedidosFiltr: any[];
  prepedidosAngularList: AngularFireList<any>;
  filtrPrepedidos: any[];

  //subtotal
  subtotalFiltr: any[];
  subtotalAngularFireList: AngularFireList<any>;
  filtrSubtotal: any[];

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private productService: ProductoService,
    private afs: AngularFireDatabase,
    private auth: AngularFireAuth,
    private alertCtrl: AlertController,
    private VendedorServ: VendedorService
  ) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      this.user_id = user.uid;
      this.showProfile(user.uid)
      this.showPrepedidos();
      this.guardarPedidos();
      
    });

  }

 
  listadoProducto;
  async showPrepedidos() {
    this.auth.onAuthStateChanged((user) => {
      this.afs
        .list('prepedido/' + user.uid + '/')
        .valueChanges()
        .subscribe((data) => {
          this.listadoProducto = data;
          // console.log('el valor de lso datos son ', this.listadoProducto);
          if (this.listadoProducto.length == 0) {
            this.modalCtrl.dismiss();
            document.getElementById('boton_pedido').style.display = 'none';
          } else {
            document.getElementById('boton_pedido').style.display = 'block';
          }
        });

      this.prepedidosAngularList = this.afs.list('prepedido/' + user.uid + '/');
      this.prepedidosAngularList.snapshotChanges().subscribe((list) => {
        this.prepedidosFiltr = list.map((item) => {
          return {
            $key: item.key,
            ...item.payload.val(),
          };
        });
        this.filtrPrepedidos = this.prepedidosFiltr;
        //.filter(value => value.empresa === this.empresa_prepedido)
        this.pedidos_duplicados = Array.from(
          this.filtrPrepedidos
            .reduce((map, obj) => map.set(obj.nombre_pedido, obj), new Map())
            .values()
        );
        this.sub_TotalFinal = this.pedidos_duplicados
          .map((data) => data.subtotal)
          .reduce((sum, current) => sum + current, 0);
      });
    });
  }

  // prepedidos
  // PrepedidosExist(){
  //   this.auth.onAuthStateChanged(user => {
  //     console.log("uid: "+user.uid)
  //      this.afs.list('prepedido/'+user.uid+"/").valueChanges().subscribe(data=>{
  //         this.prepedidos=data
  //     })

  //   })

  // }

  suma(
    id_usuario,
    id,
    cantidad,
    categoria,
    empresa,
    id_prod,
    imagen,
    nombre,
    precio,
    precio_unit
  ) {
    this.sub = 0;
    this.subtotal = [];
    this.sub_TotalFinal = 0;
    
    cantidad = cantidad + 1;
    const division = Math.round((precio_unit * cantidad)*100)/100 ;
    const subtotal = division;
    this.pedidos = [];
    this.afs.database.ref('/prepedido/' + id_usuario + '/' + id).update({
      cantidad_pedido: cantidad,
      categoria_pedido: categoria,
      empresa: empresa,
      id_prepedido: id,
      id_prod: id_prod,
      imagen_pedido: imagen,
      nombre_pedido: nombre,
      precio_pedido: division,
      subtotal: division,
    });
  }

   resta(
    id_usuario,
    id,
    cantidad,
    categoria,
    empresa,
    id_prod,
    imagen,
    nombre,
    precio,
    precio_unit
  ) {
    var subtotal_res
    cantidad = cantidad - 1;
    console.log('cantidad',cantidad)
    //
    if((cantidad -1 ) <= 0){
      
      cantidad = 1
    }
    subtotal_res = Math.round((precio_unit * cantidad)*100)/100 ; 
    //this.sub_TotalFinal = subtotal_res;
    console.log('cantidad',subtotal_res)

     this.afs.database.ref('/prepedido/' + id_usuario + '/' + id).update({
      cantidad_pedido: cantidad,
      categoria_pedido: categoria,
      empresa: empresa,
      id_prepedido: id,
      id_prod: id_prod,
      imagen_pedido: imagen,
      nombre_pedido: nombre,
      precio_pedido: subtotal_res,
      subtotal: subtotal_res,
    });
    this.pedidos = [];
    //this.sub_TotalFinal = null;
  }

  datos;
  pedido;
  id_prepedido;
  savePedidos() {

    //this.auth.onAuthStateChanged((user) => {
      for (const i in this.pprepedidos) {
        console.log('estoy en el sabePedidos', this.pprepedidos[i]);
        ///probar aqui
        this.afs.database
          .ref('/prepedido/' +this.user_id + '/' + this.pprepedidos[i])
          .update({
            prepedido: 0,
          });
        this.id_prepedido = this.pprepedidos[0];
      }

      this.pedidoGuardado();
   // });
  }

  pprepedidos = [];
  async guardarPedidos() {
    this.auth.onAuthStateChanged((user) => {
      this.productService.obtenerPrepedidos(user.uid).subscribe((data) => {
        data.map((valores) => {
          //console.log('Valores push /////',this.id_prepedido)
          if (valores.prepedido === 1) {
            this.pprepedidos.push(valores.id_prepedido);
          } else {
            const id_pedido = valores.id_prepedido;
            // const subtotal = valores.precio_pedido * valores.cantidad_pedido;
            this.productService.addPedidoFinal(
              valores.id_usuario,
              valores.id_prepedido,
              valores.nombre_pedido,
              valores.subtotal,
              valores.categoria_pedido,
              valores.cantidad_pedido,
              valores.empresa,
              valores.imagen_pedido,
              valores.id_prod,
              valores.subtotal,
              this.imagen_empresa,
              this.id_prepedido
            );

            
            this.productService.addPedidos(
              valores.id_usuario,
              valores.id_prepedido,
              valores.nombre_pedido,
              valores.subtotal,
              valores.categoria_pedido,
              valores.cantidad_pedido,
              valores.empresa,
              valores.imagen_pedido,
              valores.id_prod,
              valores.subtotal,
              this.imagen_empresa,
              this.id_prepedido,
              this.nombre,
              this.apellido,
              this.email,
              this.telefono,
              this.img
            );
            this.deletePrepedidos(user.uid, valores.id_prepedido);
          }

          //const subtotal = valores.precio_pedido * valores.cantidad_pedido;
          //this.productService.addPedidoFinal(valores.id_usuario, valores.id_prepedido, valores.nombre_pedido, subtotal, valores.categoria_pedido, valores.cantidad_pedido, valores.empresa, valores.imagen_pedido, valores.id_prod, subtotal, this.imagen_empresa)
        });
      });
    });
  }

  deletePrepedidos(uid, id_prepedido) {
    this.afs.database.ref('/prepedido/' + uid + '/' + id_prepedido).remove();
  }
  async viewdataTienda() {
    const modal = this.modalCtrl.create({
      component: PedidoFinalPage,
      componentProps: {
        nombre_empresa: this.empresa_prepedido,
        imagen_empresa: this.imagen_empresa,
      },
    });

    return (await modal).present();
  }
  seguirComprando() {
    this.modalCtrl.dismiss();
  }

  async pedidoGuardado() {
    const alert = await this.alertCtrl.create({
      animated: true,
      cssClass: 'success',
      header: 'Pedido guardado',
      message: 'Su pedido se ha hecho satisfactoriamente',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this.modalCtrl.dismiss();
            this.goToPedidos();
           

            //this.goToPedidos()
          },
        },
      ],
    });
    await alert.present();
  }

  delete(id) {
    this.auth.onAuthStateChanged((user) => {
      this.afs.database.ref('/prepedido/' + user.uid + '/' + id).remove();
    });
  }

  salir() {
    this.modalCtrl.dismiss();
  }


  goToPedidos() {
    this.navCtrl.navigateForward('/menu/pedido');
  }
  user_profile
  nombre
  apellido
  email
  telefono
  img
  showProfile(uid){
    
    this.afs.list('usuario/'+uid).valueChanges().subscribe(_data => {
      this.user_profile = _data
      this.nombre = this.user_profile[3];
      this.apellido = this.user_profile[0];
      this.email = this.user_profile[1];
      this.telefono = this.user_profile[4];
      this.img = this.user_profile[2]
    })
  }
}
