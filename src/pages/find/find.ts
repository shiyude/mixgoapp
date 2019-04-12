import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpServiceProvider } from "./../../providers/httpService/httpService";
import { api } from "./../../providers/httpService/api";
import { FindDetailsPage } from "../index"
import { LangProvider } from '../../providers/lang/lang';
import { Base64 } from 'js-base64';


/**
 * Generated class for the FindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find',
  templateUrl: 'find.html',
})
export class FindPage {
  public findAlbumData: Array<any> = []
  public findDesignerData: Array<any> = []
  public categoryDatas: Array<any> = undefined
  public isShowTab: Boolean = false
  public language: any
  public categories: string = "album";
  public DisnetType: boolean = false;
  public isNet: boolean = false
  public hostUrl: any = localStorage.getItem('img_url')
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public langData: LangProvider,
    public http: HttpServiceProvider,
    public toastCtrl: ToastController, ) {
    this.language = langData.getLangData()
    this.getFindAlbum()
    this.Disnet()
  }
  getFindAlbum() {
    this.categoryDatas = undefined;
    this.isShowTab = false;
    this.http.doGet(api.queryDiscoveryList, { pageNo: 1, pageSize: 10000, type: 0 }, res => {
      if (res.code == 0) {
        this.findAlbumData = res.datas.lists;
        this.getFindDesigner()
        this.DisnetType = false
        this.isNet = true;
      }
    })
  }
  // ionViewDidLoad() {

  // }
  getFindDesigner() {
    this.http.doGet(api.queryDiscoveryList, { pageNo: 1, pageSize: 10000, type: 1 }, res => {
      if (res.code == 0) {
        this.findDesignerData = res.datas.lists;
        if (!this.findAlbumData.length && !this.findDesignerData.length) {
          this.categoryDatas = []
        } else if (!this.findAlbumData.length && this.findDesignerData.length) {
          this.categoryDatas = this.findDesignerData
        } else if (this.findAlbumData.length && !this.findDesignerData.length) {
          this.categoryDatas = this.findAlbumData
        } else {
          this.categoryDatas = this.findAlbumData
          this.isShowTab = true
        }
      }


    }, false);
  }
  changeList(type) {
    if (type == 'album') {
      this.categoryDatas = this.findAlbumData
    } else {
      this.categoryDatas = this.findDesignerData
    }
  }
  liek(e, index) { // 点赞
    let user = JSON.parse(localStorage.getItem("userInfo"));
    let seft = this;
    if (!user) {
      seft.remind(1000, seft.language.not_login)
    } else if (e.islike == 1) {
      seft.remind(1000, seft.language.Liked)
    } else {
      seft.http.doGet(api.addDiscoveryLike, { discoveryId: e.id }, res => {
        if (res.code == '0') {
          seft.remind(1000, seft.language.Successfully_like)
          seft.categoryDatas[index].likeNum = parseInt(seft.categoryDatas[index].likeNum) + 1;
          seft.categoryDatas[index].islike = 1;
        }
      }, false)
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
  refresh() { // 刷新
    this.language = this.langData.getLangData()
    this.getFindAlbum()
    localStorage.removeItem('find')
    this.DisnetType = false
    this.Disnet()
  }
  ionViewWillEnter() {
    let iSrefresh = localStorage.getItem("find")
    if (iSrefresh) {
      this.refresh()
      console.log('切换find')
    }
  }
  gotoBanner(type, num) { // 去发现
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
    this.categoryDatas[num].viewNum = parseInt(this.categoryDatas[num].viewNum) + 1;


  }
  Disnet() { // 如果断网
    setTimeout(() => {
      if (!this.isNet) {
        this.DisnetType = true
      }
    }, 5000);
  }

}
