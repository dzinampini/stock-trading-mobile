import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { WelcomePage } from '../welcome/welcome';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';;


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private formData: FormGroup;

  vfls = [];

  data = {
    deposit:"",
    proof:"",
    investor:this.global.session
  };

  data2 = {
    withdraw:"",
    investor:this.global.session
  };

  constructor(
    public global:GlobalProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public toastCtrl: ToastController,
    private storage: Storage,
    private formBuilder: FormBuilder,
  ) {
    
    var validators={
      "phone":[Validators.required,Validators.pattern("[0-9]{9}")],
      "bank":[Validators.required,Validators.pattern("[a-zA-Z \s]{3,20}")],
      "bank_account_number":[Validators.required,Validators.pattern("[0-9]{8,16}")],
      "db_int":[Validators.required,Validators.pattern("[0-9]{1,5}")], 
      "company":[Validators.required,Validators.maxLength(15),Validators.minLength(2)],
      "fullname":[Validators.required,Validators.pattern("[A-Za-z \s]{5,30}")],
      "name":[Validators.required,Validators.pattern("[A-Za-z\s]{2,20}")],
      "email":[Validators.required,Validators.pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")],
      "reg_number":[Validators.required],
      "surname":[Validators.required,Validators.pattern("[A-Za-z\s]{2,20}")],
      "address":[Validators.required,Validators.maxLength(100),Validators.minLength(10)],
      "password":[Validators.required,Validators.minLength(8),Validators.maxLength(12)],
      "username":[Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)],
    };
    this.formData=this.formBuilder.group({
      fullname: ['',validators.fullname],
      email: ['', validators.email],
      password: ['',validators.password],
      bank: ['',validators.bank],
      account_number: ['',validators.bank_account_number],
      form: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getVfl();
  }

  getVfl() {
    this.http.get(this.global.serverAddress+"/si-my-account.php?i="+this.global.session) 
      .subscribe(data => {
        console.log(data["_body"]);
        this.vfls=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }


  updateProfile(){
            this.http.post(this.global.serverAddress+"/si-update-my-account.php", JSON.stringify(this.formData.value))
        .subscribe(data => {
          console.log(data["_body"]);
          let response=JSON.parse(data["_body"]);
          if(response.response=="success"){
            let toast = this.toastCtrl.create({
              message: 'Account successfully updated!',
              duration: 6000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
            this.navCtrl.setRoot(HelloIonicPage);// find another way to present this page setRoot not working
          }else{
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Account updating failed. Make sure all fields have valid data before you try again',
              buttons: ['Try Again']
            });
            alert.present();
          }
        }, error => {
          let alert = this.alertCtrl.create({
            title: 'Signup Error',
            subTitle: 'Network Error! Verify your internet connection is working properly and then try again',
            buttons: ['Try Again']
          });
          alert.present();
        }
      );  
  }

// hh
  deposit(){
    //put into db 
    this.http.get(this.global.serverAddress+"/si-deposit.php?i="+this.global.session+"&a="+this.data.deposit+"&p="+this.data.proof)
    .subscribe(data => {
      console.log(data["_body"]);
      let response=JSON.parse(data["_body"]);
      if(response.response=="success"){
        let toast = this.toastCtrl.create({
          message: 'Recorded. Wait for approval',
          duration: 3000,
          position: 'top',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });
        toast.present();
        this.navCtrl.push(ProfilePage);
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Topping up account failed. Please verify your data before you can continue',
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

  withdraw(){
    //put into withdrawals db  and if approved will be sent to your account 
    //put into db 
    this.http.get(this.global.serverAddress+"/si-withdrawals.php?i="+this.global.session+"&a="+this.data2.withdraw)
    .subscribe(data => {
      console.log(data["_body"]);
      let response=JSON.parse(data["_body"]);
      if(response.response=="success"){
        let toast = this.toastCtrl.create({
          message:' Recorded. Wait for approval',
          duration: 3000,
          position: 'top',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });
        toast.present();
        this.navCtrl.push(ProfilePage);
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Withdrawal failed. Please verify your data before you can continue',
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
