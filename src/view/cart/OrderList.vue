<template>
  <div class="OrderList">
    <TopNav
      :special="$route.params.active"
      name="我的订单"
    ></TopNav>
    <van-tabs
      title-active-color="#FF8D12"
      color="#FF8D12"
      v-model="active"
      animated
    >
      <van-tab
        v-for="(item2, index) in tabList"
        :title="item2"
        :key="index"
      >
        <div
          class="empty-div"
          v-if="tabContentList.length === 0"
        >
          <div class="empty-img">
            <img
              src="../../assets/order/ic_order_no.png"
              alt=""
            >
          </div>
          <div class="empty-text">您还没有任何订单呢~</div>
        </div>
        <div
          class="order-box"
          v-for="(item, i) in tabContentList"
          :key="i"
          @click="goOrderDetail(item.id)"
        >
          <div class="order-header">
            <div class="name">
              <img
                class="img"
                src="../../assets/home/ic_store.png"
                alt=""
              >
              <div class="font">{{item.storeName}}</div>
            </div>
            <div class="status">{{getStatusName(item.latestStatus)}}</div>
          </div>
          <div
            v-for="(goods, i) in item.orderGoodsDetail"
            :key="i"
            class="order-content"
          >
            <img
              :src="goods.imageUrl"
              alt=""
            >
            <div class="content">
              <div class="top-box">
                <div class="name-box">
                  <div
                    v-if="goods.goodsTagItem.length > 0 && goods.goodsTagItem[0].tag"
                    class="ziyin"
                  >自营</div>
                  <div class="name">{{goods.goodsName}}</div>
                </div>
                <div class="price"><span style="font-size: 0.24rem">￥</span>{{goods.price}}</div>
              </div>
              <div class="bottom-box">
                <div class="model">{{goods.specDesc}}</div>
                <div class="num">x {{goods.quantity}}</div>
              </div>
            </div>
          </div>
          <div class="order-total">
            <div class="number">共{{item.orderGoodsDetail.length}}件</div>
            <div class="total">合计:</div>
            <div class="price">￥</div>
            <div class="price2">{{item.orderAmount}}</div>
          </div>
          <div class="btn-box">
            <van-button
              v-if="item.isCashBack"
              @click.stop="goBack(item)"
              class="btn"
            >分期返现</van-button>
            <van-button
              v-if="showCancel(item.latestStatus)"
              @click.stop="goCancel(item)"
              class="btn"
            >取消订单</van-button>
            <van-button
              v-if="showPay(item.latestStatus)"
              @click.stop="goPay(item)"
              class="btn2"
            >付款</van-button>
            <van-button
              v-if="showConfirm(item.latestStatus)"
              @click.stop="goConfirm(item)"
              class="btn2"
            >确认收货</van-button>
            <van-button
              v-if="showRefund(item.latestStatus)"
              @click.stop="goRefund(item)"
              class="btn"
            >退款</van-button>
            <van-button
              v-if="showCancelRefund(item.latestStatus)"
              @click.stop="goCancelRefund(item)"
              class="btn"
            >取消退款</van-button>
            <van-button
              v-if="showEvaluation(item.latestStatus)"
              @click.stop="goEvaluation(item)"
              class="btn2"
            >去评价</van-button>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div v-show="tabContentList.length <= 2 || !tabContentList">
      <div class="product">
        <div class="line-div">
          <div class="line">

          </div>
          <div class="line2">

          </div>
        </div>
        <div class="title">
          更多好货
        </div>
        <div class="line-div">
          <div class="line">

          </div>
          <div class="line3">

          </div>
        </div>
      </div>
      <van-list
        class="quality-container"
        v-model="loading"
        :finished="finished"
        finished-text="已经到底啦"
        @load="onLoad"
      >
        <!--<div slot="loading">-->
        <!--加载自定义-->
        <!--</div>-->
        <div
          class="quality-item"
          v-for="(item, index2) in qualityList"
          :key="index2"
        >
          <div @click="checkGoodsDeil(item)">
            <img
              class="img"
              v-if="item.imageUrls[0]"
              :src="item.imageUrls[0]"
              alt=""
            >
            <img
              class="img"
              v-else
              src="../../assets/zhanw_tb_n.png"
              alt=""
            >
            <div class="content">
              <div class="name">
                <div
                  v-if="item.tags && item.tags[0] === 1"
                  class="icon"
                >
                  自营
                </div>
                {{item.name}}
              </div>
              <div class="price-container">
                <div class="price1">￥{{item.dctPrice}}</div>
                <div class="price2">{{item.orgPrice}}</div>
              </div>
              <div class="share">
                <div class="left">
                  返 <span style="color: #FF8D12">￥{{item.marketingCashBack.totalAmount}}</span>
                  返后价 <span style="color: #FF8D12">￥{{parseFloat((item.dctPrice - item.marketingCashBack.totalAmount).toFixed(2))}}</span>
                </div>
                <!--<img class="share-img" src="../../assets/home/pinzhi_list_share_icon@2x.png">-->
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <MyDialog
      :show="refundDailog"
      title="申请退款"
      :selectList="refundList"
      tips="提示：申请退款前请与商家电话沟通后再进行申请，将减少商家拒绝申请退款概率"
      @confirm="refundConfirm"
      @close="closeDialog"
    >
    </MyDialog>
    <MyDialog
      :show="cancelDailog"
      title="取消订单"
      :selectList="cancelList"
      @confirm="cancelConfirm"
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
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import MyDialog from '@/components/MyDialog'
import orderApi from '@/api/order'
import homeApi from '@/api/home'
export default {
  name: 'OrderList',
  components: {
    TopNav,
    MyDialog
  },
  data() {
    return {
      qualityList: [],
      latestStatus: 0,
      active: 0,
      tabList: ['全部订单', '待支付', '待收货', '待评价', '退款/售后'],
      tabContentList: [],
      pageNumber: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      refundDailog: false,
      cancelDailog: false,
      cancelRefundDailog: false,
      confirmDailog: false,
      evaluationdDailog: false,
      refundList: ['质量问题', '长时间未发货', '我不想买了', '其他原因'],
      cancelList: ['我不想买了', '填写错误，重拍', '卖家缺货', '其他原因'],
      orderId: ''
    }
  },
  created() {
    this.active = this.$route.params.active ? parseInt(this.$route.params.active) : 0
    this.init()
    this.getBestChoice()
  },
  methods: {
    checkGoodsDeil(item) {
      this.$router.push({ name: 'GoodsDetail', params: { id: item.id } })
    },
    onLoad() {
      let self = this
      setTimeout(() => {
        self.getBestChoice('pullUp')
      }, 100)
    },
    getBestChoice(type) {
      if (type === 'pullUp') {
        this.pageNumber++
        const data = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
        homeApi.getBestChoice(data).then(res => {
          let arr = res.data.content.items
          this.qualityList = this.qualityList.concat(arr)
          if (arr.length < this.pageSize) {
            this.finished = true // 不在触发接口
          }
          this.loading = false
          console.log(this.qualityList)
        })
      } else {
        const data = {
          pageNumber: 1,
          pageSize: this.pageSize
        }
        homeApi.getBestChoice(data).then(res => {
          this.qualityList = res.data.content.items
          this.loading = false
        })
      }
    },
    closeDialog() {
      this.refundDailog = false
      this.cancelDailog = false
      this.cancelRefundDailog = false
      this.confirmDailog = false
      this.evaluationdDailog = false
    },
    init() {
      if (this.active) {
        this.getOrderList(this.active)
      } else {
        this.getOrderList()
      }
    },
    refundConfirm(selectDesc) {
      console.log(selectDesc)
      const data = {
        orderId: this.orderId,
        desc: selectDesc
      }
      orderApi.applyRefund(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.refundDailog = false
          this.init()
        } else {
          this.$toast(res.data.message)
          this.refundDailog = true
        }
      })
    },
    cancelConfirm(selectDesc) {
      const data = {
        orderId: this.orderId,
        desc: selectDesc
      }
      orderApi.cancelOrder(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.cancelDailog = false
          this.init()
        } else {
          this.$toast(res.data.message)
          this.cancelDailog = true
        }
      })
    },
    cancelRefundConfirm(selectDesc) {
      const data = {
        orderId: this.orderId
      }
      orderApi.cancelRefund(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.cancelRefundDailog = false
          this.init()
        } else {
          this.$toast(res.data.message)
          this.cancelRefundDailog = true
        }
      })
    },
    confirmTake() {
      const data = {
        orderId: this.orderId
      }
      orderApi.confirmReceipt(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.confirmDailog = false
          this.init()
          // this.$router.push({name: 'OrderList', params: {active: 5}})
        } else {
          this.$toast(res.data.message)
          this.confirmDailog = true
        }
      })
    },
    confirmEvaluationd(data) {
      let data2 = {}
      if (data.content) {
        data2 = {
          orderId: this.orderId,
          score: data.score,
          content: data.content,
          action: 1
        }
      } else {
        data2 = {
          orderId: this.orderId,
          score: data.score,
          action: 1
        }
      }
      orderApi.addUserInteract(data2).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.evaluationdDailog = false
          this.init()
        } else {
          this.$toast(res.data.message)
          this.evaluationdDailog = true
        }
      })
    },
    goRefund(item) {
      this.orderId = item.id
      this.refundDailog = true
    },
    goConfirm(item) {
      this.orderId = item.id
      this.confirmDailog = true
    },
    goCancelRefund(item) {
      this.orderId = item.id
      this.cancelRefundDailog = true
    },
    goEvaluation(item) {
      this.orderId = item.id
      this.evaluationdDailog = true
    },
    goCancel(item) {
      this.orderId = item.id
      this.cancelDailog = true
    },
    goBack(item) {
      this.$router.push({ name: 'BackDetail', params: { id: item.id } })
    },
    goPay(item) {
      const orderInfo = {
        createTime: item.transStatementDetail.createTime,
        id: item.transStatementDetail.transId,
        paymentAmount: item.transStatementDetail.orderAmount,
        orderId: item.transStatementDetail.orderId
      }
      this.$router.push({ name: 'Pay', params: { orderInfo: encodeURIComponent(JSON.stringify(orderInfo)) } })
    },
    showBack(v) {
      const arr = [1, 2, 6, 10, 12]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showCancel(v) {
      const arr = [1]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showPay(v) {
      const arr = [1]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showConfirm(v) {
      const arr = [4]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showRefund(v) {
      const arr = [2, 5, 11]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showEvaluation(v) {
      const arr = [5]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    showCancelRefund(v) {
      const arr = [7, 8]
      if (arr.indexOf(v) !== -1) {
        return true
      } else {
        return false
      }
    },
    getOrderList(v = '') {
      if (v === '1' || v === 1) {
        v = '1'
      } else if (v === '2' || v === 2) {
        v = '2, 4'
      } else if (v === '3' || v === 3) {
        v = '5'
      } else if (v === '4' || v === 4) {
        v = '7,8,9,10,11'
      } else {
        v = null
      }
      const data = {
        pageNumber: 1,
        pageSize: 10,
        latestStatus: v
      }
      orderApi.getQueryOrderListByUserId(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.tabContentList = res.data.content.items
        }
      })
    },
    getStatusName(v) {
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
    goOrderDetail(id) {
      this.$router.push({ name: 'OrderDetail', params: { orderId: id } })
    }
  },
  watch: {
    active(v) {
      console.log(v)
      if (v === 0) {
        this.$router.replace({ name: 'OrderList', params: { active: v } })
        this.getOrderList()
      } else {
        this.$router.replace({ name: 'OrderList', params: { active: v } })
        this.getOrderList(v)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.OrderList {
  background: #f4f4f4;
  .product {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 0.8rem;
    background: rgba(244, 244, 244, 1);
    .line-div {
      margin-top: 0.3rem;
      .line {
        width: 1rem;
        height: 0.03rem;
        background: rgba(255, 141, 18, 1);
        border-radius: 1px;
      }
      .line2 {
        margin-top: 0.1rem;
        margin-left: 0.5rem;
        width: 0.5rem;
        height: 0.03rem;
        background: rgba(255, 141, 18, 1);
        border-radius: 1px;
      }
      .line3 {
        margin-top: 0.1rem;
        width: 0.5rem;
        height: 0.03rem;
        background: rgba(255, 141, 18, 1);
        border-radius: 1px;
      }
    }
    .title {
      margin: 0.1rem 0.2rem 0.2rem 0.2rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      font-size: 0.34rem;
    }
  }
  .quality-container {
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .quality-item {
      margin-bottom: 0.2rem;
      width: 3.48rem;
      /*height: 5rem;*/
      background: rgba(255, 255, 255, 1);
      border-radius: 0.08rem;

      .img {
        display: block;
        width: 3.48rem;
        height: 3.48rem;
        border-radius: 8px 8px 0 0;
      }

      .content {
        width: 3.48rem;
        /*height: 2.1rem;*/
        border-radius: 0 0 8px 8px;

        .name {
          padding-top: 0.17rem;
          padding-left: 0.17rem;
          font-size: 0.28rem;
          height: 0.78rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /* ! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          .icon {
            display: inline-block;
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
            margin-right: 0.13rem;
          }
        }

        .price-container {
          padding-top: 0.23rem;
          display: flex;
          justify-content: flex-start;

          .price1 {
            padding-left: 0.17rem;
            padding-right: 0.16rem;
            font-size: 0.24rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(227, 58, 89, 1);
          }

          .price2 {
            font-size: 0.24rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            text-decoration: line-through;
            color: rgba(153, 153, 153, 1);
          }
        }

        .share {
          padding-left: 0.17rem;
          padding-right: 0.17rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.2rem;
          .left {
            padding-left: 0.1rem;
            padding-right: 0.1rem;
            background: #fcf3ed;
            font-size: 0.24rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
          }

          .share-img {
            width: 0.44rem;
            height: 0.44rem;
          }
        }
      }
    }
  }
  .empty-div {
    text-align: center;
    /*height: 4.24rem;*/
    background: #ffffff;
    .empty-img {
      padding-top: 0.72rem;
      img {
        width: 2rem;
        height: 2rem;
        display: block;
        margin: 0 auto;
      }
    }
    .empty-text {
      margin-top: 0.3rem;
      font-size: 0.28rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      padding-bottom: 0.96rem;
    }
  }
  .order-box {
    margin-top: 0.2rem;
    .order-header {
      padding: 0 0.26rem;
      height: 0.8rem;
      background: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px #f4f4f4 solid;
      .name {
        display: flex;
        img {
          width: 0.32rem;
          height: 0.32rem;
          display: block;
          margin-right: 0.1rem;
        }
        .font {
          line-height: 0.3rem;
          font-size: 0.26rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
        }
      }
      .status {
        font-size: 0.26rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(227, 58, 89, 1);
      }
    }

    .order-content {
      /*height:1.8rem;*/
      background: rgba(255, 255, 255, 1);
      display: flex;
      padding: 0.2rem 0.3rem 0.4rem 0.45rem;
      border-bottom: 1px #f4f4f4 solid;
      img {
        width: 1.2rem;
        height: 1.2rem;
        display: block;
        margin-right: 0.3rem;
      }
      .content {
        .top-box {
          display: flex;
          justify-content: space-between;
          width: 5.3rem;
          .name-box {
            display: flex;
            align-items: center;
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
              margin-right: 0.13rem;
            }
            .name {
              width: 3.5rem;
              height: 0.6rem;
              line-height: 0.6rem;
              font-size: 0.28rem;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .price {
            font-size: 0.32rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: #999;
          }
        }
        .bottom-box {
          display: flex;
          justify-content: space-between;
          .model {
            font-size: 0.24rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
          .num {
            font-size: 0.28rem;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: #999;
          }
        }
      }
    }
    .order-total {
      padding: 0.14rem 0.4rem;
      background: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .number {
        margin-right: 0.31rem;
        font-size: 0.26rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }
      .total {
        margin-right: 0.1rem;
        font-size: 0.26rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }
      .price {
        font-size: 0.24rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .price2 {
        font-size: 0.32rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }
    .btn-box {
      width: 100%;
      height: 0.8rem;
      background: #fff;
      display: flex;
      justify-content: flex-end;
      .btn {
        width: 1.5rem;
        padding: 0;
        margin-right: 0.2rem;
        height: 0.56rem;
        line-height: 0.56rem;
        background: rgba(255, 255, 255, 1);
        border: 0.02rem solid rgba(153, 153, 153, 1);
        border-radius: 0.28rem;
        font-size: 0.26rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
      .btn2 {
        width: 1.5rem;
        padding: 0;
        margin-right: 0.2rem;
        height: 0.56rem;
        line-height: 0.56rem;
        background: rgba(255, 255, 255, 1);
        border: 0.02rem solid #ff517a;
        border-radius: 0.28rem;
        font-size: 0.26rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #ff517a;
      }
    }
  }
}
</style>
