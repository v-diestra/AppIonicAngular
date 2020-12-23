import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {CotizacionService, DatosLoteAction,DatosLoteFirma } from 'src/app/services/cotizacion.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  msg:string;
  isSelectOption:boolean;
  ActionOption:string;
  dlotesFirma: DatosLoteFirma[];
  dlotesAction: DatosLoteAction[];
  constructor(
    
    private service: CotizacionService, 
    private activateRoute: ActivatedRoute,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public router: Router
    ) { }

  ngOnInit() {
    let CotizacionId = this.activateRoute.snapshot.paramMap.get('id');
    var dato = {CotizacionId:CotizacionId}
    this.service.getDatosLoteFirmaId(dato).subscribe(response => {
      this.dlotesFirma = response.wsdDatosLoteFirma
      this.dlotesAction = response.wsdDatosAccionFirma
    });
    console.log(CotizacionId);
  }

  async aprobar( event  ){
    let CotizacionId = this.activateRoute.snapshot.paramMap.get('id');
    let userId = localStorage.getItem('usuarioId');
    let option = this.ActionOption;
    
    var json = {UsuarioId:userId, CotizacionId:CotizacionId, AccionId:option}
    console.log(json)
    await this.service.updateStatus(json).subscribe(response=>{
      this.msg = response['RespuestaProceso'];
    })
    
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Cargando',
      duration: 2000
      
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    const alert = await this.alertCtrl.create({ message: this.msg, buttons: ['Ok']});
    await alert.present();
    loading.dismiss();
    let navExtra : NavigationExtras = {
      queryParams:{
        r: 'refrescar'
      }
    };
    this.router.navigate(['/inicio'],navExtra);
    //this.router.navigateByUrl('/inicio');
  }
}
