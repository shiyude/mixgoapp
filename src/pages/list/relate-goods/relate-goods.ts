import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "./../../../providers/httpService/api";
import { LangProvider } from "../../../providers/lang/lang";

/**
 * Generated class for the RelateGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-relate-goods',
  templateUrl: 'relate-goods.html',
})
export class RelateGoodsPage {

  name: any;
  parentId: any;
  childId: any;
  GoodsData: any;
  public language: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider
  ) {
    this.language = langData.getLangData();
    console.log(navParams.data.pageType)
    this.name = navParams.data.pageType.type;
    this.parentId = navParams.data.pageType.parentId;
    this.childId = navParams.data.pageType.childId;
    this.GitGoods(this.name, this.parentId, this.childId);

  }
  GitGoods(name, parentId, childId) {
    let url: any;
    let axiosParams: any = {
      pageNo: 1,
      pageSize: 10000,
      categoryId: childId
    };
    if (name == "brand") {//今日新选
      axiosParams.brandId = parentId;
      url=api.queryBrandGoods

    } else if (name == "shop") {//特卖好物
      axiosParams.storeId = parentId;
      url=api.queryStoreGoods
    }
    this.http.doGet(url, axiosParams, res => {
      if (res.code == 0) {
        this.GoodsData = {
          type: false,
          data: res.datas.lists
        };
      }

    });
  }

}
