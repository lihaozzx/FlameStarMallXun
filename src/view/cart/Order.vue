<template>
  <div class="order-bg">
    <TopNav name="提交详情"></TopNav>
    <div style="background: #fff; padding-left: 0.2rem">
      <QualityCertification></QualityCertification>
    </div>
    <div
      v-if="addressInfo"
      @click="goSelectAddress"
      class="address-container van-hairline--top"
    >
      <div class="address">
        <div class="name">
          {{addressInfo.receiverName}} &nbsp; {{addressInfo.mobileNumber}}
        </div>
        <div class="address-detail">
          {{addressInfo.provinceName}}省{{addressInfo.cityName}}市{{addressInfo.districtName}}{{addressInfo.detailedAddress}}
        </div>
      </div>
      <img
        class="img"
        src="../../assets/home/search_more_n.png"
        alt=""
      >
    </div>
    <div
      v-else
      @click="goSelectAddress"
      class="address-container van-hairline--top"
    >
      <div class="font-box">
        <img
          class="font-img"
          src="../../assets/order/ic_location.png"
          alt=""
        >
        <div class="font">请添加收货地址</div>
      </div>
      <img
        class="img"
        src="../../assets/home/search_more_n.png"
        alt=""
      >
    </div>
    <div
      v-for="(shop, index) in shopList"
      :key="index"
      class="goods-card"
    >
      <div class="shop-header">
        <img
          class="img"
          src="../../assets/home/tuijian_pinzhi_icon@2x.png"
          alt=""
        >
        <div class="name">{{shop && shop.order && shop.order.storeName}}</div>
        <div
          class="ziyin"
          v-if="shop && shop.order && shop.order.channel === 1"
        >自营</div>
      </div>
      <div
        v-for="(item, index2) in shop.orderGoodsBo"
        :key="index2"
      >
        <div class="goods-box">
          <img
            class="goods-img"
            :src="item.orderGoods.imageUrl"
            alt=""
          >
          <div>
            <div class="goods-top">
              <div class="name">{{item.orderGoods.goodsName}}</div>
              <div class="price">{{item.orderGoods.price}}</div>
            </div>
            <div class="goods-bottom">
              <div class="spec">{{item.orderGoods.specDesc}}</div>
              <div class="number">x{{item.orderGoods.quantity}}</div>
            </div>
          </div>
        </div>
        <div class="goods-line">
          <div>商品总价</div>
          <div>￥{{item.orderGoods.goodsTotalPrice}}</div>
        </div>
        <div class="goods-line">
          <div>运费(快递)</div>
          <div>{{item.orderGoods.expressFee ? '￥' + item.orderGoods.expressFee : '包邮'}}</div>
        </div>
        <div
          v-if="item.orderGoods.period"
          class="goods-line"
        >
          <div>分期返现</div>
          <div>{{item.orderGoods.period + '期返现共返'}} <span style="color: #FF2644">{{item.orderGoods.cashBack}}</span>元</div>
        </div>
      </div>
    </div>
    <div class="payment">
      <div class="left">实际付款</div>
      <div class="right"><span class="symbol">￥</span>{{getTruePrice(shopList)}}</div>
    </div>
    <van-submit-bar
      label="合计金额："
      :price="getTruePrice(shopList) * 100"
      button-text="提交订单"
      @submit="onSubmit"
    ></van-submit-bar>
    <van-popup
      v-model="show"
      position="bottom"
      overlay
    >
      <div class="address-pop">
        <div class="title">选择地址</div>
        <div
          v-for="(item, index) in addressList"
          @click="selectAddress(item)"
          :key="index"
          class="one-line"
        >
          <div class="address-content van-hairline--bottom">
            <div class="good-img">{{item.receiverName && item.receiverName.split('')[0]}}</div>
            <div class="content-div">
              <div class="name-div">
                <div class="name">
                  {{item.receiverName}}
                </div>
                <div class="phone">
                  {{item.mobileNumber}}
                </div>
                <div
                  v-if="index === 0"
                  class="icon"
                >
                  默认
                </div>
              </div>
              <div class="address-div">
                {{item.provinceName}}省{{item.cityName}}市{{item.districtName}}{{item.detailedAddress}}
              </div>
            </div>
            <!--<img @click="onEdit(item, index)" class="edit" src="../../assets/mine/location_edit.png" alt="">-->
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
        <img
          src="../../assets/order/public_qr_code.jpg"
          alt=""
        >
        <van-field
          type="number"
          v-model="code"
          placeholder="请输入6位数字"
        >
          <div
            class="qr_label"
            slot="label"
          >公众号验证码：</div>
        </van-field>
        <van-button
          @click="onSave"
          class="saveBtn"
          size="large"
          round
          type="warning"
        >完成</van-button>
      </div>
    </van-dialog>
    <van-dialog
      title="提示"
      message="为了您账户余额安全，请您先设置账户支付密码哦！"
      closeOnClickOverlay
      v-model="setPay"
      show-cancel-button
      confirm-button-color="#FF517A"
      @confirm="$router.replace({name: 'PlayPassword'})"
    >
    </van-dialog>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import homeApi from '@/api/home'
