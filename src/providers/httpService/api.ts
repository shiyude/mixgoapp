export const api = {
  querySysConfig: '/mixgo-goods-api/config/querySysConfig', // 初始化接口
  queryCountry:"/mixgo-goods-api/config/queryCountry",//查询国家列表
  queryCompany:"/mixgo-goods-api/config/queryCompany",//关于我们
  queryAppVersion:"/mixgo-goods-api/config/queryAppVersion",//版本更新
  /**首页 开始*/
  queryHomeDiscovery: '/mixgo-goods-api/discovery/queryHomeDiscovery',//查询首页轮播
  queryHomeMainmark:"/mixgo-goods-api/home/queryHomeMainmark",//查询首页主标列表
  queryHomeStore:"/mixgo-goods-api/store/queryHomeStore",//查询首页门店列表
  queryHomeHot:"/mixgo-goods-api/home/queryHomeHot",//查询首页推荐(type=1今日新选 2特卖好物)
  queryRecommandGroups:"/mixgo-goods-api/home/queryRecommandGroups",//查询分组列表
  queryRecommandByGroupId:"/mixgo-goods-api/home/queryRecommandByGroupId",//查询分组下的推荐商品列表
  /**首页 结束*/
  /**门店 开始 */
  queryStoreById:"/mixgo-goods-api/store/queryStoreById",//门店详情
  queryStoreGoods:"/mixgo-goods-api/store/queryStoreGoods",//查询门店商品列表
  queryStoreCategory:"/mixgo-goods-api/store/queryStoreCategory",//查询门店类别
  queryStoreCategoryGoods:"/mixgo-goods-api/store/queryStoreCategoryGoods",//查询门店类别下的商品列表
  isFavoriteStore:"/mixgo-customer-api/favorite/isFavoriteStore",//是否收藏门店
  addStoreFavorite:"/mixgo-customer-api/favorite/addStoreFavorite",//门店收藏
  queryFavoriteStore:"/mixgo-customer-api/favorite/queryFavoriteStore",//查询收藏门店列表
  deleteStoreFavorite:"/mixgo-customer-api/favorite/deleteStoreFavorite",//取消收藏门店
  queryStoreList: '/mixgo-goods-api/store/queryStoreList', // 查询门店列表
  addStoreLike:"/mixgo-goods-api/store/addStoreLike",//门店点赞
  /**门店 结束 */
  /**商品 开始 */
  queryGoodsById:"/mixgo-goods-api/goods/queryGoodsById",//查询商品详情
  condition:"/mixgo-goods-api/goods/condition",//查询条件列表
  queryGoodsList:"/mixgo-goods-api/goods/queryGoodsList",//查询商品列表
  isFavoriteGoods:"/mixgo-customer-api/favorite/isFavoriteGoods",//是否收藏商品
  addGoodsFavorite:"/mixgo-customer-api/favorite/addGoodsFavorite",//商品收藏
  queryFavoriteGoods:"/mixgo-customer-api/favorite/queryFavoriteGoods",//查询收藏商品列表
  deleteGoodsFavorite:"/mixgo-customer-api/favorite/deleteGoodsFavorite",//取消收藏商品
  /**商品 结束 */
  /**品牌 开始 */
  queryBrandById:"/mixgo-goods-api/brand/queryBrandById",//查询品牌详情
  queryBrandGoods:"/mixgo-goods-api/brand/queryBrandGoods",//查询品牌下所有商品
  queryBrandCustomCategory:"/mixgo-goods-api/brand/queryBrandCustomCategory",//查品牌自定义类别
  queryStoreByBrand:"/mixgo-goods-api/brand/queryStoreByBrand",//品牌门店列表
  queryBrandSearchCategory:"/mixgo-goods-api/brand/queryBrandSearchCategory",//查询品牌下的搜索分类
  queryBrandCategoryGoods:"/mixgo-goods-api/brand/queryBrandCategoryGoods",//查询品牌自定义类别下的商品
  /**品牌 结束 */
  /**发现 开始 */
  queryDiscoveryById:"/mixgo-goods-api/discovery/queryDiscoveryById",//查询发现详情
  queryDiscoveryList:"/mixgo-goods-api/discovery/queryDiscoveryList",//查询发现列表
  addDiscoveryLike:"/mixgo-goods-api/discovery/addDiscoveryLike",//发现点赞
  queryGoodsByDiscoveryId:"/mixgo-goods-api/discovery/queryGoodsByDiscoveryId",//查询发现详情下的商品
  /**发现 结束 */
  register: '/mixgo-customer-api/customer/register', // 注册
  login: '/mixgo-customer-api/customer/login', // 登录
  sendCode: '/mixgo-customer-api/customer/sendCode', // 验证码
  modifyPassword: '/mixgo-customer-api/customer/modifyPassword', // 找回密码
  updateCustomer: '/mixgo-customer-api/customer/updateCustomerById', // 更新个人信息
  queryCustomer: '/mixgo-customer-api/customer/queryCustomer', // 查询个人信息

  /* 分类 */
  queryBrandCount: '/mixgo-goods-api/brand/queryBrandCount', // 查询品牌数量
  queryBrandGroup: '/mixgo-goods-api/brand/queryBrandGroup', // 查询品牌组
  queryBrand: '/mixgo-goods-api/brand/queryBrand', // 查询品牌列表
  queryGoodsSpace: '/mixgo-goods-api/goodsCategory/queryGoodsSpace', // 查询类目列表
  queryGoodsCategory: '/mixgo-goods-api/goodsCategory/queryGoodsCategory', // 子类目
  queryGoodsCustomCategory: '/mixgo-goods-api/customCategory/queryGoodsCustomCategory', // 查询自定义分类
  queryGoodsCustomCategoryValue: '/mixgo-goods-api/customCategory/queryGoodsCustomCategoryValue', // 查询自定义列表
  queryHouseTypes: '/mixgo-house-api/houseType/queryHouseTypes', // 户型
  queryHouseTypeDetails: '/mixgo-house-api/houseType/queryHouseTypeDetails', // 详情

}