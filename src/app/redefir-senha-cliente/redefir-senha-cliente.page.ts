import { Component, OnInit } from '@angular/core';

import { NavController, AlertController } from '@ionic/angular';
import { RedefirSenhaService } from '../services/redefir-senha.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-redefir-senha-cliente',
  templateUrl: './redefir-senha-cliente.page.html',
  styleUrls: ['./redefir-senha-cliente.page.scss'],
})
export class RedefirSenhaClientePage implements OnInit {
  email: string;
  
  validacao: FormGroup;
  mensagemErro: string = '';

  constructor(private nav: NavController,
    private service: RedefirSenhaService,
    private formulario: FormBuilder,
    private alerta: AlertController) { }

  ngOnInit() {
    this.validacao = this.formulario.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  mensagem_validacao = {
    'email': [
      {type: 'required', message: 'E-mail é obrigatório'},
      {type: 'pattern', message: 'E-mail inválido'}
    ]
  };

  redefinir(valor){
    console.log(valor);
    this.service.redefinir(valor).then(
      res => {
        console.log(valor);
        this.nav.navigateForward('/login-cliente');
      }, err => {
        console.log(err);

        this.presentAlert();

      }
    );
  }

  async presentAlert() {

    const alert = await this.alerta.create({
      header: 'Alerta',
      subHeader: 'Login inválido',
      message: 'Email ou senha inválidos',
      buttons: ['OK']

    });



    await alert.present();

  }

}
