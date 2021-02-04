import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { AvaliacaoEmpresaService } from 'src/app/services/avaliacao-empresa.service';
import { AvaliacaoEmpresaPage } from '../avaliacao-empresa/avaliacao-empresa.page';



@Component({
  selector: 'app-exibir-avaliacao',
  templateUrl: './exibir-avaliacao.page.html',
  styleUrls: ['./exibir-avaliacao.page.scss'],
})
export class ExibirAvaliacaoPage implements OnInit {

  nome: string;
  descricao: string;
  nota: string;
  servico: string;
  email: string;

  avaliacao: any;
 

  constructor(private nav: NavController,
              private rota: ActivatedRoute,
              private alertCtrl: AlertController,
              private service: AvaliacaoEmpresaService

  ) { }

  ngOnInit() {

    this.nome = this.rota.snapshot.params['nome'];
    this.descricao = this.rota.snapshot.params['descricao'];
    this.nota = this.rota.snapshot.params['nota'];
    this.servico = this.rota.snapshot.params['servico'];
    this.email = this.rota.snapshot.params['email'];
    

  this.service.listar().subscribe(data => {
      
      this.avaliacao = data.map(e =>{
       
        return{
          // id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          descricao: e.payload.doc.data()['descricao'],
          nota: e.payload.doc.data()['nota'],
          servico: e.payload.doc.data()['servico'],
          email: e.payload.doc.data()['email']
          
        };
      }
       
         );
        
    } 
    );

    console.log(this.email);
    console.log(this.nome);
  }
}

