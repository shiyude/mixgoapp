import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { Md5 } from "ts-md5/dist/md5";
import { LoadingController } from "ionic-angular";
import { baseURL } from "./end";
import {companyConfig} from './company.config'

@Injectable()
export class HttpServiceProvider {
  public userInfo: any;
  public user: any = {
    sign: Md5.hashStr(companyConfig.idToken), // 正式f05e99debd6d11e88da4001e67785195 测试1f8cdd89fc07211e88da4001e67785195
    companyId: companyConfig.id,
    lang: "",
    country: "",
    userid: "",
    token: ""
  };
  public loadingIsOpen: boolean = false;
  public loading: any;
  constructor(
    public http: HttpClient,
    public alert: AlertController,
    public pfm: Platform,
    public loadingCtrl: LoadingController
  ) { }

  /**
 * 处理参数
 * @param res
 * @param {Function} error
 */
  public urlData() {
    let user = JSON.parse(window.localStorage.getItem("userInfo"));
    let language = window.localStorage.getItem("lang");
    let country = window.localStorage.getItem("country")
    let ids, tokens, lang;
    ids = user ? user.id : "";
    tokens = user ? user.token : "";
    if (language) {
      switch (language) {
        case "zh":
          lang = "zh-CN";
          break;
        case "en":
          lang = "en_US";
          break;
      }
    }
    return (
      "?sign=" + this.user.sign +
      "&companyId=" + this.user.companyId +
      "&lang=" + lang +
      "&country=" + country +
      "&customerId=" + ids +
      "&token=" + tokens
    );
  }

  /**
  * post请求
  * @param res
  * @param {Function} error
  */
  public doPost(
    url: string,
    params: any = null,
    successCallback,
    errorCallback?: any
  ): any {
    // 此处使用的post模式为非严格模式，如果要使用严格模式，请把参数放在第二个位置 覆盖null
    // let data = {...this.user}
    return this.http.post(baseURL + url + this.urlData(), { ...params }, {}).subscribe(
      (res: any) => {
        this.responseSuccess(res, function (msg) {
          if (successCallback) {
            successCallback(res, msg);
          }
        });
      },
      err => {
        if (errorCallback) {
          errorCallback(err);
        }
      }
    );
  }

  /**
   * Get请求
   * @param res
   * @param {Function} error
   */
  public doGet(
    url: string,
    params: any = null,
    successCallback,
    showLoad: boolean = true,
    errorCallback?: any
  ): any {
    let resData = { ...params };
    if (showLoad) {
      this.showLoading("loading..");
    }
    return this.http.get(baseURL + url + this.urlData(), { params: resData }).subscribe(
      (res: any) => {
        this.responseSuccess(res, function (msg) {
          if (successCallback) {
            successCallback(res, msg);
          }
        });
      },
      err => {
        if (errorCallback) {
          errorCallback(err);
        }
      }
    );
  }

  // 删除相关请求
  public delete(url: string, params?: any): any {
    return this.http.delete(baseURL + url, params);
  }


  /**
   * 处理响应的事件
   * @param res
   * @param {Function} error
   */
  private responseSuccess(res: any, callback) {
    if (res.code != "0" && res.code != "-2") {
      callback(res);
    } else if (res.code == "-2") {
      if (localStorage.getItem("userInfo")) {
        let alert = this.alert.create({
          title: "提示",
          subTitle: "账号从其他地方登陆，您已被迫下线!",
          buttons: [
            {
              text: "确定",
              handler: () => {
                window.location.reload(true);
              }
            }
          ]
        });
        alert.present();
        localStorage.removeItem("userInfo"); //踢掉
      }
    } else if (res.code == "0") {
      this.hideLoading();
      callback(res);
    }
  }

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading(content: string = ""): void {
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        content: content,
        cssClass: "loadingBox"
      });
      this.loading.present();
      setTimeout(() => {
        //最长显示10秒
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
      }, 5000);
    }
  }

  /**
   * 关闭loading
   */
  hideLoading(): void {
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  }
}
