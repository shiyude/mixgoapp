import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { LangProvider } from '../../../providers/lang/lang';
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "../../../providers/httpService/api";
import { ShopDetailsPage } from "../../index";

/**
 * Generated class for the MeEnshrinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-me-enshrine",
  templateUrl: "me-enshrine.html"
})
export class MeEnshrinePage {
  public language: any
  public filtrate: any = 'wish'
  public enshrine: any = []
  public StoreDate: any
  public hostUrl = window.localStorage.getItem('img_url')
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public langData: LangProvider,
    public http: HttpServiceProvider,
    public toastCtrl: ToastController,
  ) {
    this.language = langData.getLangData()
    this.GitEnshrineList()
    this.GitShopList()
  }
  GitEnshrineList() {
    let seft = this
    seft.http.doGet(api.queryFavoriteGoods, { pageNo: 1, pageSize: 10000 }, res => {
      if (res.code == 0) {
        seft.enshrine = res.datas.lists
        console.log(seft.enshrine)
      }

    })
  }
  GitShopList() {
    this.http.doGet(api.queryFavoriteStore, { pageNo: 1, pageSize: 10000 }, res => {
      if (res.code == 0) {
        this.StoreDate = res.datas.lists;
        console.log(this.StoreDate)
      }

    });
  }
  gotoStoresDetail(type) {
    this.navCtrl.push(ShopDetailsPage, { details: type });
  }
  delete(item) {
    let seft = this
    seft.http.doGet(api.deleteStoreFavorite,{storeId:item.id},res => {
      if(res.code == '0') {
        seft.remind(1000,seft.language.DeletedfromCollection)
        seft.GitShopList()
      } else {
        seft.remind(1000,res.errmsg)
      }
    },false)
  }
  remind(num:number,text:string) { // 提醒 方法
    const toast = this.toastCtrl.create({
      message: text,
      duration: num,
      position: 'middle'
    });
    toast.present();
  }
  ionViewDidLoad() { }

}
