import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'powe-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {

  constructor(public alertController: AlertController) { }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
