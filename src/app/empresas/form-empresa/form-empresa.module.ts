import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormEmpresaPageRoutingModule } from './form-empresa-routing.module';

import { FormEmpresaPage } from './form-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormEmpresaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormEmpresaPage]
})
export class FormEmpresaPageModule {}
