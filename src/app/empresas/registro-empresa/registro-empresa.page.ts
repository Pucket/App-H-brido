import { Component, OnInit } from '@angular/core';

import { NavController, AlertController } from '@ionic/angular';
import { AutenticacaoempresaService } from 'src/app/services/autenticacaoempresa.service';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.page.html',
  styleUrls: ['./registro-empresa.page.scss'],
})
export class RegistroEmpresaPage implements OnInit {
  email: string;
  senha: string;

  validacao: FormGroup;
  mensagemErro: string = '';

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

  constructor( private service: AutenticacaoempresaService,
               private nav: NavController,
               private formulario: FormBuilder,
               private geolocation: Geolocation,
                private nativeGeocoder: NativeGeocoder,
                private alertCtrl : AlertController ) {
                  this.getGeolocation();
                 }

  ngOnInit() {
    this.validacao = this.formulario.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      senha: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)

      ]))

    });
  }
  mensagem_validacao = {
    'email': [
      {type: 'required', message: 'e-mail é obrigatorio'},
      {type: 'pattern', message: 'e-mail inválido'}
    ],
    'senha':[
      {type: 'required', message: 'senha é obrigatório'},
      {type: 'minLenght', message: 'A senha deve ter no mínimo seis caracteres'}
    ]
  };
  cadastrar(usuario){
 
    this.service.cadastrarUsuario(usuario).then(

      res => {
        
        this.nav.navigateForward(['/form-empresa', {
          varLatitude: this.latitude, 
          varLongitude: this.longitude
        , varAddress: this.address }]);
        
      }, err => {
        console.log(err);
      }
    );
  }

  


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


