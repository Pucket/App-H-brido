import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedefinirSenhaEmpresaPage } from './redefinir-senha-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: RedefinirSenhaEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedefinirSenhaEmpresaPageRoutingModule {}
