import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { OneCompanyPage } from '../one-company/one-company';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  vfls = [];

  constructor(
    public global:GlobalProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http
  ) {
  }

  getVfl() {
    this.http.get(this.global.serverAddress+"/si-companies.php") 
      .subscribe(data => {
        console.log(data["_body"]);
        this.vfls=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.getVfl();
  }

  viewMore(item: ItemSliding,id: string) {
    this.navCtrl.push(OneCompanyPage, {'id':id});
  }
}
