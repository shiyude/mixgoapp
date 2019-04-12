import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController
} from "ionic-angular";
import { LangProvider } from '../../providers/lang/lang';

import { HttpServiceProvider } from "./../../providers/httpService/httpService";
import { api } from "./../../providers/httpService/api";
import {
  LoginPage,
  MeSetPage,
  MeAccountPage,
  MeAboutPage,
  MeHelpPage,
  MeEnshrinePage,
  MeTrackPage,
  MeServicePage
} from "../index"

/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-me",
  templateUrl: "me.html"
})
export class MePage {
  public userInfo = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo")) : null
  public user = {
    id: this.userInfo != null ? this.userInfo.id : "",
    username: this.userInfo != null ? this.userInfo.customerName : "",
    userphone: '',
    userpic: this.userInfo != null ? this.userInfo.logo : "assets/icon/me/head.png"
  };
  public childrenData: any;
  public language: any
  public DisnetType: boolean = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public modalCtrl: ModalController,
    public langData: LangProvider,
    public toastCtrl: ToastController
  ) {
    this.language = this.langData.getLangData()
    this.GitRecbest()
    this.Disnet()

  }

  GitRecbest() { // 商品
    this.childrenData = undefined
    this.http.doGet(api.queryHomeHot, { type: 3, pageNo: 1, pageSize: 10000 }, (res) => {
      if (res.code == 0) {
        this.childrenData = {
          data:res.datas.lists,
          type:false
        }
        this.DisnetType = false  
      }

      console.log(res)
    })
  }
  refresh() { // 刷新
    this.GitRecbest()
    this.language = this.langData.getLangData()
    localStorage.removeItem('me')
    this.DisnetType = false
    this.Disnet()
  }
  ionViewWillEnter() {
    let seft = this
    let info = JSON.parse(localStorage.getItem("userInfo"))
    let iSrefresh = localStorage.getItem("me")
    if (iSrefresh) {
      seft.refresh()
    }
    if (info) {
      this.user.userpic = info.logo
      this.user.userphone = info.phone
      this.user.username = info.customerName
      if (!info.logo) {
        this.user.userpic = "assets/icon/me/head.png"
      }
      if (!info.phone) {
        this.user.userphone = info.email
      }
    } else {
      this.user.userphone = this.language.click_here_to_login
    }
  }
  enterData() { // 登录
    if (!this.user.id) {
      let modal = this.modalCtrl.create(LoginPage);
      modal.onDidDismiss(data => { // 登录完成传回的数据
        if (data) {
          this.user.id = data.id
          this.user.username = data.customerName
          this.user.userphone = data.phone
          this.user.userpic = data.logo
          if (!data.phone) {
            this.user.userphone = data.email
          }
          if (!data.logo) {
            this.user.userpic = "assets/icon/me/head.png"
          }
        }
      });
      modal.present();
    } else {
      this.navCtrl.push(MeAccountPage);
    }
  }
  goSet() {
    this.navCtrl.push(MeSetPage);
  }
  remind(num: number, text: string) { // 提醒方法
    const toast = this.toastCtrl.create({
      message: text,
      duration: num,
      position: 'middle'
    });
    toast.present();
  }
  goPages(num) { // 根据数值不同，去不同页面
    switch (num) {
      case 1: MeServicePage
        let modal = this.modalCtrl.create(MeServicePage);
        modal.present();
        break
      case 2:
        this.navCtrl.push(MeHelpPage);
        break
      case 3:
        let info = localStorage.getItem('userInfo')
        if (info) {
          this.navCtrl.push(MeEnshrinePage);
        } else {
          this.remind(1000, this.language.not_login)
        }
        break
      case 4:
        this.navCtrl.push(MeTrackPage);
        break
      case 5:
        this.navCtrl.push(MeAboutPage);
        break
    }
  }
  Disnet() { // 如果断网
    setTimeout(() => {
      let childrenData = this.childrenData;
      if (!childrenData) {
        this.DisnetType = true
      }
    }, 5000);
  }
  gotoMsg() {
    let modal = this.modalCtrl.create(MeServicePage);
    modal.present();
  }
}
