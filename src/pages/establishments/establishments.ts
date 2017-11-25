import { EstablishmentProfilePage } from './../establishment-profile/establishment-profile';
import { Establishment } from './../../interfaces/establishment.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-establishments',
  templateUrl: 'establishments.html',
})
export class EstablishmentsPage {

  workplaces: FirebaseListObservable<Establishment[]>;
  establishmentPP = EstablishmentProfilePage;

  constructor(public afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.workplaces = this.afDatabase.list(`workplaces`);
  }

  ionViewDidLoad() {

  }

  viewStablishment(key: string) {
    console.log(key);
    this.navCtrl.push(this.establishmentPP, { key });
  }


}