import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { api } from "./../../../providers/httpService/api";
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { ShopDetailsPage, RelateGoodsPage } from "../../index";
import { LangProvider } from "../../../providers/lang/lang";


/**
 * Generated class for the BrandListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: "page-brand-list",
  templateUrl: "brand-list.html"
})
export class BrandListPage {
  public info;
  public bannerHead: any
  public bannerData: any
  public sectionType = 'nav'
  public isShowNav: boolean = false
  public isDesc: boolean = false//默认文字收缩
  public categoryLists: any//自定义类别数组
  public initNavIndex: any//导航的初始化位置
  public shopLists: any//门店列表
  public selfCategoryLists: any//自定义分类
  public hostUrl = window.localStorage.getItem('img_url')
  public language: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider, 
    public langData: LangProvider
  ) {
    this.language = langData.getLangData()
    this.info = navParams.data.details;
    console.log(this.info)
    this.GitBrandinfo();
    this.getBrandOfCategory();
  }

  GitBrandinfo() {  // 获取品牌数据
    this.http.doGet(api.queryBrandById, { brandId: this.info.id }, res => {
      if (res.code == 0) {
        this.bannerHead = res.datas;
        this.getBrandOfGoods()
      }

    }, false);
  }
  getBrandOfGoods(type = 1, id = '') {//获取品牌的关联商品 type=1代表查询所有 type=2代表查询导航下的商品
    let url = type == 1 ? api.queryBrandGoods : api.queryBrandCategoryGoods;
    this.bannerData = undefined
    this.http.doGet(url, { categoryId: id, brandId: this.info.id, pageNo: 1, pageSize: 10000 }, res => {
      if (res.code == 0) {
        this.bannerData = {
          data: res.datas.lists,
          type: false
        }
      }

    });
  }
  getBrandOfCategory() {//获取品牌下的导航
    this.categoryLists = undefined;
    this.http.doGet(api.queryBrandCustomCategory, { brandId: this.info.id }, res => {
      if (res.code == 0) {
        if (res.datas && res.datas.length) {
          this.categoryLists = res.datas
        }
      }
    }, false);
  }
  getBrandOfShop() {//获取品牌下的相关门店
    this.shopLists = undefined;
    this.http.doGet(api.queryStoreByBrand, { brandId: this.info.id, pageNo: 1, pageSize: 10000 }, res => {
      if (res.code == 0) {
        if (res.datas.lists && res.datas.lists.length) {
          let len = res.datas.lists.length;
          for (let i = 0; i < len; i++) {
            if (res.datas.lists[i].goods.length > 3) {
              res.datas.lists[i].goods = res.datas.lists[i].goods.slice(0, 3)
            }
          }
          this.shopLists = res.datas.lists
        }
      }
    });
  }
  getSearchOfBrand() {//查询品牌下的分类
    this.selfCategoryLists = undefined;
    this.http.doGet(api.queryBrandSearchCategory, { brandId: this.info.id, pageNo: 1, pageSize: 10000 }, res => {
      if (res.code == 0) {
        if (res.datas && res.datas.length) {
          this.selfCategoryLists = res.datas;
        }
      }
    });
  }
  selectCategory(val) {//查询分类的条件
    this.navCtrl.push(RelateGoodsPage, { pageType: { type: 'brand', parentId: this.info.id, childId: val } })
  }
  switchGoods(id, index) {//切换导航条件
    this.initNavIndex = index;
    this.isShowNav = false;
    this.getBrandOfGoods(2, id)
  }
  moreDesc() {
    this.isDesc = !this.isDesc
  }
  changeSection(type) {
    if (type == "nav") {
      if (this.sectionType == 'nav') {
        this.isShowNav = true;
      } else {
        this.initNavIndex = undefined;
        this.getBrandOfGoods()
      }
    } else {
      this.isShowNav = false;
      if (type == "classify") {
        this.getSearchOfBrand()
      } else if (type == "shop") {
        this.getBrandOfShop()
      }
    }
  }
  gotoStoresDetail(type) { // 去门店
    let detail = {
      id: type.storeId,
      storeName: type.storeName
    }
    this.navCtrl.push(ShopDetailsPage, { details: detail });
  }
  shadeClick() {
    this.isShowNav = false
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad BrandListPage');
  }
}