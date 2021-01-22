import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private nav: NavController,
              private rota: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.rota.snapshot.params['id'];
    this.nome = this.rota.snapshot.params['nome'];
    this.descricao = this.rota.snapshot.params['descricao'];
    this.valor = this.rota.snapshot.params['valor'];
    this.valor = this.rota.snapshot.params['email'];

  }

}
