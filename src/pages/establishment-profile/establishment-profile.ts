import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Establishment } from './../../interfaces/establishment.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the EstablishmentProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-establishment-profile',
  templateUrl: 'establishment-profile.html',
})
export class EstablishmentProfilePage {

  establishmentKey;
  establishment;



  constructor(public afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.establishmentKey = this.navParams.get('key');
    console.log(this.establishmentKey);

    this.afDatabase.object(`workplaces/${this.establishmentKey}`)
      .subscribe(establishment => {
        this.establishment = establishment;
        console.log(this.establishment.name);

      }
      );


  }

}
