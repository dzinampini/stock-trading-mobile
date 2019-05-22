import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav, AlertController, MenuController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { BuyPage } from '../pages/buy/buy';
import { SellPage } from '../pages/sell/sell';
import { PortfolioPage } from '../pages/portfolio/portfolio';
import { OneCompanyPage } from '../pages/one-company/one-company';
import { ProfilePage } from '../pages/profile/profile';
import { MarketWatchPage } from '../pages/market-watch/market-watch';
import { KnowledgePage } from '../pages/knowledge/knowledge';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GlobalProvider } from "../providers/global/global";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  myrole = "";
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Nav) navCtrl;

  // make HelloIonicPage the root (or first) page
  rootPage = WelcomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public global: GlobalProvider,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public storage: Storage ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Market Watch', component: HelloIonicPage },
      { title: 'Knowledge Base Updates', component: KnowledgePage },
      { title: 'My Portfolio', component: PortfolioPage },
      { title: 'My Account', component: ProfilePage },
    ];

    platform.ready().then(() => {
      statusBar.styleDefault();
      this.storage.ready().then(()=> {
        this.storage.get('serverAddress').then((val) =>{
          this.setServerAddress(val);
        });
        this.storage.get('session').then((val) =>{
          this.setAccount(val);
        });
      });
      splashScreen.hide();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  setAccount(val){
    this.global.session=val;
    this.myrole = "general"; //please hit me with the session name brother
    console.log(this.global.session);
    if(this.global.session==null){
      this.rootPage = WelcomePage;
      this.navCtrl.setRoot(WelcomePage);
    }else{
      // this.rootPage = HelloIonicPage;
      this.navCtrl.setRoot(HelloIonicPage);
    }
  }

  setServerAddress(val){
    this.global.serverAddress="http://localhost/chart-types/bar2/api";
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: 'Logout Message',
      subTitle: 'You are now logged out of the application',
      buttons: ['Proceed']
    });
    alert.present();
    this.storage.remove("session");
    this.global.session=null;
    this.navCtrl.setRoot(WelcomePage);
  }
}