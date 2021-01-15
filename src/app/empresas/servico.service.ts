import { Injectable } from '@angular/core';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

import { AngularFirestore } from '@angular/fire/firestore'
  
@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor( private firestore: AngularFirestore ) { }

  incluir(servico: any){
    return this.firestore.collection("servico").add(servico);
}

listLazyRoutes(){
  return this.firestore.collection("servico").snapshotChanges();

}
alterar(servico, id){
  
  return this.firestore.doc('servico/' + id ). update(servico);
}
excluir(servico) {
  //passando o objeto todo
  return this.firestore.doc('servico/' + servico.id).delete();
}

}