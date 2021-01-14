import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioEmpresaPage } from './inicio-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: InicioEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioEmpresaPageRoutingModule {}
