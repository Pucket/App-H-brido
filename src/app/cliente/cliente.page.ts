import { Component, OnInit } from '@angular/core';

import {NavController, AlertController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  usuario: any;

  constructor(private service : UsuarioService,
        private rota: ActivatedRoute,
        private nav: NavController,
        private alerta: AlertController) { }

  ngOnInit() {
    this.service.listar().subscribe(data => {
      this. usuario = data.map(e => {
        return{
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          email: e.payload.doc.data()['email'],
          telefone: e.payload.doc.data()['telefone'],
          dataNascimento: e.payload.doc.data()['dataNascimento'],
          endereco: e.payload.doc.data()['endereco']
        };
      });
      console.log(this. usuario);
    });  
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
