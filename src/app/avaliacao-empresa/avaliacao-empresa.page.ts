import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AvaliacaoEmpresaService } from 'src/app/services/avaliacao-empresa.service';

@Component({
  selector: 'app-avaliacao-empresa',
  templateUrl: './avaliacao-empresa.page.html',
  styleUrls: ['./avaliacao-empresa.page.scss'],
})
export class AvaliacaoEmpresaPage implements OnInit {

  titulo: string;
  descricao: string;
  nota: string;

  id = null;

  constructor(private service: AvaliacaoEmpresaService ,
    private nav : NavController,
    private rota: ActivatedRoute) { }

    ngOnInit() {
      // this.id = this.rota.snapshot.params['id'];
      // this.titulo = this.rota.snapshot.params['titulo'];
      // this.descricao = this.rota.snapshot.params['descricao'];
     }
   
     enviarAvaliacao(){
       let avaliacao = {};
   
       console.log("Nome: " + this.titulo);
       console.log("Descrição: " + this.descricao);
   
       avaliacao['nome'] = this.titulo;
       avaliacao['descricao'] = this.descricao;
       console.log(this.nota);
       avaliacao['nota'] = this.nota;
   
       console.log(avaliacao);
   
     //  if(this.id == null){
         this.service.incluir(avaliacao);
      // }else{
      //   this.service.alterar(avaliacao, this.id);
      // } 
   
      // this.nav.navigateForward("avaliacao");
     }


 

}
