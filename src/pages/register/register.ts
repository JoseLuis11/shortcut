import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

//interfaces
import { Profile } from './../../interfaces/profile.interface';
import { UserModel } from './../../interfaces/user.interface';

//services
import { AuthenticationService } from './../../providers/authentication/authentication.service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as UserModel;
  profile = {} as Profile;
  repeatedPassword: string; 


  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.user.email = '';
    this.user.password = '';
  }

  addUser() {
    if (this.user.password != this.repeatedPassword) {
      this.showToast("Las contraseñas no coinciden. Inténtelo de nuevo.")

    } else {
      let loading = this.loadingCtrl.create({
        content: 'Creando cuenta. Por favor, espere...'
      });
      loading.present();

      this.authService.createUserWithEmailAndPassword(this.user).then(result => {
        this.authService.createProfile(this.profile);
        loading.dismiss();
        this.showToast("Registrado con éxito.")

        this.navCtrl.pop();

      }).catch(error => {
        loading.dismiss();
        if (error.message.includes("The email address is badly formatted")) {
          this.showToast("El email tiene un formato erroneo.");
        } else if (error.message.includes("The email address is already in use by another account.")) {
          this.showToast("Este email está en uso actualmente.");
        } else {
          console.log(error);
          this.showToast("Ha ocurrido un error inesperado. Por favor intente nuevamente.")

        }
      });
    }

  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}
