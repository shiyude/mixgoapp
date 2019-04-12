import { Component } from "@angular/core";
import { ToastController, IonicPage, NavController, NavParams, ModalController } from "ionic-angular";
import { api } from "../../../providers/httpService/api";
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { LangProvider } from "../../../providers/lang/lang";
import { MeServicePage, RelateGoodsPage } from "../../index"

/**
 * Generated class for the ShopDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-shop-details",
  templateUrl: "shop-details.html"
})
export class ShopDetailsPage {
  hostUrl: any = window.localStorage.getItem('img_url')
  details: any; // 主页数据
  StoreItem: any; // 商店信息
  storeList: any; // 商店商品

  public language: any
  public enshrine: any // 收藏列表
  public isCollect: boolean // 是否收藏
  public sectionType = 'nav'
  public isShowNav: boolean = false
  public categoryLists: any//自定义类别数组
  public initNavIndex: any//导航的初始化位置
  public selfCategoryLists: any//自定义分类
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
  ) {
    this.language = langData.getLangData()
    this.details = navParams.data.details;
    this.getShopInfo();
    this.getShopOfCategory();
    this.GitShopFav()
  }

  // GitShop() {
  //   let seft = this;
  //   let longitudeNum = JSON.parse(localStorage.getItem("longitude"))
  //   let latitudeNum = JSON.parse(localStorage.getItem("latitude"))
  //   let data = {}
  //   if(longitudeNum && latitudeNum) {
  //     data = {
  //       storeId: seft.details.id,
  //       longitude: longitudeNum,
  //       latitude: latitudeNum
  //     }
  //   } else {
  //     data = {
  //       storeId: seft.details.id
  //     }
  //   }
  //   this.http.doGet(api.queryStoreById, { ...data }, res => {
  //     // console.log(res)
  //     seft.StoreItem = res.datas;
  //     // seft.storeList = {
  //     //   data: res.lists,
  //     //   type: false
  //     // };
  //   });
  // }
  getShopInfo() {//获取门店信息
    this.StoreItem = undefined;
    this.http.doGet(api.queryStoreById, { storeId: this.details.id }, res => {
      if (res.code == 0) {
        this.StoreItem = res.datas;
        this.getShopOfGoods()
        // console.log(this.StoreItem)
      }

    }, false);
  }
  getShopOfGoods(type = 1, id = "") {//获取门店的关联商品 type=1代表查询所有 type=2代表查询导航下的商品
    this.storeList = undefined;
    this.http.doGet(api.queryStoreGoods, { storeCategory: id, storeId: this.details.id, pageNo: 1, pageSize: 10000 }, res => {
      if (res.code == 0) {
        this.storeList = {
          data: res.datas.lists,
          type: false
        }
      }

    });
  }
  getShopOfCategory() {//获取门店下的导航
    this.categoryLists = undefined;
    this.http.doGet(api.queryStoreCategory, { storeId: this.details.id }, res => {
      if (res.code == 0) {
        if (res.datas && res.datas.length) {
          this.categoryLists = res.datas
        }
      }
    }, false);
  }
  getSearchOfShop() {//查询门店下的分类
    if (this.StoreItem !== undefined) {
      this.selfCategoryLists = undefined;
      this.http.doGet(api.queryBrandSearchCategory, { brandId: this.StoreItem.brandId, storeId: this.details.id, pageNo: 1, pageSize: 10000 }, res => {
        if (res.code == 0) {
          if (res.datas && res.datas.length) {
            this.selfCategoryLists = res.datas;
          }
        }
      });
    } else {
      return false
    }
  }
  selectCategory(val) {//查询分类的条件
    this.navCtrl.push(RelateGoodsPage, { pageType: { type: 'shop', parentId: this.details.id, childId: val } })
  }
  switchGoods(id, index) {//切换导航条件
    this.initNavIndex = index;
    this.isShowNav = false;
    this.getShopOfGoods(2, id)
  }
  changeSection(type) {
    if (type == "nav") {
      if (this.sectionType == 'nav') {
        this.isShowNav = true;
      } else {
        this.initNavIndex = undefined;
        this.getShopOfGoods()
      }
    } else {
      this.isShowNav = false;
      if (type == "classify") {
        this.getSearchOfShop()
      }
    }
  }
  shadeClick() {
    this.isShowNav = false
  }
  remind(num: number, text: string) { // 提醒 方法
    const toast = this.toastCtrl.create({
      message: text,
      duration: num,
      position: 'middle'
    });
    toast.present();
  }

  GitShopFav() { // 拉取收藏，检测门店是否被收藏
    let seft = this
    let user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      seft.http.doGet(api.isFavoriteStore, { storeId: this.details.id }, res => {
        if (res.code == 0) {
          if (res.datas.num < 1) {
            seft.isCollect = false
          } else {
            seft.isCollect = true;
          }
        }
        // console.log(res)
      }, false)
    }
  }
  addEnshrine() { //添加收藏
    let user = JSON.parse(localStorage.getItem("userInfo"));
    let seft = this
    if (user) {
      if (seft.isCollect) {
        seft.http.doGet(api.deleteStoreFavorite, { storeId: seft.details.id }, res => {
          if (res.code == '0') {
            seft.remind(1000, seft.language.DeletedfromCollection)
            seft.isCollect = false;
            if (seft.StoreItem.favoriteCount !== undefined) {
              seft.StoreItem.favoriteCount = parseInt(seft.StoreItem.favoriteCount) - 1
            }

          } else {
            seft.remind(1000, res.errmsg)
          }
        }, false)
      } else {
        seft.http.doGet(api.addStoreFavorite, { storeId: seft.details.id }, res => {
          if (res.code == '0') {
            seft.remind(1000, seft.language.AddtoFavoriteshop)
            seft.isCollect = true
            if (seft.StoreItem.favoriteCount !== undefined) { seft.StoreItem.favoriteCount = parseInt(seft.StoreItem.favoriteCount) + 1 }

          } else {
            seft.remind(1000, res.errmsg)
          }
        }, false)
      }
    } else {
      seft.remind(1000, seft.language.Please_login_first)
    }
  }

  liek() { // 点赞
    let user = JSON.parse(localStorage.getItem("userInfo"));
    let seft = this;
    if (!user) {
      seft.remind(1000, seft.language.not_login)
    } else if (seft.StoreItem.islike == 1) {
      seft.remind(1000, seft.language.Liked)
    } else {
      seft.http.doGet(api.addStoreLike, { storeId: seft.details.id }, res => {
        if (res.code == '0') {
          seft.remind(1000, seft.language.Successfully_like)
          seft.StoreItem.likeNum = parseInt(seft.StoreItem.likeNum) + 1;
          seft.StoreItem.islike = 1;
        }
      }, false)
    }
  }
  toPhone(e) {
    if (e != '') {
      window.location.href = "uniwebview://contact?phone=" + e
      console.log(e)
    }
  }

  ionViewDidLoad() {
  }
  gotoMsg() {
    let modal = this.modalCtrl.create(MeServicePage);
    modal.present();
  }
}
