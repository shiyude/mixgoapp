import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { LangProvider } from '../../../providers/lang/lang'; // 语言
import { MeAccountPage, RegisterPage, MeAboutPage, MeSharePage } from "../../index"

/**
 * Generated class for the MeSetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me-set',
  templateUrl: 'meSet.html',
})
export class MeSetPage {
  RadioOpen: boolean;
  RadioResult;
  langs: any;
  language: any; // 语言
  cache: string = "0"
  public isLogin: any = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alerCtrl: AlertController,
    public modalCtrl: ModalController,
    public langData: LangProvider,
    public toastCtrl: ToastController, ) {
    window['Meset'] = this;//提供对外接口
    this.language = langData.getLangData()
    let unse = localStorage.getItem('userInfo')
    if (unse) {
      this.isLogin = true
    }
    window.location.href = "uniwebview://meset";
  }
  gotoLanguage() { // 设置语言
    let seft = this
    this.langs = [
      { language: "English", type: "en" },
      { language: "简体中文", type: "zh" }
    ];

    let alert = this.alerCtrl.create();
    alert.setTitle(seft.language.language_selection);
    for (let lang of this.langs) {
      alert.addInput({
        type: "radio",
        label: lang["language"],
        value: lang["type"],
        checked: lang["type"] == localStorage.getItem('lang') ? true : false
      });
    }
    alert.addButton(seft.language.cancel);
    alert.addButton({
      text: seft.language.accomplish,
      handler: data => {
        seft.RadioOpen = false;
        seft.RadioResult = data;
        console.log(data)
        switch (data) {
          case 'zh':
            window.location.href = "uniwebview://lang?name=zh-CN"
            break
          case 'en':
            window.location.href = "uniwebview://lang?name=en_US"
            break
        }
        localStorage.setItem('lang', data)
        localStorage.setItem('tabLang', 'gaibian')
        localStorage.setItem('home', '1')
        localStorage.setItem('me', '1')
        localStorage.setItem('find', '1')
        localStorage.setItem('ar', '1')
        localStorage.setItem('classigy', '1')
        seft.language = seft.langData.getLangData()
      }
    });
    alert.present().then(() => {
      seft.RadioOpen = true;
    });
  }
  remind(num: number, text: string) { // 提醒 方法
    const toast = this.toastCtrl.create({
      message: text,
      duration: num,
      position: 'middle'
    });
    toast.present();
  }
  gotoMeAccount() { // 个人信息
    let infoNmae = JSON.parse(localStorage.getItem('userInfo'))
    if (infoNmae) {
      this.navCtrl.push(MeAccountPage);
    } else {
      this.remind(1000, this.language.not_login)
    }
  }
  gotoPassword(type) { // 账号安全
    let infoNmae = JSON.parse(localStorage.getItem('userInfo'))
    if (infoNmae) {
      this.navCtrl.push(RegisterPage, { type: type });
    } else {
      this.remind(1000, this.language.not_login)
    }
  }
  gotoLogin() { // 推出登陆
    localStorage.removeItem('userInfo')
    this.navCtrl.setRoot('MePage');
    window.location.href = "uniwebview://logout";
  }
  gotoVersions() { // 当前版本
    window.location.href = "uniwebview://checkUpdate"
  }
  alertVersions(version) {
    let _self = this;
    let alert = this.alerCtrl.create({
      subTitle: `${_self.language.current_version}(${version})`,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: _self.language.update_app,
        }
      ]
    });
    alert.present();
  }
  public setSize(size) { // unity调用
    this.cache = size;
    console.log('unity传入信息', size)
  }
  showConfirm() { // 清除缓存 
    let seft = this
    console.log('点击')
    if (this.cache != '0') {
      let confirm = this.alerCtrl.create({
        title: seft.language.Clear_cache,
        message: seft.language.Cleared + this.cache,
        buttons: [
          {
            text: seft.language.cancel,
            handler: () => {
              console.log('Agree clicked');
            }
          },
          {
            text: seft.language.done,
            handler: () => {
              this.cache = '0';
              console.log('调取UNITY服务')
              window.location.href = "uniwebview://clear";
            }
          }
        ]
      });
      confirm.present();
    }
  }
  gotoAbout() { // 关于我们
    this.navCtrl.push(MeAboutPage);
  }
  gotoShare() { // 推荐好友
    this.navCtrl.push(MeSharePage);
  }
}
