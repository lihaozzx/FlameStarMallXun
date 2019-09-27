import axios from 'axios'
import params from '../conf/params'
import Qs from 'qs'
export default {
  getPaymentPasswordStatus () {
    // 是否设置过支付密码
    return axios.get(`${params.base_url}/account/paymentPassword/status`)
  },
  upPaymentPassword (data) {
    // 设置或修改支付密码
    return axios.post(`${params.base_url}/account/paymentPassword`, data)
  },
  resetPaymentPassword (data) {
    // 重置支付密码
    return axios.post(`${params.base_url}/account/paymentPassword/reset`, data)
  },
  queryBaseData () {
    // 获取个人资料
    return axios.post(`${params.base_url}/personal/queryBaseData`)
  },
  modifyBaseData (data) {
    // 修改个人资料
    // axios({
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   url: `${params.base_url}/personal/modifyBaseData`,
    //   data: data
    //   // transformRequest: [function (data) {
    //   //   // 对 data 进行任意转换处理
    //   //   return JSON.stringify(data)
    //   // }]
    // })
    return axios.post(`${params.base_url}/personal/modifyBaseData`, data)
  },
  getMyInfo () {
    // 我的-首页基础信息
    return axios.get(`${params.base_url}/personal/dashboard`)
  },
  getBalanceDetails (data) {
    // 我的-余额\佣金明细
    return axios.get(`${params.base_url}/personal/balanceDetails`, {params: data})
  },
  transferForWeChatAudit (data) {
    // 我的-用户余额\佣金提现申请
    return axios.post(`${params.base_url}//personal/transferAudit`, data)
  },
  getAddressInfo () {
    // 我的-地址信息（第一个为默认地址）
    return axios.get(`${params.base_url}/personal/addressInfo`)
  },
  updateAddressInfo (data) {
    // 我的-地址-添加\修改地址(传入Id做修改操作)
    return axios.post(`${params.base_url}/personal/updateAddressInfo`, data)
  },
  getCityData (data) {
    // 查询城市数据（不传参数返回所有省、直辖市信息）
    return axios.get(`${params.base_url}/personal/cityData`, {params: data})
  },
  getFollowers (data) {
    // 查询团队成员
    return axios.get(`${params.base_url}/personal/followers`, {params: data})
  },
  getMyMember () {
    // 我的-会员页面
    return axios.get(`${params.base_url}/personal/myMember`)
  },
  openMember () {
    // 我的-会员开通（开发阶段用）
    return axios.get(`${params.base_url}/personal/openMember`)
  },
  deleteAddress (data) {
    // 删除地址簿的信息
    return axios.delete(`${params.base_url}/personal/deleteAddress`, {params: data})
  },
  getMerchantBusinessList () {
    // 获取商户行业分类列表
    return axios.get(`${params.base_url}/merchant/getMerchantBusinessList`)
  },
  merchantRegister (data) {
    // 获取个人资料
    return axios.post(`${params.base_url}/merchant/register`, data)
  },
  getContact () {
    // 获取商户行业分类列表
    return axios.get(`${params.base_url}/contact`)
  },
  sortAddressByIds (data) {
    // 修改地址簿排序
    return axios.post(`${params.base_url}/personal/sortAddressByIds`, data)
  }
}
