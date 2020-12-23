import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoptionsPage } from './popoptions.page';

const routes: Routes = [
  {
    path: '',
    component: PopoptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoptionsPageRoutingModule {}
