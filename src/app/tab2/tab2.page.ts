import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { ExtraPagePage } from 'src/app/extra-page/extra-page.page';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  inputTxt="";
  inputsize=0;
  constructor(public alertController: AlertController, public navCtrl: NavController
) {}

  async presentAlert() {
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
  }

  showSize(something:string){
    return something.length;
  }

  pushPage(){
    //this.navCtrl.navigateForward(ExtraPagePage,{
    //  content: this.inputTxt
    //});
  }


}


/*@Component({
  templateUrl: 'src/app/extra-page/extra-page.page.html',
})
class ExtraPagePage {
  constructor(private navParams: NavParams) {
     let content = navParams.get('content');
  }
}*/
