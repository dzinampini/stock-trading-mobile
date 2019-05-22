import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding, ToastController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { BuyPage } from '../buy/buy';
import { SellPage } from '../sell/sell';

@IonicPage()
@Component({
  selector: 'page-one-company',
  templateUrl: 'one-company.html',
})
export class OneCompanyPage {
  vfls = [];
  id:"";
  kbs = []; 
  pvs:""; //portfolio-value
  hjs:""; //company shares history 

  constructor(
    public global:GlobalProvider,
    public toastCtrl:ToastController,
    public navCtrl: NavController,
    public http: Http,
    public navParams: NavParams,
    public alertCtrl: AlertController 
    ){
      this.id=this.navParams.get("id");
      this.getVfl();
      this.getKb();
      this.getHj();
      this.getPVInCompany();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OneCompanyPage');
  }

  getVfl() {
    this.http.get(this.global.serverAddress+"/si-one-company.php?id="+this.id) 
      .subscribe(data => {
        console.log(data["_body"]);
        this.vfls=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

  getPVInCompany() {
    this.http.get(this.global.serverAddress+"/si-pv-in-company.php?company="+this.id+"&investor="+this.global.session)// 
      .subscribe(data => {
        let response=JSON.parse(data["_body"]);
        this.pvs = response.response;  
      }, error => {
        console.log("failed");
      }
    );
  }

  getKb() {
    this.http.get(this.global.serverAddress+"/si-knowledge.php?id="+this.id) 
      .subscribe(data => {
        console.log(data["_body"]);
        this.kbs=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

  getHj() {
    this.http.get(this.global.serverAddress+"/si-shares-history.php?id="+this.id) 
      .subscribe(data => {
        console.log(data["_body"]);
        this.hjs=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

  buy(item: ItemSliding,id: string) {
    this.navCtrl.push(BuyPage, {'id':id});
  }

  sell(item: ItemSliding,id: string) {
    this.navCtrl.push(SellPage, {'id':id});
  }

}
