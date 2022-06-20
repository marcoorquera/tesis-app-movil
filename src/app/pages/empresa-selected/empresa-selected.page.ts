import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { modalController } from '@ionic/core';
@Component({
  selector: 'app-empresa-selected',
  templateUrl: './empresa-selected.page.html',
  styleUrls: ['./empresa-selected.page.scss'],
})
export class EmpresaSelectedPage implements OnInit {

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modalCtrl.dismiss()
    this.navCtrl.navigateForward("/menu/home")
  }

}
