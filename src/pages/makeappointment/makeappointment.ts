import { Service } from './../../interfaces/service.interface';
import { Employee } from './../../interfaces/employee.interface';
import { Establishment } from './../../interfaces/establishment.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  date;
  employees: FirebaseListObservable<Employee[]>;
  employeeSelected: Employee;
  services: FirebaseListObservable<Service[]>;
  serviceSelected: Service;
  today: String = new Date().toISOString().slice(0, 10);
  appointment = {} as Appointment;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase,
              public afAuth: AngularFireAuth) {

    this.establishments = this.afDatabase.list(`workplaces`);

    this.appointment.workplaceName = '';
    this.appointment.employeeName = '';
    this.appointment.serviceNames = [];
    this.appointment.payment = 0;

    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`clients/${auth.uid}`).subscribe(client =>{
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

    this.afDatabase.list(`workplaces/${establishment.$key}/services`, { preserveSnapshot: true})
    .subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          console.log(snapshot.key, snapshot.val().name);
        });
    })

    console.log(this.employees);
  }

  onEstablishmentCancel(){
    this.services = undefined;
    this.appointment.workplaceName = '';
  }

  onEmployeeChange(employee) {
    console.log(employee.$key);
    this.appointment.employeeName = `${employee.name} ${employee.lastName}`;
    console.log(this.appointment.employeeName);
  }

  onServiceSelected(ev, service){

    //TODO: use a array to check if this service is in the appointment currently

    if(ev.checked){
      console.log(service.name);
    this.appointment.serviceNames.push(service.name);
    console.log(this.appointment.serviceNames);

    this.appointment.payment += service.price;
    }else{

      //TODO: the service was unchecked

    }

    
  }

}