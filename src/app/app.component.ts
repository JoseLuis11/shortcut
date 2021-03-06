import { MakeappointmentPage } from './../pages/makeappointment/makeappointment';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { EstablishmentsPage } from '../pages/establishments/establishments';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  settings(){
    this.nav.setRoot(SettingsPage);
  }

  establishments() {
    this.nav.setRoot(EstablishmentsPage);
  }

  logout() {
    this.nav.setRoot(LoginPage);
    this.menuCtrl.enable(false);    
  }

  makeAppointment(){
    this.nav.setRoot(MakeappointmentPage);
  }

  home() {
    this.nav.setRoot(HomePage);
  }

}

