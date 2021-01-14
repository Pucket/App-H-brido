import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormServicoPage } from './form-servico.page';

const routes: Routes = [
  {
    path: '',
    component: FormServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormServicoPageRoutingModule {}
