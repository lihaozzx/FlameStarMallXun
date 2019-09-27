<template>
    <div v-if="shopList.length > 0" class="OrderDetail">
      <TopNav name="订单详情"></TopNav>
      <div class="order-bg-box">
        <div class="order-bg">
          <div class="left">
            <div class="name">{{getStatusName(shopList.length > 0 && shopList[0].latestStatus)}}</div>
            <div v-if="isUnpaid" class="time">{{payTimeFormat}} 后取消订单</div>
          </div>
          <img v-if="isUnpaid" class="right" src="../../assets/order/ic_clock.png" alt="">
          <img v-else-if="isUnsend" class="right" src="../../assets/order/ic_box.png" alt="">
          <img v-else-if="isUntake" class="right" src="../../assets/order/ic_truck.png" alt="">
          <img v-else-if="isUnevaluation" class="right" src="../../assets/order/ic_comment.png" alt="">
          <img v-else-if="isCancel" class="right" src="../../assets/order/ic_cancel.png" alt="">
          <img v-else-if="isComplete" class="right" src="../../assets/order/ic_done.png" alt="">
          <img v-else class="right" src="../../assets/order/ic_refund.png" alt="">
        </div>
      </div>
      <div style="padding-left: 0.3rem;background: #fff">
        <QualityCertification></QualityCertification>
      </div>
      <div @click="goLogistics" v-if="showLogistics">
        <div v-if="shopList[0].orderLogisticsDetailList && shopList[0].orderLogisticsDetailList.length > 1" class="logistics">
          <img class="car" src="../../assets/order/ic_logistics.png" alt="">
          <div class="content">
            该订单已拆成{{shopList[0].orderLogisticsDetailList && shopList[0].orderLogisticsDetailList.length}}个包裹发出，点击查看具体物
            流详情
          </div>
        </div>
        <div v-else class="logistics">
          <img class="car" src="../../assets/order/ic_logistics.png" alt="">
          <div class="content">
            {{shopList[0].orderLogisticsDetail && shopList[0].orderLogisticsDetail.logisticsDto && shopList[0].orderLogisticsDetail.logisticsDto.list[shopList[0].orderLogisticsDetail.logisticsDto.list.length - 1].remark}}
          </div>
        </div>
      </div>
      <div
        v-for="(shop, index) in shopList"
        :key="index"
        class="goods-card">
        <div @click="goStoreDetail(shop.storeId)" class="shop-header">
          <div style="display: flex;align-items: center">
            <img class="img" src="../../assets/home/ic_store.png" alt="">
            <div class="name">{{shop.storeName}}</div>
            <div class="ziyin" >自营</div>
          </div>
          <van-icon class="arrow" name="arrow"></van-icon>
        </div>
        <div
          v-for="(item, index2) in shop.orderGoodsDetail"
          :key="index2"
        >
          <div class="goods-box">
            <img class="goods-img" :src="item.imageUrl" alt="">
            <div>
              <div class="goods-top">
                <div class="name">{{item.goodsName}}</div>
                <div class="price"><span style="font-size: 0.24rem">￥</span>{{item.price}}</div>
              </div>
              <div class="goods-bottom">
                <div class="spec">{{item.specDesc}}</div>
                <div class="number">x{{item.quantity}}</div>
              </div>
            </div>
          </div>
          <div class="goods-line">
            <div>商品总价</div>
            <div class="goods-line-color">￥{{item.goodsTotalPrice}}</div>
          </div>
          <div class="goods-line">
            <div>运费(快递)</div>
            <div class="goods-line-color">{{item.expressFee ? '￥' + item.expressFee : '包邮'}}</div>
          </div>
          <div v-if="item.period" class="goods-line">
            <div>分期返现</div>
            <div class="goods-line-color">{{item.period + '期返现共返'}} <span style="color: #FF2644">{{item.cashBack}}</span>元</div>
          </div>
        </div>
      </div>
      <div class="payment">
        <div class="left">实际付款</div>
        <div class="right"><span class="symbol">￥</span>{{getTruePrice(shopList)}}</div>
      </div>
      <div class="orderInfo">
        <div class="title">
          <div class="icon"></div>
          <div class="name">订单信息</div>
        </div>
        <div v-if="paymentAccount(this.shopList[0].latestStatus) && shopList[0].transStatementDetail" class="one-line">
          <div class="left">付款账户</div>
          <div class="right">{{shopList[0].transStatementDetail.paymentAccount === 1 ? '平台账户' : '微信账户'}}</div>
        </div>
        <div class="one-line">
          <div class="left">订单编号</div>
          <div class="right">{{shopList[0].orderNumber}}</div>
        </div>
        <div
          v-for="(item, index) in orderTimeList"
          :key="index"
          class="one-line">
          <template v-if="item.status === 1">
            <div class="left">创建时间</div>
            <div class="right">{{item.statusTime | dateFormat1}}</div>
          </template>
          <template v-if="item.status === 2">
            <div class="left">支付时间</div>
            <div class="right">{{item.statusTime | dateFormat1}}</div>
          </template>
          <template v-if="item.status === 4">
            <div class="left">发货时间</div>
            <div class="right">{{item.statusTime | dateFormat1}}</div>
          </template>
          <template v-if="item.status === 12">
            <div class="left">完成时间</div>
            <div class="right">{{item.statusTime | dateFormat1}}</div>
          </template>
          <template v-if="item.status === 6">
            <div class="left">完成时间</div>
            <div class="right">{{item.statusTime | dateFormat1}}</div>
          </template>
          <template v-if="item.status === 8">
            <div class="left">完成时间</div>
            <div class="right">{{item.statusTime | dateFormat1}}</div>
          </template>
          <template v-if="item.status === 10">
            <div class="left">完成时间</div>
            <div class="right">{{item.statusTime | dateFormat1}}</div>
          </template>
          <template v-if="item.status === 11">
            <div class="left">完成时间</div>
            <div class="right">{{item.statusTime | dateFormat1}}</div>
          </template>
        </div>
        <!--<div class="one-line">-->
          <!--<div class="left">支付时间</div>-->
          <!--<div class="right">{{shopList[0].orderTimeDetail[0].statusTime}}</div>-->
        <!--</div>-->
        <template v-if="shopList[0].orderTimeRefundDetail.length > 0">
          <div class="title">
            <div class="icon"></div>
            <div class="name">退款信息</div>
          </div>
          <div class="one-line">
            <div class="left">退款金额</div>
            <div class="right">￥{{shopList[0].refundAmount}}</div>
          </div>
          <div class="one-line">
            <div class="left">申请时间</div>
            <div class="right">{{getapplyTime | dateFormat1}}</div>
          </div>
          <div class="one-line">
            <div class="left">退款理由</div>
            <div v-if="shopList[0].orderTimeRefundDetail.filter((item) => item.status === 7).length > 0" class="right">{{shopList[0].orderTimeRefundDetail.filter((item) => item.status === 7)[0].desc}}</div>
            <div v-else-if="shopList[0].orderTimeRefundDetail.filter((item) => item.status === 8).length > 0" class="right">{{shopList[0].orderTimeRefundDetail.filter((item) => item.status === 8)[0].desc}}</div>
          </div>
          <div class="one-line">
            <div class="left">处理时间</div>
            <div class="right">{{getDealTime  | dateFormat1}}</div>
          </div>
          <div v-if="shopList[0].orderTimeRefundDetail.filter((item) => item.status === 11).length > 0"  class="one-line">
            <div class="left">商家回复</div>
            <div class="right">{{shopList[0].orderTimeRefundDetail.filter((item) => item.status === 11)[0].desc}}</div>
          </div>
        </template>
      </div>
      <div class="bottom-btn">
        <div v-if="showCancel(shopList[0].latestStatus)" class="cancel" @click="goCancel">取消订单</div>
        <div v-if="showRefund(shopList[0].latestStatus)" class="pay-hui" @click="goRefund">退款</div>
        <div v-if="shopList.length > 0 && shopList[0].isCashBack" class="back" @click="goBack">分期返现</div>
        <div v-if="showPay(shopList[0].latestStatus)" class="pay" @click="goPay">立即付款</div>
        <div v-if="showConfirm(shopList[0].latestStatus)" class="pay" @click="goConfirm">确认收货</div>
        <div v-if="showEvaluation(shopList[0].latestStatus)" class="pay" @click="goEvaluation">去评价</div>
        <div class="pay" @click="goEvaluation">去评价</div>
        <div v-if="showCancelRefund(shopList[0].latestStatus)" class="pay" @click="goCancelRefund">取消退款</div>
      </div>

      <MyDialog
        :show="cancelDailog"
        title="取消订单"
        :selectList="cancelList"
        @confirm="cancelConfirm"
        @close="closeDialog"
      >

      </MyDialog>
      <MyDialog
        :show="confirmDailog"
        title="提示"
        tips="确认收货？"
        @confirm="confirmTake"
        @close="closeDialog"
      >

      </MyDialog>

      <MyDialog
        :show="evaluationdDailog"
        evaluationd
        title="商品评价"
        @confirm="confirmEvaluationd"
        @close="closeDialog"
      >

      </MyDialog>
      <MyDialog
        :show="refundDailog"
        title="申请退款"
        :selectList="refundList"
        tips="提示：申请退款前请与商家电话沟通后在进行申请，将减少商家拒绝申请退款概率"
        @confirm="refundConfirm"
        @close="closeDialog"
      >
      </MyDialog>
      <MyDialog
        :show="cancelRefundDailog"
        title="提示"
        tips="是否取消当前订单退款申请？"
        @confirm="cancelRefundConfirm"
        @close="closeDialog"
      >

      </MyDialog>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import MyDialog from '@/components/MyDialog'
