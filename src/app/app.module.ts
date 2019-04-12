import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpServiceProvider } from '../providers/httpService/httpService';
import { LangProvider } from '../providers/lang/lang';

import VConsole from 'vconsole';
// let vconsole = new VConsole() // 召唤神龙
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true', // 隐藏二级菜单
      backButtonText: '',
      iconMode: 'ios',//安卓icon强制使用ios的icon以及样式
      backButtonIcon: 'md-arrow-round-back',
      pageTransition: 'ios-transition',
      mode:'ios'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    LangProvider
  ]
})
export class AppModule {}
