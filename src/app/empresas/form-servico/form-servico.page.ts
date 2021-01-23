import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ServicoService } from 'src/app/empresas/servico.service';
import { ServicoPage } from '../servico/servico.page';

import { AutenticacaoempresaService} from 'src/app/services/autenticacaoempresa.service';

@Component({
  selector: 'app-form-servico',
  templateUrl: './form-servico.page.html',
  styleUrls: ['./form-servico.page.scss'],
})
export class FormServicoPage implements OnInit {

  nome: string;
  descricao: string;
  valor: Number;
  email: string;

  emailLogin: string;

  validacao: FormGroup;
  mensagemErro: string = '';

  id = null;

  constructor(private servico: ServicoService,
            private nav: NavController,
            private rota: ActivatedRoute,
            private formulario: FormBuilder,
            private logado: AutenticacaoempresaService,
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
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    
      ]))

    });
    this.nome = this.rota.snapshot.params['nome'];
    this.validacao.get('nome').setValue(this.rota.snapshot.params['nome']);
    this.descricao = this.rota.snapshot.params['descricao'];
    this.validacao.get('descricao').setValue(this.rota.snapshot.params['descricao']);
    this.valor = this.rota.snapshot.params['valor'];
    this.validacao.get('valor').setValue(this.rota.snapshot.params['valor']);
    // this.email = this.rota.snapshot.params['email'];
    // this.validacao.get('email').setValue(this.rota.snapshot.params['email']);
    this.validacao.get('email').setValue(this.emailLogin);

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
    // 'email': [
    //   {type: 'required', message: 'E-mail é obrigatório'},
    //   {type: 'pattern', message: 'E-mail inválido'}
    // ],
  };

  
  enviarServico(){
    console.log(this.validacao.get('nome').value);
    let serv = {};
   
    console.log("Nome: " + this.nome);
    console.log("descricao " + this.descricao);  
    console.log("valor " + this.valor);
    console.log("email " + this.email);

   
    serv['nome'] = this.validacao.get('nome').value;
    serv['descricao'] = this.validacao.get('descricao').value;
    serv['valor'] = this.validacao.get('valor').value;
    serv['email'] = this.validacao.get('email').value;

    console.log(serv);
    if(this.id == null){
      this.servico.incluir(serv);
    } else {
      this.servico.alterar(serv, this.id);
    }

    this.nav.navigateForward("servico");
  }


}
