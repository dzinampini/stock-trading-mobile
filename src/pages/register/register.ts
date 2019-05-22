import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import { WelcomePage } from '../welcome/welcome';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewFlags } from '@angular/core/src/view';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  data = {
    fullname:"",
    email:"",
    password:""
  };
  
  private formData: FormGroup;

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
        // "phone":[Validators.required,Validators.pattern("[0-9]{10}")],
        "db_int":[Validators.required], //,Validators.pattern("[0-9]{1,5}")
        // "company":[Validators.required,Validators.maxLength(15),Validators.minLength(2)],
        "name":[Validators.required,Validators.pattern("[A-Za-z\s]{2,20}")],
        "email":[Validators.required],
        "reg_number":[Validators.required],
        // "surname":[Validators.required,Validators.pattern("[A-Za-z\s]{2,20}")],
        // "address":[Validators.required,Validators.maxLength(100),Validators.minLength(10)],
        "password":[Validators.required,Validators.minLength(8),Validators.maxLength(12)]
      };
      this.formData=this.formBuilder.group({
        // phoneno: ['',validators.phoneno],
        // reg_number: ['',validators.reg_number],
        fullname: ['',validators.name],
        // surname: ['',validators.name],
        // programme: ['', validators.db_int],
        // school: ['', validators.db_int],
        email: ['', validators.email],
        // district: ['',Validators.required],
        // address: ['',validators.address],
        password: ['',validators.password],
        form: ['']
      });
  }

  register(){
    let pwd = this.data.password; 
    let nums = new RegExp("[1-9]");
        let mavara = new RegExp("[a-z]");
        let arimo_manums = nums.test(pwd);
        let arimo_mavara = mavara.test(pwd);
  
    if (pwd.length < 8){
            let alert = this.alertCtrl.create({
                  title: 'Registration Error',
                  subTitle: 'Password must be at least 8 characters',
                  buttons: ['Try Again']
                });
                alert.present();
          }
  
  
          else if(arimo_manums == false){
            let alert = this.alertCtrl.create({
                  title: 'Registration Error',
                  subTitle: 'Password must contain numbers',
                  buttons: ['Try Again']
                });
                alert.present();
          }
  
          else if(arimo_mavara == false){
            let alert = this.alertCtrl.create({
                  title: 'Registration Error',
                  subTitle: 'Password must contain letters too',
                  buttons: ['Try Again']
                });
                alert.present();
          }
  
          else{
            this.http.post(this.global.serverAddress+"/register.php", JSON.stringify(this.data))
        .subscribe(data => {
          console.log(data["_body"]);
          let response=JSON.parse(data["_body"]);
          if(response.response=="success"){
            let toast = this.toastCtrl.create({
              message: 'Account registration successful!',
              duration: 6000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
            this.navCtrl.setRoot(WelcomePage);// find another way to present this page setRoot not working
          }else{
            let alert = this.alertCtrl.create({
              title: 'Signup Error',
              subTitle: 'Account registration failed. Make sure all fields have valid data before you try again',
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
