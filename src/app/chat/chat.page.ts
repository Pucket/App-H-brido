import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AutenticacaoclienteService } from 'src/app/services/autenticacaocliente.service'
 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
 
  messages: Observable<any[]>;
  newMsg = '';

  id: string;
  nome: string;
  descricao: string;
  valor: string;
  email: string;

  emailLogado: string;

  emailDestino: string;

  constructor(private chatService: ChatService,
              private router: Router,
              private nav: NavController,
              private rota: ActivatedRoute,
              private autenticacao: AutenticacaoclienteService) { }
 
  ngOnInit() {
    this.messages = this.chatService.getChatMessages();

    this.id = this.rota.snapshot.params['id'];
    this.nome = this.rota.snapshot.params['nome'];
    this.descricao = this.rota.snapshot.params['descricao'];
    this.valor = this.rota.snapshot.params['valor'];
    this.email = this.rota.snapshot.params['email'];

    //console.log(this.chatService.currentUser.uid);

    this.autenticacao.detalhes().subscribe(res => {

      if(res !== null){

        this.emailLogado = res.email;

      } else {  }

    }, err => {


     console.log('err', err);



    });

    this.chatService.getChatMessages().subscribe(res => { 
      res.forEach(msg => { 
        
        console.log(msg);
        
        if (msg.origem !== this.emailLogado && msg.destino !== this.emailLogado) {

          this.emailDestino = msg.origem;

        }

      }) 
    });

  }
 
  sendMessage() {
    if (this.email !== undefined) {
      this.chatService.addChatMessage(this.newMsg, this.email, this.emailLogado).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
    } else {
      this.chatService.addChatMessage(this.newMsg, this.emailDestino, this.emailLogado).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
     });

    }
  }
 
  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }

  abrirServico(){

    this.nav.navigateForward( [ "/exibir-servico", {  id: this.id, nome: this.nome, 
      descricao: this.descricao, valor: this.valor, email: this.email } ]);
  }
 
}
