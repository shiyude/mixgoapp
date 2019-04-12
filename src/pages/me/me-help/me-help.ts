import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LangProvider } from '../../../providers/lang/lang'; 

/**
 * Generated class for the MeHelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me-help',
  templateUrl: 'me-help.html',
})
export class MeHelpPage {
  public language:any
  public users:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public langData: LangProvider) {
    this.language = langData.getLangData()
    this.users = [
      {
        name:'1、'+ this.language.help_1, 
        description: this.language.help_1_1,
        img:"assets/imgs/ar_match.png"
      },
      {
        name:'2、'+ this.language.help_2, 
        description: this.language.help_2_1,
        img:"assets/imgs/ar.jpg"
      },
      {
        name:'3、DIY', 
        description: this.language.help_3_1,
        img:"assets/imgs/diy.jpg"
      },
      {
        name:'4、' + this.language.help_4, 
        description: this.language.help_4_1,
        img:"assets/imgs/ar_scan.jpg"
      }
    ]
  }

}
