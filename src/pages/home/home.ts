import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appointment;

  constructor(public navCtrl: NavController, public afDb: AngularFireDatabase, public afAuth: AngularFireAuth) {

    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`clients/${auth.uid}/appointment`).subscribe(appointment => {
        this.appointment = appointment;
      });
    });
  }

}