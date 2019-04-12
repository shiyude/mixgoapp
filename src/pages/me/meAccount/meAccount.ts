import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  AlertController,
  ActionSheetController
} from "ionic-angular";
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "./../../../providers/httpService/api";
import { LangProvider } from "../../../providers/lang/lang";

/**
 * Generated class for the MeAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-meAccount",
  templateUrl: "meAccount.html"
})
export class MeAccountPage {
  public showForward;
  public hostUrl: any = localStorage.getItem('img_url')
  public user: any = {
    pic: "", // 头像
    name: "", // 昵称
    desc: "", // 介绍
    sex: "", // 性别
    birthday: "", // 生日
    profession: "", // 职业
    shipping_address: "" // 收货地址
  };
  public language: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public isIos: Platform,
    public http: HttpServiceProvider,
    public langData: LangProvider,
    public actionSheetCtrl: ActionSheetController
  ) {
    window["Account"] = this;
    this.showForward = this.isIos.is("ios");
    this.language = langData.getLangData();
    this.RefreshPage();
  }

  public RefreshPage(isLogined: boolean = false) {
    // 获取账户信息
    this.http.doGet(api.queryCustomer, {}, res => {
      if (res.code == 0) {
        let data = res.datas;
        this.user = {
          pic: data.logo,
          name: data.customerName,
          desc: data.label,
          sex: data.sex == 1 ? this.language.woman : this.language.Man,
          birthday: data.birthday,
          profession: data.occupation,
          shipping_address: data.address
        };
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo.customerName = res.datas.customerName;
        userInfo.logo = res.datas.logo;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
    });
  }
  backButtonClick = (e: UIEvent) => {
    this.navCtrl.popToRoot();
  };
  setAvatar() {
    // 设置头像调取unity
    window.location.href = "uniwebview://photo";
  }
  OnAvatarSuccess() {
    // 成功回调
    let seft = this;
    let accomplish = seft.language.accomplish;
    let confirm = this.alertCtrl.create({
      title: seft.language.hint,
      subTitle: seft.language.Set_head_portrait,
      buttons: [accomplish]
    });
    confirm.present();
    seft.RefreshPage();
  }

  OnAvatarFail(msg) {
    // 失败回调
    let seft = this;
    let accomplish = seft.language.accomplish;
    let confirm = this.alertCtrl.create({
      title: seft.language.hint,
      subTitle: msg,
      buttons: [accomplish]
    });
    confirm.present();
  }

  gotoName() {
    // 设置昵称
    let seft = this;
    let prompt = this.alertCtrl.create({
      title: seft.language.nickname, // 昵称
      inputs: [
        {
          name: "nickname",
          placeholder: seft.user.name
        }
      ],
      buttons: [
        {
          text: seft.language.cancel, // 取消
          handler: data => {
            console.log(data);
          }
        },
        {
          text: seft.language.confirm, // 确认
          handler: data => {
            this.user.name = data.nickname;
            this.http.doGet(
              api.updateCustomer,
              { customerName: data.nickname },
              res => {
                this.RefreshPage();
              }
            );
          }
        }
      ]
    });
    prompt.present();
  }

  gotoSignature() { // 个性签名
    let seft = this
    let prompt = this.alertCtrl.create({
      title: seft.language.personalized_signature,
      inputs: [
        {
          name: "nicksignature",
          placeholder: seft.user.desc
        }
      ],
      buttons: [
        {
          text: seft.language.cancel,
          handler: () => {
          }
        },
        {
          text: seft.language.confirm,
          handler: data => {
            seft.http.doGet(api.updateCustomer, { label: data.nicksignature }, (res) => {
              if (res.code == 0) {
                seft.user.desc = data.nicksignature
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }
  gotoSex() { // 性别
    let seft = this
    let actionSheet = this.actionSheetCtrl.create({
      title: seft.language.Sex_selection,
      buttons: [
        {
          text: seft.language.Man,
          handler: () => {
            console.log('男')
            seft.http.doGet(api.updateCustomer, { sex: 0 }, (res) => {
              if (res.code == 0) {
                seft.user.sex = seft.language.Man
              }
            });
          }
        }, {
          text: seft.language.woman,
          handler: () => {
            console.log('女')
            seft.http.doGet(api.updateCustomer, { sex: 1 }, (res) => {
              if (res.code == 0) {
                seft.user.sex = seft.language.woman
              }
            });
          }
        }
      ]
    })
    actionSheet.present();
  }
  changeDate(e) { // 生日
    let seft = this
    seft.http.doGet(api.updateCustomer, { birthday: e }, (res) => {
      if (res.code == 0) {
        seft.user.birthday = e
      }
    });
  }
  gotoProfession() { // 职业
    let seft = this
    let prompt = this.alertCtrl.create({
      title: seft.language.profession,
      inputs: [
        {
          name: "nickname",
          placeholder: seft.user.profession
        }
      ],
      buttons: [
        {
          text: seft.language.cancel,
          handler: () => {
          }
        },
        {
          text: seft.language.confirm,
          handler: data => {
            seft.http.doGet(api.updateCustomer, { occupation: data.nickname }, (res) => {
              if (res.code == 0) {
                seft.user.profession = data.nickname
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }
  gotoShipping_Address() { // 收货地址
    let seft = this
    let prompt = this.alertCtrl.create({
      title: seft.language.shipping_address,
      inputs: [
        {
          name: "shipping_address",
          placeholder: seft.user.shipping_address
        }
      ],
      buttons: [
        {
          text: seft.language.cancel,
          handler: () => {
          }
        },
        {
          text: seft.language.confirm,
          handler: data => {
            seft.http.doGet(api.updateCustomer, { address: data.shipping_address }, (res) => {
              if (res.code == 0) {
                seft.user.shipping_address = data.shipping_address
              }
            })
          }
        }
      ]
    });
    prompt.present();
  }
}
