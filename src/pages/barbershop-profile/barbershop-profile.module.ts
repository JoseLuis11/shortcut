import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarbershopProfilePage } from './barbershop-profile';

@NgModule({
  declarations: [
    BarbershopProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(BarbershopProfilePage),
  ],
})
export class BarbershopProfilePageModule {}