import mineApi from '@/api/mine'
import QualityCertification from '@/components/QualityCertification'
import orderApi from '@/api/order'
import wxApi from '@/api/wx'
export default {
  name: 'Order',
  components: {
    TopNav,
    QualityCertification
  },
  data() {
    return {
      show: false,
      focusShow: false,
      setPay: false,
      isOldPasword: false,
      code: '',
      goodId: '',
      cashBack: '',
      goodsInfo: {},
      addressInfo: {},
      addressList: [],
      shopList: [], // 店铺列表
      orderGoodsBo: [], // 订单数组
      orderWaring: false//订单出问题
    }
  },
  created() {
    this.getCheckGoods()
    this.getAddress()
    this.getPaymentPasswordStatus()
  },
  destroyed() {
    localStorage.removeItem('selctAddress')
  },
  methods: {
    getPaymentPasswordStatus() {
      mineApi.getPaymentPasswordStatus().then(res => {
        if (res.data.content === 1) {
          this.isOldPasword = true
        }
      })
    },
    onSave() {
      const data = {
        code: this.code
      }
      wxApi.weChatCheckCode(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.focusShow = false
          this.freeShoppingPlaceOrder()
        } else {
          this.$toast(res.data.message)
        }
      })
    },
    selectAddress(item) {
      console.log(item)
      const data = {
        id: item.id,
        receiverName: item.receiverName,
        mobileNumber: item.mobileNumber,
        detailedAddress: item.detailedAddress,
        districtId: item.districtId,
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
    goSelectAddress() {
      if (this.addressList.length > 0) {
        // this.show = true
        localStorage.setItem('selctAddressShow', '1')
        console.log(localStorage.getItem('selctAddressShow'))
        this.$router.push({ name: 'Address' })
      } else {
        this.$router.push({ name: 'NewAddress' })
      }
    },
    getAddress() {
      mineApi.getAddressInfo().then(res => {
        this.addressInfo = res.data.content[0]
        this.addressList = res.data.content
        if (localStorage.getItem('selctAddress') && this.addressInfo) {
          const strToObj = JSON.parse(localStorage.getItem('selctAddress'))
          this.addressInfo = strToObj
          console.dir(this.addressInfo)
        }
      })
    },
    getTruePrice(arr) {
      let TruePrice = null
      arr.forEach(v => {
        TruePrice += v.order.orderAmount
      })
      return TruePrice
    },
    getCheckGoods() {
      this.goodsInfo = JSON.parse(decodeURIComponent(this.$route.params.goodsInfo));
      if (this.goodsInfo.goodsId || this.goodsInfo.activityGoodsId) {
        // 单个商品
        orderApi.postCheckGoods(this.goodsInfo).then(res => {
          if (res.data.messageCode === 'MSG_1001') {
            this.shopList.push(res.data.content);
            this.goodId = res.data.content.orderGoodsBo[0].orderGoods.goodsId;
            this.cashBack = res.data.content.orderGoodsBo[0].orderGoods.cashBack;
          } else {
            this.orderWaring = true;
            this.$toast(res.data.message);
          }
        })
      } else if (this.goodsInfo.cardIds) {
        // 购物车过来的多个商品
        console.log('多个')
        orderApi.postCheckCart(this.goodsInfo.cardIds).then(res => {
          if (res.data.messageCode === 'MSG_1001') {
            this.shopList = res.data.content
          } else {
            this.orderWaring = true;
            this.$toast(res.data.message)
          }
        })
      }
    },
    onSubmit() {
      if (!this.addressInfo) {
        this.$toast('请选择地址');
      }
      // if (!this.isOldPasword) {
      //   this.setPay = true
      //   return
      // }
<<<<<<< d44b6da78a792187b06bee3bc8acd4c79f0efb44
      if (this.goodsInfo.orderType == 3) {
=======
      if (this.orderWaring) return;
      if (this.goodsInfo.orderType == 3 || this.goodsInfo.orderType == 4) {
>>>>>>> 国庆节前发版1.0
        this.freeShoppingPlaceOrder();
        return;
      }
      if (this.goodsInfo.goodsId) {
        const data = {
          goodsId: this.goodsInfo.goodsId,
          stockId: this.goodsInfo.stockId,
          cashBackId: this.goodsInfo.cashBackId,
          quantity: this.goodsInfo.quantity,
          userAddressBookId: this.addressInfo.id
        }
        orderApi.postAddOrderByGoods(data).then(res => {
          if (res.data.messageCode === 'MSG_1001') {
            const data2 = res.data.content
            // data2.cashBack = this.cashBack
            data2.token = document.cookie.split('token=')[1]
            this.$router.replace({ name: 'Pay', params: { orderInfo: encodeURIComponent(JSON.stringify(data2)) } })
          } else {
            this.$toast(res.data.message)
          }
        })
      } else if (this.goodsInfo.cardIds) {
        // 购物车过来的多个商品
        const data = {
          cardIds: this.goodsInfo.cardIds,
          userAddressBookId: this.addressInfo.id
        }
        orderApi.postAddOrderByCart(data).then(res => {
          if (res.data.messageCode === 'MSG_1001') {
            this.$router.replace({ name: 'Pay', params: { orderInfo: encodeURIComponent(JSON.stringify(res.data.content)) } })
          } else {
            this.$toast(res.data.message)
          }
        })
      }
    },
    freeShoppingPlaceOrder() {
      const data = {
        stockId: this.goodsInfo.stockId,
        userAddressBookId: this.addressInfo.id,
        type: this.goodsInfo.type
      }
      homeApi.freeShoppingPlaceOrder(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          if (res.data.content.status === 3) {
            this.focusShow = true
          } else if (res.data.content.status === 2) {
            this.$toast('需要先分享')
          } else if (res.data.content.status === 1) {
            // if (this.isOldPasword) {
            let u = navigator.userAgent
            // Android终端
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
            // iOS终端
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
            const data = res.data.content.transStatement
            data.cashBack = this.cashBack
            if (isiOS) {
              if (window.webkit && window.webkit.messageHandlers.goLogin) {
                window.webkit.messageHandlers.pay.postMessage(data.id)
              } else {
                this.$router.replace({ name: 'Pay', params: { orderInfo: encodeURIComponent(JSON.stringify(data)) } })
              }
            } else if (isAndroid) {
              if (window.wv) {
                wv.pay(data.id, this.goodsInfo.orderType);
              } else {
                this.$router.replace({ name: 'Pay', params: { orderInfo: encodeURIComponent(JSON.stringify(data)) } })
              }
            }
            // } else {
            //   this.setPay = true
            // }
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
    align-items: center;
    justify-content: space-between;
    .font-box {
      display: flex;
      .font {
        margin-right: 2rem;
        font-size: 0.28rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 0.36rem;
      }
      .font-img {
        margin-right: 0.2rem;
        display: block;
        width: 0.25rem;
        height: 0.33rem;
      }
    }
    .address {
      width: 5.95rem;
      background: rgba(255, 255, 255, 1);
      .name {
        font-size: 0.28rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .address-detail {
        margin-top: 0.1rem;
        font-size: 0.26rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 0.36rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* ! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
      }
    }
    .img {
      /*margin-top: 0.2rem;*/
      float: right;
      display: block;
      width: 0.56rem;
      height: 0.56rem;
    }
  }
  .goods-card {
    margin-top: 0.32rem;
    /*padding: 0 0.3rem;*/
    background: #f4f4f4;
    .shop-header {
      display: flex;
      align-items: center;
      background: #fff;
      padding: 0 0.3rem 0 0.3rem;
      /*width:750px;*/
      height: 0.74rem;
      /*padding-bottom: 0.1rem;*/
      .img {
        margin-right: 0.13rem;
        width: 0.32rem;
        height: 0.32rem;
        display: block;
      }
      .name {
        font-size: 0.28rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .ziyin {
        text-align: center;
        width: 0.7rem;
        height: 0.28rem;
        line-height: 0.28rem;
        background: rgba(255, 81, 122, 1);
        border-radius: 0.14rem;
        font-size: 0.2rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin-top: 0.06rem;
        margin-left: 0.13rem;
      }
    }
    .goods-box {
      height: 1.6rem;
      display: flex;
      background: #fff;
      padding: 0.2rem 0.3rem 0.1rem 0.3rem;
      border-bottom: 1px #e7e7e7 solid;
      .goods-img {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.3rem;
        background: rgba(241, 241, 241, 1);
        border-radius: 0.08rem;
      }
      .goods-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        width: 5.3rem;
        height: 0.8rem;
        overflow: hidden;
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /* ! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          width: 4.3rem;
          font-size: 0.28rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .price {
          font-size: 0.24rem;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
      .goods-bottom {
        display: flex;
        justify-content: space-between;
        width: 5.3rem;
        .spec {
          font-size: 0.24rem;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        .number {
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
    .goods-line {
      background: #fff;
      padding: 0.1rem 0.3rem 0.2rem 0.3rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.28rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
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
    height: 0.8rem;
    background: rgba(255, 255, 255, 1);
    font-size: 30px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    .left {
      font-size: 0.3rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .right {
      font-size: 0.3rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(227, 58, 89, 1);
      .symbol {
        font-size: 0.24rem;
      }
    }
  }
  .focus-dialog {
    padding: 0.5rem;
    .qr_label {
      width: 2rem;
    }
    .title {
      margin-bottom: 0.4rem;
      font-size: 0.34rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .tips {
      width: 5.28rem;
      font-size: 0.24rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(170, 170, 170, 1);
      line-height: 0.34rem;
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
      width: 4.4rem;
      height: 0.76rem;
      background: rgba(255, 141, 18, 1);
      border-radius: 0.4rem;
    }
  }
  .address-pop {
    .address-content {
      display: flex;
      align-items: center;
      width: 100%;
      height: 1.74rem;
      background: rgba(255, 255, 255, 1);
      .good-img {
        text-align: center;
        line-height: 0.64rem;
        width: 0.64rem;
        height: 0.64rem;
        background: rgba(170, 170, 170, 1);
        border-radius: 50%;
        margin-right: 0.24rem;
        margin-left: 0.3rem;
        font-size: 0.28rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .content-div {
        width: 4.9rem;
        .name-div {
          display: flex;
          align-items: center;
          .name {
            /*width:58px;*/
            /*height:28px;*/
            font-size: 0.3rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }
          .phone {
            /*width:194px;*/
            /*height:23px;*/
            margin-left: 0.1rem;
            font-size: 0.3rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }
          .icon {
            margin-left: 0.2rem;
            text-align: center;
            width: 0.76rem;
            height: 0.34rem;
            background: rgba(255, 246, 237, 1);
            border: 0.01rem solid rgba(255, 141, 18, 1);
            font-size: 0.24rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(255, 141, 18, 1);
          }
        }
        .address-div {
          margin-top: 0.1rem;
          width: 4.9rem;
          height: 0.7rem;
          font-size: 0.26rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 0.36rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /* ! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
        }
      }
      .edit {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        margin-left: 0.4rem;
      }
    }
    .title {
      padding: 0.4rem 0;
      text-align: center;
      font-size: 0.34rem;
      border-bottom: 0.01rem solid #f4f4f4;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(34, 34, 34, 1);
    }
    .one-line {
      border-bottom: 0.01rem solid #f4f4f4;
      margin-top: 0.2rem;
      padding-left: 0.2rem;
      /*height:1.68rem;*/
      background: rgba(255, 255, 255, 1);
      .top {
        margin-bottom: 0.2rem;
        display: flex;
        .name {
          margin-right: 0.24rem;
          font-size: 0.28rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .phone {
          margin-right: 0.11rem;
          font-size: 0.28rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .icon {
          width: 0.48rem;
          height: 0.28rem;
        }
      }
      .address {
        margin-bottom: 0.2rem;
        font-size: 0.26rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 0.36rem;
      }
    }
  }
}
</style>
