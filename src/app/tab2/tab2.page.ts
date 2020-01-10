import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-tab2',
  /*template: `
      <ul *ngIf="courses$ | async as courses else noData">
          <li *ngFor="let course of courses">
              {{course.description}}
          </li>
      </ul>
      <ng-template #noData>No Data Available</ng-template>
  `,*/
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  //courses$: Observable<Course[]>;
  inputTxt="";
  inputsize=0;
  redVal=255;
  greenVal=255;
  blueVal=255;
  costumeColor="#ffffff";
  colorChangeSpeed=1;

  public progress: number = 0;
  protected interval: any;


  FetchingUrl = "https://staging.swtchenergy.com/api/v1/listings";
  constructor(public alertController: AlertController, private http: HttpClient) {

  }

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
    //this.http.get(this.FetchingUrl).subscribe((response) => {
    //    console.log(response);
    //});
  }

  showSize(something:string){
    return something.length;
  }

  ngOnInit() {
        /*this.courses$ = this.http
            .get<Course[]>("/courses.json")
            .map(data => _.values(data))
            .do(console.log);*/
        //this.courses$ = this.http.get(this.FetchingUrl);
        console.log("Ah start");
        console.log(this.http.get(this.FetchingUrl));
        console.log("Ah end");
  }

  toHex(d) {
    return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase();
}

  addRed(power){
    this.blueVal = (this.blueVal<power)?0 : this.blueVal-power;
    this.greenVal = (this.greenVal<power)?0 : this.greenVal-power;
    //this.redVal = (this.redVal<25)?0 : this.redVal-25;
    this.updateColor();
  }

  addBlue(power){
    this.greenVal = (this.greenVal<power)?0 : this.greenVal-power;
    this.redVal = (this.redVal<power)?0 : this.redVal-power;
    //this.blueVal = (this.blueVal<25)?0 : this.blueVal-25;
    this.updateColor();
  }

  addGreen(power){
    this.redVal = (this.redVal<power)?0 : this.redVal-power;
    this.blueVal = (this.blueVal<power)?0 : this.blueVal-power;
    //this.greenVal = (this.greenVal<25)?0 : this.greenVal-25;
    this.updateColor();
  }

  updateColor(){
    this.costumeColor = "#"+this.toHex(this.redVal)+this.toHex(this.greenVal)+this.toHex(this.blueVal);
    console.log("backgroundColor updated, now is "+this.costumeColor);
  }

  resetColor(){
    this.redVal = 255;
    this.greenVal = 255;
    this.blueVal = 255;
    this.updateColor();
  }

  onPressR(){
    const self = this;
        this.interval = setInterval(function () {
            self.progress = self.progress + 1;
            self.addRed(self.progress);
            console.log("Your power is "+self.progress);
        }, 50);
  }

  onPressUpR(){
    clearInterval(this.interval);
    this.progress = 0;
  }

  onPressG(){
    const self = this;
        this.interval = setInterval(function () {
            self.progress = self.progress + 1;
            self.addGreen(self.progress);
            console.log(self.progress);
        }, 50);
  }

  onPressUpG(){
    clearInterval(this.interval);
    this.progress = 0;
  }

  onPressB(){
    const self = this;
        this.interval = setInterval(function () {
            self.progress = self.progress + 1;
            self.addBlue(self.progress);
            console.log(self.progress);
        }, 50);
  }

  onPressUpB(){
    clearInterval(this.interval);
    this.progress = 0;
  }
}
