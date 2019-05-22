import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding, ToastController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { PortfolioPage } from '../portfolio/portfolio';
import { OneCompanyPage } from '../one-company/one-company';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ViewFlags } from '@angular/core/src/view';

/**
 * Generated class for the BuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {
  vfls = [];
  id:"";
  data = {
    company:this.id,
    shares:"",
    investor:this.global.session
  };


  price:"";
  cost:"";

  constructor(
    public global:GlobalProvider,
    public toastCtrl:ToastController,
    public navCtrl: NavController,
    public http: Http,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    this.id=this.navParams.get("id");
    // this.data.company = this.id;
    this.getVfl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyPage');
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


  buy() {
    // this.getCost(); 
    this.http.get(this.global.serverAddress+"/si-get-cost.php?i="+this.global.session+"&c="+this.id+"&s="+this.data.shares)
    .subscribe(data => {
      console.log(data["_body"]);
      let response=JSON.parse(data["_body"]);
      if(response.response == "Insufficient Funds"){
        let alert = this.alertCtrl.create({
          title: 'Shares Purchase Error',
          subTitle: 'Insufficient Funds. Try fewer shares or a cheaper company',
          buttons: ['Try Another Transaction']
        });
        alert.present();

        //stop page 
        // this.navCtrl.push(HelloIonicPage);
        this.navCtrl.push(OneCompanyPage, {'id':this.id});
      }
      else if(response.response != "failure" && response.response != "Insufficient Funds"){
        let alert = this.alertCtrl.create({
          title: 'Shares Purchase Cost',
          subTitle: 'The total cost for your purchase is: '+response.response,
          buttons: ['Purchase', 'Cancel'],
        });
        alert.present();
        this.cost = response.response;

        ///here should do what it do after clicking button

      //   fileTransfare.upload(this.myphoto, this.global.serverAddress+"api/upload.php", options)
      // .then((data) =>{
      //   alert("success");
      //   loader.dismiss();
      // }, (err)=> {
      //   console.log(err);
      //   alert("Error");
      //   loader.dismiss();
      // });


    this.http.get(this.global.serverAddress+"/si-buy-shares.php?i="+this.global.session+"&c="+this.id+"&s="+this.data.shares+"&co="+this.cost)
    .subscribe(data => {
      console.log(data["_body"]);
      let response=JSON.parse(data["_body"]);
      if(response.response=="success"){
        let toast = this.toastCtrl.create({
          message: this.cost+'Purchase initiation succesful! Wait for a message from the stockbroker',
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
          subTitle: 'Shares purchasing failed. Please verify your data before you can continue',
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
          subTitle: 'Error retrieving shares purchase total cost',
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
