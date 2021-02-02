import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExibirAvaliacaoPage } from './exibir-avaliacao.page';

const routes: Routes = [
  {
    path: '',
    component: ExibirAvaliacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExibirAvaliacaoPageRoutingModule {}
