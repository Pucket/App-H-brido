import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ServicoService } from 'src/app/empresas/servico.service'
import { ServicoPage } from '../servico/servico.page';
import { Server } from 'http';

@Component({
  selector: 'app-form-servico',
  templateUrl: './form-servico.page.html',
  styleUrls: ['./form-servico.page.scss'],
})
export class FormServicoPage implements OnInit {

  nome: string;
  descricao: string;
  valor: Number;

  validacao: FormGroup;
  mensagemErro: string = '';

  id = null;

  constructor(private servico: ServicoService,
            private nav: NavController,
            private rota: ActivatedRoute,
            private formulario: FormBuilder
    ) { }

  ngOnInit() {

    this.id = this.rota.snapshot.params['id'];
    
    console.log(this.id);

    this.validacao = this.formulario.group({
      nome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      descricao: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      valor: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ]))

    });
    this.nome = this.rota.snapshot.params['nome'];
    this.validacao.get('nome').setValue(this.rota.snapshot.params['nome']);
    this.descricao = this.rota.snapshot.params['descricao'];
    this.validacao.get('descricao').setValue(this.rota.snapshot.params['descricao']);
    this.valor = this.rota.snapshot.params['valor'];
    this.validacao.get('valor').setValue(this.rota.snapshot.params['valor']);

  }

  mensagem_validacao = {
    'nome': [
      {type: 'required', message: 'Nome é obrigatório'},
      {type: 'minlength', message: 'Nome deve ter no mínimo três caracteres'}
    ],
    'descricao': [
      {type: 'required', message: 'Descrição é obrigatório'},
      {type: 'pattern', message: 'descrição deve ter no mínimo 50 letras'}
    ],
    'valor': [
      {type: 'required', message: 'valor é obrigatório'},
      {type: 'minlength', message: 'valor deve ter no mínimo dois caracteres'}
    ],
  };

  
  enviarServico(){
    console.log(this.validacao.get('nome').value);
    let serv = {};
   
    console.log("Nome: " + this.nome);
    console.log("descricao " + this.descricao);  
    console.log("valor " + this.valor);

   
    serv['nome'] = this.validacao.get('nome').value;
    serv['descricao'] = this.validacao.get('descricao').value;
    serv['valor'] = this.validacao.get('valor').value;

    console.log(serv);
    if(this.id == null){
      this.servico.incluir(serv);
    } else {
      this.servico.alterar(serv, this.id);
    }

    this.nav.navigateForward("servico");
  }


}
