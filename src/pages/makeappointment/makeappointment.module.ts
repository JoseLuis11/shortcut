import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeappointmentPage } from './makeappointment';

@NgModule({
  declarations: [
    MakeappointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeappointmentPage),
  ],
})
export class MakeappointmentPageModule {}
