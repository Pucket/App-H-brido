import { Component, OnInit } from '@angular/core';

import { UsuarioService } from 'src/app/services/usuario.service'
import { AutenticacaoclienteService } from 'src/app/services/autenticacaocliente.service'
import { NavController } from '@ionic/angular';

import { ServicoService } from 'src/app/empresas/servico.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-inicio-cliente',
  templateUrl: './inicio-cliente.page.html',
  styleUrls: ['./inicio-cliente.page.scss'],
})
export class InicioClientePage implements OnInit {

  usuario: any;

  nomeCliente: string;

  pesquisa: string;

  empresa: any;

  consultados: boolean = false;

  chave: any;

  constructor(private service: UsuarioService,
              private autenticacao: AutenticacaoclienteService,
              private nav: NavController,
              private serviceEmpresa: ServicoService,
              ) { }

  ngOnInit() {

    this.serviceEmpresa.listLazyRoutes().subscribe(data => {
      this.empresa = data.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          descricao: e.payload.doc.data()['descricao'],
          valor: e.payload.doc.data()['valor'],
          email: e.payload.doc.data()['email']
        }
      })
    })

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

          //this.nav.navigateForward('registro-cliente');
           variavel = false;
                   

        } else {
          this.nomeCliente=it.nome;
          variavel = true;
        }

      }

    }); 

    if(!variavel){ 

      this.nav.navigateForward('registro-cliente');

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

  async buscar(){
    if(!this.pesquisa){
      this.consultados = false;
      this.serviceEmpresa.listLazyRoutes().subscribe(data => {
        this.empresa = data.map(e => {
          return {
            id: e.payload.doc.id,
            nome: e.payload.doc.data()['nome'],
            descricao: e.payload.doc.data()['descricao'],
            valor: e.payload.doc.data()['valor'],
            email: e.payload.doc.data()['email']
          }
        })
      })
    } else {
      this.consultados = true;
    }
    console.log(this.consultados);
    this.empresa = this.empresa.filter(atual => {
      if(atual.nome && this.pesquisa){
        return atual.nome.toLowerCase().indexOf(this.pesquisa.toLowerCase()) > -1;
      }
    }) 
  }

  abrirServico(item){

    this.nav.navigateForward( [ "/exibir-servico", {  id: item.id, nome: item.nome, 
      descricao: item.descricao, valor: item.valor, email: item.email } ]);
  }

}
