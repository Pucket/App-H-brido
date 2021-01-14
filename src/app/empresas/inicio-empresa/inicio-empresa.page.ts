import { Component, OnInit } from '@angular/core';

import { AutenticacaoempresaService } from 'src/app/services/autenticacaoempresa.service'
import { EmpresaService } from 'src/app/services/empresa.service'
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-inicio-empresa',
  templateUrl: './inicio-empresa.page.html',
  styleUrls: ['./inicio-empresa.page.scss'],
})
export class InicioEmpresaPage implements OnInit {

  usuario: any;

  nomeEmpresa: string;

  constructor(private service: EmpresaService,
              private autenticacao: AutenticacaoempresaService,
              private nav: NavController
              ) { }

  ngOnInit() {
  
    let variavel: boolean = true;

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

        console.log(email!==it.email);

        if (email!==it.email) {

          console.log("Encontrou");

           variavel = false;
                   

        } else {
          this.nomeEmpresa=it.nome;
          variavel = true;
        }

      }

    }); 

    if(!variavel){ 

      this.nav.navigateForward('registro-empresa');

    }

  }

  sair(){

    console.log('Verificar');

    this.autenticacao.logout().then(res => {
      console.log(res);
      this.nav.navigateForward('home');
    } ).catch(error => {
      console.log(error)
    })
  }

}
