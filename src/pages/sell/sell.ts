import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding, ToastController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { PortfolioPage } from '../portfolio/portfolio';
import { HelloIonicPage } from '../hello-ionic/hello-ionic'
import { OneCompanyPage } from '../one-company/one-company'
/**
 * Generated class for the SellPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class SellPage {
  vfls = [];
  id:"";
  data = {
    company:"",
    shares:"",
    price:"",
    cost:"",
    investor:this.global.session
  };

  constructor(
    public global:GlobalProvider,
    public toastCtrl:ToastController,
    public navCtrl: NavController,
    public http: Http,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.id=this.navParams.get("id");
    this.data.company = this.id;
    this.getVfl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellPage');
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

  sell(){
    // this.getCost(); 
    this.http.get(this.global.serverAddress+"/si-get-owned-shares.php?i="+this.global.session+"&c="+this.id+"&s="+this.data.shares)
    .subscribe(data => {
      console.log(data["_body"]);
      let response=JSON.parse(data["_body"]);
      if(response.response == "failed"){
        let alert = this.alertCtrl.create({
          title: 'Shares Purchase Error',
          subTitle: 'You are trying to sell more shares than you own in this company, you only own '+response.owned+' shares',
          buttons: ['Retry']
        });
        alert.present();

        //stop page 
        // this.navCtrl.push(HelloIonicPage);
        this.navCtrl.push(OneCompanyPage, {'id':this.id});
      }
      else if(response.response == "success"){
        let alert = this.alertCtrl.create({
          title: 'Shares Transaction',
          subTitle: 'The total value of your sale is: '+response.owned,
          buttons: ['Purchase', 'Cancel'],
        });
        alert.present();

        ///here should do what it do after clicking button

    this.http.get(this.global.serverAddress+"/si-sell-shares.php?i="+this.global.session+"&c="+this.id+"&s="+this.data.shares+"&co="+response.owned)
    .subscribe(data => {
      console.log(data["_body"]);
      let response=JSON.parse(data["_body"]);
      if(response.response=="success"){
        let toast = this.toastCtrl.create({
          message: response.owned+' Sale initiation succesful! Wait for a message from the stockbroker',
          duration: 3000,
          position: 'top',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });
        toast.present();
        this.navCtrl.push(PortfolioPage);
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Shares Purchase Error',
          subTitle: 'Shares selling failed. Please verify your data before you can continue',
          buttons: ['Try Again']
        });
        alert.present();
      }
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Network Error',
          subTitle: 'Verify your internet connection is working properly and then try again',
          buttons: ['Try Again']
        });
        alert.present();
      });

      //purchase happenened


      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Shares Purchase Error',
          subTitle: 'Error retrieving shares selling value',
          buttons: ['Try Again']
        });
        alert.present();
      }
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Network Error',
        subTitle: 'Verify your internet connection is working properly and then try again',
        buttons: ['Try Again']
      });
      alert.present();
    });
    
    
  }

}
