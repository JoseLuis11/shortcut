import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController, ToastController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, 
    private authService: AuthenticationService, private menuCtrl: MenuController,  private toastCtrl: ToastController) {
    this.user.email = "";
    this.user.password = "";
    this.menuCtrl.enable(false);
  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.authService.signInWithEmailAndPassword(this.user).then(result=>{
      loading.dismiss();
      this.menuCtrl.enable(true);
      this.navCtrl.setRoot(HomePage);
    }).catch(error =>{
      loading.dismiss();
      if (error.message.includes("There is no user record corresponding to this identifier")) {
        this.showToast('Usuario inexistente.');
      } else if (error.message.includes("The password is invalid")) {
        this.showToast('Contraseña incorrecta.');
      }
      else {
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