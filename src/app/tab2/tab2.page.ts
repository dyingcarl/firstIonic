import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  inputTxt="";
  inputsize=0;
  constructor(public alertController: AlertController) {}

  async presentAlert() {
    //this.inputTxt = "expression";
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: this.inputTxt + '. The length of input text is ' + this.inputsize + '.',
      buttons: ['OK']
    });

    await alert.present();
  }

  updateLength(){
    this.inputsize = this.inputTxt.length;
    console.log('aaa');
  }

  showSize(something:string){
    return something.length;
  }
}
