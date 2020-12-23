import { Pipe, PipeTransform } from '@angular/core';
import { ListadoCotizacion } from '../services/cotizacion.service';

@Pipe({
  name: 'filtrocotizacion'
})
export class FiltrocotizacionPipe implements PipeTransform {

  transform(cotizaciones: ListadoCotizacion[], texto: string): ListadoCotizacion[] {
    if(texto.length === 0) { return cotizaciones;}
    texto = texto.toLocaleLowerCase();

    return cotizaciones.filter( cotizacion =>{
      return cotizacion.Cliente.toLocaleLowerCase().includes(texto)
      || cotizacion.CotizacionId.toString().includes(texto);
    });
  }
}
