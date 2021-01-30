import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ServicoService } from 'src/app/empresas/servico.service';
import { ServicoPage } from '../servico/servico.page';

import { AutenticacaoempresaService} from 'src/app/services/autenticacaoempresa.service';

//upload----
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
export interface MyData {
  name: string;
  filepath: string;
  size: number;
  email: string;
  servico: string;
}
//upload----
@Component({
  selector: 'app-form-servico',
  templateUrl: './form-servico.page.html',
  styleUrls: ['./form-servico.page.scss'],
})
export class FormServicoPage implements OnInit {

  nome: string;
  descricao: string;
  valor: Number;
  email: string;
  servico2: string;

  emailLogin: string;

  validacao: FormGroup;
  mensagemErro: string = '';

  id = null;

  //upload----
  // Upload Task 
  task: AngularFireUploadTask;

  // Progress in percentage
  percentage: Observable<number>;

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;

  //Uploaded Image List
  images: Observable<MyData[]>;

  //File details  
  fileName:string;
  fileSize:number;

  //Status check 
  isUploading:boolean;
  isUploaded:boolean;

  private imageCollection: AngularFirestoreCollection<MyData>;

  //upload----

  constructor(private servico: ServicoService,
            private nav: NavController,
            private rota: ActivatedRoute,
            private formulario: FormBuilder,
            private logado: AutenticacaoempresaService,
            private storage: AngularFireStorage, //upload----
      private database: AngularFirestore //upload----
    ) { //upload----
      this.isUploading = false;
      this.isUploaded = false;
      //Set collection where our documents/ images info will save
      this.imageCollection = database.collection<MyData>('freakyImages');
      this.images = this.imageCollection.valueChanges();
    } //upload----

  ngOnInit() {

    this.id = this.rota.snapshot.params['id'];
    
    console.log(this.id);

    this.validacao = this.formulario.group({
      nome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      descricao: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      valor: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    
      ]))

    });
    this.nome = this.rota.snapshot.params['nome'];
    this.validacao.get('nome').setValue(this.rota.snapshot.params['nome']);
    this.descricao = this.rota.snapshot.params['descricao'];
    this.validacao.get('descricao').setValue(this.rota.snapshot.params['descricao']);
    this.valor = this.rota.snapshot.params['valor'];
    this.validacao.get('valor').setValue(this.rota.snapshot.params['valor']);
    // this.email = this.rota.snapshot.params['email'];
    // this.validacao.get('email').setValue(this.rota.snapshot.params['email']);
    this.validacao.get('email').setValue(this.emailLogin);
    console.log(this.email);
    console.log(this.emailLogin);

    this.logado.detalhes().subscribe(res => {

      //if ( res !== null){
       console.log(res.email);
       this.emailLogin = res.email;
       this.validacao.get('email').setValue(res.email);
       console.log(this.emailLogin);
    
      //}
    
    }, err => {
    
      console.log('err', err);
    
    });

  }

  mensagem_validacao = {
    'nome': [
      {type: 'required', message: 'Nome é obrigatório'},
      {type: 'minlength', message: 'Nome deve ter no mínimo três caracteres'}
    ],
    'descricao': [
      {type: 'required', message: 'Descrição é obrigatório'},
      {type: 'pattern', message: 'descrição deve ter no mínimo 50 letras'}
    ],
    'valor': [
      {type: 'required', message: 'valor é obrigatório'},
      {type: 'minlength', message: 'valor deve ter no mínimo dois caracteres'}
    ],
    // 'email': [
    //   {type: 'required', message: 'E-mail é obrigatório'},
    //   {type: 'pattern', message: 'E-mail inválido'}
    // ],
  };

  
  enviarServico(){
    console.log(this.validacao.get('nome').value);
    let serv = {};
   
    console.log("Nome: " + this.nome);
    console.log("descricao " + this.descricao);  
    console.log("valor " + this.valor);
    console.log("email " + this.email);

   
    serv['nome'] = this.validacao.get('nome').value;
    serv['descricao'] = this.validacao.get('descricao').value;
    serv['valor'] = this.validacao.get('valor').value;
    serv['email'] = this.validacao.get('email').value;

    console.log(serv);
    if(this.id == null){
      this.servico.incluir(serv);
    } else {
      this.servico.alterar(serv, this.id);
    }

    this.nav.navigateForward("servico");
  }

  // upload de fotos --

  uploadFile(event: FileList) {
    

    // The File object
    const file = event.item(0)
    console.log(file);

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
    

    this.isUploading = true;
    this.isUploaded = false;


    this.fileName = file.name;
      console.log(this.emailLogin);
      let nomedividido = this.fileName.split("."); 
      console.log(nomedividido);
    // The storage path
    let arquivoalterado =  this.emailLogin + "."+ nomedividido[1];

    const path = `freakyStorage/${new Date().getTime()}_${arquivoalterado}`;
    console.log(path);
    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' };
    console.log(customMetadata);
    //File reference
    const fileRef = this.storage.ref(path);
    console.log(fileRef);
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize,
            email: this.emailLogin,
            servico: this.validacao.get('nome').value
          });
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }

  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.database.createId();

    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }

  //upload----

}
