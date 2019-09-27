import axios from 'axios'
import params from '../conf/params'
export default {
  addShoppingCart (data) {
    // 添加购物车
    return axios.post(`${params.base_url}/cart/addShoppingCart`, data)
  },
  getCartCount () {
    // 购物车商品数量
    return axios.get(`${params.base_url}/cart/count`)
  },
  queryShoppingCart (data) {
    // 查询购物车列表
    return axios.get(`${params.base_url}/cart/queryShoppingCart`, {params: data})
  },
  deleteById (data) {
    // 根据ID删除购物车商品
    return axios.delete(`${params.base_url}/cart/deleteById`, {params: data})
  },
  updateShoppingCart (data) {
    // 修改购物车商品数量
    return axios.post(`${params.base_url}/cart/updateShoppingCart`, data)
  },
  payment (data) {
    // 执行支付
    return axios.post(`${params.base_url}/payment/pay`, data)
  }
}
