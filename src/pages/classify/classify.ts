import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Content, ModalController } from "ionic-angular";
import { HttpServiceProvider } from "./../../providers/httpService/httpService";
import { api } from "./../../providers/httpService/api";
import { SelectListPage, BrandListPage, MeServicePage } from "../index";
import { LangProvider } from "../../providers/lang/lang";

/**
 * Generated class for the ClassifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-classify",
  templateUrl: "classify.html"
})
export class ClassifyPage {
  @ViewChild(Content)
  content: Content;
  public language: any; // 翻译对象
  public label: any
  public PtypeLabel: any = 0
  public BrandeLabel: any = 0
  public classifyNavData: any = [] // 导航
  public categories: any // 导航切换
  public PtypeNoTwo: boolean = false // 是否类目关键字
  public PtypeFatherData = undefined // 类目父级导航
  public PtypeSunData = undefined // 类目子类
  public brandNoTwo: boolean = false // 是否类目关键字
  public brandFatherData: any = undefined // 类目父级导航
  public brandSunData: any = undefined // 类目子类
  public categoryData: any = undefined // 自定义列表
  public PushData: any  // 主标导航数据
  public baseURL: any = localStorage.getItem('img_url')
  public DisnetType: boolean = false
  public sunId: any = undefined
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider,
    public modalCtrl: ModalController,
  ) {
    this.PushData = navParams.data.pushData;
    // console.log(this.PushData)
    this.language = langData.getLangData()
    this.queryBrandCount()
    this.Disnet()
  }

  selectedEnemies(type?: any, num?: any) { // 判断是显示哪个页面
    if (this.PushData && !type) { // 如果从主标进入
      let pushData = this.PushData
      switch (pushData.type) {
        case 1:
          this.categories = 'Ptype'
          this.label = 0
          break
        case 2:
          this.categories = 'custom'
          this.label = this.classifyNavData.findIndex((value) => {
            return value.type == pushData.parentValue;
          })
          this.queryGoodsCustomCategoryValue(pushData.parentValue) // 唤起自定义列表
          break
        case 3:
          this.label = 1
          this.categories = 'brand'
          break
      }
    }

    if (type) { // tabs进入 || 点击
      this.categories = type
      this.label = num
      if ((type != 'brand') && (type != 'Ptype')) {
        this.categories = 'custom'
        this.queryGoodsCustomCategoryValue(type)
      }
    }

  }
  queryBrandCount() { // 是否显示品牌
    this.http.doGet(api.queryBrandCount, {}, res => {
      if (res.code == 0) {
        if (res.datas.num > 1) {
          let arr = [
            {
              name: this.language.type,
              type: 'Ptype'
            },
            {
              name: this.language.brand,
              type: 'brand'
            }
          ]
          this.queryGoodsCustomCategory(arr)
          this.queryBrandGroup() // 如果有品牌，唤起品牌
        } else {
          let arr = [
            {
              name: this.language.type,
              type: 'Ptype'
            }
          ]
          this.queryGoodsCustomCategory(arr)
        }
      }
    }, false)
  }
  queryGoodsCustomCategory(arr) { // 拼接导航
    this.http.doGet(api.queryGoodsCustomCategory, {}, res => {
      if (res.code == 0) {
        let arr1 = arr
        let arr2 = res.datas.map(item => {
          let data = {
            name: item.categoryName,
            type: item.id.toString()
          }
          return data
        })
        this.classifyNavData = arr1.concat(arr2)
        if (this.classifyNavData) { // 如果导航拼接成功
          if (this.PushData) { // 区分是否从主标进入
            this.selectedEnemies()
          } else {
            this.selectedEnemies('Ptype', 0)
          }
          this.queryGoodsSpace()
        }
      }
    }, false)
  }
  queryGoodsSpace() { // 类目
    this.http.doGet(api.queryGoodsSpace, {}, res => {
      if (res.code == 0) {
        if (res.datas.length > 0) { // 如果有父类
          this.PtypeFatherData = res.datas.map(item => {
            item.sunData = []
            return item
          })

          // console.log(this.PtypeFatherData)
          // console.log('有左侧')
          this.PtypeNoTwo = false
          if (this.PushData) { // 如果从主标进入
            if (this.PushData.type == 1) {
              let pushData = this.PushData
              let index = this.PtypeFatherData.findIndex((value) => {
                return value.id == pushData.parentValue;
              })
              this.cutSpan(index, { id: pushData.parentValue })
            } else {
              this.queryGoodsCategory(this.PtypeFatherData[0].id, 0, false)
            }
          } else {
            this.queryGoodsCategory(this.PtypeFatherData[0].id, 0, false)
          }

        } else {
          this.PtypeNoTwo = true
          this.PtypeFatherData = undefined
          // console.log('没有左侧')
          this.queryGoodsCategory()
        }
      }
    }, false)
  }
  queryGoodsCategory(sunId = '', num?, isLod?: any) { // 类目子类
    if (sunId !== '') {
      this.sunId = sunId;
    }
    this.http.doGet(api.queryGoodsCategory, { spaceId: sunId }, res => {
      if (res.code == 0) {
        if (sunId == '') {
          this.PtypeSunData = {
            sunData: res.datas,
            logo: '123.png',
            spaceName: '类目'
          }
        } else {
          this.PtypeFatherData[num].sunData = res.datas
          this.PtypeSunData = this.PtypeFatherData[num]
        }
      }
    }, isLod)
  }
  cutSpan(num, ptypeNav: any) { // 类目切换
    this.PtypeLabel = num
    this.queryGoodsCategory(ptypeNav.id, num)
  }
  queryBrandGroup() { // 品牌组
    this.http.doGet(api.queryBrandGroup, {}, res => {
      if (res.code == 0) {
        if (res.datas.length > 0) {
          this.brandFatherData = res.datas
          if (this.PushData) { // 如果从主标进入
            if (this.PushData.type == 3) {
              let pushData = this.PushData
              let index = this.brandFatherData.findIndex((value) => {
                return value.id == pushData.parentValue;
              })
              this.BrandSpan(index, { id: pushData.parentValue })
            } else {
              this.queryBrand(this.brandFatherData[0].id, false)
            }
          } else {
            this.queryBrand(this.brandFatherData[0].id, false)
          }

        } else {
          this.brandNoTwo = true
          this.brandFatherData = undefined
          this.queryBrand()
        }
      }
    }, false)
  }
  queryBrand(sunId = '', isLod?) { // 品牌组列表
    this.http.doGet(api.queryBrand, { groupId: sunId, pageNo: 1, pageSize: 1000 }, res => {
      if (res.code == 0) {
        this.brandSunData = res.datas.lists
      }
    }, isLod)
  }
  BrandSpan(num, brandNav) { // 品牌切换
    this.BrandeLabel = num
    this.queryBrand(brandNav.id)
  }
  queryGoodsCustomCategoryValue(ids) { // 查询自定义列表
    this.http.doGet(api.queryGoodsCustomCategoryValue, { categoryId: ids }, res => {
      if (res.code == 0) {
        this.categoryData = res.datas
      }
    })
  }
  gotoSelectListPage(item, type) { // 去商品列表
    let data: any = {
      furnitureType: type,
      id: item.id,
      title: ''
    }
    if (type == "furnitureType") {
      (this.sunId !== undefined) && (data.spaceId = this.sunId)

    }
    if (item.categoryValue) {
      data.title = item.categoryValue
    }
    if (item.categoryName) {
      data.title = item.categoryName
    }
    this.navCtrl.push(SelectListPage, { details: data });
  }
  gotoBrandDetailPage(item) {
    this.navCtrl.push(BrandListPage, { details: item });
  }

  ionViewWillEnter() {
    let iSrefresh = localStorage.getItem("classigy")
    if (iSrefresh) {
      this.refresh()
    }
  }
  refresh() { // 刷新
    this.language = this.langData.getLangData()
    localStorage.removeItem('classigy')
    this.DisnetType = false
    this.queryBrandCount()
    this.Disnet()
  }
  Disnet() { // 如果断网
    setTimeout(() => {
      let brandSunData = this.brandSunData,
        brandFatherData = this.brandFatherData,
        PtypeSunData = this.PtypeSunData
      if (!brandSunData && !brandFatherData && !PtypeSunData) {
        this.DisnetType = true
      }
    }, 5000);
  }
}
