import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the LangProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LangProvider {
  public en = {
    language: {
      lang:"en",
      hint: "hint",
      clear_the_cache: "Are you sure you want to clear the cache?",
      Current_cached_data: "Current cached data",
      Set_head_portrait: "Set head portrait succeed",
      noSet_head_portrait: "Set head portrait come to nothing", 
      Refresh: "Refresh",
      Refreshing: "Refreshing...",
      no_more: "No more(^∇^*)",
      search_result: "Search Result",
      Man: "Man",
      woman: 'Woman',
      Sex_selection: "Sex Selection",

      home: "Home",
      category: "Category",
      ar: "AR",
      discovery: "Discovery",
      me: "Me",
      search: "Search",

      match: "Match",
      house_type: "Unit type",
      whole_house: "Entire Unit",
      scan: "Scan",

      no_data: "No data",
      network_connection_error: "Connection error",

      panoramagram: "Exterior",

      Panoramic_family: " Interior",

      district: "Region",
      proportion: "Area",
      developers: "Developers",
      reset: "Reset",
      confirm: "Confirm",

      details_of_the_brand: "Brand details",

      china: "China",
      singapore: "Singapore",
      type: "TYPE",
      brand: "BRAND",
      space: "Space",
      style: "Style",

      product_details: "Product details",
      production_place: "Place",
      apply: "Apply",
      shop: "Shop",
      site: "Address",
      phone: "Contact",
      url: "Website",
      commodity_parameters: "Product details",
      parameter_specification: "Specification",

      all_the_options: "All options",
      done: "Done",

      synthesize: "combine",
      popularity: "Hot",
      newest: "New",
      screen: "Filter",
      more_screening: "More filter",
      state: "Country",

      designer_project: "Designer",
      designer_name: "Designer name",
      designer_work: "Designer works",

      promotion_project: "Promotion",

      good_sale_item: "Sales",

      input_city: "city",
      switch_the_city: "change city",
      current_location_city: "Current city",
      hot_city: "Hot city",

      store_entity: "Store",
      see_all: "All",
      today_the_new_choice: "Latest selection",
      panoramic_collocation: "Panoramic collocation",

      customer_service: "Customer service",

      stores_details: "Store details",
      business_hours: "Business hours",
      contact_number: "Contact",

      business_center: "Business Center",
      user_service_management: "Customer service management",
      business_order: "Business order",
      inviting_code: "Invitation code",
      customer_management: "Customer management",
      collection: "Collection",
      footprints: "History",
      contact_us: "Contact us",
      commodity_attention_rankings: "Ranking",
      view_all: "See all",
      ranking: "Ranking",
      commodity_number: "SKU",
      commodity_master_diagram: "Product image",
      name_of_the_commodity: "Product name",
      price: "Price",
      browsing_volume: "Browsing volume",
      number_of_visitors: "Number of visitors",
      total_user_total: "Total user",
      active_user: "Active user",
      average_length: "Average length",
      at_the_same_time_yesterday: "Yesterday’s statistic",
      yesterday: "Yesterday’s",

      product_statistics: "Product statistics",

      call_center: "Service center",
      user_service_SMS_push: "SMS push",
      Step_1: "Step 1：Select user",
      user_name: "User name",
      city: "City",
      product_main_photo: "Product main image",
      name_of_collection: "Name of collection",
      purchase_history: "Purchase history",
      send: "Send",

      my: "My",
      nickname: "Nickname",
      id: "ID",
      service: "Customer service",
      help: "Help",
      enshrine: "Collection",
      footprint: "History",
      MixGo: "MixGo",
      recommendation: "Recommendation",

      account_setting: "Account setting",
      personal_data: "Personal info",
      head_portrait: "Profile picture",
      personalized_signature: "Signature",
      sex: "Gender",
      birthday: "Birthday",
      profession: "Profession",
      shipping_address: "Shipping address",
      other_login_methods: "Other login methods",

      language_selection: "Language selection",

      input_passwords: "input passwords",

      password: "password",
      confirm_password: "Confirm password",
      Password_prompt:
        " Password must be at least 6 characters and may contain numbers, upper and lowercase letters, and standard symbols",
      accomplish: "Done",

      login: "login",
      account: "Account",
      quick_registration: "Quick registration",
      forget_the_password: "Forget the password",

      input_phone: "Please enter phone No. or E-mail address",
      input_phonetow: "Please enter registered phone No. or E-mail address",

      next_step: "Next step",

      immediately_verify: "Immediately verify",
      "E-mail": "E-mail",
      activate_your_account: "Activate your account",
      get_your_account_back: "Find your account",
      the_verification_code_passed: "Verification passed",
      message: "message",
      prompt_message:
        "Binding is to verify the authenticity of the user and account security",
      countdown: "Countdown",
      resend: "Resend",

      input_code: "Please enter verification code",
      input_password: "Please enter new password (6-20 characters)",
      input_tow: "Please enter again",

      change_password: "Change password",
      update_acknowledge: "Confirm the change",

      set: "Setting",
      recommend_to_friends: "Share to friends",
      personal_setting: "Personal setting",
      account_security: "Account security",
      set_language: "Language",
      current_version: "Current version",
      clear_cache: "Clear cache",
      about_us: "About us",

      share: "Share",
      WeChat_friends: "Wechat friends",
      friend_circle: "Wechat moment",
      QQ: "QQ",
      qzone: "Qzone",

      collect: "Collection",
      wish_list: "Wish list",
      shop_to_collect: "Shop collection",
      ShopList: "Shop List",
      external_links: "External Links",
      size: "Size",
      bannerLog: "Banner Log",
      item_number: "Item No.",
      browsing_history: "History",
      delete: "Delete",
      manage: "Manage",
      cancel: "Cancel",
      logout: "Log Out",
      Please_input: "Please input phone No. or E-mail address",
      Barrel: "FFEP",
      all: "All",
      sfic:"SFIC",
      Retrieve_password: "Retrieve password",
      Please_enter: "Please enter the correct verification code",
      assword_must: "The password must be at least 6 characters ",
      Verification_entered: "Verification code must be entered",
      password_changed: "password changed successfully!",
      verification_code: "The verification code has been sent, please check",
      verification_email: "The verification code has been forward to the registered email",
      Password_does: "Password does not match",
      not_login: "Account not login",
      Please_login_first: "Please login first!!",
      Successfully_like: " Successfully like!!",
      Liked: " Liked!!",
      Added_to_Collection: "Added to Collection!!",
      DeletedfromCollection: "Deleted from Collection!!",
      AddtoFavoriteshop: "Add to Favorite shop!!",
      The_network_is_not_working:"The network is not working. Please try again",
      refresh:"refresh",
      Do_not_update:"Do not update",
      update_now:"update now",
      Latest_version:"Latest version",
      Invalid_request:"Invalid request",
      Clear_cache:"Clear cache?",
      Cleared:"Cleared",
      Unable_to_change_password:"Unable to change password Error:",
      help_1:"3D Preview",
      help_1_1:"Preview the 3D model of products in all directions",
      help_2:"AR Function",
      help_2_1:"Project the 3D model anytime, anywhere in real life",
      help_3:"DIY",
      help_3_1:"Choose different furniture from the merchant product, enjoy to match them and design by yourself",
      help_4:"Scan",
      help_4_1:"Scan and generate 3D models, make traditional product brochures lively",
      abuot_text:"Established in Singapore, MixGo, is an Augmented Reality (AR) company that allows product visualisation in 3D. We believe in empowering enterprises with instant visualizations.We understand business, and sought to value add, and further enhance their edge ",
      abuot_Contact: "Mr.Guan",
      abuot_phone: "+65 98329699",
      abuot_email: "enquiry@mixgo.com",
      abuot_site: "69 Ubi Road 1 #08-30, Oxley Bizhub, Singapore 408731",
      Click_again_to_exit: "Click again to exit",
      Account_Register_Already: "Account Register Already!",
      Account_Not_Exist: "Account Not Exist",
      Please_Send_Message_AfterMinute: "Please Send Message After 1 Minute!",
      click_here_to_login: "click here to login",
      The_username_cannot_be_empty: 'The username cannot be empty',
      
      album:"Album",
      designer:"Designer",
      brand_detail_title:"Brand Details",
      go_store:"Go Shop",
      people_cared:"People are concerned",
      nav_title:"Nav",
      classify_title:"Category",
      shop_title:"Shop",
      goods_lists_title:"Shop Lists",
      Temporarily_not_opened: 'Temporarily not opened',
      update_app:'Sure',
      isUpdate_app:'Do you want to update the version?',
      update_title:'Version update',
      privacy:"Privacy policy",
      "brandCommand":"Brand merchant recommendation"
    }
  }

  public zh = {
    language: {
      lang:"zh",
      hint: "提示",
      Click_again_to_exit: "再按一次退出",
      The_username_cannot_be_empty: '用户名不能为空',
      clear_the_cache: "您确定要清空缓存吗?",
      Current_cached_data: "当前缓存数据",
      Set_head_portrait: "设置头像成功",
      noSet_head_portrait: "设置头像失败", 
      Refresh: "下拉刷新",
      Refreshing: "正在刷新...",
      refresh:"刷新",
      no_more: "没有更多咯(^∇^*)",
      search_result: "搜索结果",
      Man: "男",
      woman: '女',
      Sex_selection: "选择性别",

      home: "首页",
      category: "分类",
      ar: "AR",
      discovery: "发现",
      me: "我",
      search: "搜索",

      match: "搭配",
      house_type: "户型",
      whole_house: "全屋",
      scan: "扫描",

      no_data: "暂无数据",
      network_connection_error: "网络连接错误",
      The_network_is_not_working:"网络不给力，请重试",

      panoramagram: "全景图",

      Panoramic_family: "全景户型",

      district: "区域",
      proportion: "面积",
      developers: "开发商",
      reset: "重置",
      confirm: "确认",

      details_of_the_brand: "品牌详情",

      china: "中国",
      singapore: "新加坡",
      type: "类目",
      brand: "品牌",
      space: "空间",
      style: "风格",

      product_details: "产品详情",
      production_place: "产地",
      apply: "适用空间",
      shop: "门店",
      ShopList: "门店列表",
      site: "地址",
      phone: "联系电话",
      url: "网址",
      commodity_parameters: "商品详情",
      parameter_specification: "参数规格",

      all_the_options: "全部选项",
      done: "完成",

      synthesize: "综合",
      popularity: "人气",
      newest: "最新",
      screen: "筛选",
      more_screening: "更多筛选",

      state: "国家",

      designer_project: "设计师专题",
      designer_name: "设计师名字",
      designer_work: "设计师作品",

      promotion_project: "促销专题",

      good_sale_item: "特卖好物",

      iput_city: "输入城市",
      switch_the_city: "切换城市",
      current_location_city: "当前定位城市",
      hot_city: "热门城市",

      store_entity: "门店实体",
      see_all: "查看全部",
      today_the_new_choice: "今日新选",
      panoramic_collocation: "全景搭配",

      customer_service: "客服",

      stores_details: "门店详情",
      business_hours: "营业时间",
      contact_number: "联系电话",

      business_center: "商务中心",
      user_service_management: "用户服务管理",
      business_order: "商务订单",
      inviting_code: "邀请码",
      customer_management: "客户管理",
      collection: "收藏",
      footprints: "足迹",
      contact_us: "联系我们",
      commodity_attention_rankings: "商品关注度排行",
      view_all: "查看全部",
      ranking: "排行",
      commodity_number: "编号",
      commodity_master_diagram: "商品主图",
      name_of_the_commodity: "商品名称",
      price: "价格",
      browsing_volume: "浏览量",
      number_of_visitors: "访客数",
      total_user_total: "用户总量",
      active_user: "活跃用户",
      average_length: "平均时长",
      at_the_same_time_yesterday: "昨日同时段",
      yesterday: "昨日全天",

      product_statistics: "产品统计",

      call_center: "服务中心",
      user_service_SMS_push: "用户服务短信推送",
      Step_1: "第一步：选择您要发送短信的用户",
      user_name: "用户名",
      city: "城市",
      product_main_photo: "商品主图",
      name_of_collection: "收藏商品名称",
      purchase_history: "购买历史",
      send: "发送",

      my: "我的",
      nickname: "昵称",
      id: "账号",
      service: "客服",
      help: "帮助",
      enshrine: "收藏",
      footprint: "足迹",
      MixGo: "MixGo",
      recommendation: "精品推荐",

      account_setting: "账户设置",
      personal_data: "个人资料",
      head_portrait: "头像",
      personalized_signature: "个性签名",
      sex: "性别",
      birthday: "生日",
      profession: "职业",
      shipping_address: "收货地址",
      other_login_methods: "其他登录方式",

      language_selection: "语言选择",

      input_passwords: "请输入密码",

      password: "密码",
      confirm_password: "确认密码",
      Password_prompt: "密码由6-20位字母、数字、特殊符号组成，注意大小写",
      accomplish: "完成",

      login: "登录",
      account: "账户",
      quick_registration: "快速注册",
      forget_the_password: "忘记密码",

      input_phone: "请输入手机号或邮箱",
      input_phonetow: "请输入绑定的手机号或邮箱号",

      next_step: "下一步",

      immediately_verify: "马上验证",
      "E-mail": "邮箱",
      activate_your_account: "激活你的账户",
      get_your_account_back: "找回你的账户",
      the_verification_code_passed: "验证码已通过",
      message: "短信",
      prompt_message: "绑定是为了验证用户的真实性和账号安全",
      countdown: "倒计时",
      resend: "重新发送",

      input_code: "请输入验证码",
      input_password: "输入新密码（6-20位）",
      input_tow: "再输入一次",

      change_password: "修改密码",
      update_acknowledge: "确认修改",

      set: "设置",
      recommend_to_friends: "推荐给好友",
      personal_setting: "个人设置",
      account_security: "账号安全",
      set_language: "设置语言",
      current_version: "当前版本",
      clear_cache: "清空缓存",
      about_us: "关于我们",

      share: "分享",
      WeChat_friends: "微信好友",
      friend_circle: "朋友圈",
      QQ: "QQ",
      qzone: "QQ空间",

      collect: "收藏",
      wish_list: "商品收藏",
      shop_to_collect: "店铺收藏",

      external_links: "外部链接",
      size: "尺寸",
      bannerLog: "品牌Log",
      item_number: "货号",
      browsing_history: "足迹",
      delete: "删除",
      manage: "管理",
      cancel: "取消",
      logout: "退出登录",
      Please_input: "请输入手机号或邮箱",
      Barrel: "名家居",
      all: "综合",
      sfic:"SFIC",
      verification_code: "验证码已发送，请注意查收!",
      verification_email: "验证码已发送到您的邮箱，请注意查收!",
      Retrieve_password: "找回密码",
      Please_enter: "请输入正确的验证码 ",
      assword_must: "密码长度不能小于6位数 ",
      Verification_entered: "验证码不能为空！",
      password_changed: "密码修改成功",
      Password_does: "两次密码不一致",
      not_login: "账号未登录",
      Please_login_first: "请登录后收藏！！",
      Successfully_like: "成功点赞！！",
      Liked: "你已经点过赞了！！",
      Added_to_Collection: "添加收藏！！",
      DeletedfromCollection: "删除收藏！！",
      AddtoFavoriteshop: "收藏门店",
      Do_not_update:"继续使用旧版",
      update_now:"立即更新",
      Latest_version:"当前已经是最新版本了",
      Invalid_request:"错误请求",
      Clear_cache:"您确定要清空缓存吗?",
      Cleared:"当前缓存数据",
      Unable_to_change_password:"修改密码出错!错误码:",
      help_1:"3D浏览",
      help_1_1:"全方位浏览产品3D模型",
      help_2:"AR功能",
      help_2_1:"随时随地投影3D模型在真实的环境中",
      help_3:"DIY",
      help_3_1:"从商家产品中选取不同的家具，自由组合搭配",
      help_4:"扫描",
      help_4_1:"扫描生成3D模型，让传统产品宣传册生动起来",
      abuot_text:"MixGo是新加坡首屈一指的AR(增强现实), VR(虚似现实)，AI(人工智能)综合科技公司，为不同行业提供最便捷的可视化解决方案。  通过AR技术让家居产品与真实环境完美结合， 给用户带来最直观、真实的视觉体验。",
      abuot_Contact: "刘先生",
      abuot_phone: "+86 18682220971",
      abuot_email: "enquiry@mixgo.com",
      abuot_site: "深圳市龙华新区万众路U创谷写字楼12楼B12-28",
      Account_Register_Already: "该用户已经注册过了",
      Account_Not_Exist: "账号不存在",
      Please_Send_Message_AfterMinute: "请在一分钟后再次发送",
      click_here_to_login: "点击这里登录",

      album:"专辑汇",
      designer:"设计师",
      brand_detail_title:"品牌详情",
      go_store:"进店",
      people_cared:"人已关注",
      nav_title:"导航",
      classify_title:"分类",
      shop_title:"门店",
      goods_lists_title:"商品列表",
      Temporarily_not_opened: '暂未开放',
      update_app:'确定',
      isUpdate_app:'是否更新版本？',
      update_title:'版本更新',
      privacy:"隐私政策",
      brandCommand:"品牌商户推荐"
    }
    
  }

  constructor(public http: HttpClient) {
    console.log("Hello LangProvider Provider");
  }

  getLangData() {
    let seft = this
    let lang = localStorage.getItem("lang");
    let langData:any
    if(lang) {
      switch(lang) {
        case 'zh' :
          langData = seft.zh.language
          break
        case 'en' :
          langData = seft.en.language
          break
      }
    } 
    return langData;
  }
}

