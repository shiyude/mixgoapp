import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  AlertController, Platform
} from "ionic-angular";

import { HttpServiceProvider } from "./../../providers/httpService/httpService";
import { api } from "./../../providers/httpService/api";
import {
  FindDetailsPage,
  ShopDetailsPage,
  MatchDetailsPage,
  SelectListPage,
  MeServicePage,
  SeekPage,
  Tab2Root,
  UnitListPage,
  MarkShopPage,
  ProductDetailPage
} from "../index";
import { CargoListComponent } from "./../../components/cargo-list/cargo-list";
import { LangProvider } from "../../providers/lang/lang";
import { Base64 } from 'js-base64';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("sonFn")
  sonFn: CargoListComponent; // 声明子组件
  public countrys: any = undefined; //国家
  public Banners: any = undefined; // 轮播
  public MainMarks: any = undefined; // 分类标记
  public HotShops: any = undefined; // 热门商品
  public NewStuffs: any = undefined; // 新选
  public hotlist: any = undefined; // 好物
  public Recgrp: any = undefined; // 热门分类
  public label: any = 0;
  public RecgrpData: any;
  public language: any;
  public DisnetType: boolean = false;
  public hostUrl: any;
  public initialize: any;
  public city: any = "深圳";
  public country: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider,
    public modalCtrl: ModalController,
    public alerCtrl: AlertController,
    public plt: Platform
  ) {
    window["Home"] = this; //提供对外接口
    this.language = langData.getLangData();
    this.getUrl();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
  }
  getDiscovery() {
    this.Banners = undefined;
    this.http.doGet(api.queryHomeDiscovery, {}, res => {
      if (res.code == 0) {
        if (res.datas.length) {
          this.Banners = res.datas;
        }
        this.DisnetType = false;
      }
    })
  }
  getUrl() {
    this.http.doGet(
      api.querySysConfig, {}, res => {
        if (res.code == 0) {
          this.initialize = res;
          this.hostUrl = res.datas[0].value;
          localStorage.setItem("img_url", res.datas[0].value);
          this.getCountryLists();
        }
      },
      false,err => {
        this.Disnet();
      }
    )
  }
  getMark() {
    this.MainMarks = undefined;
    this.http.doGet(api.queryHomeMainmark, {}, res => {
      if (res.code == 0) {
        if (res.datas.length) {
          this.MainMarks = res.datas;
        }
        this.DisnetType = false;
      }
    });
  }
  getShopLists() {
    this.HotShops = undefined;
    this.http.doGet(api.queryHomeStore, {}, res => {
      if (res.code == 0) {
        if (res.datas.length) {
          this.HotShops = res.datas;
        }
        this.DisnetType = false;
      }
    });
  }
  getNewlist() {
    this.NewStuffs = undefined;
    this.http.doGet(api.queryHomeHot, { type: 1, pageNo: 1, pageSize: 10000 }, res => {
      if (res.code == 0) {
        if (res.datas.lists.length) {
          this.NewStuffs = {
            type: true,
            data: res.datas.lists
          };
        }
      }
    });
  }
  getHotlist() {
    this.hotlist = undefined;
    this.http.doGet(api.queryHomeHot, { type: 2, pageNo: 1, pageSize: 10000 }, res => {
      if (res.code == 0) {
        if (res.datas.lists.length) {
          this.hotlist = {
            type: true,
            data: res.datas.lists
          };
        }
      }
    })
  }
  getRecgrp() {
    this.Recgrp = undefined;
    this.http.doGet(api.queryRecommandGroups, {}, res => {
      if (res.code == 0) {
        if (res.datas.length) {
          this.Recgrp = res.datas;
          this.cutSpan(0, res.datas[0].id);
        }
      }
    });
  }
  getRecprpData(id: any) {
    this.RecgrpData = undefined;
    this.http.doGet(api.queryRecommandByGroupId, { groupId: id, pageNo: 1, pageSize: 10000 }, res => {
      if (res.code == 0) {
        this.RecgrpData = {
          type: false,
          data: res.datas.lists
        };
        if (this.sonFn.GitData) {
          this.sonFn.GitData();
        }
      }
    }, false)
  }
  cutSpan(i, id) {
    this.label = i;
    this.getRecprpData(id);
  }
  goToSeek() { // 搜索
    let modal = this.modalCtrl.create(SeekPage);
    modal.present();
  }
  gotoBanner(type) { // 去发现
    if (type.discoveryType == 1) {//跳转到外链
      if (type.url) {
        let toUnitObj = {
          url: type.url
        }
        let account = JSON.stringify(toUnitObj)
        let str = Base64.encode(account).toString("base64")
        str = str.replace(/\+/g, "%2B");
        str = str.replace(/\=/g, "%3D");
        str = "uniwebview://OpenExternalLink?json=" + str;
        window.location.href = str;
      }
    } else {
      this.navCtrl.push(FindDetailsPage, { details: type });
    }

  }
  goList(name, type?: any) { // 查看全部
    if (type) {
      this.navCtrl.push(name, { designation: type });
    } else {
      this.navCtrl.push(name);
    }
  }
  gotoStoresDetail(type) { // 去门店
    this.navCtrl.push(ShopDetailsPage, { details: type });
  }
  // gotoMsg() {
  //   let modal = this.modalCtrl.create(MeServicePage);
  //   modal.present();
  // }
  gotoMainMark(mark) { // 主标 操作类型：1：类目，2：自定义类目，3：品牌，4：户型，5：门店，6：家居分类
    switch (mark.type) {
      case 1:
        this.navCtrl.push(Tab2Root, { pushData: mark });
        break;
      case 2:
        this.navCtrl.push(Tab2Root, { pushData: mark });
        break;
      case 3:
        this.navCtrl.push(Tab2Root, { pushData: mark });
        break;
      case 4:
        this.navCtrl.push(UnitListPage);
        break;
      case 5:
        this.navCtrl.push(MarkShopPage, { pushData: mark });
        break;
      case 6:
        let data = {
          id: mark.parentValue,
          title: mark.name,
          furnitureType: "furnitureType"
        };
        this.navCtrl.push(SelectListPage, { details: data });
        break;
    }
  }
  getCountryLists() {
    this.countrys = undefined;
    this.http.doGet(api.queryCountry, {}, res => {
      if (res.code == 0) {
        let self = this;
        this.countrys = res.datas;
        let countryID = localStorage.getItem("country");
        let index = self.countrys.findIndex(value => {
          return value.id == countryID;
        });
        if (index < 0) {
          index = 0;
        }
        console.log(this.countrys);
        this.country = this.countrys[index].countryName;
        localStorage.setItem("country", this.countrys[index].id);
        this.getDiscovery();
        this.getMark();
        this.getShopLists();
        this.getNewlist();
        this.getHotlist();
        this.getRecgrp();
        this.Disnet();
      }
    }, false,err => {
      this.Disnet();
    })
  }
  selectCountry(name) {// 切换国家
    let self = this;
    let elem = document.getElementById('custom');
    if (self.countrys) {
      let index = self.countrys.findIndex(value => {
        return value.countryName == name;
      });
      localStorage.setItem("country", self.countrys[index].id);
      if (self.countrys[index].id == 1) {
        console.log("z");
        window.location.href = "uniwebview://country?country=China";
        elem.style.display = "block"
      } else {
        console.log("x");
        elem.style.display = "none"
        window.location.href = "uniwebview://country?country=Singapore";
      }
    }
    localStorage.setItem("tabLang", "gaibian");
    localStorage.setItem("home", "cut");
    localStorage.setItem("me", "cut");
    localStorage.setItem("find", "cut");
    localStorage.setItem("ar", "cut");
    localStorage.setItem("classigy", "cut");
    self.refresh();
  }
  //获取版本
  getVersion(version) {//从unity获取版本号进行对比
    console.log(version)
    let _self = this;
    this.http.doGet(api.queryAppVersion, {}, res => {
      if (!Array.isArray(res.datas)) {
        if (this.plt.is('ios')) {
          if (version! == res.datas.iosVer) {
            let alert = this.alerCtrl.create({
              title: _self.language.update_title,
              subTitle: _self.language.isUpdate_app,
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: _self.language.update_app,
                  handler: () => {
                    console.log(111)
                  }
                }
              ]
            });
            if (res.datas.iosUpdate == 0) {
              alert.addButton(_self.language.cancel)
            }
            alert.present();
          } else {
            return
          }
        } else {
          if (version! == res.datas.androidUpdate) {
            let alert = this.alerCtrl.create({
              title: _self.language.update_title,
              subTitle: _self.language.isUpdate_app,
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: _self.language.update_app,
                  handler: () => {

                  }
                }
              ]
            });
            if (res.datas.iosUpdate == 0) {
              alert.addButton(_self.language.cancel)
            }
            alert.present();
          } else {
            return
          }
        }
      } else {
        // let alert = this.alerCtrl.create({
        //   title: _self.language.update_title,
        //   subTitle: _self.language.isUpdate_app,
        //   enableBackdropDismiss: false,
        //   buttons: [
        //     {
        //       text: _self.language.update_app,
        //       handler: () => {
        //         let str = Base64.encode('http://www.baidu.com').toString("base64")
        //         console.log(str)
        //         window.location.href = "uniwebview://updateVersion?json="+str;
        //       }
        //     }
        //   ]
        // });
        // alert.present();
      }
      return

    }, false)
  }
  refresh() { // 刷新
    this.language = this.langData.getLangData();
    localStorage.removeItem("home");
    this.DisnetType = false;
    this.getUrl();
  }
  Disnet() { // 如果断网
    setTimeout(() => {
      let Banners = this.Banners,
        MainMarks = this.MainMarks,
        HotShops = this.HotShops,
        NewStuffs = this.NewStuffs,
        hotlist = this.hotlist;
      if (!Banners && !MainMarks && !HotShops && !NewStuffs && !hotlist) {
        this.DisnetType = true;
      }
    }, 10000);
  }
  ionViewWillEnter() {
    let iSrefresh = localStorage.getItem("home");
    if (iSrefresh) {
      this.refresh();
      console.log("切换home");
    }
  }
  // setCity(city: string) { // unity 调用
  //   let seft = this
  //   let temp = localStorage.getItem('City')
  //   if(temp=="unknow"){ //还未进行过定位
  //     seft.city = city;
  //     localStorage.setItem('City',city)
  //     console.log("city:" + seft.city);
  //   }else if(city != temp ){
  //     let confirm = seft.alerCtrl.create({
  //       title: "确定更改",
  //       message: "检测到当前位置信息与您定位信息不符，是否更改?",
  //       buttons: [
  //         {
  //           text: '保留当前位置',
  //           handler: () => {
  //             console.log('Agree clicked');
  //           }
  //         },
  //         {
  //           text: '更新定位',
  //           handler: () => {
  //             seft.city = city;
  //             localStorage.setItem('City',city)
  //             console.log("city:" + seft.city);
  //           }
  //         }
  //       ]
  //     });
  //     confirm.present();
  //   }
  // }
  gotoqr() {
    window.location.href = "uniwebview://qrCodeScanner"
  }
  getQrcode(qrcodeString: string) {//unit扫码后跳转
    if (!qrcodeString) {
      return
    }
    let arr = qrcodeString.split('&');
    if (arr[0] == "storedetail") {
      this.navCtrl.push(ShopDetailsPage, {
        details: {
          id: arr[1]
        }
      });
    } else {
      this.navCtrl.push(ProductDetailPage, {
        details: {
          id: arr[1]
        }
      });
    }
  }
}
