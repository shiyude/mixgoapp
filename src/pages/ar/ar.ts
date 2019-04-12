import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { LangProvider } from '../../providers/lang/lang';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { UnitListPage, MatchListPage } from '../index';
import { Md5 } from "ts-md5/dist/md5";
import { Base64 } from 'js-base64';
import { companyConfig } from '../../providers/httpService/company.config'

/**
 * Generated class for the ArPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ar',
  templateUrl: 'ar.html',
})
export class ArPage {
  public language: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public langData: LangProvider,
    public alert: AlertController,
  ) {
    this.language = langData.getLangData()
    window["ar"] = this;
  }

  refresh() { // 刷新
    this.language = this.langData.getLangData()
    localStorage.removeItem('ar')
  }

  ionViewWillEnter() {
    let iSrefresh = localStorage.getItem("ar")
    if (iSrefresh) {
      this.refresh()
      console.log('切换AR')
    }
  }
  gotoUnit() { // 去户型
    this.navCtrl.push(UnitListPage)
  }
  goMatch() {
    let toUnitObj = {
      lang: window.localStorage.getItem("lang"),
      country: window.localStorage.getItem("country"),
      sign: Md5.hashStr(companyConfig.idToken),
      companyId: companyConfig.id,
    }

    let account = JSON.stringify(toUnitObj)

    let str = Base64.encode(account).toString("base64")
    str = str.replace(/\+/g, "%2B");
    str = str.replace(/\=/g, "%3D");
    str = "uniwebview://match?json=" + str;
    window.location.href = str;
  }
  goScan() {
    let toUnitObj = {
      lang: window.localStorage.getItem("lang"),
      country: window.localStorage.getItem("country"),
      sign: Md5.hashStr(companyConfig.idToken),
      companyId: companyConfig.id,
    }

    let account = JSON.stringify(toUnitObj)

    let str = Base64.encode(account).toString("base64")
    str = str.replace(/\+/g, "%2B");
    str = str.replace(/\=/g, "%3D");
    str = "uniwebview://scan?json=" + str;
    window.location.href = str;
  }
  gotoFull() { // 去全景
    let self = this
    let alert = this.alert.create({
      title: self.language.hint,
      subTitle: self.language.Temporarily_not_opened,
      buttons: [
        {
          text: self.language.accomplish,
          handler: () => {
          }
        }
      ]
    });
    alert.present();
    // this.navCtrl.push(MatchListPage)
  }
}

