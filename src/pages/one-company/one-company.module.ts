import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OneCompanyPage } from './one-company';

@NgModule({
  declarations: [
    OneCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(OneCompanyPage),
  ],
})
export class OneCompanyPageModule {}
