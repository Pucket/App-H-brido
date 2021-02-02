import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExibirAvaliacaoPageRoutingModule } from './exibir-avaliacao-routing.module';

import { ExibirAvaliacaoPage } from './exibir-avaliacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExibirAvaliacaoPageRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [ExibirAvaliacaoPage]
})
export class ExibirAvaliacaoPageModule {}
