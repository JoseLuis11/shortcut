import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

//validators
import { ValidationMessages } from '../../validators/index.validators';

//models
import { UserModel } from './../../interfaces/user.interface';

//services
import { AuthenticationService } from './../../providers/authentication/authentication.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registerPage = RegisterPage;
  user = {} as UserModel;
  loginform:FormGroup;
  validation_messages = ValidationMessages;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
    private authService: AuthenticationService, private menuCtrl: MenuController, private toastCtrl: ToastController,
  public formBuilder: FormBuilder) {

    this.user.email = "";
    this.user.password = "";
    this.menuCtrl.enable(false);

    this.loginform = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      password: new FormControl('',
      [Validators.minLength(6),
        Validators.required])
    });
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.authService.signInWithEmailAndPassword(this.user).then(result => {
      loading.dismiss();
      this.menuCtrl.enable(true);
      this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      loading.dismiss();
      if (error.message.includes("There is no user record corresponding to this identifier")) {
        this.showToast('Usuario inexistente.');
      } else if (error.message.includes("The password is invalid")) {
        this.showToast('Contraseña incorrecta.');
      } else if (error.message.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")) {
        this.showToast('No hay conexión a internet.');
      } else {
        this.showToast('Ha ocurrido un error inesperado. Por favor intente nuevamente.');
      }
      console.log(error);

    });
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}