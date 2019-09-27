<template>
  <div class="CommissionPage">
    <TopNav name="佣金"></TopNav>
    <div v-if="$route.params.isMember === 1 || $route.params.isMember === '1'">
      <div class="money-container">
        <div class="money-bg">
          <div class="string">佣金余额</div>
          <div class="number">¥ {{content.balance}}</div>
        </div>
        <!--<img class="" src="../../assets/mine/recharge_card.png" alt="">-->
      </div>
      <van-button  @click="withdrawalShow = true" class="withdrawalBtn" size="large" round type="warning">提现</van-button>
      <div class="commission-box">
        <div class="title">
          <img src="../../assets/mine/recharge_Detail_red.png" alt="">
          <div v-if="list.length > 0" class="name">佣金明细</div>
          <div v-else class="name">佣金明细 <span style="color: #AAAAAA">(暂无)</span></div>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="已经到底啦"
          @load="onLoad"
        >
          <div
            v-for="(item, index) in list"
            :key="index"
            class="list">
            <div class="list-left">
              <div class="remark">{{item.remark}}</div>
              <div class="time">{{item.tradeTime | dateFormat1}}</div>
            </div>
            <div class="list-right">
              {{item.tradeAmount}}
            </div>
          </div>
        </van-list>
      </div>
      <!--<van-dialog-->
      <!--closeOnClickOverlay-->
      <!--v-model="addMoneyShow"-->
      <!--title="充值"-->
      <!--:showConfirmButton="false"-->
      <!--&gt;-->
      <!--<van-field-->
      <!--v-model="addMoney"-->
      <!--:error-message="addMoneyErr"-->
      <!--label="￥"-->
      <!--placeholder="请输入充值金额"-->
      <!--&gt;-->
      <!--</van-field>-->
      <!--<div class="tips">所充值的金额将进入您的账户余额</div>-->
      <!--<van-button @click="addMoneyConfirm" class="commissionPageConfirm">确认充值</van-button>-->
      <!--</van-dialog>-->
      <WithdrawalDialog
        :show="withdrawalShow"
        :withdrawalErr="withdrawalErr"
        @Confirm="withdrawalConfirm"
        @close="closeDialog"
      ></WithdrawalDialog>
    </div>
    <div v-else>
      <div class="not-vip-title">
        <img src="../../assets/member/commission_not_vip.png" alt="">
        <div class="font">您还不是会员无法获取佣金</div>
      </div>
      <div class="not-vip-content">
        <div class="title">
          会员权益
        </div>
        <div class="item">
          <img src="../../assets/member/vip_privilege.png" alt="">
          <div class="item-font">成为会员预计平均每月获得1000元收入！</div>
        </div>
        <div class="item">
          <img src="../../assets/member/vip_commission.png" alt="">
          <div class="item-font">分销功能开启每月预计多赚700元收入！</div>
        </div>
        <div class="item">
          <img src="../../assets/member/vip_distribution.png" alt="">
          <div class="item-font">得到您所邀请用户消费金额的2%—4%的返现。</div>
        </div>
        <div class="item">
          <img src="../../assets/member/vip_server.png" alt="">
          <div class="item-font">专用客服接入通道，尽享VIP尊荣体验！</div>
        </div>
        <div class="item">
          <img src="../../assets/member/IC.png" alt="">
          <div class="item-font">尊享特殊身份标识，彰显会员魅力！</div>
        </div>
        <van-button @click="$router.push({name: 'Member'})" class="btn">开通会员</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import mineApi from '@/api/mine'
import WithdrawalDialog from './com/WithdrawalDialog'
export default {
  name: 'CommissionPage',
  components: {
    TopNav,
    WithdrawalDialog
  },
  data () {
    return {
      loading: false,
      finished: false,
      pageNumber: 1,
      pageSize: 5,
      content: {},
      list: [],
      addMoneyShow: false,
      withdrawalShow: false,
      addMoneyErr: '',
      addMoney: null,
      withdrawalErr: '',
      withdrawal: null
    }
  },
  created () {
    this.getCommissionDetails()
  },
  methods: {
    onLoad () {
      let self = this
      setTimeout(() => {
        self.getCommissionDetails('pullUp')
      }, 100)
    },
    closeDialog () {
      this.addMoneyShow = false
      this.withdrawalShow = false
    },
    getCommissionDetails (type) {
      if (type === 'pullUp') {
        this.pageNumber++
        const data = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          status: 2
        }
        mineApi.getBalanceDetails(data).then(res => {
          this.content = res.data.content
          let arr = res.data.content.items.items
          this.list = this.list.concat(arr)
          if (arr.length < this.pageSize) {
            this.finished = true // 不在触发接口
          }
          this.loading = false
        })
      } else {
        const data = {
          pageNumber: 1,
          pageSize: this.pageSize,
          status: 2
        }
        mineApi.getBalanceDetails(data).then(res => {
          this.content = res.data.content
          this.list = res.data.content.items.items
          this.loading = false
        })
      }
    },
    addMoneyConfirm () {
      if (!this.addMoney) {
        this.addMoneyErr = '请输入充值金额'
      } else {
        this.addMoneyErr = ''
        this.addMoneyShow = false
      }
    },
    withdrawalConfirm (val) {
      if (!val) {
        this.withdrawalErr = '请输入提现金额'
      } else if (val < 1) {
        this.withdrawalErr = '提现金额必须大于1'
      } else {
        this.withdrawalErr = ''
        this.withdrawalShow = false
        const data = {
          status: 2,
          amount: val,
          source: 3
        }
        mineApi.transferForWeChatAudit(data).then(res => {
          if (res.data.messageCode === 'MSG_1001') {
            this.getCommissionDetails()
          } else {
            this.$toast(res.data.message)
          }
        })
      }
    },
    goBalance () {
      this.$router.push({name: 'Balance'})
    }
  }
}
</script>

