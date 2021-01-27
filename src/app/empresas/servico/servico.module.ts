import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicoPageRoutingModule } from './servico-routing.module';

import { ServicoPage } from './servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ServicoPage]
})
export class ServicoPageModule {}
