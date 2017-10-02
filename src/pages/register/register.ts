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

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.user.email = '';
    this.user.password = '';
  }

  register() {
    let loading = this.loadingCtrl.create({
      content: 'Creando cuenta. Por favor, espere...'
    });
    loading.present();

    this.authService.createUserWithEmailAndPassword(this.user).then(result => {
      this.authService.createProfile(this.profile);
      loading.dismiss();
      this.showToast("Registrado con éxito.")

      //TODO: push al home

    }).catch(error => {
      loading.dismiss();

      this.showToast("Ha ocurrido un error inesperado. Por favor intente nuevamente.")
    })


  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}
