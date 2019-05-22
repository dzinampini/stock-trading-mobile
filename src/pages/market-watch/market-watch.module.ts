import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketWatchPage } from './market-watch';

@NgModule({
  declarations: [
    MarketWatchPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketWatchPage),
  ],
})
export class MarketWatchPageModule {}
