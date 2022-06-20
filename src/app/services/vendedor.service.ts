import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  vendedorList: AngularFireList<any>
  constructor(
    private afs: AngularFireDatabase
  ) { }

  getVendedor(){
    this.vendedorList = this.afs.list('/vendedor');
    return this.vendedorList.snapshotChanges()
  }
  

  getVendedores(){
    this.vendedorList = this.afs.list('/vendedor');
    return this.vendedorList.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({
          key: c.payload,
          ...c.payload.val()
        }))
      )
    )
  }
}
