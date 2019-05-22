import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";
import { OneCompanyPage } from '../one-company/one-company';

/**
 * Generated class for the PortfolioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {
  vfls = [];
  vfls2 = [];
  vfls3 = [];

  constructor(
    public global:GlobalProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortfolioPage');
    this.getVfl();
    this.getVfl2();
    this.getVfl3();
  }

  getVfl() {
    this.http.get(this.global.serverAddress+"/si-portfolio.php?investor="+this.global.session)  
      .subscribe(data => {
        console.log(data["_body"]);
        this.vfls=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

  getVfl2() {
    this.http.get(this.global.serverAddress+"/si-pending-portfolio.php?investor="+this.global.session) 
      .subscribe(data => {
        console.log(data["_body"]);
        this.vfls2=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

  getVfl3() {
    this.http.get(this.global.serverAddress+"/si-sales-portfolio.php?investor="+this.global.session) 
      .subscribe(data => {
        console.log(data["_body"]);
        this.vfls3=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }




}
