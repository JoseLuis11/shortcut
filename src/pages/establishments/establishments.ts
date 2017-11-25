import { Workplace } from './../../interfaces/workplace.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-establishments',
  templateUrl: 'establishments.html',
})
export class EstablishmentsPage {

  workplaces: FirebaseListObservable<Workplace[]>;

  constructor(public afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.workplaces = this.afDatabase.list(`workplaces`);
  }

  ionViewDidLoad() {

  }

  viewStablishment(key: string) {
    console.log(key);
  }


}