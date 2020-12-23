import { NgModule } from '@angular/core';
import { FiltrocotizacionPipe } from './filtrocotizacion.pipe';



@NgModule({
  declarations: [FiltrocotizacionPipe],
  exports:
  [
    FiltrocotizacionPipe
  ]
})
export class PipesModule { }
