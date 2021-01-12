import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedefirSenhaClientePage } from './redefir-senha-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: RedefirSenhaClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedefirSenhaClientePageRoutingModule {}
