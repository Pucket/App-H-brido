import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioEmpresaPageRoutingModule } from './inicio-empresa-routing.module';

import { InicioEmpresaPage } from './inicio-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioEmpresaPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [InicioEmpresaPage]
})
export class InicioEmpresaPageModule {}
