import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LangProvider } from '../../../providers/lang/lang'; 
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "./../../../providers/httpService/api";
import { ShopDetailsPage } from "../../index";

/**
 * Generated class for the MarkShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mark-shop',
  templateUrl: 'mark-shop.html',
})
export class MarkShopPage {
  public language:any
  public info:any
  public shopList:any
  public hostUrl: any = window.localStorage.getItem('img_url')
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider) {
      this.language = langData.getLangData()
      this.info = this.navParams.data.pushData
      if(this.info) {
        if(this.info.parentValue != '-1') {
          this.getShopList(this.info.parentValue)
        } else {
          this.getShopList()
        }
      }
      console.log(this.info)
  }

  getShopList(ids?:any) {
    this.http.doGet(api.queryStoreList, {pageNo:1, pageSize: 1000, retailerId:ids}, res => {
      if (res.code == 0) { 
        this.shopList = res.datas.lists; 
        console.log(this.shopList)
      }
    });
  }
  gotoStoresDetail(type) { // 去门店
    this.navCtrl.push(ShopDetailsPage, { details: type });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MarkShopPage');
  }

}
