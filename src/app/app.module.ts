import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//angularfire
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../config/firebase.config'

//pages
import { LoginPage, 
  RegisterPage, 
  MyApp, 
  HomePage, 
  SettingsPage,
  EstablishmentsPage,
  EstablishmentProfilePage,
  MakeappointmentPage
} from '../pages/index.pages'

//services
import {AuthenticationService} from '../providers/index.prodivers'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage, 
    SettingsPage,
    EstablishmentsPage,
    EstablishmentProfilePage,
    MakeappointmentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
        monthShortNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
      }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SettingsPage,
    EstablishmentsPage,
    EstablishmentProfilePage,
    MakeappointmentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationService
  ]
})
export class AppModule {}
