import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoEmpresaService {

  constructor(private firestore: AngularFirestore) { }

  incluir(avaliacao: any){
    return this.firestore.collection("avaliacao").add(avaliacao);
  }

  listar(){
    return this.firestore.collection("avaliacao").snapshotChanges();
  }

  alterar(avaliacao, id){
    return this.firestore.doc('avaliacao/' + id).update(avaliacao);
  }

  excluir(avaliacao){
    return this.firestore.doc('avaliacao/' + avaliacao.id).delete();
  }
}
