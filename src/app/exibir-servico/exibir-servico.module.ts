import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExibirServicoPageRoutingModule } from './exibir-servico-routing.module';

import { ExibirServicoPage } from './exibir-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExibirServicoPageRoutingModule
  ],
  declarations: [ExibirServicoPage]
})
export class ExibirServicoPageModule {}
