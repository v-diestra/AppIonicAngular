import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, delay, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface Cotizaciones  {
  id: number;
  name: string;
}
export interface DatosLoteAction{
  AccionId: number;
  Accion: string;
}

/*
export interface wsdDatosLote {
  DatosLoteFirma:
  [
    {
      AccionId: number;
      Accion: string;
    }

  ],
  DatosAccionFirma:
  [
    {
      CotizacionId: number;
      CodProducto: string;
      Producto: string;
      Unidad: string;
      Cantidad: string;
      Lote: string;
      FechaVencimiento: string;
      UbicacionProd: string;
    }
  ]
}
*/
export interface DatosLoteFirma 
{

  CotizacionId: number;
  CodProducto: string;
  Producto: string;
  Unidad: string;
  Cantidad: string;
  Lote: string;
  FechaVencimiento: string;
  UbicacionProd: string;
}
export interface ListadoCotizacion  {
  CotizacionId: number;
  NroCotizacion: string;
  Cliente: string;
  Empresa: string;
}


@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private  URLid = 'http://119.8.144.182:1035/api/listacotizacionfirma';
  private  URLidLote = 'http://119.8.144.182:1035/api/listalotesfirma';
  private  URLDETALLE = 'https://jsonplaceholder.typicode.com/todos';
  private URLAction = 'http://119.8.144.182:1035/api/accioncotizacionfirma';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getCotizacion() 
  {
    return this.http.get<[Cotizaciones]>(this.URLDETALLE)
    .pipe(
      delay(2000),
      //tap(console.log),
      catchError( error => {
        console.log('sucedio un error');
        console.warn(error);
        return throwError('Error Personalizado')
      })
    )
  } 
  getListadoId(data) 
  {
    return this.http.post<[ListadoCotizacion]>(this.URLid, data).pipe(tap(console.log))
  }
  getDatosLoteFirmaId(json) 
  {
    return this.http.post(this.URLidLote, json).pipe(tap(console.log));
  }
  updateStatus(data){
    return this.http.post(this.URLAction, data);
  }

}
