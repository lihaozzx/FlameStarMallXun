<template>
    <div class="merchantsRegisterNext">
      <TopNav name="商家入驻"></TopNav>
      <van-cell title="一、店铺信息"></van-cell>
      <van-field
        v-model="merchantsinfo.storeName"
        label="店铺名称："
      >
      </van-field>
      <van-cell @click="goAddress" title="店铺位置" is-link></van-cell>
      <van-cell @click="goDiscount" title="预计平均折扣" is-link>
        {{merchantsinfo.rebate}}
      </van-cell>
      <van-field
        v-model="merchantsinfo.mobile"
        label="商家联系方式："
      >
        <van-button :disabled="codeSend" @click="getCode" class="btn" slot="button" size="small">{{sendBtn}}</van-button>
      </van-field>
      <van-field
        v-model="merchantsinfo.code"
        label="验证码："
      >
      </van-field>
      <van-button @click="onSave" class="saveBtn" size="large" round type="warning">下一步</van-button>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import * as types from '@/store/mutation-types'
import loginApi from '@/api/login'
export default {
  name: 'MerchantsRegisterNext',
  components: {
    TopNav
  },
  data () {
    return {
      sendBtn: '获取验证码',
      codeSend: false,
      countDown: 60,
      merchantsinfo: {
        storeName: '',
        mobile: '',
        code: ''
      }
    }
  },
  created () {
    if (this.$store.state.user.merchants) {
      this.merchantsinfo = this.$store.state.user.merchants
    }
  },
  methods: {
    onSave () {
      console.log(this.merchantsinfo)
      this.$store.commit(types.SET_MERCHANTS, this.merchantsinfo)
      this.$router.push({name: 'UpLicense'})
      // if (this.$store.state.user.merchants) {
      //   this.merchantsinfo = this.$store.state.user.merchants
      // }
      // console.log(this.merchantsinfo)
    },
    goDiscount () {
      this.$router.push({name: 'Discount'})
    },
    goAddress () {
      this.$router.push({name: 'MerchantsAddress'})
    },
    getCode () {
      const request = {
        'mobileNumber': this.pwInfo.mobileNumber,
        'business': 3
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
.merchantsRegisterNext {
  height: 13.34rem;
  background: #f4f4f4;
  .saveBtn {
    display: block;
    margin: 0.6rem auto;
    line-height: 0.8rem;
    width:6.9rem;
    height:0.8rem;
    background:rgba(255,141,18,1);
    border-radius:0.4rem;
  }
}
</style>
