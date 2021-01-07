import { Component, OnInit } from '@angular/core';

import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { EmailValidator, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AutenticacaoempresaService } from 'src/app/services/autenticacaoempresa.service';

@Component({
  selector: 'app-lista-empresa',
  templateUrl: './lista-empresa.page.html',
  styleUrls: ['./lista-empresa.page.scss'],
})
export class ListaEmpresaPage implements OnInit {
  empresa: any;

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

  constructor(private service : EmpresaService,
              private rota: ActivatedRoute,
              private nav: NavController,
              private alerta: AlertController,
              private formulario: FormBuilder,
        private autenticacao: AutenticacaoempresaService
        
      ) { }



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
    
    
    
        let email: string;
    
    
    
        this.autenticacao.detalhes().subscribe(res => {
    
          email = res.email;
    
        }, err => {
    
         console.log('err', err);
    
        });
    
    
    
    
    
        this.service.listar().subscribe(data => {
    
          this.empresa = data.map(e => {
    
            return{
    
              id: e.payload.doc.id,
    
              nome: e.payload.doc.data()['nome'],
    
              email: e.payload.doc.data()['email'],
    
              telefone: e.payload.doc.data()['telefone'],
    
              endereco: e.payload.doc.data()['endereco']
    
            };
    
          });
    
          console.log(this.empresa);
    
          console.log(this.empresa);
    
          for (let it of this.empresa){
    
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
    
      atualizarEmpresa(){}
}