import QualityCertification from '@/components/QualityCertification'
import orderApi from '@/api/order'
import _ from 'lodash'
export default {
  name: 'OrderDetail',
  components: {
    TopNav,
    QualityCertification,
    MyDialog
  },
  data () {
    return {
      payTimeFormat: '',
      goodsInfo: {},
      shopList: [], // 店铺列表
      orderGoodsBo: [], // 订单数组
      orderTimeList: [],
      cancelDailog: false,
      confirmDailog: false,
      refundDailog: false,
      evaluationdDailog: false,
      cancelRefundDailog: false,
      cancelList: ['我不想买了', '填写错误，重拍', '卖家缺货', '其他原因'],
      refundList: ['质量问题', '长时间未发货', '我不想买了', '其他原因']
    }
  },
  created () {
    this.queryOrder()
  },
  methods: {
    closeDialog () {
      this.confirmDailog = false
      this.cancelDailog = false
      this.evaluationdDailog = false
      this.refundDailog = false
      this.cancelRefundDailog = false
    },
    goStoreDetail (id) {
      this.$router.push({name: 'ShopDetail', params: {id: id}})
    },
    goCancel () {
      this.cancelDailog = true
    },
    goBack () {
      this.$router.push({name: 'BackDetail', params: {id: this.$route.params.orderId}})
    },
    goPay (item) {
      const orderInfo = {
        createTime: this.shopList[0].transStatementDetail.createTime,
        id: this.shopList[0].transStatementDetail.transId,
        paymentAmount: this.shopList[0].transStatementDetail.orderAmount,
        orderId: this.shopList[0].transStatementDetail.orderId
      }
      this.$router.push({name: 'Pay', params: {orderInfo: encodeURIComponent(JSON.stringify(orderInfo))}})
    },
    goConfirm (item) {
      this.confirmDailog = true
    },
    goEvaluation (item) {
      this.$router.replace({name: 'Evaluation', params: {orderId: this.$route.params.orderId}})
    },
    confirmEvaluationd (data) {
      let data2 = {}
      if (data.content) {
        data2 = {
          orderId: this.$route.params.orderId,
          score: data.score,
          content: data.content,
          action: 1
        }
      } else {
        data2 = {
          orderId: this.$route.params.orderId,
          score: data.score,
          action: 1
        }
      }
      orderApi.addUserInteract(data2).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.evaluationdDailog = false
          this.$router.go(-1)
          // this.$router.push({name: 'OrderList', params: {active: 3}})
        } else {
          this.$toast(res.data.message)
          this.evaluationdDailog = true
        }
      })
    },
    goCancelRefund (item) {
      this.cancelRefundDailog = true
    },
    cancelRefundConfirm (selectDesc) {
      const data = {
        orderId: this.$route.params.orderId
      }
      orderApi.cancelRefund(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.cancelRefundDailog = false
          this.$router.go(-1)
          // this.$router.push({name: 'OrderList', params: {active: 4}})
        } else {
          this.$toast(res.data.message)
          this.cancelRefundDailog = true
        }
      })
    },
    goRefund (item) {
      this.refundDailog = true
    },
    refundConfirm (selectDesc) {
      console.log(selectDesc)
      const data = {
        orderId: this.$route.params.orderId,
        desc: selectDesc
      }
      orderApi.applyRefund(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.refundDailog = false
          this.$router.go(-1)
          // this.$router.push({name: 'OrderList', params: {active: 8}})
        } else {
          this.$toast(res.data.message)
          this.refundDailog = true
        }
      })
    },
    confirmTake () {
      const data = {
        orderId: this.$route.params.orderId
      }
      orderApi.confirmReceipt(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.cancelDailog = false
          this.$router.go(-1)
          // this.$router.push({name: 'OrderList', params: {active: 2}})
        } else {
          this.$toast(res.data.message)
          this.cancelDailog = true
        }
      })
    },
    cancelConfirm (selectDesc) {
      const data = {
        orderId: this.$route.params.orderId,
        desc: selectDesc
      }
      orderApi.cancelOrder(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.cancelDailog = false
          this.$router.go(-1)
          // this.$router.push({name: 'OrderList', params: {active: 1}})
        } else {
          this.$toast(res.data.message)
          this.cancelDailog = true
        }
      })
    },
    getStatusName (v) {
      const val = v + ''
      switch (val) {
        case '1':
          return '待支付'
        case '2':
          return '待发货'
        case '3':
          return '待使用'
        case '4':
          return '待收货'
        case '5':
          return '待评价'
        case '6':
          return '已完成'
        case '7':
          return '待发货-退款中'
        case '8':
          return '待评价-退款中'
        case '9':
          return '取消退款'
        case '10':
          return '退款成功'
        case '11':
          return '退款失败'
        case '12':
          return '已取消'
      }
    },
    getTruePrice (arr) {
      let TruePrice = null
      arr.forEach(v => {
        TruePrice += v.orderAmount
      })
      return TruePrice
    },
    queryOrder () {
      const data = {
        orderId: this.$route.params.orderId
      }
      orderApi.getQueryOrder(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.shopList.push(res.data.content)
          if (res.data.content.latestStatus === '1' || res.data.content.latestStatus === 1) {
            this.getPayTime()
          }
          let arr = _.cloneDeep(this.shopList[0].orderTimeDetail)
          arr.forEach((v, i) => {
            if (v.status === 8 || v.status === 9 || v.status === 5) {
              arr.splice(i, 1)
            }
          })
          this.orderTimeList = arr.reverse()
        } else {
          this.$toast(res.data.message)
        }
      })
    },
    // onSubmit () {
    //   if (this.goodsInfo.goodsId) {
    //     const data = {
    //       goodsId: this.goodsInfo.goodsId,
    //       stockId: this.goodsInfo.stockId,
    //       cashBackId: this.goodsInfo.cashBackId,
    //       quantity: this.goodsInfo.quantity,
    //       userAddressBookId: 71
    //     }
    //     orderApi.postAddOrderByGoods(data).then(res => {
    //       if (res.data.messageCode === 'MSG_1001') {
    //         this.$router.push({name: 'Pay', params: {orderInfo: encodeURIComponent(JSON.stringify(res.data.content))}})
    //       } else {
    //         this.$toast(res.data.message)
    //       }
    //     })
    //   } else if (this.goodsInfo.cardIds) {
    //     // 购物车过来的多个商品
    //     const data = {
    //       cardIds: this.goodsInfo.cardIds,
    //       userAddressBookId: 71
    //     }
    //     orderApi.postAddOrderByCart(data).then(res => {
    //       if (res.data.messageCode === 'MSG_1001') {
    //         this.$router.push({name: 'Pay', params: {orderInfo: encodeURIComponent(JSON.stringify(res.data.content))}})
    //       } else {
    //         this.$toast(res.data.message)
    //       }
    //     })
    //   }
    // },
    getPayTime () {
      console.log('dds')
      if (!this.shopList[0].transStatementDetail) {
        return
      }
      console.log(this.shopList)
      let endTime = this.shopList[0].transStatementDetail.createTime + 15 * 60 * 1000
      let clientTime = new Date()
      let lastTime = (endTime - clientTime) / 1000
      console.log(lastTime)
      let interval2 = setInterval(() => {
        if (lastTime > 0) {
          lastTime--
          let minuteTime = parseInt(lastTime / 60)
          let secondTime = parseInt(lastTime % 60)
          let xiaoTime = parseInt(lastTime / 3600)
          if (xiaoTime <10) {
            xiaoTime = '0' + xiaoTime
          }
          this.payTimeFormat = `${xiaoTime}:${minuteTime}:${secondTime}`
        } else {
          clearInterval(interval2)
          this.payTimeFormat = ''
          this.$router.go(-1)
          // this.$router.replace({name: 'OrderList', params: {active: 1}})
        }
      }, 1000)
    },
    showBack (v) {
      const arr = [1, 4, 5, 6, 8, 10, 12]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    paymentAccount (v) {
      const arr = [2, 4, 5, 12]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showCancel (v) {
      const arr = [1]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showPay (v) {
      const arr = [1]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showConfirm (v) {
      const arr = [4]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showRefund (v) {
      const arr = [2, 5, 11]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showEvaluation (v) {
      const arr = [5]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showCancelRefund (v) {
      const arr = [7, 8]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    goLogistics () {
      this.$router.push({name: 'Logistics', params: {orderId: this.$route.params.orderId}})
    }
  },
  computed: {
    getapplyTime () {
      let statusTime
      // shopList[0].orderTimeRefundDetail[0].statusTime | dateFormat1
      this.shopList[0].orderTimeRefundDetail.forEach((v, i) => {
        if (v.status === 7 || v.status === 8) {
          statusTime = v.statusTime
        }
      })
      return statusTime
    },
    getDealTime () {
      let statusTime
      // shopList[0].orderTimeRefundDetail[0].statusTime | dateFormat1
      this.shopList[0].orderTimeRefundDetail.forEach((v, i) => {
        if (v.status === 10 || v.status === 11 || v.status === 12) {
          statusTime = v.statusTime
        }
      })
      return statusTime
    },
    isUnpaid () {
      return this.shopList[0].latestStatus === 1
    },
    isUnsend () {
      return this.shopList[0].latestStatus === 2
    },
    isUntake () {
      return this.shopList[0].latestStatus === 4
    },
    isUnevaluation () {
      return this.shopList[0].latestStatus === 5
    },
    isComplete () {
      return this.shopList[0].latestStatus === 6
    },
    isCancel () {
      return this.shopList[0].latestStatus === 12
    },
    showLogistics () {
      return this.shopList[0].orderLogisticsDetail && this.shopList[0].orderLogisticsDetail.logisticsDto && this.shopList[0].orderLogisticsDetail && this.shopList[0].orderLogisticsDetail.logisticsDto.list.length > 0
      // const arr = [4, 5, 11]
      // if (arr.indexOf(this.shopList[0].latestStatus) !== -1) {
      //   return true
      // } else {
      //   return false
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
  .OrderDetail {
    height: 100%;
    background: #f4f4f4;
    .order-bg-box {
      width:100%;
      height:1.6rem;
      background: #fff;
      padding-top: 0.3rem;
      .order-bg {
        margin: 0 0.3rem 0 0.3rem;
        width:6.9rem;
        height:1.6rem;
        background:linear-gradient(-65deg,rgba(255,141,18,1) 0%,rgba(255,170,77,1) 100%);
        border-radius:0.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          margin-left: 0.51rem;
          .name {
            font-size:0.34rem;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:rgba(255,255,255,1);
          }
          .time {
            font-size:0.28rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(255,255,255,1);
          }
        }
        .right {
          margin-right: 0.38rem;
          display: block;
          width: 1rem;
          height: 1rem;
        }
      }
    }
    .logistics {
      margin-top: 0.2rem;
      display: flex;
      align-items: center;
      height:1.38rem;
      background:rgba(255,255,255,1);
      .car {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        margin-right: 0.14rem;
        margin-left: 0.23rem;
      }
      .content {
        width:5.7rem;
        overflow: hidden;
        height: 55px;
        font-size:0.28rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:0.36rem;
        table-layout: fixed;
        word-break: break-all;
      }
    }
    .goods-card {
      margin-top: 0.2rem;
      /*padding: 0 0.3rem;*/
      background:#f4f4f4;
      .shop-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
          /*width: 10rem;*/
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
        .arrow {
          text-align: right;
          width: 10%;
          font-size:0.4rem;
          font-weight:500;
          color:#999999;
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
          /*align-items: center;*/
          justify-content: space-between;
          /*margin-bottom: 0.2rem;*/
          width: 5.3rem;
          .name {
            height: 0.8rem;
            line-height: normal;
            width:3.3rem;
            font-size:0.28rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /* ! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
          }
          .price {
            font-size:0.32rem;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:#999999;
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
            color:#999999;
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
        color:#999;
        /*padding-bottom: 0.2rem;*/
        .goods-line-color {
          color: #666;
        }
      }
    }
    .payment {
      padding: 0 0.3rem;
      margin-top: 0.2rem;
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
        color:#999;
      }
      .right {
        font-size:0.3rem;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:#E33A59;
        color:rgba(227,58,89,1);
        .symbol {
          font-size:0.24rem;
        }
      }
    }
    .orderInfo {
      margin-top: 0.2rem;
      margin-bottom: 1.5rem;
      background: #fff;
      padding-left: 0.3rem;
      .title {
        display: flex;
        padding-top: 0.2rem;
        margin-bottom: 0.2rem;
        .icon {
          margin-right:0.2rem;
          width:0.06rem;
          height:0.3rem;
          background:rgba(227,181,74,1);
          border-radius:0.03rem;
        }
        .name {
          line-height: 0.3rem;
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
      }
      .one-line {
        padding: 0.1rem 0;
        display: flex;
        justify-content: space-between;
        .left {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(153,153,153,1);
        }
        .right {
          margin-right: 0.3rem;
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(102,102,102,1);
        }
      }
    }
    .bottom-btn {
      margin-top: 0.2rem;
      width: 100%;
      position: fixed;
      bottom: 0;
      display: flex;
      .cancel {
        flex: 1;
        text-align: center;
        line-height: 1rem;
        /*width:2.2rem;*/
        height:1rem;
        background:rgba(255,255,255,1);
        font-size:0.32rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
      }
      .back {
        flex: 1;
        text-align: center;
        line-height: 1rem;
        /*width:2.2rem;*/
        height:1rem;
        background:rgba(255,168,188,1);
        font-size:0.32rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      .pay {
        flex: 1;
        text-align: center;
        line-height: 1rem;
        /*width:3.1rem;*/
        height:1rem;
        background:rgba(255,81,122,1);
        font-size:0.32rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      .pay-hui {
        flex: 1;
        text-align: center;
        line-height: 1rem;
        /*width:3.1rem;*/
        height:1rem;
        background:rgba(255,255,255,1);
        font-size:0.32rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
    }
  }
</style>
