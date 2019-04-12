import { Component, ViewChild } from "@angular/core";
import {
  ModalController,
  IonicPage,
  NavController,
  NavParams,
  Content
} from "ionic-angular";
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "./../../../providers/httpService/api";
import { CargoListComponent } from "./../../../components/cargo-list/cargo-list";
import { LangProvider } from "../../../providers/lang/lang";
import { PopSelectPage } from "../../index";
/**
 * Generated class for the SelectListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-select-list",
  templateUrl: "select-list.html"
})
export class SelectListPage {
  @ViewChild("sonListFn")
  sonListFn: CargoListComponent; // 声明子组件
  @ViewChild(Content)
  content: Content;
  public info: any;
  public dataList: any;
  public distinguish: any; // 区分谁调分类列表
  public filtrate: any = "default";
  public language: any;
  public popSelectData: any = {}; // 筛选总数据
  public activeData: any = {}; // 激活的筛选
  public sonData: any; // 传回的数据
  public sundryDataName: any = {}; // 杂项抬头
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider,
    public modalCtrl: ModalController
  ) {
    this.language = langData.getLangData();
    this.info = navParams.data.details;
    this.GitList();
    this.GitFilter();
  }
  scrollToTop() { // 返回顶部
    this.content.scrollToTop();
  }
  GitList(type?: any, objs?: any) { // 列表
    if (this.content) {
      this.content.scrollToTop();
    }
    let seft = this;
    let mainIofn = {};
    switch (seft.info.furnitureType) {
      case "series": // 自定义
        mainIofn = {
          categoryValueIds: seft.info.id
        };
        break;
      case "furnitureType": // 家具分类
        mainIofn = {
          categoryId: seft.info.id
        };
        break;
    }
    let data:any = {
      pageNo: 1,
      pageSize: 10000,
      orderKey: type ? type : "1"
    };
    if (seft.info.spaceId !== undefined) {
      data.spaceId = seft.info.spaceId
    }
    seft.http.doGet(
      api.queryGoodsList,
      { ...data, ...mainIofn, ...objs },
      res => {
        if (res.code == 0) {
          // console.log(res);
          seft.dataList = {
            type: false,
            data: res.datas.lists
          };
          if (seft.sonListFn) {
            seft.sonListFn.GitData();
          }
        }
      },
      true
    );
  }

  popSelect() {
    // 选择
    let seft = this;
    let modal = this.modalCtrl.create(PopSelectPage, {
      listData: seft.popSelectData,
      activeData: seft.activeData
    });
    modal.onDidDismiss(data => {
      // 选择完成传回
      if (data) {
        // console.log(data)
        let upData: any = {}
        if (data.brandlist) {
          upData.brandIds = data.brandlist.join(",")
        }
        if (data.originData) {
          upData.origins = data.originData.join(",")
        }
        if (data.categoryData) {
          upData.categoryId = data.categoryData.join(",")
        }
        if (data.filterData) {
          let arr = []
          for (let i = 0; i < data.filterData.length; i++) {
            arr = arr.concat(data.filterData[i])
          }
          upData.propertyValues = arr.join(",")
        }
        // console.log(upData)
        seft.GitList('1', upData)
      }
    });
    modal.present();
  }

  GitFilter() { // 处理筛选数据
    let self = this,
      data: any = {};
    switch (self.info.furnitureType) {
      case "series": // 自定义
        data = {
          customCategoryId: self.info.id
        };
        break;
      case "furnitureType": // 家具分类
        data = {
          categoryId: self.info.id
        };
        break;
    }
    if (self.info.spaceId !== undefined) {
      data.spaceId = self.info.spaceId
    }
    this.http.doGet(api.condition, { ...data }, res => {
      if (res.code == 0) {
        let data = res.datas;
        if (data.origins) {
          let origin = data.origins.map(item => { // IF产地
            item = {
              name: item,
              isCheck: false
            };
            return item;
          });
          self.popSelectData.originData = {
            data: origin,
            title: self.language.production_place
          };
          self.activeData.originData = [];
        }
        if (data.brands) {  // IF品牌
          let brandData = data.brands.map(item => {
            item = {
              isCheck: false,
              name: item.brandName,
              id: item.id
            };
            return item;
          });
          self.popSelectData.brandlist = {
            data: brandData,
            title: self.language.brand
          };
          self.activeData.brandlist = [];
        }
        if (data.categorys) { // IF分类
          let category = data.categorys.map(item => {
            item = {
              isCheck: false,
              name: item.categoryName,
              id: item.categoryId
            }
            return item;
          });
          self.popSelectData.categoryData = {
            data: category,
            title: "分类"
          };
          self.activeData.categoryData = [];
        }
        if (data.properties) { // IF杂项筛选
          let len = data.properties.length;
          self.activeData.filterData = []
          self.popSelectData.filterData = data.properties.map(item => {
            item = {
              id: item.id,
              title: item.propertyName,
              params: item.propertyValue.split(",").map(res => {
                res = {
                  name: res,
                  isCheck: false
                }
                return res
              })
            };
            return item;
          });

          for (let i = 0; i < len; i++) {
            self.activeData.filterData[i] = []
          }
        }
        // console.log(this.popSelectData);
        // console.log(this.activeData);
      }
    });
  }
}
