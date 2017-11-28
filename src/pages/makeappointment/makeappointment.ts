import { Service } from './../../interfaces/service.interface';
import { Employee } from './../../interfaces/employee.interface';
import { Establishment } from './../../interfaces/establishment.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appointment } from './../../interfaces/appointment.interface';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {

    this.establishments = this.afDatabase.list(`workplaces`);

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
    console.log(this.employees);
  }

  onEmployeeChange(employee) {
    console.log(employee.$key);
    this.appointment.employeeName = `${employee.name} ${employee.lastName}`;
    console.log(this.appointment.employeeName);
  }

  onServiceChange(service) {
    console.log(service.$key);
    this.appointment.serviceName = service.name;
    console.log(this.appointment.serviceName);
  }

}