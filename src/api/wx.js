import axios from 'axios'
import params from '../conf/params'
export default {
  weChatSharingTarget (data) {
    // 查询分享目标信息
    return axios.get(`${params.base_url}/weChat/sharing/target`, {params: data})
  },
  weChatSharingConfig (data) {
    // 获取分享权限验证信息（仅H5端适用）
    return axios.post(`${params.base_url}/weChat/sharing/config`, data)
  },
  wechatResult (data) {
    // 微信支付结果查询
    return axios.get(`${params.base_url}/payment/wechat/result`, {params: data})
  },
  weChatOnSuccess (data) {
    // 分享成功后置处理
    return axios.post(`${params.base_url}/weChat/sharing/onSuccess`, data)
  },
  weChatCheckCode (data) {
    // 校验微信公众号验证码
    return axios.post(`${params.base_url}/weChat/weChatCheckCode`, data)
  },
  weChatSnapshot (data) {
    // 校验微信公众号验证码
    return axios.get(`${params.base_url}/weChat/sharing/snapshot/target`, {params: data})
  }
}
