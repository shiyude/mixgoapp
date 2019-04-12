import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpServiceProvider } from "./../../providers/httpService/httpService";
import { api } from "./../../providers/httpService/api";
import { RegisterPage, PrivacyPage } from "../index"
import { LangProvider } from '../../providers/lang/lang';
import { Base64 } from 'js-base64'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public userinfo = {
    user_name: "",
    user_pass: ""
  }
  public language: any
  constructor(public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public http: HttpServiceProvider,
    public toastCtrl: ToastController,
    public langData: LangProvider,
    public modalCtrl: ModalController
  ) {
    this.language = langData.getLangData()
  }
  remind(num: number, text: string) { // 提醒 方法
    const toast = this.toastCtrl.create({
      message: text,
      duration: num,
      position: 'middle'
    });
    toast.present();
  }
  dismiss() { // 登录
    let seft = this
    if (seft.userinfo.user_name === '') {
      seft.remind(1000, seft.language.Please_input)
    } else if (seft.userinfo.user_pass === '') {
      seft.remind(1000, seft.language.input_passwords)
    } else {
      //  Md5.hashStr(this.userinfo.user_pass + '922eb641bbbc11e88da4001e67785195').toString();
      let data = {
        phone: seft.userinfo.user_name,
        password: Md5.hashStr(this.userinfo.user_pass + '922eb641bbbc11e88da4001e67785195').toString()
      }
      this.http.doGet(api.login, data, (res) => {
        if (res.code == 0) {
          localStorage.setItem('userInfo', JSON.stringify(res.datas))
          let account = JSON.stringify(res.datas)
          let str = Base64.encode(account).toString("base64")
          str = str.replace(/\+/g, "%2B");
          str = str.replace(/\=/g, "%3D");
          // console.log(str)
          window.location.href = "uniwebview://login?data=" + str
          this.viewCtrl.dismiss(res.datas);
        } else {
          seft.remind(1000, res.msg)
        }
      }, false)
    }
  }
  register(type) { // 注册
    let modal = this.modalCtrl.create(RegisterPage, {
      type: type
    });
    modal.present();
  }
  leave() { // 不登录
    this.viewCtrl.dismiss();
  }
  gotoprivacyPolicy() {
    let modal = this.modalCtrl.create(PrivacyPage);
    modal.present();
  }
}
