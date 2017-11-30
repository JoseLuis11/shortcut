import { HomePage } from './../home/home';
import { Service } from './../../interfaces/service.interface';
import { Employee } from './../../interfaces/employee.interface';
import { Establishment } from './../../interfaces/establishment.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Appointment } from './../../interfaces/appointment.interface';
import { AngularFireAuth } from 'angularfire2/auth';



@IonicPage()
@Component({
  selector: 'page-makeappointment',
  templateUrl: 'makeappointment.html',
})
export class MakeappointmentPage {

  establishments: FirebaseListObservable<Establishment[]>;
  establishmentSelected: Establishment;
  employees: FirebaseListObservable<Employee[]>;
  employeeSelected: Employee;
  services: FirebaseListObservable<Service[]>;
  serviceSelected: Service;
  today: String = new Date().toISOString().slice(0, 10);
  appointment = {} as Appointment;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

    this.establishments = this.afDatabase.list(`workplaces`);

    this.appointment.workplaceName = '';
    this.appointment.employeeName = '';
    this.appointment.serviceNames = [];
    this.appointment.payment = 0;
    this.appointment.date = '';

    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`clients/${auth.uid}`).subscribe(client => {
        this.appointment.clientName = `${client.firstName} ${client.lastName}`;
      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeappointmentPage');
    console.log(this.today);
  }

  onEstablishmentChange(establishment) {
    console.log(establishment.$key);
    this.employees = this.afDatabase.list(`workplaces/${establishment.$key}/employees`);
    this.services = this.afDatabase.list(`workplaces/${establishment.$key}/services`);
    this.appointment.workplaceName = establishment.name;
    this.employeeSelected = null;
    this.appointment.payment = 0;

    this.afDatabase.list(`workplaces/${establishment.$key}/services`, { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          console.log(snapshot.key, snapshot.val().name);
        });
      })

    console.log(this.appointment.date);
    console.log(this.employees);
  }

  onEstablishmentCancel() {
    this.services = undefined;
    this.appointment.workplaceName = '';
  }

  onEmployeeCancel() {
    this.appointment.employeeName = '';
  }

  onEmployeeChange(employee) {
    console.log(employee.$key);
    this.appointment.employeeName = `${employee.name} ${employee.lastName}`;
    console.log(this.appointment.employeeName);
  }

  onServiceSelected(service) {
    this.isInServices(service);
  }

  isInServices(service) {

    for (let i = 0; i < this.appointment.serviceNames.length; i++) {
      if (this.appointment.serviceNames[i] == service.name) {
        console.log("Is in services");
        this.appointment.serviceNames.splice(i, 1);
        console.log(this.appointment.serviceNames);
        this.appointment.payment -= service.price;
        return;
      }
    }

    this.appointment.serviceNames.push(service.name);
    this.appointment.payment += service.price;
  }

  makeAppointment() {

    this.appointment.date = this.appointment.date.replace("T", " ");
    this.appointment.date = this.appointment.date.replace("Z", "");

    let loading = this.loadingCtrl.create({
      content: 'Agendando cita...'
    });
    loading.present();

    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`clients/${auth.uid}/appointment`).set(this.appointment).then(() => {
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }).catch(error => {
        loading.dismiss();
        this.showToast("Algo salió mal, intentalo de nuevo.");
        console.log(error);
      })
    })
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}
