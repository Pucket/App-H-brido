import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { AutenticacaoclienteService } from '../services/autenticacaocliente.service';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.page.html',
  styleUrls: ['./registro-cliente.page.scss'],
})
export class RegistroClientePage implements OnInit {
  email: string;
  senha: string;

  validacao: FormGroup;
  mensagemErro: string = '';
  constructor(private service: AutenticacaoclienteService,
              private nav: NavController,
              private formulario: FormBuilder ) { }

  ngOnInit() {
    this.validacao = this.formulario.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      senha: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)

      ]))

    });
  }
  mensagem_validacao = {
    'email': [
      {type: 'required', message: 'e-mail é obrigatorio'},
      {type: 'pattern', message: 'e-mail inválido'}
    ],
    'senha':[
      {type: 'required', message: 'senha é obrigatório'},
      {type: 'minLenght', message: 'A senha deve ter no mínimo seis caracteres'}
    ]
  };
  cadastrar(usuario){
    
    this.service.cadastrarUsuario(usuario).then(
      res => {
        this.nav.navigateForward('/form-cliente');
      }, err => {
        console.log(err);
      }
    );
  }
  

}
