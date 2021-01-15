import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from '@ionic/angular';

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
  
  constructor() { }

  ngOnInit() {
  }

}
