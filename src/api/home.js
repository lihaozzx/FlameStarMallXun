import axios from "axios";
import params from "../conf/params";
export default {
  getBestChoice(data) {
    // 得到品质优选list
    return axios.get(`${params.base_url}/home/bestChoice`, { params: data });
  },
  getSwipeList(data) {
    // 得到轮播图数据
    return axios.get(`${params.base_url}/home/slideShow`, { params: data });
  },
  getCategoriesList(data = {}) {
    // 得到分类数据
    return axios.get(`${params.base_url}/home/categories`, { params: data });
  },
  getCategoriesGoods(data) {
    // 得到分类商品
    return axios.get(`${params.base_url}/home/goods`, { params: data });
  },
  getGoodsDeil(data) {
    // 得到商品详情
    return axios.get(`${params.base_url}/home/goodsDetail`, { params: data });
  },
  getSearchResults(data) {
    // 得到搜素结果
    return axios.get(`${params.base_url}/home/_search`, { params: data });
  },
  getShopDetail(data) {
    // 得到店铺详情
    return axios.get(`${params.base_url}/home/storeDetail`, { params: data });
  },
  getShopGoods(data) {
    // 得到店铺下的商品
    return axios.get(`${params.base_url}/home/store/goods`, { params: data });
  },
  getUserInteract(data) {
    // 得到商品的用户评论
    return axios.get(`${params.base_url}/interact/queryUserInteract`, {
      params: data
    });
  },
  getCashBack(data) {
    // 查询金额返专场（全民返）商品
    return axios.get(`${params.base_url}/home/cashBack`, { params: data });
  },
  getLowPrice() {
    // 查询性价比之王（好物榜）商品
    return axios.get(`${params.base_url}/home/lowPrice`);
  },
  getTopSales() {
    // 查询口碑爆品榜（趋势榜）商品
    return axios.get(`${params.base_url}/home/topSales`);
  },

  getFreeShopping(data) {
    // 查询零元购活动信息
    return axios.get(`${params.base_url}/home/activity/freeShopping`, {
      params: data
    });
  },
  getfreeShoppingDetail(data) {
    // 查询零元购活动详情activity/freeShopping/placeOrder
    return axios.get(
      `${params.base_url}/home/activity/freeShopping/goodsDetail`,
      { params: data }
    );
  },
  getfreeShoppingEntry() {
    // 查询零元购活动入口信息
    return axios.get(`${params.base_url}/home/activity/freeShopping/entry`);
  },
  freeShoppingPlaceOrder(data) {
    // 下单
    return axios.post(
      `${params.base_url}/home/activity/freeShopping/placeOrder`,
      data
    );
  },
  freeShoppingPlaceOrderValidate(data) {
    // 下单校验
    return axios.post(
      `${params.base_url}/home/activity/freeShopping/placeOrder/validate`,
      data
    );
  },
  getTextSlideShow(data) {
    // 购买商品文字轮播信息
    return axios.get(`${params.base_url}/home/textSlideShow`, { params: data });
  }
};
