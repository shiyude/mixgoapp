import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LangProvider } from '../../../providers/lang/lang';
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "./../../../providers/httpService/api";
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from 'js-base64'
import { Md5 } from "ts-md5/dist/md5";
import {companyConfig} from '../../../providers/httpService/company.config'


/**
 * Generated class for the UnitDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unit-details',
  templateUrl: 'unit-details.html',
})
export class UnitDetailsPage {
  public language: any
  public info: any
  public detailsData: any
  public unitySrc: any
  public hostUrl: any = localStorage.getItem('img_url')
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider,
    private sanitizer: DomSanitizer) {
    this.language = langData.getLangData()
    this.info = this.navParams.data.details
    if (this.info) {
      this.getUnitDetails()
      // console.log(this.info)
    }
  }
  getUnitDetails() {
    this.http.doGet(api.queryHouseTypeDetails, { houseTypeId: this.info.id }, res => {
      if (res.code == 0) {
        this.detailsData = res.datas
        this.detailsData.imgs = res.datas.imgs.split(",")
        this.detailsData.detail = res.datas.detail.split(",")
        this.goUnity()
        // console.log(this.detailsData)
      }
    })
  }
  goUnity() { // 去3D
    let seft = this
    let toUnitObj = {
      lang: window.localStorage.getItem("lang"),
      country: window.localStorage.getItem("country"),
      sign: Md5.hashStr(companyConfig.idToken),
      companyId:companyConfig.id,
      houseTypeId: seft.detailsData.id,
      ...seft.detailsData
    }
    let account = JSON.stringify(toUnitObj)
    let str = Base64.encode(account).toString("base64")
    str = str.replace(/\+/g, "%2B");
    str = str.replace(/\=/g, "%3D");
    str = "uniwebview://unit?json=" + str;
    seft.unitySrc = this.sanitizer.bypassSecurityTrustResourceUrl(str);
    // console.log(seft.unitySrc)
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad UnitDetailsPage');
  }

}
