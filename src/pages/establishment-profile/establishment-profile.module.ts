import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstablishmentProfilePage } from './establishment-profile';

@NgModule({
  declarations: [
    EstablishmentProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EstablishmentProfilePage),
  ],
})
export class EstablishmentProfilePageModule {}
