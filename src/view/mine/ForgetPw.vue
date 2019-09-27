<template>
    <div class="forgetPw">
      <TopNav name="支付密码"></TopNav>
      <van-cell-group>
        <van-field
          type="number"
          v-model="pwInfo.mobileNumber"
          label="手机号："
          placeholder="必须同微信绑定的手机号"
        ></van-field>
        <van-field
          type="number"
          v-model="pwInfo.captcha"
          label="验证码："
          placeholder="请输入验证码"
        >
          <van-button :disabled="codeSend" @click="getCode" class="btn" slot="button" size="small">{{sendBtn}}</van-button>
        </van-field>
        <van-field
          maxlength="6"
          type="password"
          v-model="pwInfo.newPassword"
          label="新密码："
          placeholder="请输入6位数字"
        ></van-field>
        <van-field
          maxlength="6"
          type="password"
          v-model="pwInfo.retypedNewPassword"
          label="确认密码："
          placeholder="请输入6位数字"
        ></van-field>
      </van-cell-group>
      <van-button @click="resetPw" class="loginBtn">保存</van-button>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import mineApi from '@/api/mine'
import loginApi from '@/api/login'
export default {
  name: 'ForgetPw',
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
        captcha: '',
        newPassword: '',
        retypedNewPassword: ''
      }
    }
  },
  methods: {
    resetPw () {
      if (!this.isPoneAvailable(this.pwInfo.mobileNumber)) {
        this.$toast('请输入正确的手机号')
        return
      }
      if (!this.pwInfo.captcha) {
        this.$toast('请输入验证码')
        return
      }
      if (this.pwInfo.newPassword.length < 6) {
        this.$toast('请输入6位数新密码')
        return
      }
      if (this.pwInfo.newPassword.replace(/[^\d]/g, '') !== this.pwInfo.newPassword) {
        this.$toast('新密码只能是数字')
        return
      }
      if (this.pwInfo.retypedNewPassword.length < 6) {
        this.$toast('请输入6位数确认密码')
        return
      }
      if (this.pwInfo.retypedNewPassword.replace(/[^\d]/g, '') !== this.pwInfo.retypedNewPassword) {
        this.$toast('确认密码只能是数字')
        return
      }
      mineApi.resetPaymentPassword(this.pwInfo).then(res => {
        console.log(res.data.content)
        if (res.data.messageCode === 'MSG_1001') {
          this.$toast('成功')
          this.$router.go(-1)
        } else {
          this.$toast(res.data.message)
        }
      })
    },
    isPoneAvailable (phone) {
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!myreg.test(phone)) {
        return false
      } else {
        return true
      }
    },
    getCode () {
      if (!this.pwInfo.mobileNumber) {
        this.$toast('请输入手机号')
        return
      } else if (!this.isPoneAvailable(this.pwInfo.mobileNumber)) {
        this.$toast('请输入正确的手机号')
        return
      }
      const request = {
        'mobileNumber': this.pwInfo.mobileNumber,
        'business': 2
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
    }
  }
}
</script>

<style lang="scss" scoped>
.forgetPw {
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
    margin: 0 auto;
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
