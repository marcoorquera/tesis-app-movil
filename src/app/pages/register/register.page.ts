import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../..//services/auth.service';

import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
import { CameraOptions, CameraResultType } from '@capacitor/camera';
import { AngularFireAuth } from '@angular/fire/compat/auth';

const { Camera } = Plugins




@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  
  isDisabledPass = true
  passType = 'password'

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  image: string;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;

  src: string="";

  validation_messages = {    
    'imagen': [
      {type: 'required', message: 'Se requiere imagen'}
    ]
    ,
    'name': [
      { type: 'required', message: 'Se requiere nombre de usuario'},
    ],
    'lastname': [
      {type: 'required', message: 'Se requiere apellido de usuario'}
    ],
    
    'phone': [
      {type: 'required', message: 'Se requiere telefono de usuario'},
      {type: 'maxlength', message: 'El número debe tener 10 digitos'},
      
    ],
    'email': [
      { type: 'required', message: 'Se requiere email.' },
      { type: 'pattern', message: 'Ingrese un email valido.' }
    ],
    'password': [
      { type: 'required', message: 'Se requiere contraseña.' },
      { type: 'minlength', message: 'La contraseña debe ser mayor a 6 digitos.' }
    ]
  }



  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private router: Router,
    private AFauth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(10)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  takePicture(){
    let options: CameraOptions={
      quality: 100,
      resultType: CameraResultType.DataUrl,
      saveToGallery: true
    }
    Camera.getPhoto(options).then((result) => {
      if(result.dataUrl){
        this.src = result.dataUrl;
        //console.log("image: "+this.src)
      }
    },(err)=>{
      alert(JSON.stringify(err));
    }
    )
  }


  async tryRegister(){
    if(!this.src){
      this.imageController()
    }else{
      this.authService.register(this.email,this.password, this.name, this.lastname, this.phone, this.src)
     .then(res => {      

       this.errorMessage = "";
       this.validations_form.reset()   
       this.AFauth.signOut()
       //this.navCtrl.navigateForward("/home");
      }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
    }  
  }
  async imageController(){
    const alert = await this.alertCtrl.create({
      animated: true,
      cssClass: 'error',
      header: 'Error al registrar',
      message: 'ingrese una fotografía',
      buttons: ['OK']

    })
    await alert.present();
  }

  async successRegister(){
    const alert = await this.alertCtrl.create({
      animated: true,
      cssClass: 'success',
      header: 'Cuenta creada exitosamente',
      message: 'Inicie sesión para acceder a su cuenta',
      buttons: ['OK']

    })
    await alert.present();
  }

  goToLogin(){
    this.navCtrl.navigateForward('/login');
  }


  showPassword(){
    this.isDisabledPass = false;
    this.passType = 'text'
    
  }

  hidePassword(){ 
    this.isDisabledPass = true;
    this.passType = 'password'
  }

}
