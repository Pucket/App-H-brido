import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedefinirSenhaEmpresaPageRoutingModule } from './redefinir-senha-empresa-routing.module';

import { RedefinirSenhaEmpresaPage } from './redefinir-senha-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedefinirSenhaEmpresaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RedefinirSenhaEmpresaPage]
})
export class RedefinirSenhaEmpresaPageModule {}
