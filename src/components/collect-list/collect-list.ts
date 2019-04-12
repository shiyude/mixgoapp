import { Component, Input } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { ProductDetailPage } from "../../pages/index";
import { LangProvider } from "../../providers/lang/lang";
import { HttpServiceProvider } from "./../../providers/httpService/httpService";
import { api } from "../../providers/httpService/api";
/**
 * Generated class for the CollectListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'collect-list',
  templateUrl: 'collect-list.html'
})
export class CollectListComponent {
  @Input() content: any;

  public groupingData = []; // 切分的全部数据
  public sumData = []; // 当前数据
  public totalityData:any = undefined // 原始数据
  public num: number = 0; // 记录刷新次数
  public scrolls:any = undefined // 再次调用滚动
  public language:any
  public typePage:any // 进入页面类型
  public hostUrl = window.localStorage.getItem('img_url')
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public langData: LangProvider,
    public http: HttpServiceProvider
  ) {
    this.language = langData.getLangData()
  }
  
  ngOnChanges(): void { // 判断是谁调用
    let seft = this
    if(seft.content !== undefined) {
      if(seft.content == 'Track') { // 足迹
        if (JSON.parse(localStorage.getItem('productPootmark'))) {
          seft.totalityData = JSON.parse(localStorage.getItem('productPootmark'))
        } else {
          seft.totalityData = []
        }
        this.typePage = 'Track'
      } else { // 收藏
        seft.totalityData = seft.content
        this.typePage = 'enshrine'
      }
    }
  }

  GitData() { // 处理数据
    this.totalityData = JSON.parse(localStorage.getItem('productPootmark'))
  }
  delete(item) { // 删除数据
    let seft = this
    if(seft.typePage == 'Track') {
      for(let i = 0; i < this.totalityData.length; i++) {
        if (this.totalityData[i].id === item.id){
          this.totalityData.splice(i , 1)
          localStorage.setItem('productPootmark',JSON.stringify(this.totalityData))
          this.GitData()
          console.log(this.totalityData)
        }
      }
    } else {
      seft.http.doGet(api.deleteGoodsFavorite,{goodsId:item.id},res => {
        if(res.code == '0') {
          for(let i = 0; i < this.totalityData.length; i++) {
            if (this.totalityData[i].id === item.id){
              this.totalityData.splice(i , 1)
              console.log(this.totalityData)
            }
          }
        }
      },false)

    }
  }
  gotoProductDetails(data) {
    this.navCtrl.push(ProductDetailPage, { details: data });
  }
}
