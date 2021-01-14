import { Component, OnInit } from '@angular/core';

import { NavController, AlertController } from '@ionic/angular';
import { AutenticacaoempresaService } from 'src/app/services/autenticacaoempresa.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-empresa',
  templateUrl: './login-empresa.page.html',
  styleUrls: ['./login-empresa.page.scss'],
})
export class LoginEmpresaPage implements OnInit {
  email: string;
  senha: string;

  validacao: FormGroup;
  mensagemErro: string = '';
  constructor(private nav: NavController,
              private service: AutenticacaoempresaService,
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
    
    this.service.loginempresa(valor).then(
      res => {
        this.nav.navigateForward('/inicio-empresa');
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
