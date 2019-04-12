import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "./../../../providers/httpService/api";
import { ShopDetailsPage } from "../../index";
import { LangProvider } from "../../../providers/lang/lang";

/**
 * Generated class for the ShopListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop-list',
  templateUrl: 'shop-list.html',
})
export class ShopListPage {

  public StoreDate: any
  public language: any
  public hostUrl: any = window.localStorage.getItem('img_url')
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider
  ) {
    this.language = langData.getLangData()
    this.GitShopList();
  }
  GitShopList() {
    this.http.doGet(api.queryStoreList, {pageNo:1, pageSize: 1000}, res => {
      if (res.code == 0) { 
        this.StoreDate = res.datas.lists;
      }
    });
  }
  gotoStoresDetail(type) { // 去门店
    this.navCtrl.push(ShopDetailsPage, { details: type });
    // console.log(type)
  }
}
