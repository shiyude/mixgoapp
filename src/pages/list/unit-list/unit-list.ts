import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LangProvider } from '../../../providers/lang/lang'; 
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from "./../../../providers/httpService/api";
import { CargoListComponent } from './../../../components/cargo-list/cargo-list';

/**
 * Generated class for the UnitListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unit-list',
  templateUrl: 'unit-list.html',
})
export class UnitListPage {
  @ViewChild('sonListFn') sonListFn: CargoListComponent; // 声明子组件
  public language:any
  public relationship:any = '' // 弹窗内容值
  public cutOpen:boolean = false  // 弹出框
  public forms:any = {
    region: '', // 大区
    street: '', // 商圈数据
    houseType: '', //户型
    acreage: '', // 面积
    developers: '' // 开发商
  }
  public filterData:any = {} //总数据
  public streetData:any = [] // 商圈数据
  public unitData:any // 户型数据
  public leb1:any = 0
  public leb2:any = null
  public leb3:any = null
  public leb4:any = null
  public leb5:any = null
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public langData: LangProvider,
  ) {
    this.language = langData.getLangData()
  }

  ionViewDidLoad() {   // 进入加载钩子
    let seft = this
    // seft.http.doGet( api.filter, {typeflag:4, city:'深圳'}, res => {
    //   seft.filterData = res
    //   seft.forms.region = res.district[0].code
    //   seft.streetData = res.subdistrict
    // })
    // seft.GitUnitList()
    this.GitUnitList()
  }

  acquireCode(code,num,type) { // 用户选值
    let seft = this
    switch(type) {
      case 'area':
        seft.leb1 = num
        seft.forms.region = code
        // seft.getStreet(code)
        seft.forms.street = ''
        seft.leb2 = null
        break
      case 'street':
        seft.leb2 = num
        seft.forms.street = code
        break
      case 'houseType':
        seft.leb3 = num
        seft.forms.houseType = code
        break
      case 'acreage':
        seft.forms.acreage = code
        seft.leb4 = num
        break
      case 'developers':
        seft.leb5 = num
        seft.forms.developers = code
        break
    }
  }

  // getStreet(e) { // 选择大区请求商圈数据
  //   this.http.doGet(api.select,{code:e,level:2}, res => {
  //     this.streetData = res.lists
  //   },true)
  // }
  GitUnitList(data?:any) { // 拉取户型列表
    this.http.doGet(api.queryHouseTypes,{pageNo:1,pageSize:10000,...data}, res => {
      if(res.code == 0) {
        // console.log(res)
        this.unitData = {
          data: res.datas.lists,
          type: 'unit'
        }
      }
    },true)
  }
  doReset() { // 重置筛选
    let seft = this 
    seft.cutOpen = false;
    seft.relationship = '';
    seft.leb1 = 0
    seft.leb2 = null
    seft.leb3 = null
    seft.leb4 = null
    seft.leb5 = null
    seft.forms.region = ''
    seft.forms.street = ''
    seft.forms.houseType = ''
    seft.forms.acreage = ''
    seft.forms.developers = ''
    // seft.GitUnitList()
  }
  doSelect() { // 获取用户选取信息
    let seft = this,selectData:any = {}
    seft.cutOpen = false
    seft.relationship = '';
    if(seft.forms.street != ''){
      selectData.level = 3
      selectData.code = seft.forms.street
    }
    if(seft.forms.houseType != ''){
      selectData.unit = seft.forms.houseType
    }
    if(seft.forms.acreage != ''){
      selectData.area = seft.forms.acreage
    }
    if(seft.forms.developers != ''){
      selectData.vendor = seft.forms.developers
    }
    // seft.GitUnitList(selectData)
    if(seft.sonListFn) {
      seft.sonListFn.GitData();
    }
  }
  segmentChanged(e) { // 弹窗是谁
    this.cutOpen = true
    this.relationship = e;
  }

  shadeClick() { // 遮罩
    this.cutOpen = false
    this.relationship = ''
  }
}