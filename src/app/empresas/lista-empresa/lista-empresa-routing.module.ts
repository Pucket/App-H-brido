import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEmpresaPage } from './lista-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEmpresaPageRoutingModule {}
