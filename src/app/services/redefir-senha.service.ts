import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RedefirSenhaService {

  constructor(private autorizacao: AngularFireAuth) { }

  redefinir(valor){
    console.log(valor);

    return new Promise<any>((resolve, reject) =>{
      this.autorizacao.sendPasswordResetEmail(valor.email).then(
      res => resolve(res),
      err => reject(err)
      )
    })
  }
}
