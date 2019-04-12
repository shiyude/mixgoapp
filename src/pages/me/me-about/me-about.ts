import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LangProvider } from "../../../providers/lang/lang";
import { api } from "../../../providers/httpService/api";
import { HttpServiceProvider } from "../../../providers/httpService/httpService";

/**
 * Generated class for the MeAboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-me-about",
  templateUrl: "me-about.html"
})
export class MeAboutPage {
  public language: any;
  public phone:any;
  public companyData:any;
  public baseURL: any = localStorage.getItem('img_url');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public langData: LangProvider,
    public http:HttpServiceProvider
  ) {
    this.language = langData.getLangData();
    this.getCompanyData()
  }
  getCompanyData() {
    console.log(api)
    this.http.doGet(api.queryCompany, {}, res => {
      if (res.code == 0) {
        this.companyData = res.datas;
        console.log( this.companyData)
      }
    });
  }
  goContactUs(e) {
    window.location.href = "uniwebview://contact?phone=" + e
  }
  ionViewDidLoad() { }
}
