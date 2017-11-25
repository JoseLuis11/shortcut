import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';

//services
import { AuthenticationService } from './../../providers/authentication/authentication.service';

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController, private authService: AuthenticationService, private afDb: AngularFireDatabase,
    private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {  }

  changePassword() {

    let email: string;

    this.afAuth.authState.take(1).subscribe(auth => {

      email = auth.email;

      let loading = this.loadingCtrl.create({
        content: 'Enviando correo...'
      });
      loading.present();

      this.authService.resetPassword(email).then(result => {
        
        loading.dismiss();
        this.showToast("Correo enviado a tu email.");

      }).catch(error=>{
        this.showToast("Algo salió mal, intentalo nuevamente.");
      });


    });

  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}