import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { AvaliacaoEmpresaService } from 'src/app/services/avaliacao-empresa.service';

@Component({
  selector: 'app-exibir-servico',
  templateUrl: './exibir-servico.page.html',
  styleUrls: ['./exibir-servico.page.scss'],
})
export class ExibirServicoPage implements OnInit {

  id: string;
  nome: string;
  descricao: string;
  valor: string;
  email: string;

  titulo: string;
  
  nota: string;

  constructor(private nav: NavController,
              private rota: ActivatedRoute,
              private alertCtrl : AlertController,
              private service: AvaliacaoEmpresaService) { }

  ngOnInit() {

    this.id = this.rota.snapshot.params['id'];
    this.nome = this.rota.snapshot.params['nome'];
    this.descricao = this.rota.snapshot.params['descricao'];
    this.valor = this.rota.snapshot.params['valor'];
    this.email = this.rota.snapshot.params['email'];

  }

  avaliar(){
   this.mensagem();
  }

  async mensagem (){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Avaliar',
      inputs: [
        {
          name: 'Titulo',
          type: 'text',
          placeholder: 'Titulo'
        },
        {
          name: 'Descrição',
          type: 'text',
          
          placeholder: 'Descrição'
        },
      ],
      
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (form) => {

            console.log(form.Titulo);


            console.log(form.Descrição);

            console.log(form);
            
           this.titulo = form.Titulo;
           this.descricao= form.Descrição;

   
            console.log("Nome: " + this.titulo);
            console.log("Descrição: " + this.descricao);
        
           
          //    this.service.incluir(avaliacao);
          
            this.radios();
          }
        },
        
      ]
    });

    await alert.present();
  }

  async radios(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
      inputs: [
        {
          name: '5 - Excelente',
          type: 'radio',
          label: 'Excelente',
          value: '5',
          
        },
        {
          name: '4 - Muito Bom',
          type: 'radio',
          label: 'Muito Bom',
          value: '4'
        },
        {
          name: '3 - Bom',
          type: 'radio',
          label: 'Bom',
          value: '3'
        },
        {
          name: '2 - Ruim',
          type: 'radio',
          label: 'Ruim',
          value: '2'
        },
        {
          name: '1 - Péssimo',
          type: 'radio',
          label: 'Pessimo',
          value: '1'
        },
        
      ],
      buttons: [
         {
          text: 'Ok',
          handler: (form) => {
            console.log(form);
            console.log(this.nota);
            let avaliacao = {};
            
            avaliacao['nome'] = this.titulo;
            avaliacao['descricao'] = this.descricao;
            avaliacao['nota'] = form;

          this.service.incluir(avaliacao);
   
            console.log(avaliacao);
          }
        }
      ]
    });

    await alert.present();
}

  

}
