import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service'; 
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';
import { PedidosListPage } from '../pedidos-list/pedidos-list.page';
import {AngularFireDatabase, AngularFireList, snapshotChanges} from '@angular/fire/compat/database'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { empty } from 'rxjs';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {

  productos = [];
  categoria = [];
  productsFiltered = [];
  categoria_duplicada = [];
  categoriaFiltered: boolean;

  selection: boolean;
  mainProds: boolean = false;

  prepedidoIsEmpty: boolean = true;

  textoBuscarProd='';
  uid_user

 

  //ejemplo
  prodFiltr: any[];
  productsAngularList: AngularFireList<any>
  filtrprod: any[];

  //prepedidos
  prepedidosFiltr: any[];
  prepedidosAngularList: AngularFireList<any>
  filtrPrepedidos: any[];

  prepedidosFiltrExist: any[];
  prepedidosExistAngularList: AngularFireList<any>
  filtrPrepedidosExist: any[];

  @Input() id;
  @Input() img_empresa;
  @Input() nom_empresa;
  

  //categorias
  @Input() nombre_categoria;
  categorySelected = [];
  listProd = [];

  //observador
  observador: boolean = true;

  //listprod = showproduct
  listprodFiltrExist: any[];
  listprodExistAngularList: AngularFireList<any>
  filtrlistprodExist: any[];

  //categorias botones
  prodsCategoryFiltrExist: any[];
  prodsCategoryExistAngularList: AngularFireList<any>
  filtrprodsCategoryExist: any[];

  //categorySelected from searchbar
  CategorySlectedFiltrExist: any[];
  CategorySlectedExistAngularList: AngularFireList<any>
  filtrprodsCategorySlectedExist: any[];
  



  productosList: AngularFireList<any>

  constructor( private navCtrl: NavController,
    private modalCtrl: ModalController,
    public alertController: AlertController,
    private prodServ: ProductoService,
    private afs: AngularFireDatabase,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
     this.uid_user=user.uid
     
     this.getListProd();
    this.showCategorias();
    this.CategorySelected();
    this.showPrepedidos()
    this.showProducts()
    this.productsFilterArray()
   })
    
    
    //this.prepedidosExist()
    // console.log("id ",this.id)
    // console.log("product-info nombre empresa ",this.img_empresa)
    
    // console.log("product-info NombreEmpresa ",this.nom_empresa)
  }
// prepedidos
//   prepedidosExist(){
   
//     //this.auth.onAuthStateChanged(user => {
//        this.afs.list('prepedido/'+this.uid_user+"/").valueChanges().subscribe(data=>{
//           this.prepedidos=data
         
