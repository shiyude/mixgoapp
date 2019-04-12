import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "./../../../providers/httpService/api";
import { LangProvider } from "../../../providers/lang/lang";

/**
 * Generated class for the GoodsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-goods-list",
  templateUrl: "goods-list.html"
})
export class GoodsListPage {
  name: any;
  GoodsData: any;
  public language: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider
  ) {
    this.language = langData.getLangData()
    this.name = navParams.data.designation;
    this.GitGoods(this.name);

  }
  GitGoods(name) {
    let axiosParams = {
      pageNo: 1,
      pageSize: 10000,
      type: 1
    };
    if (name == "newly") {//今日新选
      axiosParams.type = 1
    } else if (name == "tds") {//特卖好物
      axiosParams.type = 2
    }
    this.http.doGet(api.queryHomeHot, axiosParams, res => {
      if (res.code == 0) {
      this.GoodsData = {
        type: false,
        data: res.datas.lists
      };
      }

    });
  }
}
