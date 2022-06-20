import { Component, OnInit, Input } from '@angular/core';

import { MenuController } from '@ionic/angular';
import { VendedorService } from 'src/app/services/vendedor.service'; 

@Component({
  selector: 'app-list-vendedores',
  templateUrl: './list-vendedores.page.html',
  styleUrls: ['./list-vendedores.page.scss'],
})
export class ListVendedoresPage implements OnInit {

  vendedores = [];
  textoBuscar = '';

  constructor(
    private menu:  MenuController,
    private vendedorService: VendedorService
  ) { }

  ngOnInit() {
    this.getVendedor()
  }
  toggleMenu(){
    this.menu.toggle()
  }
  getVendedor(){
    this.vendedorService.getVendedor().subscribe(
      list => {
        this.vendedores = list.map(item => {
          return{
            $key: item.key,
            ...item.payload.val()
          }
        })
        this.vendedores.map(item => {
          item.apellido_vendedor
          item.nombre_vendedor
          item.email_vendedor
          item.nombre_empresa
          item.telefono_vendedor
          item.fecha_nacimiento_vendedor
          item.image_vendedor
          item.direccion_vendedor
        })
      }
    )
  }

  buscar(event: CustomEvent){
    this.textoBuscar = event.detail.value;
  }

}
