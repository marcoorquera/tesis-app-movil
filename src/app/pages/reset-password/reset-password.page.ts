import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email_recover: string;
  constructor(private authservice: AuthService,private alertCtroller: AlertController, 
    private navCtrl: NavController,) { }

  ngOnInit() {
  }

  sendLinkReset(){
    if(this.email_recover != ""){
      
      this.authservice.resetPassword(this.email_recover).then(() => {
        console.log('enviado')
        let m='Revise su correo para continuar con el proceso'
        let h='Alerta'
        this.alertMessage(h,m)
      }).catch(()=>{
        console.log('error')
        let m='ingrese un correo válido'
        let h='Enviado'
        this.alertMessage(h,m)
      })
    }else{
      alert('Ingrese su correo electrónico')
    }
  }
  goToLogin(){
    this.navCtrl.navigateForward('/login');
  }

  async alertMessage(header:string, message:string){
    const alert = await this.alertCtroller.create({
      animated: true,
      cssClass: 'exit',
      header: header,
      message: message,
      buttons: ['OK']

    })
    await alert.present();
  }


}
