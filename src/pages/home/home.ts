import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { MakeappointmentPage } from '../makeappointment/makeappointment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  appointment;
  theresAppointment : boolean = false;
  hour;
  day;

  constructor(public navCtrl: NavController, public afDb: AngularFireDatabase, public afAuth: AngularFireAuth) {

    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`clients/${auth.uid}/appointment`).subscribe(appointment => {
        this.appointment = appointment;
        console.log(this.appointment.$value);
        console.log(this.appointment);

        console.log(this.appointment.payment);

        if (this.appointment.payment == null) {
          this.theresAppointment = false;
          
        }else if (this.appointment.payment > 0){
          this.theresAppointment = true;
          this.hour = this.appointment.date.slice(21);
          this.day = this.appointment.date.slice(11, 16);
        }
      });
    });
  }

  makeAppointment(){
    this.navCtrl.setRoot(MakeappointmentPage);
  }

}