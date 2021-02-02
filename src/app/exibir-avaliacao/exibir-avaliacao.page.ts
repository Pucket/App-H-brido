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

  avaliacao: any;
 

  constructor(private nav: NavController,
              private rota: ActivatedRoute,
              private alertCtrl: AlertController,
              private service: AvaliacaoEmpresaService

  ) { }

  ngOnInit() {

  this.service.listar().subscribe(data => {
      
      this.avaliacao = data.map(e =>{
       
        return{
          // id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          descricao: e.payload.doc.data()['descricao'],
          nota: e.payload.doc.data()['nota']
        };
      }
       
         );
         console.log(this.avaliacao);
    } 
    );

    
  }
}

