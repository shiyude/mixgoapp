import { Component, ViewChild } from "@angular/core";
import { ToastController, IonicPage, NavController, NavParams, ModalController, Navbar } from "ionic-angular";
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "../../../providers/httpService/api";
import { LangProvider } from "../../../providers/lang/lang";
import { ProductExternalUrl, MeServicePage, BrandListPage } from "../../index";
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from 'js-base64';
import { Md5 } from "ts-md5/dist/md5";
import {companyConfig} from '../../../providers/httpService/company.config'

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-product-detail",
  templateUrl: "product-detail.html"
})
export class ProductDetailPage {
  @ViewChild(Navbar) navBar: Navbar;
  delails: any;
  productItem: any;
  categories: any = "products";
  parameterList: any;
  unityDetail: any;
  public language: any;
  public enshrine: any;
  public isEnshrine: any
  public unitySrc: any
  public navClit: any
  public hostUrl: any = localStorage.getItem('img_url')
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider,
    public toastCtrl: ToastController,
    private sanitizer: DomSanitizer,
    public modalCtrl: ModalController,
  ) {
    this.language = langData.getLangData();
    this.delails = navParams.data.details;
    this.GitDelails();
    // this.addTrack();
    this.Gitenshrine();

  }
  // ionViewDidLoad() {
  //   this.navBar.backButtonClick = this.backButtonClick;
  // }
  // backButtonClick() {
  //   let seft = this
  //   let getViews = this.navCtrl.getViews()
  //   console.log(getViews)
  //   console.log(getViews[getViews.length-2])
  //   this.navCtrl.pop(getViews[getViews.length-2])
  // } 
  GitDelails() {// 详情接口
    let seft = this;
    this.http.doGet(
      api.queryGoodsById,
      { goodsId: seft.delails.id },
      res => {
        if (res.code == 0) {
          this.unityDetail = res.datas;
          let imgs = res.datas.goodsmap.imgs
          let details = res.datas.goodsmap.detail
          res.datas.goodsmap.imgs = imgs ? imgs.split(',') : []
          res.datas.goodsmap.detail = details ? details.split(',') : []
          this.productItem = res.datas.goodsmap;
          this.parameterList = res.datas.properties;
          if(this.productItem) {
            this.addTrack();
          }
          // this.goUnity()
          // console.log(this.productItem)
          // this.goUnity()
        }
      }
    );
  }
  addTrack() {// 添加足迹
    let productPootmark = this.productItem;
    let productPootmarkDate = JSON.parse(
      localStorage.getItem("productPootmark")
    );
    if (productPootmarkDate) {
      productPootmarkDate = Array.from(productPootmarkDate);
      let len = productPootmarkDate.length;
      for (let i = 0; i < len; i++) {
        if (productPootmark.id === productPootmarkDate[i].id) {
          productPootmarkDate.splice(i, 1);
          return; //利用函数的返回功能中断push操作
        }
      }
      if (productPootmarkDate.length < 100) {
        productPootmarkDate.push(productPootmark);
      } else {
        productPootmarkDate.splice(0, 1)
        productPootmarkDate.push(productPootmark);
      }
      localStorage.setItem("productPootmark", JSON.stringify(productPootmarkDate));
    } else {
      let data = [];
      data.push(productPootmark);
      localStorage.setItem("productPootmark", JSON.stringify(data));
    }
  }

  remind(num: number, text: string) { // 提醒 方法
    const toast = this.toastCtrl.create({
      message: text,
      duration: num,
      position: 'middle'
    });
    toast.present();
  }

  Gitenshrine() { // 获取是否收藏
    let seft = this
    let user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      seft.http.doGet(api.isFavoriteGoods, { goodsId: seft.delails.id }, res => {
        if (res.code == 0) {
          if (res.datas.num < 1) {
            seft.isEnshrine = false
          } else {
            seft.isEnshrine = true;
          }
        }
      }, false)
    }
  }
  addEnshrine() { //添加收藏
    let user = JSON.parse(localStorage.getItem("userInfo"));
    let seft = this
    if (user) {
      if (seft.isEnshrine) {
        seft.http.doGet(api.deleteGoodsFavorite, { goodsId: seft.delails.id }, res => {
          if (res.code == '0') {
            seft.remind(1000, seft.language.DeletedfromCollection)
            seft.isEnshrine = false
          } else {
            seft.remind(1000, res.errmsg)
          }
        }, false)
      } else {
        seft.http.doGet(api.addGoodsFavorite, { goodsId: seft.delails.id }, res => {
          if (res.code == '0') {
            seft.remind(1000, seft.language.Added_to_Collection)
            seft.isEnshrine = true
          } else {
            seft.remind(1000, res.errmsg)
          }
        }, false)
      }
    } else {
      seft.remind(1000, seft.language.Please_login_first)
    }
  }
  goToExternal(urls) { // 外部链接
    if (urls != '') {
      this.navCtrl.push(ProductExternalUrl, { url: urls });
    }
  }

  gotoMsg() {
    let modal = this.modalCtrl.create(MeServicePage);
    modal.present();
  }
  goTobrand(ids) { // 去品牌  
    let data = {
      id: ids
    }
    this.navCtrl.push(BrandListPage, { details: data });
  }
  goUnity() { // 去3D
    let seft = this;
    let toUnitObj = {
      lang: window.localStorage.getItem("lang"),
      country: window.localStorage.getItem("country"),
      sign: Md5.hashStr(companyConfig.idToken),
      companyId: companyConfig.id,
      ...seft.productItem,
    //  ...seft.unityDetail
      isEnshrine: seft.isEnshrine == undefined ? "false" : seft.isEnshrine.toString()
    }
    let account = JSON.stringify(toUnitObj)
    console.log(toUnitObj)
    let str = Base64.encode(account).toString("base64")
    str = str.replace(/\+/g, "%2B");
    str = str.replace(/\=/g, "%3D");
    str = "uniwebview://model?json=" + str;
    window.location.href = str;
    // seft.unitySrc = this.sanitizer.bypassSecurityTrustResourceUrl(str);
    // console.log(seft.unitySrc)

  }
}
