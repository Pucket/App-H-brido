import { Component, OnInit } from '@angular/core';

import {NavController, AlertController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { AutenticacaoclienteService } from 'src/app/services/autenticacaocliente.service';
import { stringify } from '@angular/compiler/src/util';
import { EmailValidator, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  usuario: any;

  nome: string;
  email: string;
  endereco: string;
  telefone: string;

  nomeLogin: string;
  emailLogin: string;
  enderecoLogin: string;
  telefoneLogin: string;

  validacao: FormGroup;
  mensagemErro: string = '';

  id = null;

  constructor(private service : UsuarioService,
        private rota: ActivatedRoute,
        private nav: NavController,
        private alerta: AlertController,
        private formulario: FormBuilder,
        private autenticacao: AutenticacaoclienteService) { }

  ngOnInit() {

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



    let email: string;



    this.autenticacao.detalhes().subscribe(res => {
      if(res !== null){
        email = res.email;
      } else {
        this.nav.navigateForward('home');
      }
    }, err => {

     console.log('err', err);

    });

    if(email == ''){
      this.nav.navigateForward('home');
    }





    this.service.listar().subscribe(data => {

      this.usuario = data.map(e => {

        return{

          id: e.payload.doc.id,

          nome: e.payload.doc.data()['nome'],

          email: e.payload.doc.data()['email'],

          telefone: e.payload.doc.data()['telefone'],

          endereco: e.payload.doc.data()['endereco']

        };

      });

      console.log(this.usuario);

      console.log(email);

      for (let it of this.usuario){

        console.log(email===it.email);

        if (email===it.email) {

          console.log("Encontrou");

          // Preencher os campos desse cliente

          this.id = it.id;
          this.validacao.get('nome').setValue(it.nome);
          this.validacao.get('email').setValue(it.email);
          this.validacao.get('endereco').setValue(it.endereco);
          this.validacao.get('telefone').setValue(it.telefone);

          break;

          

        }

      }

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

  atualizarCliente(){
    

  }

  /** 
  inicioAlteracao(registro){
    console.log(registro);
    this.nav.navigateForward( [ "form-cliente", 
      { id: registro.id,
        nome: registro.nome, 
        email: registro.email,
        telefone: registro.telefone,
        dataNascimneto: registro.dataNascimento,
        endereco: registro.endereco
        
      }
  ]);
  }

  async remover(registro){

    const mensagem = await this.alerta.create({
      header: "Atenção",
      message: "Deseja excluir esse usuario?",
      buttons: [
        {
          text: "Ok",
          handler:() => {
            this.service.excluir(registro);
            this.mensagemConfirmacao();
          }
        }, 
        {
          text: "Cancelar",
          handler:() => {}
        }
      ]
    });
    await mensagem.present();
    }
    
   async mensagemConfirmacao(){
      const confirmacao = await this.alerta.create({
        header: "Sucesso!",
        message: "Usuario excluida com sucesso!",
        buttons: [
          {
            text: "oK",
            handler:() => {}
          }
        ]
  });
      await confirmacao.present();
  }*/

}
