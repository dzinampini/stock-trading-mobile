import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KnowledgePage } from './knowledge';

@NgModule({
  declarations: [
    KnowledgePage,
  ],
  imports: [
    IonicPageModule.forChild(KnowledgePage),
  ],
})
export class KnowledgePageModule {}
