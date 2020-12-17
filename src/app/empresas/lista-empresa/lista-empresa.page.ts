import { Component, OnInit } from '@angular/core';

import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-lista-empresa',
  templateUrl: './lista-empresa.page.html',
  styleUrls: ['./lista-empresa.page.scss'],
})
export class ListaEmpresaPage implements OnInit {
  empresa: any;

  constructor(private service : EmpresaService,
              private rota: ActivatedRoute,
              private nav: NavController,
              private alerta: AlertController  

  ) { }

  ngOnInit() {
    this.service.listar().subscribe(data => {
      this.empresa = data.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          email: e.payload.doc.data()['email'],
          endereco: e.payload.doc.data()['endereco'],
          telefone: e.payload.doc.data()['telefone']
        };
      }

        );
        console.log(this.empresa);
    }
    );

  }

  inicioAlteracao(registro){
    console.log(registro);
    this.nav.navigateForward( [ "form-empresa",
      { id: registro.id,
        nome: registro.nome,
        email: registro.email,
        endereco: registro.endereco,
        telefone: registro.telefone
      }
   ] );
  }

  async remover(registro) {
    const mensagem = await this.alerta.create({
      header: "Atenção",
      message: "Deseja excluir essa Empresa?",
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
          handler: () => {
          }
        }
      ]
    });

    await mensagem.present();
  }  

  async mensagemConfirmacao(){
    const confirmacao = await this.alerta.create({
      header: "Sucesso!",
      message: "Empresa exluída com sucesso!",
      buttons: [
        {
          text: "Ok",
          handler:() => {}
        }
      ]
    });

    await confirmacao.present();

  }

}
