<template>
  <div class="upLicense">
    <TopNav name="商家入驻"></TopNav>
    <van-cell title="三、上传营业执照"></van-cell>
    <van-uploader :after-read="onRead">
      <van-button class="up-btn" icon="photo" type="primary">
        <img v-if="merchantsinfo.businessLicenseUrl" :src="merchantsinfo.businessLicenseUrl" ref="goodsImg" alt="">
        <img v-else src="../../assets/mine/entering_add_photo.png" ref="goodsImg" alt="">
      </van-button>
    </van-uploader>
    <div class="tips">
      建议尺寸690*440，只需上传一张
    </div>
    <van-button @click="onSave" class="saveBtn" size="large" round type="warning">提交申请</van-button>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import * as types from '@/store/mutation-types'
import loginApi from '@/api/login'
export default {
  name: 'UpLicense',
  components: {
    TopNav
  },
  data () {
    return {
      sendBtn: '获取验证码',
      codeSend: false,
      countDown: 60,
      merchantsinfo: {
        businessLicense: {},
        businessLicenseUrl: ''
      }
    }
  },
  created () {
    if (this.$store.state.user.merchants) {
      this.merchantsinfo = this.$store.state.user.merchants
    }
    console.log(this.merchantsinfo)
  },
  methods: {
    onRead (file, detail) {
      console.log(file)
      this.$refs.goodsImg.src = file.content
      this.merchantsinfo.businessLicense = file.file
      this.merchantsinfo.businessLicenseUrl = file.content
    },
    onSave () {
      console.log(this.merchantsinfo)
      this.$store.commit(types.SET_MERCHANTS, this.merchantsinfo)
      this.$router.push({name: 'UpLicense'})
      if (this.$store.state.user.merchants) {
        this.merchantsinfo = this.$store.state.user.merchants
      }
      console.log(this.merchantsinfo)
    }
  }
}
</script>

<style lang="scss" scoped>
  .upLicense {
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
    .up-btn {
      border-color: #f4f4f4;
      width:6.9rem;
      height:4.4rem;
      margin: 0.5rem 0.3rem 0.3rem 0.3rem;
      background:rgba(231,231,231,1);
      border-radius:0.28rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .tips {
      margin-left: 0.3rem;
      font-size:0.24rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
  }
</style>
