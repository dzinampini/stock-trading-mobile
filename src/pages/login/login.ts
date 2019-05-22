import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {
    emairi: "",
    password: ""
  };

  constructor(
    public loadingCtrl:LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public toastCtrl: ToastController,
    private storage: Storage,
    public global:GlobalProvider
    ) {
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    this.http.post(this.global.serverAddress+"/login.php", JSON.stringify(this.credentials))
      .subscribe(data => {
        console.log(data["_body"]);
        let response=JSON.parse(data["_body"]);


        if(response.response=="success"){
          this.storage.set("session",this.credentials.emairi); //response
          this.global.session=this.credentials.emairi; //response
          this.navCtrl.setRoot(HelloIonicPage);
        }

        else{
          let alert = this.alertCtrl.create({
            title: 'Login Error',
            subTitle: 'Wrong Password. Enter Correct Password!',
            buttons: ['OK']
          });
          alert.present();
        }
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: 'Network Error! Verify your internet connection is working properly and then try again',
          buttons: ['OK']
        });
        alert.present();
      }
    );
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
