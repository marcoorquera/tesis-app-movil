import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: 
    [
      {
        path: "home",
        loadChildren:() => import("../home/home.module").then(m => m.HomePageModule)
      },
      {
        path: "profile",
        loadChildren:() => import("../profile/profile.module").then(m => m.ProfilePageModule)
      },
      {
        path: "list-vendedores",
        loadChildren:() => import("../list-vendedores/list-vendedores.module").then(m => m.ListVendedoresPageModule)
      },
      {
        path: "promocion",
        loadChildren:() => import("../promocion/promocion.module").then(m => m.PromocionPageModule)
      },
      {
        path: "pedido",
        loadChildren:() => import("../pedido/pedido.module").then(m => m.PedidoPageModule)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
