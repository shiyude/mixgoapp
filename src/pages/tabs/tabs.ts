import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LangProvider } from '../../providers/lang/lang'; 
import {Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root} from '../'

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;

  public language:any

  constructor(
    public navCtrl: NavController,
    public langData: LangProvider
  ) {
    window['Tabs'] = this;//提供对外接口
    this.language = langData.getLangData()
  }

  ngAfterContentChecked(){ // 检测切换语言
    let tabLang = localStorage.getItem("tabLang");
    if (tabLang) {
      this.language = this.langData.getLangData()
      localStorage.removeItem('tabLang')
    }
  }
}
