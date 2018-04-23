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
  date = new Date();
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  today: string;
  display_date: Date;
  name_day: string;
  appointmentsRef;


  appointment = {} as Appointment;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.year = this.date.getFullYear().toString();
    console.log(this.year);
    this.month = (this.date.getMonth() + 1).toString();
    if (this.month.length == 1) {
      this.month = '0' + this.month;
    }
    this.day = (this.date.getDate().toString());
    if (this.day.length == 1) {
      this.day = '0' + this.day;
    }
    this.hour = this.date.getHours().toString();
    if (this.hour.length == 1) {
      this.hour = '0' + this.hour;
    }
    this.minute = this.date.getMinutes().toString();
    if (this.minute.length == 1) {
      this.minute = '0' + this.minute;
    }
    this.today = this.year + '-' + this.month + '-' + this.day + 'T' + this.hour + ':' + this.minute + ':00.000Z';

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
    this.appointment.employeeName = `${employee.firstName} ${employee.lastName}`;
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

    this.appointmentsRef = this.afDatabase.list(`/appointments`);
    // this.appointment.date = this.appointment.date.replace("T", " ");
    // this.appointment.date = this.appointment.date.replace("Z", "");
    this.displayDateFormat();

    let loading = this.loadingCtrl.create({
      content: 'Agendando cita...'
    });
    loading.present();

    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`clients/${auth.uid}/appointment`).set(this.appointment).then(() => {
        //TODO: no lo haga compa
        this.appointmentsRef.push(this.appointment).then(ref => {
          this.afDatabase.object(`appointments/${ref.key}`).set(this.appointment).then(() => {
            loading.dismiss();
            this.navCtrl.setRoot(HomePage);
          }).catch(error => {
            console.log(error);
          })
        })
      }).catch(error => {
        loading.dismiss();
        this.showToast("Algo salió mal, intentalo de nuevo.");
        console.log(error);
      })
    })
  }


  displayDateFormat() {
    //2018-01-01T08:00:00Z
    this.display_date = new Date(this.appointment.date);

    //Year
    console.log(this.year + "Helllooooo");
    this.year = this.display_date.getFullYear().toString();

    //Month
    switch (this.display_date.getMonth()) {
      case 0:
        this.month = 'enero';
        break;
      case 1:
        this.month = 'febrero';
        break;
      case 2:
        this.month = 'marzo';
        break;
      case 3:
        this.month = 'abril';
        break;
      case 4:
        this.month = 'mayo';
        break;
      case 5:
        this.month = 'junio';
        break;
      case 6:
        this.month = 'julio';
        break;
      case 7:
        this.month = 'agosto';
        break;
      case 8:
        this.month = 'septiembre';
        break;
      case 9:
        this.month = 'octubre';
        break;
      case 10:
        this.month = 'noviembre';
        break;
      case 11:
        this.month = 'diciembre';
        break;
      default:
        break;
    }

    //Day
    this.day = (this.display_date.getDate().toString());

    //Day name
    switch (this.display_date.getDay()) {
      case 0:
        this.name_day = 'Domingo';
        break;
      case 1:
        this.name_day = 'Lunes';
        break;
      case 2:
        this.name_day = 'Martes';
        break;
      case 3:
        this.name_day = 'Miércoles';
        break;
      case 4:
        this.name_day = 'Jueves';
        break;
      case 5:
        this.name_day = 'Viernes';
        break;
      case 6:
        this.name_day = 'Sábado';
        break;
      default:
        break;
    }

    this.appointment.date = this.appointment.date + ' ' + this.name_day + ', ' + this.day + ' de ' + this.month + ' del ' + this.year;
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}
