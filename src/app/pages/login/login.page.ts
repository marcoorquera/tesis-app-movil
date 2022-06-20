import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  
  errMessage={
    'auth/user-not-found': 'Usuario no encontrado.',
    'auth/email-already-in-user': 'El correo electrónico ya se encuentra en uso.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/too-many-requests': 'Cuenta bloqueada. Ingrese a "Olvide mi contraseña" y restaure su contraseña.'
  
  }

  isDisabledPass = true
  passType = 'password'


  constructor(private afs: AngularFireDatabase,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,private alertCtroller: AlertController,
    private auth: AngularFireAuth,
    public prodServ: ProductoService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Se requiere Email.' },
      { type: 'pattern', message: 'Ingrese un email válido.' }
    ],
    'password': [
      { type: 'required', message: 'Se require contraseña.' },
      { type: 'minlength', message: 'La contraseña debe ser mayor a 5 caracteres' }
    ]
  };
  usuario

  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {

      this.afs.object('usuario/'+res.user.uid).valueChanges().subscribe(_data => {
        this.usuario = _data
        if (this.usuario!=null){
          if (res.user.uid == this.usuario.uid  ){
            this.navCtrl.navigateForward("/menu/home");
            this.validations_form.reset()
            this.auth.onAuthStateChanged((user) => {
              this.prodServ.deleteprepedidos(user.uid);
            });
          }else{
            this.navCtrl.navigateForward('/register');
          }

        }else{
          this.navCtrl.navigateForward('/register');
          let h='Información'
          let m='No se ha encontrado el usuario por favor registrese'
          this.userAccess(h,m)
        }
      
      })
    
    }, err => {
      
      this.errorMessage = this.errMessage[err.code]
      console.log(err.code)
    })
  }

  goToRegister(){
    this.navCtrl.navigateForward("/register")
  }

  showPassword(){
    this.isDisabledPass = false;
    this.passType = 'text'
    
  }

  hidePassword(){ 
    this.isDisabledPass = true;
    this.passType = 'password'
  }

  async userAccess(header:string,message:string){
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
