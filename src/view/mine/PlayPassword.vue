<template>
 <div class="playPassword">
   <TopNav name="支付密码"></TopNav>
   <van-cell @click="passwordShow =true" title="修改密码" is-link></van-cell>
   <van-dialog
     :before-close="beforeClose"
     closeOnClickOverlay
     v-model="passwordShow"
     :showConfirmButton="false"
   >
     <div class="content">
       <div class="title">
         {{isOldPasword ? '修改密码' : '设置密码'}}
       </div>
       <div v-if="isOldPasword" class="item van-hairline--bottom">
         <van-field
           maxlength="6"
           v-model="passwordInfo.oldPassword"
           :error-message="oldPasswordErr"
           placeholder="请输入6位数字"
           type="password"
         >
           <div class="label" slot="label">旧密码：</div>
         </van-field>
       </div>
       <div class="item van-hairline--bottom">
         <van-field
           maxlength="6"
           v-model="passwordInfo.newPassword"
           :error-message="oldPasswordErr"
           placeholder="请输入6位数字"
           type="password"
         >
           <div class="label" slot="label">新密码：</div>
         </van-field>
       </div>
       <div class="item van-hairline--bottom">
         <van-field
           maxlength="6"
           v-model="passwordInfo.retypedNewPassword"
           :error-message="oldPasswordErr"
           placeholder="请输入6位数字"
           type="password"
         >
           <div class="label" slot="label">再次输入密码：</div>
         </van-field>
       </div>
       <div v-if="isOldPasword" @click="forget" class="forget">忘记密码？</div>
       <div @click="upPaymentPassword" class="confirm">确定</div>
     </div>

     <!--<div class="tips">所充值的金额将进入您的账户余额</div>-->
     <!--<van-button @click="addMoneyConfirm" class="addMoneyConfirm">确认充值</van-button>-->
   </van-dialog>
 </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import mineApi from '@/api/mine'
export default {
  name: 'PlayPassword',
  components: {
    TopNav
  },
  data () {
    return {
      isOldPasword: false, // 为true代表设置过密码
      passwordShow: false,
      oldPasswordErr: '',
      passwordInfo: {
        oldPassword: '',
        newPassword: null,
        retypedNewPassword: null,
        mode: 1
      }
    }
  },
  created () {
    this.getPaymentPasswordStatus()
  },
  methods: {
    beforeClose (action, done) {
      this.passwordInfo = {
        oldPassword: '',
        newPassword: null,
        retypedNewPassword: null,
        mode: 1
      }
      done()
    },
    getPaymentPasswordStatus () {
      mineApi.getPaymentPasswordStatus().then(res => {
        if (res.data.content === 1) {
          this.isOldPasword = true
          localStorage.setItem('payPasword', true)
        }
      })
    },
    upPaymentPassword () {
      if (this.isOldPasword) {
        if (!(this.passwordInfo.oldPassword && this.passwordInfo.oldPassword.length === 6)) {
          this.$toast('请输入6位数旧密码')
          return
        }
        if (this.passwordInfo.oldPassword.replace(/[^\d]/g, '') !== this.passwordInfo.oldPassword) {
          this.$toast('密码只能是数字')
          return
        }
        // if (this.passwordInfo.oldPassword.replace(/D/g,'')) {
        //
        // }
        this.passwordInfo.mode = 2
      } else {
        this.passwordInfo.mode = 1
      }
      if (!(this.passwordInfo.newPassword && this.passwordInfo.newPassword.length === 6)) {
        this.$toast('请输入6位数新密码')
        return
      }
      if (this.passwordInfo.newPassword.replace(/[^\d]/g, '') !== this.passwordInfo.newPassword) {
        this.$toast('新密码只能是数字')
        return
      }
      if (!(this.passwordInfo.retypedNewPassword && this.passwordInfo.retypedNewPassword.length === 6)) {
        this.$toast('请再次输入6位数密码')
        return
      }
      if (this.passwordInfo.retypedNewPassword.replace(/[^\d]/g, '') !== this.passwordInfo.retypedNewPassword) {
        this.$toast('确认密码只能是数字')
        return
      }
      mineApi.upPaymentPassword(this.passwordInfo).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.$toast('修改成功')
          this.passwordShow = false
          this.passwordInfo = {
            oldPassword: '',
            newPassword: null,
            retypedNewPassword: null,
            mode: 1
          }
          this.getPaymentPasswordStatus()
        } else {
          this.$toast(res.data.message)
          this.passwordInfo = {
            oldPassword: '',
            newPassword: null,
            retypedNewPassword: null,
            mode: 1
          }
          // this.$notify(res.data.message)
        }
      })
    },
    forget () {
      this.$router.push({name: 'ForgetPw'})
    }
  }
}
</script>

<style lang="scss">
  .playPassword {
    height: 13.34rem;
    background: #F4F4F4;
    .content {
      /*width:4.4rem;*/
      height:6rem;
      padding: 0.54rem 0.5rem;
      background:rgba(255,255,255,1);
      border-radius:0.24rem;
      .van-field__label {
        max-width: 3rem;
      }
      .title {
        font-size:0.34rem;
        margin-bottom: 0.2rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      .item {
        /*margin-top: 0.2rem;*/
        margin: 0.2rem auto;
        width: 100%;
        display: block;
        background: red;
        .label {
          width: 2rem;
          height:0.26rem;
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
      }
      .forget {
        float: right;
        margin-top: 0.2rem;
        font-size:0.24rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(60,138,255,1);
      }
      .confirm {
        position: absolute;
        bottom: 0.93rem;
        left: 1.04rem;
        text-align: center;
        line-height: 0.76rem;
        width:4.4rem;
        height:0.76rem;
        background:rgba(255,141,18,1);
        border-radius:0.38rem;
        font-size:0.32rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
    }
  }
</style>