<style lang="scss" scoped>
.CommissionPage {
  height: 13.34rem;
  background: #F4F4F4;
  .not-vip-title {
    text-align: center;
    background: #fff;
    img {
      width: 2rem;
      height: 2rem;
      display: block;
      margin: 0 auto;
    }
    .font {
      font-size:0.28rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
  }
  .not-vip-content {
    padding: 0.62rem 0.3rem;
    background: #fff;
    .title {
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,100,23,1);
      text-align: center;
      font-size:0.34rem;
    }
    .item {
      display: flex;
      align-items: center;
      margin-top: 0.3rem;
      height:1.08rem;
      background:rgba(255,255,255,1);
      img {
        width: 1rem;
        height: 1rem;
        margin-right: 0.2rem;
      }
      .item-font {
        font-size:0.28rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
    }
    .btn {
      width:6.9rem;
      height:0.8rem;
      background:#FF6417;
      border-radius:0.4rem;
      font-size:0.32rem;
      line-height: 0.8rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
  }
  .money-container {
    padding: 0.46rem 0.21rem 0.41rem 0.21rem;
    /*width:7.50rem;*/
    /*height:3.28rem;*/
    background:rgba(255,255,255,1);
    .money-bg {
      width: 7.08rem;
      height: 2.31rem;
      background: url('../../assets/mine/recharge_card.png') no-repeat fixed top;
      /*background-image: url('../../assets/mine/recharge_card.png');*/
      .string {
        padding-top: 0.68rem;
        padding-left: 0.54rem;
        font-size:0.32rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      .number {
        padding-top: 0.2rem;
        padding-left: 0.54rem;
        font-size:0.5rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
    }
  }
  .center-item {
    margin-top: 0.2rem;
    width: 100%;
    height:1.26rem;
    background:rgba(255,255,255,1);
    box-shadow:1px 0 0 0 rgba(231,231,231,1);
    .item {
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width:3.74rem;
      height:1.26rem;
      background:rgba(255,255,255,1);
      box-shadow:1px 0 0 0 rgba(231,231,231,1);
      margin-right: 0.01rem;
      .item-img{
        width: 0.48rem;
        height: 0.48rem;
        margin-right: 0.24rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .item-font {
        font-size:0.28rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(85,85,85,1);
      }
    }
  }
  .withdrawalBtn {
    display: block;
    margin: 0.6rem auto;
    line-height: 0.8rem;
    width:6.9rem;
    height:0.8rem;
    background:rgba(255,141,18,1);
    border-radius:0.4rem;
  }
  .commissionPageConfirm {
    display: block;
    margin: 1rem auto;
    text-align: center;
    width:4.4rem;
    height:0.76rem;
    background:rgba(255,141,18,1);
    border-radius:0.38rem;
    font-size:0.32rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .commission-box {
    background: #fff;
    .title {
      display: flex;
      align-items: center;
      height:0.9rem;
      background:rgba(255,255,255,1);
      border-bottom: 1px #f4f4f4 solid;
      img {
        width: 0.36rem;
        height: 0.36rem;
        display: block;
        margin-right: 0.16rem;
        margin-left: 0.2rem;
      }
      .name {
        font-size:0.32rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
    }
    .list {
      margin-left: 0.2rem;
      border-bottom: 1px #f4f4f4 solid;
      display: flex;
      align-items: center;
      .list-left {
        .remark {
          width: 6.2rem;
          font-size:0.3rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
        .time {
          font-size:0.24rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(153,153,153,1);
        }
      }
      .list-right {
        width: 1rem;
        text-align: center;
        font-size:0.32rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,141,18,1);
      }
    }
  }
}
</style>
