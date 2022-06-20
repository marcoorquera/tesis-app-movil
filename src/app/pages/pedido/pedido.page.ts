import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { VendedorService } from 'src/app/services/vendedor.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MenuController, ModalController } from '@ionic/angular';
import { HistorialpedidosPage } from '../historialpedidos/historialpedidos.page';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  
  vendedores = []
  pedidos = []
  duplicados = []
  duplicado_vendedores = []

  //pedidos
  pedidosFltr: any[];
  pedidosAngularList: AngularFireList<any>
  filtrpedidos: any[];

  pedidos_duplicados = [];

  constructor(
    private afs: AngularFireDatabase,
    private productServ: ProductoService,
    private VendedorServ: VendedorService,
    private auth: AngularFireAuth,
    private MenuCtrl: MenuController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      //this.pedidoFinal(user.uid)
      this.tamanio_pedidos=0
     
      this.showEmpresa(user.uid)
      this.pedidoFinal(user.uid)
    })
  }



  showEmpresa(id_user) {
    this.pedidosAngularList = this.afs.list('pedido_final/'+id_user+"/")
    this.pedidosAngularList.snapshotChanges().subscribe(
      list => {
        this.pedidosFltr = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          }
        })
        this.filtrpedidos = this.pedidosFltr.filter(value => value.id_usuario === id_user)
        this.filtrpedidos.map(dta => {
          this.pedidos_duplicados.push({
            cantidad_pedido: dta.cantidad_pedido,
            categoria_pedido: dta.categoria_pedido,
            empresa_pedido: dta.empresa_pedido,
            fecha_pedido: ("0" + new Date(dta.fecha_pedido).getDate()).slice(-2) + '/' + (("0" + (new Date(dta.fecha_pedido).getMonth() + 1)).slice(-2)
            ) + '/' + new Date(dta.fecha_pedido).getFullYear(),
            id_pedido: dta.id_pedido,
            id_prod: dta.id_prod,
            imagen_empresa: dta.imagen_empresa,
          })
          this.pedidos_duplicados.reduce((map, obj) => map.set(obj.fecha_pedido, obj), new Map()).values()

          this.pedidos_duplicados.sort(function (a, b) {
            if (a.fecha_pedido <  b.fecha_pedido) {
              return 1;
            }
            if (a.fecha_pedido > b.fecha_pedido) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });// console.log("fecha; "+new Date(dta.fecha_pedido))

        })
        // this.pedidos_duplicados.map(dta => {
        //   console.log("fecha; " + dta.categoria_pedido)
        // })
      }

    )

    /*
      this.productServ.getPedidoFinal().subscribe(data => {
      data.map((item) => {
        if(id_user === item.id_usuario){
          this.pedidos.push({
            empresa: item.empresa_pedido,
            imagen: item.imagen_empresa
          })
          this.duplicados = Array.from(this.pedidos.reduce((map, obj) => map.set(obj.empresa, obj), new Map()).values())
          this.duplicados.map((duplicado) => {
           console.log("duplicado: "+duplicado.empresa)
            
          })
        }
      })
    })
    */



  }

dataFinal
// pf;

// pedido
// datah=[]
id_pedidos=[]
num_pedidos=[]
filtro_tiendas=[]
tamanio_pedidos
  async pedidoFinal(id_user) {
    

  
    //  this.pf = this.afs.list('pedido_final/'+id_user+"/").snapshotChanges()

    // this.pf.subscribe(
    //   list => {
    //     this.pedido = list.map(item => {
    //       return {
    //         $key: item.key,
    //         ...item.payload.val()
    //       }
    //     })
    //     this.pedido.map(item => {
          

    //       item.id_pedido,
    //      item.empresa_pedido,
    //       item.fecha_pedido,
    //      item.imagen_empresa
      
          
    //     })
        
    //   }
    // )


    this.afs.list("pedido_final/"+id_user+"/").valueChanges().subscribe(data => {
        this.dataFinal=data
        this.dataFinal=this.dataFinal.map(item => {
          this.id_pedidos.push(item.id_pedido)
        })
        let result = this.id_pedidos.filter((item,index)=>{
          // console.log(item.empresa,index,'/////////')
          return this.id_pedidos.indexOf(item) === index;
        })
        this.num_pedidos=[]
        this.id_pedidos=[]
        for (const i in result) {
          this.num_pedidos.push({id: result[i]})
        }
        this.num_pedidos.reverse()
        this.tamanio_pedidos=this.num_pedidos.length+1

    }

    )
  }


  async getListpedidos(pedido) {
    const modal = await this.modalCtrl.create({
      component: HistorialpedidosPage,
      componentProps: {
        id_pedido: pedido
      }
    })
    await modal.present()
  }


  toggleMenu() {
    this.MenuCtrl.toggle()
  }

}
