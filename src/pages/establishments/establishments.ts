import { EstablishmentProfilePage } from './../establishment-profile/establishment-profile';
import { Establishment } from './../../interfaces/establishment.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-establishments',
  templateUrl: 'establishments.html',
})
export class EstablishmentsPage {

  workplacesList = [];
  //workplaces: FirebaseListObservable<Establishment[]>;
  workplaces;
  workplacesLoaded;
  establishmentPP = EstablishmentProfilePage;
  establishmentsRef;
  loading;

  constructor(public afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    //this.workplaces = this.afDatabase.list(`workplaces`);
    this.showLoading();
    this.establishmentsRef = afDatabase.database.ref('/workplaces');

    this.establishmentsRef.on('value', establishmentsList => {
      let establishments: Establishment;
      let files = [];
      establishmentsList.forEach(establishment => {
        establishment.val().key = establishment.key;

        files.push({
          $key: establishment.key, name: establishment.val().name, address: establishment.val().address
          , phoneNumber: establishment.val().phoneNumber
        });

        return false;
      });

      this.workplaces = files;
      this.workplacesLoaded = files;
      this.loading.dismiss();
    });
  }

  ionViewDidLoad() {

  }

  initializeEstablishments() {
    this.workplaces = this.workplacesLoaded;
  }

  viewStablishment(key: string) {
    console.log(key);
    this.navCtrl.push(this.establishmentPP, { key });
  }

  getItems(ev) {
    this.initializeEstablishments();
    
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (!val) {
      return;
    }

    this.workplaces = this.workplaces.filter((v) => {
      if (v.name && val) {
        if (v.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
    });
    this.loading.present();
  }


}