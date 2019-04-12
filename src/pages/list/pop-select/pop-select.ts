import { Component } from "@angular/core";
import {
  ViewController,
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { LangProvider } from "../../../providers/lang/lang";

/**
 * Generated class for the PopSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pop-select",
  templateUrl: "pop-select.html"
})
export class PopSelectPage {
  public language: any;
  public activeData: any = {}; // 激活的
  public parentData: any // 父元素传来的
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public langData: LangProvider,
    public loadingCtrl: LoadingController,
  ) {
    this.parentData =  navParams.data.listData
    this.activeData = navParams.data.activeData
    this.language = langData.getLangData();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateCucumber(type,dataName) { // checkbox点击
    let seft = this
    let idx = seft.activeData[dataName].indexOf(type);
    if (idx > -1) {
      seft.activeData[dataName].splice(idx, 1);
    } else {
      if (seft.activeData[dataName].length >= 3) {
        return;
      }
      seft.activeData[dataName].push(type);
    }

    if (seft.activeData[dataName].length < 3) {
      seft.parentData[dataName].data.map(item => {
        item.isTrue = false;
      });
    } else {
      seft.spliceIstrue(seft.activeData[dataName],seft.parentData[dataName].data)
    }
  }

  filterUp(type,dataName,index) { // 其他筛选
    // console.log(type)
    let idx = this.activeData[dataName][index].indexOf(type);
    if (idx > -1) {
      this.activeData[dataName][index].splice(idx, 1);
    } else {
      if (this.activeData[dataName][index].length >= 3) {
        return;
      }
      this.activeData[dataName][index].push(type);
      // console.log(this.activeData[dataName])
    }

    if (this.activeData[dataName][index].length < 3) {
      this.parentData[dataName][index].params.map(item => {
        item.isTrue = false;
      });
    } else {
      this.spliceIstrue(this.activeData[dataName][index],this.parentData[dataName][index].params)
    }
  }

  spliceIstrue(arr1,arr2) { // 激活三个剩下废掉
    for (let i = 0; i < arr2.length; i++) {
      let obj = arr2[i];
      let num = obj.id?obj.id:obj.name
      let isExist = false;
      for (let j = 0; j < arr1.length; j++) {
        let aj = arr1[j];
        let n = aj;
        if (n == num) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        obj.isTrue = true;
      }
    }
  }
  
  ensureBtn() { // 确定按钮
    let seft = this
    let loading = seft.loadingCtrl.create({
      content: 'loading',
      cssClass:'loadingBox'
    })
    loading.present();
    setTimeout(() => { 
      loading.dismiss();
      seft.viewCtrl.dismiss(seft.activeData)
    },500);
  }

  resetBtn() { // 重置按钮
    let seft = this
    seft.resFn()
    let loading = seft.loadingCtrl.create({
        content: 'loading',
        cssClass:'loadingBox'
    });
    loading.present();
    setTimeout(() => { 
      seft.resFn()
      loading.dismiss();
      seft.viewCtrl.dismiss(seft.activeData)
    },500);
  }

  resFn() { // 重置数据
    let seft = this
    seft.activeData.brandlist = []
    seft.activeData.originData = []
    if(seft.activeData.categoryData) {
      seft.activeData.categoryData = []
      seft.mapReseData(seft.parentData.categoryData.data)
    }
    if(seft.parentData.filterData) {
      for(let i = 0; i < seft.parentData.filterData.length; i++) {
        seft.mapReseData(seft.parentData.filterData[i].params)
        seft.activeData.filterData[i] = []
      }
    }
    seft.mapReseData(seft.parentData.brandlist.data)
    seft.mapReseData(seft.parentData.originData.data)
  }

  mapReseData(dataList) {
    dataList.map(res =>{
      res.isTrue = false
      res.isCheck = false
    })
  }
}
