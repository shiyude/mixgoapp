import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LangProvider } from '../../../providers/lang/lang'; 

/**
 * Generated class for the MeTrackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me-track',
  templateUrl: 'me-track.html',
})
export class MeTrackPage {
  public language
  public TrackData:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public langData: LangProvider) {
    this.language = langData.getLangData()
  }

  ionViewDidLoad() {
  }

}
