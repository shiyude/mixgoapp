import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from "./../../../providers/httpService/httpService";
import { api } from '../../../providers/httpService/api';
import { Base64 } from 'js-base64';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the FindDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-details',
  templateUrl: 'find-details.html',
})
export class FindDetailsPage {
  delails: any
  contentData: any
  productList: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServiceProvider, private sanitizer: DomSanitizer) {
    this.delails = navParams.data.details;
    this.GitDelails()
  }
  GitDelails() {
    let ids = this.delails.id
    this.http.doGet(api.queryDiscoveryById, { discoveryId: ids }, res => {
      if (res.code == 0) {
        if (!res.datas.content) {
          this.contentData = ''
        } else {
          let htmlStr = Base64.decode(res.datas.content)
          this.contentData = this.sanitizer.bypassSecurityTrustHtml(htmlStr);
        }
        this.getProduct()
      }
    });
  }
  getProduct() {
    let ids = this.delails.id
    this.productList = undefined
    this.http.doGet(api.queryGoodsByDiscoveryId, { discoveryId: ids, pageNo: 1, pageSize: 10000 }, res => {
      if (res.code == 0) {
        if (res.datas.lists && res.datas.lists.length) {
          this.productList = res.datas.lists
        }
      }

    }, false);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FinddetailsPage');
  }

}
