import { Component, Input } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ProductDetailPage, UnitDetailsPage } from "../../pages/index";
import { LangProvider } from '../../providers/lang/lang';
/**
 * Generated class for the CargoListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "cargo-list",
  templateUrl: "cargo-list.html"
})
export class CargoListComponent {
  @Input() content: any;
  public type: boolean;
  public groupingData = [];
  public sumData = [];
  public totalityData: any // 全部数据
  public num: number = 0; // 记录刷新次数
  public scrolls: any = undefined // 再次调用滚动
  public language: any
  public hostUrl: any = localStorage.getItem('img_url')
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public langData: LangProvider
  ) {
    this.language = langData.getLangData()
  }
  GitData(type?: any) { // 处理父组件传入的数据
    let seft = this
    if (seft.totalityData) {
      if (seft.totalityData.data.length > 10) {
        seft.groupingData = [];
        for (let i = 0; i < seft.totalityData.data.length; i += 8) {
          seft.groupingData.push(seft.totalityData.data.slice(i, i + 8));
        }
        seft.sumData = seft.groupingData[0].map(res => {
          return res;
        });
        // console.log('大于10条数据',seft.groupingData)
      } else {
        seft.sumData = seft.totalityData.data;
        // console.log('小于10条数据',seft.sumData)
      }
      if (seft.scrolls !== undefined) { // 如果重新进入，再次唤起滚动加载
        seft.scrolls.enable(true)
      }
      seft.num = 0
    }
  }
  ngOnChanges(): void { // 如果接收完父组件数据
    let seft = this
    if (seft.content !== undefined) {
      seft.totalityData = seft.content
      seft.GitData()
    }
    // console.log(seft.content)
  }

  gotoProductDetails(data) {
    this.navCtrl.push(ProductDetailPage, { details: data});
  }
  gotoUnitDetailsPage(data) {
    this.navCtrl.push(UnitDetailsPage, { details: data});
  }

  doInfinite(infiniteScroll) { // 滚动加载
    let seft = this;
    let leng = this.groupingData.length;
    seft.scrolls = infiniteScroll
    seft.num++;
    if (seft.num < leng) {
      setTimeout(() => {
        let arrNum = seft.num;
        for (let i = 0; i < seft.groupingData[arrNum].length; i++) {
          seft.sumData.push(seft.groupingData[arrNum][i]);
        }
        infiniteScroll.complete(true);
      }, 500);
    } else {
      infiniteScroll.enable(false); // 满足条件，删除滚动加载
    }
  }
}
