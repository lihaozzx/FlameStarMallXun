<template>
    <div class="UserSwitch">
      <TopNav name="账户切换"></TopNav>
      <van-field
        type="number"
        v-model="pwInfo.mobileNumber"
        label="手机号："
        placeholder="请输入手机号"
      ></van-field>
      <van-field
        type="number"
        v-model="pwInfo.captcha"
        label="验证码："
        placeholder="请输入验证码"
      >
        <van-button :disabled="codeSend" @click="getCode" class="btn" slot="button" size="small">{{sendBtn}}</van-button>
      </van-field>
      <van-button @click="login" class="loginBtn">登录</van-button>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import loginApi from '@/api/login'
export default {
  name: 'UserSwitch',
  components: {
    TopNav
  },
  data () {
    return {
      sendBtn: '获取验证码',
      codeSend: false,
      countDown: 60,
      pwInfo: {
        mobileNumber: '',
        captcha: ''
      }
    }
  },
  methods: {
    getCode () {
      const request = {
        'mobileNumber': this.pwInfo.mobileNumber,
        'business': 1
      }
      loginApi.postVerificationCode(request).then(req => {
        this.codeSend = true
        this.sendBtn = this.countDown + 's后再次获取'
        let interval = setInterval(() => {
          if (this.countDown > 0) {
            this.countDown--
            this.sendBtn = this.countDown + 's后再次获取'
          } else {
            this.codeSend = false
            this.sendBtn = '重新发送'
            clearInterval(interval)
            this.countDown = 60
          }
        }, 1000)
      })
    },
    setCookie (cname, cvalue, exdays) {
      let d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      let expires = 'expires=' + d.toGMTString()
      document.cookie = cname + '=' + cvalue + ';' + expires
    },
    login () {
      console.log(document.cookie)
      const cookie = document.cookie.split('token=')[1]
      console.log(cookie)
      localStorage.setItem('cookie', cookie)
      this.setCookie('token', '', -1)
      const data = {
        mobileNumber: this.pwInfo.mobileNumber,
        inviterCode: '',
        captcha: this.pwInfo.captcha,
        source: 3
      }
      loginApi.postLogin(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.setCookie('token', res.headers.token, 1)
          localStorage.setItem('myInviterCode', res.data.content.inviterCode)
          this.$router.push({name: 'Nav'})
        } else {
          this.$toast(res.data.message)
          this.setCookie('token', localStorage.getItem('cookie'), 1)
          localStorage.removeItem('cookie')
        }
        // this.$router.push({name: 'Nav'})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.UserSwitch {
  height:13.34rem;
  /*height: 100%;*/
  background:rgba(244,244,244,1);
  .btn {
    /*width:1.37rem;*/
    /*height:0.26rem;*/
    font-size:0.28rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(60,138,255,1);
    border: none;
  }
  .loginBtn {
    margin: 0.7rem auto;
    display: block;
    width:6.9rem;
    height:0.76rem;
    line-height: 0.76rem;
    background:rgba(255,141,18,1);
    border-radius:0.38rem;
    font-size:0.32rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
}
</style>
