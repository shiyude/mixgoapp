import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { LangProvider } from "../../../providers/lang/lang";
/**
 * Generated class for the PrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {
  public language: any;
  constructor(public langData: LangProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.language = langData.getLangData()
  }

  leave() {
    this.viewCtrl.dismiss();
  }
}
