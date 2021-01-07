import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEmpresaPageRoutingModule } from './lista-empresa-routing.module';

import { ListaEmpresaPage } from './lista-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEmpresaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ListaEmpresaPage]
})
export class ListaEmpresaPageModule {}
