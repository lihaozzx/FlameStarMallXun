import axios from 'axios'
import params from '../conf/params'
export default {
  postVerificationCode (data) {
    // 得到验证码
    return axios.post(`${params.base_url}/captcha/send`, data)
  },
  postLogin (data) {
    // 登录
    return axios.post(`${params.base_url}/account/login`, data)
  }
}
