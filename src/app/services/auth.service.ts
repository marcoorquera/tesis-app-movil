import { Injectable } from '@angular/core';
//firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
//navegacion
import { NavController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private AFauth: AngularFireAuth,
    private afs: AngularFireDatabase,
    private navCtrl: NavController,
    private storage: AngularFireStorage,
    private alertCtrl: AlertController
    
    ) { }

  loginUser(value){
    return new Promise<any>((resolve, reject) => {
    this.AFauth.signInWithEmailAndPassword(value.email, value.password).then(
    res => resolve(res),
    err => reject(err)
    )
    })
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      if(this.AFauth.currentUser){
          this.AFauth.signOut().then(()=>{
          this.navCtrl.navigateBack('/login')
          resolve;
        }).catch((error) => {
          reject();
        })
      }
    })
  }
  register(email: string, password: string, nombre: string, apellido: string, telefono: string, image: string){
    return new Promise((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(email, password).then(res => {
        const uid = res.user.uid;
        this.storage.storage.ref('usuario/'+res.user.uid).putString(image, 'data_url').then(async(datos) => {
          await datos.ref.getDownloadURL().then((downloadURL) => {
            image=downloadURL;
            this.afs.object('usuario/'+res.user.uid).set({
              uid: uid,
              nombre: nombre,
              apellido: apellido,
              telefono: telefono,
              email: email,
              imagen: image,

            })

            this.afs.object('emails/'+uid).set({
              email:email
            })
          })
        })
        this.navCtrl.navigateForward('/login')
        this.successRegister();
      })
    })
  }

  async successRegister(){
    const alert = await this.alertCtrl.create({
      animated: true,
      cssClass: 'success',
      header: 'Cuenta creada',
      message: 'Inicie sesión para acceder a su cuenta',
      buttons: ['OK']

    })
    await alert.present();
  }
  
  resetPassword(email: string){  
    return this.AFauth.sendPasswordResetEmail(email);
  
  }

  
}
