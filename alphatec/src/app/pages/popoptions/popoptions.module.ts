import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoptionsPageRoutingModule } from './popoptions-routing.module';

import { PopoptionsPage } from './popoptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoptionsPageRoutingModule
  ],
  declarations: [PopoptionsPage]
})
export class PopoptionsPageModule {}
