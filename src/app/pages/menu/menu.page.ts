import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireObject, snapshotChanges } from '@angular/fire/compat/database';

import { MenuController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  user = [];
  nombre: string;
  apellido: string;
  email: string;
  imagen: string;
  constructor(
    private navCtrl: NavController,
    private authservice: AuthService,
    private menu:  MenuController,
    private afAuth: AngularFireAuth,    
    private afs: AngularFireDatabase,
    public prodServ: ProductoService,
    
  ) {}
  
  ngOnInit() {
    this.afAuth.onAuthStateChanged(user=> {
      if(user){
        this.showMenu(user.uid);
      }else{
        this.navCtrl.navigateBack('/login');
      }
    })
  }

  

  goToHome(){
    
    this.navCtrl.navigateForward("/menu/home")
    
    
  }

  goToProfile(){
    this.navCtrl.navigateForward("/menu/profile")
  }

  goToVendedores(){
    this.navCtrl.navigateForward("/menu/list-vendedores")
  }

  goToPromocion(){
    this.navCtrl.navigateForward("/menu/promocion")
  }

  goToPedidos(){
    this.navCtrl.navigateForward("/menu/pedido")
  }
  logout(){
    this.afAuth.onAuthStateChanged((user) => {
      this.prodServ.deleteprepedidos(user.uid);
    });
    this.afAuth.signOut()
    this.navCtrl.navigateBack('/login')
  }

  // logout(){
  //   this.authservice.logoutUser().then(res => {
  //     console.log(res);
  //     this.navCtrl.navigateBack('/login');
  //   }).catch(error => {
  //     console.log(error);
  //   })
  // }
  closeMenu(){
    this.menu.toggle();
  }

  showMenu(uid){
    this.afs.list('users/'+uid).valueChanges().subscribe(_data => {
      this.user = _data;
      this.nombre = this.user[2];
      this.imagen = this.user[1];
      this.email = this.user[0];
    })
  }

}
