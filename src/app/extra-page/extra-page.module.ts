import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtraPagePageRoutingModule } from './extra-page-routing.module';

import { ExtraPagePage } from './extra-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtraPagePageRoutingModule
  ],
  declarations: [ExtraPagePage]
})
export class ExtraPagePageModule {}
