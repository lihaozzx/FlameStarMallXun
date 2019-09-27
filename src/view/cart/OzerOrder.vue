<template>
    <div class="order-bg">
      <TopNav name="提交详情"></TopNav>
      <div style="background: #fff; padding-left: 0.2rem">
        <QualityCertification></QualityCertification>
      </div>
      <div @click="goSelectAddress" class="address-container van-hairline--top">
        <div class="address">
          <div class="name">
            {{addressInfo.receiverName}} &nbsp {{addressInfo.mobileNumber}}
          </div>
          <div class="address-detail">
            {{addressInfo.provinceName}}省{{addressInfo.cityName}}市{{addressInfo.districtName}}{{addressInfo.detailedAddress}}
          </div>
        </div>
        <img class="img" src="../../assets/home/search_more_n.png" alt="">
      </div>
      <div class="payment">
        <div class="left">实际付款</div>
        <div class="right"><span class="symbol">￥</span>{{goodsItem.orgPrice}}</div>
      </div>
      <van-submit-bar
        label="合计金额："
        :price="goodsItem.orgPrice * 100"
        button-text="提交订单"
        @submit="onSubmit"
      ></van-submit-bar>
      <van-popup v-model="show" position="bottom" overlay>
        <div class="address-pop">
          <div class="title">选择地址</div>
          <div
            v-for="(item, index) in addressList"
            @click="selectAddress(item)"
            :key="index"
            class="one-line">
            <div class="top">
              <div class="name">{{item.receiverName}}</div>
              <div class="phone">{{item.mobileNumber}}</div>
              <img v-show="index === 0" src="../../assets/order/moren_bqian_n.png" class="icon" alt="">
            </div>
            <div class="address">
              {{addressInfo.provinceName}}省{{addressInfo.cityName}}市{{addressInfo.districtName}}{{addressInfo.detailedAddress}}
            </div>
          </div>
        </div>
      </van-popup>
      <van-dialog
        closeOnClickOverlay
        v-model="focusShow"
        :showConfirmButton="false"
      >
       <div class="focus-dialog">
         <div class="title">说明</div>
         <div class="tips">
           关注以下公众后获取公众号内验证码并且在下方输
           入后即可获得0元购，并且平台将赠送返现作为奖
           励给您。
         </div>
         <img src="../../assets/order/public_qr_code.jpg" alt="">
         <van-field
           type="number"
           v-model="code"
           label-class="qr_label"
           placeholder="请输入6位数字"
           label="二维码："
         >
         </van-field>
         <van-button @click="onSave" class="saveBtn" size="large" round type="warning">完成</van-button>
       </div>
      </van-dialog>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import homeApi from '@/api/home'
