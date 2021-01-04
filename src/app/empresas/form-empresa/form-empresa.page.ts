import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';

//import { EmpresaService } from '../services/empresa.service';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.page.html',
  styleUrls: ['./form-empresa.page.scss'],
})
export class FormEmpresaPage implements OnInit {

  nome: string;
  email: string;
  endereco: string;
  telefone: string;

  validacao: FormGroup;
  mensagemErro: string = '';

  id = null;

  constructor( private service: EmpresaService,
               private nav: NavController,
               private rota: ActivatedRoute,
               private formulario: FormBuilder) { }

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
    this.validacao.get('email').setValue(this.rota.snapshot.params['email']);
    this.validacao.get('endereco').setValue(this.rota.snapshot.params['endereco']);
    this.validacao.get('telefone').setValue(this.rota.snapshot.params['telefone']);
    

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

  enviarEmpresa(){
    console.log(this.validacao.get('nome').value);
    let empresa = {};

    console.log("Nome: " + this.nome);
    console.log("E-mail: " + this.email);
    console.log("Endereço: " + this.endereco);
    console.log("Telefone: " + this.telefone);

    empresa['nome'] = this.validacao.get('nome').value;
    empresa['email'] = this.validacao.get('email').value;
    empresa['endereco'] = this.validacao.get('endereco').value;
    empresa['telefone'] = this.validacao.get('telefone').value;

    console.log(empresa);
    if (this.id == null){
      this.service.incluir(empresa);
    } else {
      this.service.alterar(empresa, this.id);
    }

    this.nav.navigateForward("inicio-empresa");
  }

}
