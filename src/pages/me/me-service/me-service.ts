import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LangProvider } from '../../../providers/lang/lang'; 

/**
 * Generated class for the MeServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me-service',
  templateUrl: 'me-service.html',
})
export class MeServicePage {
  public language:any
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public langData: LangProvider,
    public viewCtrl: ViewController,
  ) {
    this.language = langData.getLangData()
  }
  leave() { 
    // this.navCtrl.popToRoot();
    this.viewCtrl.dismiss();
  }
   popView(){
     this.navCtrl.popToRoot();
   }

}
