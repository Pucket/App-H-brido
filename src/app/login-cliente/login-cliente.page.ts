import { Component, OnInit } from '@angular/core';

import { NavController, AlertController } from '@ionic/angular';
import { AutenticacaoclienteService } from '../services/autenticacaocliente.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.page.html',
  styleUrls: ['./login-cliente.page.scss'],
})
export class LoginClientePage implements OnInit {
  email: string;
  senha: string;

  validacao: FormGroup;
  mensagemErro: string = '';
  constructor(private nav: NavController,
              private service: AutenticacaoclienteService,
              private formulario: FormBuilder,
              private alerta: AlertController) { }

  ngOnInit() {
    this.validacao = this.formulario.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      senha: new FormControl ('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });

  }

  mensagem_validacao = {
    'email': [
      {type: 'required', message: 'E-mail é obrigatório'},
      {type: 'pattern', message: 'E-mail inválido'}
    ],
    'senha': [
      {type: 'required', message: 'Senha é obrigatória'},
      {type: 'minLenght', message: 'A senha deve ter no mínimo seis caracteres'}
    ]
  };

  logar(valor){
    
    this.service.logincliente(valor).then(
      res => {
        this.nav.navigateForward('/inicio-cliente');
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
