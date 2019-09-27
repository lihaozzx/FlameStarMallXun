<template>
  <div class="login-container">
    <img
      @click="close"
      class="img"
      src="../../assets/account/login_close.png"
      alt=""
    >
    <div class="title">登录/注册</div>
    <van-field
      type="number"
      @blur="phoneBlur"
      maxlength="11"
      v-model.number="search.phone"
      :error-message="phoneErr"
      placeholder="请输入手机号"
    >
      <img
        class="icon"
        slot="left-icon"
        src="../../assets/account/login_phone.png"
        alt=""
      >
    </van-field>
    <van-field
      type="number"
      class="margin-top50"
      v-model.number="search.inviterCode"
      placeholder="请输入邀请码（可不填）"
    >
      <img
        class="icon"
        slot="left-icon"
        src="../../assets/account/inviterCode.png"
        alt=""
      >
    </van-field>
    <van-field
      type="number"
      v-model="search.code"
      class="margin-top50"
      center
      clearable
      placeholder="请输入验证码"
      @keydown.enter="login"
    >
      <img
        class="icon"
        slot="left-icon"
        src="../../assets/account/login_code.png"
        alt=""
      >
      <van-button
        :disabled="codeSend"
        @click="getCode"
        class="btn"
        slot="button"
        size="small"
        type="primary"
      >{{sendBtn}}</van-button>
    </van-field>
    <van-button
      @click="login"
      class="loginBtn"
    >登录</van-button>
    <div class="agree">
      <span>已阅读并同意</span>
      <router-link
        tag="span"
        :to="{name:'Protocol'}"
        class="cc"
      >注册协议</router-link>
    </div>

  </div>
</template>

<script>
import loginApi from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      codeSend: false,
      sendBtn: '获取验证码',
      phoneErr: '',
      countDown: 60,
      search: {
        phone: '',
        code: '',
        inviterCode: ''
      }
    }
  },
  created() {
    this.search.inviterCode = this.$store.state.user.sheInviterCode
  },
  methods: {
    setCookie(cname, cvalue, exdays) {
      let d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      let expires = 'expires=' + d.toGMTString()
      console.log(expires)
      document.cookie = cname + '=' + cvalue + ';' + expires
    },
    close() {
      this.$router.push({ name: 'Nav' })
    },
    isPoneAvailable(phone) {
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!myreg.test(phone)) {
        return false
      } else {
        return true
      }
    },
    getCode() {
      if (!this.search.phone) {
        this.$toast('请输入手机号')
        return
      } else if (!this.isPoneAvailable(this.search.phone)) {
        this.$toast('请输入正确的手机号')
        return
      }
      const request = {
        'mobileNumber': this.search.phone,
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
    login() {
      const data = {
        mobileNumber: this.search.phone,
        inviterCode: this.search.inviterCode,
        captcha: this.search.code,
        source: 3
      }
      if (!this.search.phone) {
        this.$toast('请输入手机号');
        return;
      } else if (!this.isPoneAvailable(this.search.phone)) {
        this.$toast('请输入正确的手机号');
        return;
      }
      if (!this.search.code) {
        this.$toast('请输入验证码');
        return;
      }
      loginApi.postLogin(data).then(req => {
        if (req.data.content && req.data.content.userId) {
          this.setCookie('token', req.headers.token, 1);
          localStorage.setItem('myInviterCode', req.data.content.inviterCode);
          // localStorage.setItem('token', req.headers.token)

          let referrer = sessionStorage.getItem('referrer');
          if (referrer != null) {
            this.$router.push(referrer);
            sessionStorage.removeItem('referrer');
          } else {
            this.$router.push({ name: 'Nav' });
          }
        } else {
          this.$toast(req.data.message);
        }
        // this.$router.push({name: 'Nav'})
      })
    },
    phoneBlur() {
      if (this.search.phone === '') {
        this.phoneErr = '请输入手机号'
      } else {
        this.phoneErr = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background: #fff;
  padding: 0.6rem;
  .margin-top50 {
    margin-top: 0.5rem;
  }
  .img {
    width: 0.48rem;
    height: 0.48rem;
    display: block;
  }
  .title {
    margin-top: 0.7rem;
    margin-bottom: 1.5rem;
    font-size: 0.56rem;
    font-family: PingFang-SC-Heavy;
    font-weight: 800;
    color: rgba(51, 51, 51, 1);
  }
  .icon {
    width: 0.52rem;
    height: 0.52rem;
    display: block;
  }
  .btn {
    background: #fff;
    border: none;
    font-size: 0.26rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 141, 18, 1);
  }
  .loginBtn {
    width: 6.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background: rgba(255, 81, 122, 1);
    border-radius: 0.4rem;
    font-size: 0.32rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .agree {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 0.14rem;
    margin-top: 1.2rem;
    .cc {
      color: #3c8aff;
      cursor: pointer;
    }
  }
}
</style>
