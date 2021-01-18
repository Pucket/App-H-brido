import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExibirServicoPage } from './exibir-servico.page';

const routes: Routes = [
  {
    path: '',
    component: ExibirServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExibirServicoPageRoutingModule {}
