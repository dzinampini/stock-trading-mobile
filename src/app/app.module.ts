import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
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
import { MyProvider } from '../providers/my/my';
import { GlobalProvider } from '../providers/global/global';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    WelcomePage, 
    LoginPage, 
    RegisterPage,
    BuyPage,
    SellPage, 
    PortfolioPage, 
    OneCompanyPage,
    ProfilePage, 
    MarketWatchPage, 
    KnowledgePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    WelcomePage,
    LoginPage,
    RegisterPage,
    BuyPage,
    SellPage, 
    PortfolioPage, 
    OneCompanyPage,
    ProfilePage, 
    MarketWatchPage, 
    KnowledgePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyProvider,
    GlobalProvider
  ]
})
export class AppModule {}
