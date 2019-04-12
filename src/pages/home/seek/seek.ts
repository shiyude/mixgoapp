import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Keyboard } from 'ionic-angular';
import { LangProvider } from '../../../providers/lang/lang'; 
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "./../../../providers/httpService/api";

/**
 * Generated class for the SeekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-seek',
  templateUrl: 'seek.html',
})
export class SeekPage {
  @ViewChild('myInputs') myInput;
  public language:any
  public search:any
  public searchData:any
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider,
    public viewCtrl: ViewController,
    public keyboard: Keyboard
  ) {
    window['seek'] = this
    this.language = langData.getLangData()
    window.location.href = "uniwebview://seek";
    this.SetFocusFn()
  }
  dismiss() {
    this.keyboard.close()
    let seft = this, name = this.search
    if(name == '') {
      name = undefined
    }
    seft.http.doGet(api.queryGoodsList,{searchKey:name, pageNo: 1, pageSize: 10000,},res => {
      if(res.code == 0) {
        // console.log(res)
        seft.searchData = {
          data: res.datas.lists,
          type: false
        }
      }
    })
  }
  
  SetFocusFn() {
    let seft = this
    setTimeout(() => {
      seft.myInput.setFocus() //为输入框设置焦点
    },1000);
  }

  leave() { // 不搜索
    this.viewCtrl.dismiss();
  }

}
