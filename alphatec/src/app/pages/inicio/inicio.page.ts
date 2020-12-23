import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import {CotizacionService, ListadoCotizacion } from 'src/app/services/cotizacion.service';
import { PopoptionsPage } from '../popoptions/popoptions.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  id:string;

  toast: any;
  msg:string;
  public isSearchBarOpen = false;
  textoBuscar = '';
  lCotizacion: ListadoCotizacion[];
  constructor(private router: Router, 
    private service: CotizacionService, 
    public popCtrl: PopoverController,
    private route: ActivatedRoute
    ) 
    { 
      this.route.queryParams.subscribe(response=>{
        console.log('parametro', response)
        if (response && response.r) {
          this.refrescar( )
        } 
        else{
          console.log('vacio')
        }
      })
    }

  ngOnInit() {
    //if (!window.localStorage.getItem('usuario')==null) {
    //  this.router.navigateByUrl('/login');
    //}
    this.getCotizacionUser();

  }
  refrescar(){
    setTimeout(() => {
      this.getCotizacionUser();
    }, 2000);
  }
  getCotizacionUser(){
    this.id = localStorage.getItem('usuarioId')
    let Id = this.id;
    var json = {usuarioId:Id}
    this.service.getListadoId(json).subscribe(response => {
      this.lCotizacion = response.wsdDatosCotiRev
      if (this.lCotizacion.length==0) {
        this.msg = 'Ud aún no tiene Cotizaciones';
      }
    });
  }

  userProfile(){
    this.lCotizacion=Array()
    this.router.navigateByUrl('/usuario');
  }
  async openMenu( event ){
    const pop = await this.popCtrl.create({
      component: PopoptionsPage,
      event: event
    });
    await pop.present();
    let res = await pop.onDidDismiss();
    if (res.data=="logout") {
      localStorage.removeItem('usuario');
      localStorage.removeItem('nombre');
      localStorage.removeItem('usuarioId');
      this.router.navigateByUrl('/login',{skipLocationChange:true});
    }
    if (res.data=="usuario") {
      this.router.navigateByUrl('/usuario');
    }
    if (res.data=="update") {
      this.refrescar();
    }
  }

  DetalleCotizacion(id){
    this.router.navigate(['/detalle',id]);
  }


  BuscarCoti( event ){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }
}
