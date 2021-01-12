import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedefirSenhaClientePageRoutingModule } from './redefir-senha-cliente-routing.module';

import { RedefirSenhaClientePage } from './redefir-senha-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedefirSenhaClientePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RedefirSenhaClientePage]
})
export class RedefirSenhaClientePageModule {}
