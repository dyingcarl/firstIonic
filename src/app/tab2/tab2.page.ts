import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  inputTxt="";
  inputsize=0;
  constructor(public alertController: AlertController,
  private el:ElementRef,
  private renderer:Renderer2) {}

  async presentAlert() {
    //this.inputTxt = "expression";
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
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
    this.renderer.setStyle(this.el.nativeElement, 'color', 'blue');
  }

  showSize(something:string){
    return something.length;
  }


}

/*@Component({
  selector: 'custom-input',
  template: `
    <button (click)="decrement()">-</button>
    <span>{{counter}}</span>
    <button (click)="increment()">+</button>
  `
})*/
