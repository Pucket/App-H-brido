import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: AngularFirestore) { }

  incluir(usuario: any){
    return this.firestore.collection("usuario").add(usuario);
  }

  listar(){
    return this.firestore.collection("usuario").snapshotChanges();
  }

  alterar(usuario, id){
    return this.firestore.doc('usuario/' + id).update(usuario);
  }

  excluir(usuario){
    return this.firestore.doc('usuario/' + usuario.id).delete();
  }
}
