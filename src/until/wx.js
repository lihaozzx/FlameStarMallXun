import wx from 'weixin-js-sdk'// 微信sdk依赖
import wxApi from '@/api/wx'
import params from '@/conf/params'
const jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'updateAppMessageShareData']
// 要用到微信API
function getJSSDK (url, dataForWeixin, mode) {
  const data = {
    url: url
  }
  console.log(data)
  wxApi.weChatSharingConfig(data).then(res => {
    // alert(dataForWeixin.title)
    // alert(dataForWeixin.desc)
    // alert(params.testEnvironmentHost + dataForWeixin.linkurl)
    // alert(dataForWeixin.img)
    // console.log(params.testEnvironmentHost + dataForWeixin.linkurl)
    wx.config({
      debug: false,
      appId: res.data.content.appId,
      timestamp: res.data.content.timestamp,
      nonceStr: res.data.content.nonceStr,
      signature: res.data.content.signature,
      jsApiList: jsApiList // 必填，需要使用的JS接口列表
    })
    wx.ready(function () {
      // alert('ready')
      // wx.updateAppMessageShareData({
      //   title: dataForWeixin.title + 'dddd',
      //   desc: dataForWeixin.desc,
      //   link: params.testEnvironmentHost + dataForWeixin.linkurl,
      //   imgUrl: dataForWeixin.img,
      //   trigger: function trigger (res) { },
      //   success: function success (res) {
      //     console.log('已分享2')
      //     alert('分享成功2222')
      //   },
      //   cancel: function cancel (res) {
      //     alert('分享失败2222')
      //     console.log('已取消2')
      //   }
      // })
      wx.onMenuShareAppMessage({
        title: dataForWeixin.title,
        desc: dataForWeixin.desc,
        link: params.testEnvironmentHost + dataForWeixin.linkurl,
        imgUrl: dataForWeixin.img,
        trigger: function trigger (res) { },
        success: function success (res) {
          const data = {
            mode: mode
          }
          // alert(mode)
          wxApi.weChatOnSuccess(data).then(res => {
            // alert(res.data.content)
          })
        },
        cancel: function cancel (res) {
          // alert('分享取消3333')
        },
        fail: function fail (res) {
          // alert('分享失败3333')
        }
      })
      // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
      // wx.onMenuShareTimeline({
      //   title: dataForWeixin.title,
      //   link: dataForWeixin.linkurl,
      //   imgUrl: dataForWeixin.img,
      //   trigger: function trigger (res) {
      //     alert('用户点击分享到朋友圈');
      //   },
      //   success: function success (res) {
      //     // alert('已分享');
      //   },
      //   cancel: function cancel (res) {
      //     // alert('已取消');
      //   },
      //   fail: function fail (res) {
      //     alert(JSON.stringify(res))
      //   }
      // })
    })
    wx.error(function (res) {
      // alert('微信验证失败')
    })
  })
}
export default {
  // 获取JSSDK
  getJSSDK: getJSSDK
}
