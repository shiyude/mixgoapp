import { Component } from "@angular/core";
import { ToastController, IonicPage, NavController, NavParams, ViewController, Platform } from "ionic-angular";
import { LangProvider } from "../../../providers/lang/lang";
import { Md5 } from 'ts-md5/dist/md5';
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "./../../../providers/httpService/api";
import { companyConfig } from '../../../providers/httpService/company.config'
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  public language: any;
  public userinfo = {
    user_name: "",
    user_verify: "",
    user_pass: "",
    tow_user_pass: ""
  }
  public verify: any
  public isDisabled: boolean = false
  public num: number = 60
  public pageType: any
  public isPhone: string
  public platformName: string
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public langData: LangProvider,
    public viewCtrl: ViewController,
    public http: HttpServiceProvider,
    public toastCtrl: ToastController,
    public plt: Platform
  ) {
    let infoNmae = JSON.parse(localStorage.getItem('userInfo'))
    if (infoNmae) {
      this.userinfo.user_name = infoNmae.phone
      if (!infoNmae.phone) {
        this.userinfo.user_name = infoNmae.email
      }
    }
    this.language = langData.getLangData()
    if (this.language) {
      this.verify = this.language.immediately_verify
      let type = navParams.data.type
      if (type) {
        switch (type) {
          case 1:
            this.pageType = 'enroll' // 注册
            break
          case 2:
            this.pageType = 'seek' // 忘记
            break
          case 3:
            this.pageType = 'amend' // 修改
        }
      }
      // console.log(this.pageType)
    }
    if (this.plt.is('ios')) {
      this.platformName = 'ios'
      console.log('是IOS')
    } else {
      this.platformName = 'android'
      console.log('是android')
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

  sendVerigy() { // 判断手机号或者邮箱
    let seft = this, user_name = this.userinfo.user_name;
    let re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
    let varreg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;// 是否邮箱
    if (user_name == '') {
      seft.remind(1000, seft.language.The_username_cannot_be_empty)
    } else if (re.test(user_name)) {
      seft.GitVerigy(user_name, 'phone')
    } else if (varreg.test(user_name)) {
      seft.GitVerigy(user_name, 'email')
    } else {
      seft.remind(1000, seft.language.input_phone)
    }
  }
  GitVerigy(num, isPhone) { // 验证码
    let seft = this
    let type: string = ''
    this.isPhone = isPhone
    if (seft.pageType && isPhone == 'phone') {
      switch (seft.pageType) {
        case 'enroll':
          type = 'sms_reg'
          break
        case 'seek':
          type = 'sms_findpass'
          break
        case 'amend':
          type = 'sms_findpass'
          break
      }
    }
    if (seft.pageType && isPhone == 'email') {
      switch (seft.pageType) {
        case 'enroll':
          type = 'email_reg'
          break
        case 'seek':
          type = 'email_findpass'
          break
        case 'amend':
          type = 'email_findpass'
          break
      }
    }
    let data = {
      phone: num,
      smsSign: Md5.hashStr(num.toString() + type + companyConfig.token),
      sendType: type
    }

    this.http.doGet(api.sendCode, { ...data }, (res) => {
      if (res.code == 0) {
        seft.remind(1000, seft.language.verification_code)
        seft.isDisabled = true
        seft.doTimer()
      } else if (res.code == '-301') {
        seft.remind(1000, seft.language.Account_Register_Already)
      } else if (res.code == '-302') {
        seft.remind(1000, seft.language.Account_Not_Exist)
      } else if (res.code == '-204') {
        seft.remind(1000, seft.language.Please_Send_Message_AfterMinute)
      }
    }, false)
  }
  register(type) { // 区分注册或者找回
    let userInfo = localStorage.getItem('userInfo')
    if (type) {
      switch (type) {
        case 1:
          this.registerFn(api.register, 'zhuce', "1")
          break
        case 2:
          this.registerFn(api.modifyPassword, 'xiugai', "1")
          break
        case 3:
          if (userInfo) {
            this.registerFn(api.modifyPassword, 'xiugai', "2")
          }
          break
      }
    }
  }
  registerFn(apis, sendTypeName, type) { // 注册方法
    let seft = this, info = this.userinfo
    if (info.user_name == '') {
      seft.remind(1000, seft.language.The_username_cannot_be_empty)
    } else if (info.user_verify == '') {
      seft.remind(1000, seft.language.input_code)
    } else if (info.user_pass == '') {
      seft.remind(1000, seft.language.input_passwords)
    } else if (info.user_pass.length < 6) {
      seft.remind(1000, seft.language.assword_must)
    } else if (info.user_pass != info.tow_user_pass) {
      seft.remind(1000, seft.language.Password_does)
    } else {
      // info.user_pass = Md5.hashStr(info.user_pass + '922eb641bbbc11e88da4001e67785195').toString()
      // info.tow_user_pass = Md5.hashStr(info.tow_user_pass + '922eb641bbbc11e88da4001e67785195').toString()
      let sendType
      if (this.isPhone == 'email') {
        switch (sendTypeName) {
          case 'zhuce':
            sendType = 'email_reg'
            break
          case 'xiugai':
            sendType = 'email_findpass'
            break
        }
      }
      if (this.isPhone == 'phone') {
        switch (sendTypeName) {
          case 'zhuce':
            sendType = 'sms_reg'
            break
          case 'xiugai':
            sendType = 'sms_findpass'
            break
        }
      }
      let infoData = {}
      if (sendTypeName == 'zhuce') {
        infoData = {
          password: Md5.hashStr(info.user_pass + '922eb641bbbc11e88da4001e67785195').toString(),
          phone: info.user_name,
          validateCode: info.user_verify,
          sendType: sendType,
          source: this.platformName
        }
      } else {
        infoData = {
          password: Md5.hashStr(info.user_pass + '922eb641bbbc11e88da4001e67785195').toString(),
          phone: info.user_name,
          validateCode: info.user_verify,
          sendType: sendType
        }
      }
      this.http.doGet(apis, infoData, (res) => {
        if (res.code == 0) {
          if (type == 1) {
            seft.viewCtrl.dismiss();
          } else {
            localStorage.removeItem('userInfo')
            seft.navCtrl.setRoot('MePage');
            window.location.href = "uniwebview://logout";
          }
          seft.remind(1000, seft.language.accomplish)
        } else if (res.code == '-203') {
          seft.remind(1000, seft.language.Please_enter)
        } else if (res.code == '-301') {
          seft.remind(1000, seft.language.Account_Register_Already)
        } else if (res.code == '-302') {
          seft.remind(1000, seft.language.Account_Not_Exist)
        }
      }, false)
    }
  }
  doTimer() { // 倒计时
    let seft = this
    seft.num = 120
    let timer = setInterval(() => {
      --seft.num;
      if (seft.num == 0) {
        clearInterval(timer)
        seft.verify = seft.language.immediately_verify
        seft.isDisabled = false
      } else {
        seft.verify = seft.num
      }
    }, 1000)
  }
  leave() { // 不注册
    this.viewCtrl.dismiss();
  }
}
