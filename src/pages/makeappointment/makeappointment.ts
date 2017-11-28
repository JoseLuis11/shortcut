import { Service } from './../../interfaces/service.interface';
import { Employee } from './../../interfaces/employee.interface';
import { Establishment } from './../../interfaces/establishment.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    
    this.establishments = this.afDatabase.list(`workplaces`);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeappointmentPage');
    console.log(this.today);
  }

  onChange(establishment) {
    console.log(establishment.$key);
    this.employees = this.afDatabase.list(`workplaces/${establishment.$key}/employees`);
    console.log(this.employees);
  }

}
