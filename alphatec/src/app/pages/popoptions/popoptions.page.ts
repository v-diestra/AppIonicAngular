import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popoptions',
  templateUrl: './popoptions.page.html',
  styleUrls: ['./popoptions.page.scss'],
})
export class PopoptionsPage implements OnInit {

  constructor(private popCtrl: PopoverController) { }

  ngOnInit() {
  }

  dismiss(data){
    this.popCtrl.dismiss(data);
  }


}
