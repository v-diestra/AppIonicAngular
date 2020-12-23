import { ɵparseCookieValue } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { async } from '@angular/core/testing';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formModel = {
    Usuario: '',
    Password : ''
  }
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private authservice: AuthService,
    private loadingCtrl: LoadingController,
    public location: Location
    ) { } 
    ngOnInit() {
      if (window.localStorage.getItem("usuario") != null) {
          this.router.navigateByUrl('/inicio');
      } else {
        this.router.navigateByUrl('/login');
      }
    }
    
/*
  form = new FormGroup({
    Usuario: new FormControl('', [Validators.required,  Validators.minLength(4)]),
    Password: new FormControl('', [Validators.required,  Validators.minLength(4)])
  })


  async onLogin(){
    console.log(this.form.value)
    const loading = await this.loadingCtrl.create({ message: ' Cargando .. ' });
    await loading.present();

    this.authservice.Login(this.form.value).subscribe(
      async token => {
        localStorage.setItem('token', token);z
        loading.dismiss();
        this.router.navigateByUrl('/inicio');
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: 'Ocurrio un error', buttons: ['Ok']});
        await alert.present();
        loading.dismiss();
      }
    ) 
    
  }*/
  async onLogin(form: NgForm){
    const loading = await this.loadingCtrl.create({ message: ' Cargando .. ' });
    await loading.present();
    var n = null;
    this.authservice.Login(form.value).subscribe(
        async (res : any)=>{
        if (n==res.wsdUsuario) {
          const alert = await this.alertCtrl.create({ message: 'Credenciales Incorrectos', buttons: ['Ok']});
          await alert.present();
          loading.dismiss();
        } else{
          localStorage.setItem('usuario', res.wsdUsuario.Usuario);
          localStorage.setItem('nombre', res.wsdUsuario.NombreCompleto);
          localStorage.setItem('usuarioId', res.wsdUsuario.UsuarioId);
          loading.dismiss();
          this.router.navigateByUrl('/inicio',{skipLocationChange:true});
        }
      }
    )
  }

}
