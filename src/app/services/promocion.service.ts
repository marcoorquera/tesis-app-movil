import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  constructor(
    private afs: AngularFireDatabase
  ) { }

  promocionList: AngularFireList<any>
  getPromocion(){
    this.promocionList = this.afs.list('/promociones');
    return this.promocionList.snapshotChanges();
  }
}
