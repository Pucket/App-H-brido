import { Component, OnInit } from '@angular/core';

import { AlertController, NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ServicoService } from 'src/app/empresas/servico.service';
import { removeSummaryDuplicates } from '@angular/compiler';
import { filter } from 'rxjs/operators';
import { LoginEmpresaPage } from '../login-empresa/login-empresa.page';
import { EmailValidator } from '@angular/forms';
import { AutenticacaoempresaService } from '../../../app/services/autenticacaoempresa.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.page.html',
  styleUrls: ['./servico.page.scss'],
})
export class ServicoPage implements OnInit {
  id: string;
  nome: string;
  descricao: string;
  valor: string;
  email: string;
  emaillogado: string;

  servico: any;
  pesquisa: string;
  constructor(private service: ServicoService,
            private rota: ActivatedRoute,
            private nav: NavController,
            private alerta: AlertController,
            private autoempresa: AutenticacaoempresaService
    ) { }

  ngOnInit() {
    this.autoempresa.detalhes().subscribe(res => {

      if(res !== null){
   
       this.emaillogado = res.email;
   
      } 
   
     }, err => {
   
   
   
      console.log('err', err);
   
   
   
     });

    this.service.listLazyRoutes().subscribe(data => {
      this.servico = data.map(e =>{
        
        return{
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          descricao: e.payload.doc.data()['descricao'],
          valor: e.payload.doc.data()['valor'],
          email: e.payload.doc.data()['email']
        };
      }
       
         );
         console.log(this.servico);
         
    } 
    );

  }



  
  inicioAlteracao(registro){
    console.log(registro);
    this.nav.navigateForward( ["form-servico", 
      { id: registro.id, 
        nome: registro.nome, 
        descricao: registro.descricao,
        valor: registro.valor, 
        email: registro.email
       }
    ] );
    
  }
    async remover(registro) {
      const mensagem = await this.alerta.create({
        header: "Atenção",
        message: "Deseja excluir esse serviço ?",
      
        buttons: [
          { 
            text: "OK",
           
            handler: () => {
              this.service.excluir(registro);
              this.mensagemConfirmacao();
            }
          },
           {
             text: "Cancelar",
             handler:() => {
            
            }
          }
        ] 
      }); 
 await mensagem.present();
  }

  async mensagemConfirmacao(){
   const confirmacao = await this.alerta.create({
     header: "Sucesso!",
     message: "Serviço excluído com sucesso!",
     buttons: [
       {
         text: "OK",
         handler:() => {}
       }
     ]
   });

   await confirmacao.present();

  }


  


  }


    
    
  


