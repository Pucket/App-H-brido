import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AutenticacaoclienteService } from 'src/app/services/autenticacaocliente.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

 
@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.page.html',
  styleUrls: ['./form-cliente.page.scss'],
})
export class FormClientePage implements OnInit {

  nome: string;
  email: string;
  endereco: string;
  telefone: string;

  emailLogin: string;

  validacao: FormGroup;
  mensagemErro: string = '';

  id = null;

  constructor( private service: UsuarioService,
               private nav: NavController,
               private rota: ActivatedRoute,
               private formulario: FormBuilder,
               private logado: AutenticacaoclienteService) { }

  ngOnInit() {
    this.id = this.rota.snapshot.params['id'];

    console.log(this.id);

    this.validacao = this.formulario.group({
      nome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      endereco: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])),
      telefone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))

    });
    this.validacao.get('nome').setValue(this.rota.snapshot.params['nome']);
    this.validacao.get('email').setValue(this.emailLogin);
    this.validacao.get('endereco').setValue(this.rota.snapshot.params['endereco']);
    this.validacao.get('telefone').setValue(this.rota.snapshot.params['telefone']);
    
    this.logado.detalhes().subscribe(res => {

      //if ( res !== null){
       console.log(res.email);
       this.validacao.get('email').setValue(res.email);
       console.log(this.emailLogin);
    
      //}
    
    }, err => {
    
      console.log('err', err);
    
    });

  }

  mensagem_validacao = {
    'nome': [
      {type: 'required', message: 'Nome é obrigatório'},
      {type: 'minlength', message: 'Nome deve ter no mínimo dez caracteres'}
    ],
    'email': [
      {type: 'required', message: 'E-mail é obrigatório'},
      {type: 'pattern', message: 'E-mail é inválido'}
    ],
    'endereco': [
      {type: 'required', message: 'Endereço é obrigatório'},
      {type: 'minlength', message: 'Endereço deve ter no mínimo dez caracteres'}
    ],
    'telefone': [
      {type: 'required', message: 'Telefone é obrigatório'},
      {type: 'minlength', message: 'Telefone deve ter no mínimo oito caracteres'}
    ],
  };

  enviarCliente(){
    console.log(this.validacao.get('nome').value);
    let cliente = {};

    console.log("Nome: " + this.nome);
    console.log("E-mail: " + this.email);
    console.log("Endereço: " + this.endereco);
    console.log("Telefone: " + this.telefone);

    cliente['nome'] = this.validacao.get('nome').value;
    cliente['email'] = this.validacao.get('email').value;
    cliente['endereco'] = this.validacao.get('endereco').value;
    cliente['telefone'] = this.validacao.get('telefone').value;

    console.log(cliente);
    if (this.id == null){
      this.service.incluir(cliente);
    } else {
      this.service.alterar(cliente, this.id);
    }

    this.nav.navigateForward("inicio-cliente");
  }

}
