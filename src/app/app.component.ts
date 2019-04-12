import { Component, ViewChild } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Nav, Platform, ToastController, ModalController } from "ionic-angular";
import { Keyboard } from "ionic-angular/platform/keyboard";
import { App } from "ionic-angular/components/app/app";
import { TabsPage } from '../pages/tabs/tabs';
import { LangProvider } from "../providers/lang/lang";

import { MainPage, MeServicePage } from "../pages";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;
  public counter = 0;
  public timestamp = 0;
  public lang: string = localStorage.getItem("lang")
    ? localStorage.getItem("lang")
    : "zh";
  public language: any
  public initPositionX: 0
  public initPositionY: 0
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public toast: ToastController,
    public keyboard: Keyboard,
    public app: App,
    public langData: LangProvider,
    public modalCtrl: ModalController,
  ) {
    window["APP"] = this; //提供对外接口
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.initTranslateConfig();
      this.initCustom();
    });
  }
  ShowToast(msg) { // 提醒方式
    let toast = this.toast.create({
      message: msg,
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }
  OnBackClick() { // unity 调用安卓键盘
    if (this.keyboard.isOpen()) { //处理软键盘
      this.keyboard.close();
      return "";
    }
    const overlay = this.app._appRoot._overlayPortal.getActive();
    if (overlay && overlay.dismiss) { //处理浮层
      overlay.dismiss();
      return "";
    }
    const navctr = this.app.getActiveNav();
    let activeVC = navctr.getActive();
    let page = activeVC.instance;
    if (page instanceof TabsPage) {  //处理Tab后退
      this.app.goBack();
      return "";
    }
    if (!navctr.canGoBack()) {
      if (this.counter == 0) {
        this.counter++;
        this.timestamp = new Date().valueOf();
        this.ShowToast(this.language.Click_again_to_exit);
        setTimeout(() => {
          this.counter = 0;
        }, 2000);
        return "";
      } else {
        let curstamp = new Date().valueOf();
        if (curstamp - this.timestamp < 100) return "";
        this.platform.exitApp();
        return "exit";
      }
    } else {
      let curstamp = new Date().valueOf();
      if (curstamp - this.timestamp < 100) return "";
      this.timestamp = curstamp;
      navctr.pop();
      return "";
    }
  }

  GetCurPage() {
    const navctr = this.app.getActiveNav();
    let activeVC = navctr.getActive();
    let page = activeVC.instance;
    return page;
  }
  initTranslateConfig() {
    let type = navigator.appName;
    let lang = localStorage.getItem("lang");
    let country = localStorage.getItem("country");
    if (!lang) {
      if (type == "Netscape") {
        lang = navigator.language;//获取浏览器配置语言，支持非IE浏览器
        lang = lang.substr(0, 2)
      }
      switch (lang) {
        case 'zh':
          localStorage.setItem("lang", "zh");
          break
        default:
          localStorage.setItem("lang", "en");
          break
      }
      console.log('浏览器语言', lang)
    }
    if (country) {
      localStorage.setItem("country", country);
    } else {
      localStorage.setItem("country", '1');
    }
  }
  initCustom() {
    let country: any = window.localStorage.getItem('country');
    let seft = this;
    let elem = document.getElementById('custom');
    if (country == 2) {//新加坡
      elem.style.display = 'none';
    }
    let maxW = document.body.clientWidth - elem.offsetWidth;
    let maxH = document.body.clientHeight - elem.offsetHeight;
    elem.addEventListener('touchstart', function (e) {
      // console.log(e.targetTouches[0])

      this.style.transition = "";
    })
    elem.addEventListener('touchmove', function (e) {
      let touch = e.targetTouches[0];
      let oLeft = touch.clientX;
      let oTop = touch.clientY;
      // console.log(touch.clientX,touch.clientY)
      if (oLeft < 0) {
        oLeft = 0;
      } else if (oLeft >= maxW) {
        oLeft = maxW;
      }
      if (oTop < 0) {
        oTop = 0;
      } else if (oTop >= maxH) {
        oTop = maxH;
      }
      this.style.left = oLeft + 'px';
      this.style.top = oTop + 'px';
    });
    //触摸结束时的处理
    elem.addEventListener('touchend', function () {
      let screenWidth = document.body.clientWidth;
      let eleWidth = this.offsetLeft;
      if (seft.platform.is('ios')) {
        this.style.left = screenWidth - 60 + 'px';
      } else {
        if (eleWidth < screenWidth / 2) {
          this.style.left = 10 + 'px';
        } else {
          this.style.left = screenWidth - 60 + 'px';
        }
      }
      this.style.transition = "all .5s"
    });
  }
  gotoMsg() {
    let modal = this.modalCtrl.create(MeServicePage);
    modal.present();
  }
}