import mineApi from '@/api/mine'
import orderApi from '@/api/order'
import QualityCertification from '@/components/QualityCertification'
import wxApi from '@/api/wx'
export default {
  name: 'OzerOrder',
  components: {
    TopNav,
    QualityCertification
  },
  data () {
    return {
      focusShow: false,
      show: false,
      code: '',
      goodsInfo: {},
      addressInfo: {},
      addressList: [],
      goodsItem: {},
      orderGoodsBo: [] // 订单数组
    }
  },
  created () {
    this.getCheckGoods()
    this.getAddress()
  },
  methods: {
    onSave () {
      const data = {
        code: this.code
      }
      wxApi.weChatCheckCode(data).then(res => {
        console.log(res)
        if (res.data.messageCode === 'MSG_1001') {
          this.focusShow = false
          this.onSubmit()
        }
      })
    },
    selectAddress (item) {
      console.log(item)
      const data = {
        receiverName: item.receiverName,
        mobileNumber: item.mobileNumber,
        detailedAddress: item.detailedAddress,
        districtId: item.id,
        isDefault: 1
      }
      mineApi.updateAddressInfo(data).then(res => {
        console.log(res)
        if (res.data.messageCode === 'MSG_1001') {
          this.show = false
          this.getAddress()
        }
      })
    },
    goSelectAddress () {
      this.show = true
      // this.$router.push({name: 'Address'})
    },
    getAddress () {
      mineApi.getAddressInfo().then(res => {
        this.addressInfo = res.data.content[0]
        this.addressList = res.data.content
        console.log(this.addressInfo)
      })
    },
    getTruePrice (arr) {
      let TruePrice = null
      arr.forEach(v => {
        TruePrice += v.order.orderAmount
      })
      return TruePrice
    },
    getCheckGoods () {
      this.goodsInfo = JSON.parse(decodeURIComponent(this.$route.params.goodsInfo))
      orderApi.postCheckGoods(this.goodsInfo).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.shopList.push(res.data.content)
        } else {
          this.$toast(res.data.message)
        }
      })
    },
    onSubmit () {
      console.log(this.$route.params)
      const data = {
        goodsId: this.$route.params.goodsInfo.goodsId,
        userAddressBookId: this.addressInfo.id
      }
      homeApi.freeShoppingPlaceOrder(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          if (res.data.content.status === 3) {
            this.focusShow = true
          } else if (res.data.content.status === 2) {
            this.$toast('需要先分享')
          } else if (res.data.content.status === 1) {
            this.$router.replace({name: 'Pay', params: {orderInfo: encodeURIComponent(JSON.stringify(res.data.content.transStatement))}})
          } else {
            this.$toast(res.data.message)
          }
          // this.goodsDetail = res.data.content.goodsItem
          // this.goodsImgList = res.data.content && res.data.content.goodsItem.imageUrls
        } else {
          this.$toast(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-bg {
    min-height: 12.5rem;
    height: 100%;
    background: #f4f4f4;
    .address-container {
      background: #fff;
      display: flex;
      padding: 0.3rem;
      .address {
        width:5.95rem;
        background:rgba(255,255,255,1);
        .name {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
        .address-detail {
          margin-top: 0.1rem;
          font-size:0.26rem;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:0.36rem;
        }
      }
      .img {
        margin-top: 0.2rem;
        display: block;
        width: 0.56rem;
        height: 0.56rem;
      }
    }
    .goods-card {
      margin-top: 0.32rem;
      /*padding: 0 0.3rem;*/
      background:#f4f4f4;
      .shop-header {
        display: flex;
        align-items: center;
        background: #fff;
        padding: 0 0.3rem 0 0.3rem;
        /*width:750px;*/
        height:0.74rem;
        /*padding-bottom: 0.1rem;*/
        .img {
          margin-right: 0.13rem;
          width: 0.32rem;
          height: 0.32rem;
          display: block;
        }
        .name {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
        .ziyin {
          text-align: center;
          width:0.7rem;
          height:0.28rem;
          line-height: 0.28rem;
          background:rgba(255,81,122,1);
          border-radius:0.14rem;
          font-size:0.2rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(255,255,255,1);
          margin-top: 0.06rem;
          margin-left: 0.13rem;
        }
      }
      .goods-box {
        height:1.6rem;
        display: flex;
        background: #fff;
        padding: 0.2rem 0.3rem 0.1rem 0.3rem;
        border-bottom: 1px #E7E7E7 solid;
        .goods-img {
          width:1.2rem;
          height:1.2rem;
          margin-right: 0.3rem;
          background:rgba(241,241,241,1);
          border-radius:0.08rem;
        }
        .goods-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.2rem;
          width: 5.3rem;
          .name {
            width:3.3rem;
            font-size:0.28rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .price {
            font-size:0.24rem;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
        }
        .goods-bottom {
          display: flex;
          justify-content: space-between;
          width: 5.3rem;
          .spec {
            font-size:0.24rem;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
          }
          .number {
            font-size:0.24rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
        }
      }
      .goods-line {
        background: #fff;
        padding: 0.1rem 0.3rem 0.2rem 0.3rem;
        display: flex;
        justify-content: space-between;
        font-size:0.28rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        /*padding-bottom: 0.2rem;*/
      }
    }
    .payment {
      padding: 0 0.3rem;
      margin-top: 0.2rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height:0.8rem;
      background:rgba(255,255,255,1);
      font-size:30px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      .left {
        font-size:0.3rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      .right {
        font-size:0.3rem;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(227,58,89,1);
        .symbol {
          font-size:0.24rem;
        }
      }
    }
    .address-pop {
      .title {
        padding: 0.4rem 0;
        text-align: center;
        font-size:0.34rem;
        border-bottom: 0.01rem solid #f4f4f4;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(34,34,34,1);
      }
      .one-line {
        border-bottom: 0.01rem solid #f4f4f4;
        margin-top: 0.2rem;
        padding-left: 0.2rem;
        /*height:1.68rem;*/
        background:rgba(255,255,255,1);
        .top {
          margin-bottom: 0.2rem;
          display: flex;
          .name {
            margin-right: 0.24rem;
            font-size:0.28rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .phone {
            margin-right: 0.11rem;
            font-size:0.28rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .icon {
            width: 0.48rem;
            height: 0.28rem;
          }
        }
        .address {
          margin-bottom: 0.2rem;
          font-size:0.26rem;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:0.36rem;
        }
      }
    }
    .focus-dialog {
      padding: 0.5rem;
      .title {
        margin-bottom: 0.4rem;
        font-size:0.34rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      .tips {
        width:5.28rem;
        font-size:0.24rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(170,170,170,1);
        line-height:0.34rem;
      }
      img {
        margin: 0 auto;
        width: 3.32rem;
        height: 3.32rem;
        display: block;
      }
      .saveBtn {
        display: block;
        margin: 0.6rem auto;
        line-height: 0.8rem;
        width:4.4rem;
        height:0.76rem;
        background:rgba(255,141,18,1);
        border-radius:0.4rem;
      }
    }
  }

</style>
