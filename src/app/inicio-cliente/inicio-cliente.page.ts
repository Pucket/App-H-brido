import { Component, OnInit } from '@angular/core';

import { UsuarioService } from 'src/app/services/usuario.service'
import { AutenticacaoclienteService } from 'src/app/services/autenticacaocliente.service'
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-inicio-cliente',
  templateUrl: './inicio-cliente.page.html',
  styleUrls: ['./inicio-cliente.page.scss'],
})
export class InicioClientePage implements OnInit {

  usuario: any;

  email: string;

  constructor(private service: UsuarioService,
              private autenticacao: AutenticacaoclienteService,
              private nav: NavController
              ) { }

  ngOnInit() {

    let email: string;



    this.autenticacao.detalhes().subscribe(res => {

      email = res.email;

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

          this.nav.navigateForward('login-cliente');
          
          break;

          

        }

      }

    }); 

  }

}
