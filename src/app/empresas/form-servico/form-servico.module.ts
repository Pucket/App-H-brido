import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { FormServicoPageRoutingModule } from './form-servico-routing.module';

import { FormServicoPage } from './form-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormServicoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormServicoPage]
})
export class FormServicoPageModule {}