//           console.log("verificando si exite prepedidos",this.prepedidos.length)
//       })
      
      
//     //})
    
      
//   }

  
  productsFilterArray(){
    this.productsAngularList = this.afs.list('producto/')
    this.productsAngularList.snapshotChanges().subscribe(
      list => {
        this.prodFiltr = list.map(item=> {
          return {
            $key: item.key,
            ...item.payload.val()
          }
        })
        //console.log("filtro: "+this.prodFiltr)
        this.filtrprod = this.prodFiltr.filter(value => value.categoria_producto === 'silla' &&  value.uid_user === this.id)
        this.filtrprod.map(data => {
          //console.log("filtro: "+data.nombre_producto)
        })
        
      } 
    )
  }
  
  showProducts(){
    
    this.mainProds = false
    this.selection = false;
    this.listprodExistAngularList = this.afs.list('producto/')
    this.listprodExistAngularList.snapshotChanges().subscribe(
      list => {
        this.listprodFiltrExist = list.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          }
        })
        this.filtrlistprodExist = this.listprodFiltrExist.filter(value => value.uid_user==this.id && value.estado==true && value.estadoP==true )
      }
    )
  }

  prepedidos
  async showPrepedidos(){
    //this.auth.onAuthStateChanged(user => {
      this.afs.list('prepedido/'+this.uid_user+"/").valueChanges().subscribe(data=>{

        this.prepedidos=data
        if(this.prepedidos.length==0){
          
          this.prepedidoIsEmpty = true;
        }else{
          this.prepedidoIsEmpty = false;
        }
      })
         
     
   // })    
  }
  
  async goToPedidoList(){
    //console.log("empresa1: "+this.nom_empresa)
    const modal = await this.modalCtrl.create({
      component: PedidosListPage,
      componentProps: {
        empresa_prepedido: this.nom_empresa,
        imagen_empresa: this.img_empresa

      
      }
    })
    await modal.present()
  }

  CategorySelected(){
    this.categoriaFiltered = false;
    this.selection = true;
    this.mainProds = true;
    this.CategorySlectedExistAngularList = this.afs.list('producto/')
    this.CategorySlectedExistAngularList.snapshotChanges().subscribe(
      list => {
        this.CategorySlectedFiltrExist = list.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          }
        })
        this.filtrprodsCategorySlectedExist = this.CategorySlectedFiltrExist.filter(value => value.uid_user === this.id && value.categoria_producto === this.nombre_categoria)
      }
    )    
  } 
  

  buscarProducto(event){
    this.textoBuscarProd = event.detail.value;

  }

  listByCategory(nombre){
    this.categoriaFiltered = true;
    this.mainProds = true
    this.productsFiltered = [];

    this.prodsCategoryExistAngularList = this.afs.list('producto/')
    this.prodsCategoryExistAngularList.snapshotChanges().subscribe(
      list => {
        this.prodsCategoryFiltrExist = list.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          }
        })
        this.filtrprodsCategoryExist = this.prodsCategoryFiltrExist.filter(value => (value.uid_user === this.id && value.categoria_producto ===  nombre && value.estado==true && value.estadoP==true))
      }
    )
  }

  showCategorias(){
    this.prodServ.getProduct().subscribe(data => {
      data.map((item) => {
        if(this.nom_empresa === item.empresa_proveedor && item.estado==true && item.estadoP==true ){
          //console.log("nueva lista de categorias: "+item.categoria_producto)
          
          this.categoria.push({
            categoria: item.categoria_producto
          })   
             
          this.categoria_duplicada = Array.from(this.categoria.reduce((map, obj) => map.set(obj.categoria, obj), new Map()).values())
          
        }
        
      })
    })    
  }


  async modalPedido(nombre_empresa, id_prod, nombre_producto,nombre_proveedor, descripcion_producto, categoria_producto, cantidad_producto, precio_producto,image_producto,url3D){
    
    this.auth.onAuthStateChanged(async (user) => {
      
       await this.afs
        .list('prepedido/' + user.uid + '/')
        .valueChanges()
        .subscribe((data) => {

          this.prepedidos=data
          
        });
        
        for (var i = 0; i < this.prepedidos.length; i++) {

          if(this.prepedidos[i].id_prod==id_prod){
            this.productosRepetidos()
          break;
        
        }
        }

    });
        const modal = await this.modalCtrl.create({
          component: ModalPedidoPage,
          componentProps: {
            id: id_prod,
            nombre: nombre_producto,
            proveedor: nombre_proveedor,
            descripcion: descripcion_producto,
            categoria_prod: categoria_producto,
            cantidad: cantidad_producto,
            precio: precio_producto, 
            nombre_empresa: nombre_empresa,
            image: image_producto,
            url3D:url3D
          }
        })
        
        return await modal.present(); 
    
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
  getListProd(){
    this.prodServ.getProduct().subscribe(data => {
      data.map((item) => {
        if(item.uid_user === this.id){
          this.productos.push({
            nombre: item.nombre_producto,
            descripcion: item.descripcion_producto,
            categoria: item.categoria_producto,
            empresa: item.empresa_proveedor,
            precio: item.precio_producto,
            imagen: item.image_producto,
            cantidad: item.cantidad_producto,
            uid: item.uid_user,
            id: item.id_prod
          })
          
        }
      })
    })

    
    /*
      this.prodServ.getProduct().subscribe(
      list => {
        this.productos = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          }
        })
                
          this.productos.map(item => {
            
            if(item.uid_user === this.id){
            item.nombre_producto;
            item.empresa_producto;
            console.log("nombre producto: "+item.nombre_producto)
          
          }
          
        }) 
        
      }
    )  
    */
    
    
  }
  
  /*
  
  rate=0;
  onRate(rate) {
    console.log(rate)
    this.rate = rate;
    //console.log("comentario:"+this.comentario)
    return this.rate

  }

  SendComentary(){    
    //let calificacion = this.onRate()
    console.log("rate: "+this.rate)
    console.log("comntario: "+this.comentario)
  }
  suma(){
    let stock = 0;
    stock = this.cantidad_prod - this.pedido;
    //console.log("stock: "+stock)
    this.pedido = this.pedido + 1
    //console.log("pedido: "+this.pedido)
    this.total_prod = this.pedido * this.precio_prod
    //console.log("total"+this.total_prod)
    if((stock -1) == 0){
      console.log("stock agotado")
      this.isDisabled = true;
      this.emptyStock()
    }
  }

  resta(){
    let stock = 0;
    this.pedido = this.pedido - 1
    console.log("decremento: "+this.pedido)
    stock = this.cantidad_prod - this.pedido
    if((this.pedido -1 ) <= 0){
      console.log("error")
      this.emptyStock()
      this.isDisabled = true;
      this.pedido = 0
    }
  }
  


  async emptyStock() {
    const alert = await this.alertController.create({
      header: 'Stock Agotado',
      subHeader: 'Lo sentimos',
      message: 'El stock se ha acabado.',
      buttons: ['OK']
    });

    await alert.present();
  }
  

  Comprar(pedido, precio){
    console.log("pedido: "+pedido)
    console.log("precio: "+precio)
    if(pedido == 0){
      
    }
  }

  
  */

  async validationExit(){
      this.modalCtrl.dismiss() 
  }

  async salir(){
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

            this.auth.onAuthStateChanged(user => { 
            
         
                  console.log("estoy en el if del ok para eliminar")
                  
                  this.prodServ.deleteprepedidos(user.uid)})

                  
                  
                
            
            this.modalCtrl.dismiss()
            //location.reload();
          }
        }
        
        
      ]

    })
    
    await alert.present();
    //this.modalCtrl.dismiss();
    
  }
  
  
  

}
