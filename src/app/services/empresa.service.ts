import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor( private firestore: AngularFirestore ) { }

  incluir(empresa: any) {
    return this.firestore.collection("empresa").add(empresa);
  }

  listar(){
    return this.firestore.collection("empresa").snapshotChanges();
  }

  alterar(empresa, id){
    return this.firestore.doc('empresa/' + id).update(empresa);
  }

  excluir(empresa){
    return this.firestore.doc('empresa/' + empresa.id).delete();
  }

}
