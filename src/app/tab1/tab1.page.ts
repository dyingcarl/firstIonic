import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  inputRed=255;
  inputGreen=255;
  inputBlue=255;
  costumeColor="#ffffff";
  constructor() {}

  toHex(d) {
    return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase();
  }

  updateTabColor(){
    this.costumeColor = "#"+this.toHex(this.inputRed)+this.toHex(this.inputGreen)+this.toHex(this.inputBlue);
    console.log("backgroundColor updated, now is "+this.costumeColor);
  }

  resetColor(){
    this.inputRed = 255;
    this.inputGreen = 255;
    this.inputBlue = 255;
    this.updateTabColor();
  }

}
