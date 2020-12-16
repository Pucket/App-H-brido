import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoclienteService {


  constructor( private autorizacao: AngularFireAuth) { }

  logincliente(valor){

    return new Promise<any>((resolve, reject) =>{
      this.autorizacao.signInWithEmailAndPassword(valor.email, valor.senha).then(
      res => resolve(res),
      err => reject(err)
      )
    })
  }
  detalhes(){
    return this.autorizacao.user;
  }

  logout(){
    return new Promise<any>((resolve, reject) => {
      this.autorizacao.signOut().then(() =>{
        res => resolve(res);
      }).catch((error)=> {
        reject();
      })
    })
  }
  cadastrarUsuario(usuario){
    return new Promise<any>((resolve, reject) => {
      this.autorizacao.createUserWithEmailAndPassword(usuario.email, usuario.senha).then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

}
