import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
//interfaces
import { Profile } from './../../interfaces/profile.interface';
import { UserModel } from './../../interfaces/user.interface';

//services
import { AuthenticationService } from './../../providers/authentication/authentication.service';

//validations
import { ValidationMessages, PasswordValidator } from '../../validators/index.validators';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as UserModel;
  profile = {} as Profile;
  repeatedPassword: string;
  
  signupform:FormGroup;
  matching_passwords_group:FormGroup;
  validation_messages = ValidationMessages;


  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authService: AuthenticationService) {
    this.signupform = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*')
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
      Validators.minLength(2)
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])
    });

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
         Validators.minLength(6),
         Validators.required
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
       return PasswordValidator.areEqual(formGroup);
    });
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

        } else if (error.message.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")) {
          this.showToast('No hay conexión a internet.');
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
