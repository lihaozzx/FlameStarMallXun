<template>
    <div class="backDetail">
      <TopNav name="返现明细"></TopNav>
      <div
        v-for="(item, index) in backList"
        :key="index"
        class="back-item">
        <div class="back-title">
          <div class="icon"></div>
          <div class="name">商品返现</div>
        </div>
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
        <div v-if="item.period !== 0" class="tips">
          共分{{item.orderGoodsCashBackItem.length}}期返现，已返现{{item.returnedPeriod}}期，剩余返现金额为{{item.remainingCashReturn}}元
        </div>
        <div v-else class="tips">
          立即返现，剩余返现金额为{{item.remainingCashReturn}}元
        </div>
        <div
          v-for="(backItem, i) in item.orderGoodsCashBackItem"
          :key="i"
          class="tips-item">
          <div class="left">
            <template v-if="backItem.status === 1">
              <div v-if="item.orderGoodsCashBackItem.length > 1" class="name3">{{backItem.period}}/{{item.orderGoodsCashBackItem.length}}期</div>
              <div v-else class="name3">立即返</div>
              <div class="mes">{{backItem.returnTime | dateFormat1}}返现</div>
            </template>
            <template v-else>
              <div v-if="item.orderGoodsCashBackItem.length > 1" class="name">{{backItem.period}}/{{item.orderGoodsCashBackItem.length}}期</div>
              <div v-else class="name">立即返</div>
              <div class="mes">{{backItem.returnTime | dateFormat1}}返现</div>
            </template>
          </div>
          <div v-if="backItem.status === 1" class="center3">￥{{backItem.amount}}</div>
          <div v-else class="center">￥{{backItem.amount}}</div>
          <div v-if="backItem.status === 1" class="right">未返现</div>
          <div v-else-if="backItem.status === 2" class="right2">订单退款<br>终止返现</div>
          <div v-else class="right3">已返现</div>
        </div>
      </div>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import orderApi from '@/api/order'
export default {
  name: 'backDetail',
  components: {
    TopNav
  },
  data () {
    return {
      backList: []
    }
  },
  created () {
    this.getBackDetail()
  },
  methods: {
    getBackDetail () {
      const data = {
        orderId: this.$route.params.id
      }
      orderApi.grtQueryOrderCashBack(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.backList = res.data.content
        } else {

        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .backDetail {
    background: #f4f4f4;
    .back-item {
      background: #fff;
      .back-title {
        height:0.72rem;
        display: flex;
        align-items: center;
        .icon {
          width:0.06rem;
          height:0.3rem;
          background:rgba(60,213,139,1);
          border-radius:0.03rem;
          margin: 0 0.2rem 0 0.3rem;
        }
        .name {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
      }
      .goods-box {
        height:1.6rem;
        display: flex;
        background: #fff;
        padding: 0.2rem 0.3rem 0.1rem 0.3rem;
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
            color:#999;
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
            color:#999;
          }
        }
      }
      .tips {
        text-align: left;
        padding-left: 0.2rem;
        width:6.9rem;
        height:0.7rem;
        background:rgba(244,244,244,1);
        border-radius:0.08rem;
        margin: 0 auto;
        font-size:0.24rem;
        line-height: 0.7rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
      }
      .tips-item {
        margin: 0.15rem 0.3rem;
        height:0.9rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background:rgba(255,255,255,1);
        border-bottom: 1px #E7E7E7 solid;
        .left {
          .name {
            font-size:0.28rem;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:rgba(51,51,51,1);
          }
          .name3 {
            font-size:0.28rem;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:#AAA;
          }
          .mes {
            font-size:0.22rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(153,153,153,1);
          }
        }
        .center {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(102,102,102,1);
        }
        .center3 {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:#AAAAAA;
        }
        .right {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:#AAAAAA;
        }
        .right2 {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:#FF2644;
        }
        .right3 {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:#666666;
        }
      }
    }
  }
</style>
