import { Component, OnInit } from '@angular/core';

import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { EmailValidator, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AutenticacaoempresaService } from 'src/app/services/autenticacaoempresa.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-lista-empresa',
  templateUrl: './lista-empresa.page.html',
  styleUrls: ['./lista-empresa.page.scss'],
})
export class ListaEmpresaPage implements OnInit {
  empresa: any;

  nome: string;
  email: string;
  endereco: string;
  telefone: string;

  nomeLogin: string;
  emailLogin: string;
  enderecoLogin: string;
  telefoneLogin: string;

  validacao: FormGroup;
  mensagemErro: string = '';

  id = null;

  //geoloacalização
   // Readable Address
   address: string;

   // Location coordinates
   latitude: number;
   longitude: number;
   accuracy: number;
 
   //Geocoder configuration
   geoencoderOptions: NativeGeocoderOptions = {
     useLocale: true,
     maxResults: 5
   };


  constructor(private service : EmpresaService,
              private rota: ActivatedRoute,
              private nav: NavController,
              private alerta: AlertController,
              private formulario: FormBuilder,
        private autenticacao: AutenticacaoempresaService,
        private geolocation: Geolocation,
         private nativeGeocoder: NativeGeocoder
        
      ) { }



      ngOnInit() {

        this.id = this.rota.snapshot.params['id'];
    
        console.log(this.id);
    
        this.validacao = this.formulario.group({
          nome: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])),
          email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])),
          endereco: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(10)
          ])),
          telefone: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(8)
          ]))
    
        });
    
    
    
        let email: string;
    
    
    
        this.autenticacao.detalhes().subscribe(res => {
    
          if(res !== null){
            email = res.email;
          } else {
            this.nav.navigateForward('home');
          }
    
        }, err => {
    
         console.log('err', err);
    
        });
    
    
    
    
    
        this.service.listar().subscribe(data => {
    
          this.empresa = data.map(e => {
    
            return{
    
              id: e.payload.doc.id,
    
              nome: e.payload.doc.data()['nome'],
    
              email: e.payload.doc.data()['email'],
    
              telefone: e.payload.doc.data()['telefone'],
    
              endereco: e.payload.doc.data()['endereco']
    
            };
    
          });
    
          console.log(this.empresa);
    
          console.log(this.empresa);
    
          for (let it of this.empresa){
    
            console.log(email===it.email);
    
            if (email===it.email) {
    
              console.log("Encontrou");
    
              // Preencher os campos desse cliente
              this.getGeolocation();
              this.id = it.id;
              this.validacao.get('nome').setValue(it.nome);
              this.validacao.get('email').setValue(it.email);
              this.validacao.get('endereco').setValue(this.address);
              this.validacao.get('telefone').setValue(it.telefone);
    
              break;
    
            }
    
          }
    
        });      
        
      }
    
      mensagem_validacao = {
        'nome': [
          {type: 'required', message: 'Nome é obrigatório'},
          {type: 'minlength', message: 'Nome deve ter no mínimo dez caracteres'}
        ],
        'email': [
          {type: 'required', message: 'E-mail é obrigatório'},
          {type: 'pattern', message: 'E-mail é inválido'}
        ],
        'endereco': [
          {type: 'required', message: 'Endereço é obrigatório'},
          {type: 'minlength', message: 'Endereço deve ter no mínimo dez caracteres'}
        ],
        'telefone': [
          {type: 'required', message: 'Telefone é obrigatório'},
          {type: 'minlength', message: 'Telefone deve ter no mínimo oito caracteres'}
        ],
      };
    
      atualizarEmpresa(){

        console.log(this.validacao.get('nome').value);
        let empresa = {};
    
        console.log("Nome: " + this.nome);
        console.log("E-mail: " + this.email);
        console.log("Endereço: " + this.endereco);
        console.log("Telefone: " + this.telefone);
    
        empresa['nome'] = this.validacao.get('nome').value;
        empresa['email'] = this.validacao.get('email').value;
        empresa['endereco'] = this.validacao.get('endereco').value;
        empresa['telefone'] = this.validacao.get('telefone').value;
    
        console.log(empresa);
    
        this.service.alterar(empresa, this.id).then(res => {
    
          this.presentAlert();
    
        }).catch(error => {
    
        });
      }
    
      async presentAlert() {
    
        const alert = await this.alerta.create({
          header: 'Perfil alterado!',
          subHeader: '',
          message: 'Seus dados foram alterados com sucesso!',
          buttons: ['OK']
    
        });
    
        await alert.present();
    
      }

//--------GEOLOCALIZAÇÃO-----------------------------------//

      //Get current coordinates of device
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.accuracy = resp.coords.accuracy;

      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

}