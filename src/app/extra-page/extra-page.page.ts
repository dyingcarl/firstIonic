import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-extra-page',
  templateUrl: './extra-page.page.html',
  styleUrls: ['./extra-page.page.scss'],
})
export class ExtraPagePage implements OnInit {

  constructor(private navParams: NavParams) {
    let content = navParams.get('content');
   }

  ngOnInit() {
  }

}
