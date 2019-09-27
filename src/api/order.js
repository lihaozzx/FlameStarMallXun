import axios from 'axios'
import params from '../conf/params'
export default {
  postCheckGoods (data) {
    // 校验商品-单商品下单
    return axios.post(`${params.base_url}/order/checkGoods`, data)
  },
  postCheckCart (data) {
    // 校验商品-购物车下单
    return axios.post(`${params.base_url}/order/checkCart`, data)
  },
  postAddOrderByGoods (data) {
    // 下单（单个商品）
    return axios.post(`${params.base_url}/order/addOrderByGoods`, data)
  },
  postAddOrderByCart (data) {
    // 下单（购物车）
    return axios.post(`${params.base_url}/order/addOrderByCart`, data)
  },
  getQueryOrderListByUserId (data) {
    // 用户查询订单列表
    return axios.get(`${params.base_url}/order/queryOrderListByUserId`, {params: data})
  },
  getQueryOrder (data) {
    // 查询订单详情
    return axios.get(`${params.base_url}/order/queryOrder`, {params: data})
  },
  applyRefund (data) {
    // 申请退款
    return axios.post(`${params.base_url}/order/applyRefund`, data)
  },
  addRechargeOrder (data) {
    // 用户充值
    return axios.post(`${params.base_url}/order/addRechargeOrder`, data)
  },
  grtQueryOrderCashBack (data) {
    // 查询订单分期返现详情
    return axios.get(`${params.base_url}/order/queryOrderCashBack`, {params: data})
  },
  cancelOrder (data) {
    // 取消订单cancelRefund
    return axios.post(`${params.base_url}/order/cancelOrder`, data)
  },
  cancelRefund (data) {
    // 取消退款
    return axios.post(`${params.base_url}/order/cancelRefund`, data)
  },
  confirmReceipt (data) {
    // 确认收货
    return axios.post(`${params.base_url}/order/confirmReceipt`, data)
  },
  addUserInteract (data) {
    // 添加用户评论
    return axios.post(`${params.base_url}/interact/addUserInteract`, data)
  },
  addUserInteractGoods (data) {
    // 添加用户评论对商品
    return axios.post(`${params.base_url}/interact/addUserInteractGoods`, data)
  },
  transferForWeChatAudit (data) {
    // 我的-用户余额\佣金提现申请
    return axios.put(`${params.base_url}/personal/transferForWeChatAudit`, data)
  },
  getQueryLogistics (data) {
    // 查询订单发货信息
    return axios.get(`${params.base_url}/order/queryLogistics`, {params: data})
  },
  getQueryLogisticsById (data) {
    // 查询物流信息
    return axios.get(`${params.base_url}/order/queryLogisticsById`, {params: data})
  }
}
