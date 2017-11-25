import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { EstablishmentsPage } from '../pages/establishments/establishments';
import { ConfigurationPage } from '../pages/configuration/configuration';
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

  establishments() {
    this.nav.setRoot(EstablishmentsPage);
  }

  configuration(){
    this.nav.setRoot(ConfigurationPage);
  }

  logout() {
    this.nav.setRoot(LoginPage);
    this.menuCtrl.enable(false);    
  }

  home() {
    this.nav.setRoot(HomePage);
  }

}

