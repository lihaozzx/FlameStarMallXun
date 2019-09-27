<template>
  <div class="AddMoney">
    <TopNav name="余额充值" special="true"></TopNav>
    <div class="money-container">
      <div class="money-bg">
        <div class="string">账户余额</div>
        <div class="number">¥ {{content.balance}}</div>
        <div class="back">未到账返现共计（不含退款）：{{content.noCashBackAmount || 0}}元</div>
      </div>
      <!--<img class="" src="../../assets/mine/recharge_card.png" alt="">-->
    </div>
    <div class="center-item">
      <div @click="goAddMoney" class="item">
        <div class="item-img">
          <img src="../../assets/mine/recharge_money.png" alt="">
        </div>
        <div class="item-font">
          充值
        </div>
      </div>
      <div @click="goBalance" class="item">
        <div class="item-img">
          <img src="../../assets/mine/recharge_Detail.png" alt="">
        </div>
        <div class="item-font">
          余额明细
        </div>
      </div>
    </div>
    <van-button  @click="withdrawalShow = true" class="withdrawalBtn" size="large" round type="warning">提现</van-button>
    <WithdrawalDialog
      title="充值"
      tip="所充值的金额将进入您的账户余额"
      btn="确认充值"
      :show="addMoneyShow"
      :withdrawalErr="addMoneyErr"
      @Confirm="addMoneyConfirm"
      @close="closeDialog"
    ></WithdrawalDialog>
    <!--<van-dialog-->
      <!--closeOnClickOverlay-->
      <!--v-model="addMoneyShow"-->
      <!--:showConfirmButton="false"-->
    <!--&gt;-->
      <!--<div class="dialog-title">标题</div>-->
      <!--<van-field-->
        <!--label-align="right"-->
        <!--v-model="addMoney"-->
        <!--:error-message="addMoneyErr"-->
        <!--label="￥"-->
        <!--placeholder="请输入充值金额"-->
      <!--&gt;-->
      <!--</van-field>-->
      <!--<div class="tips">所充值的金额将进入您的账户余额</div>-->
      <!--<van-button @click="addMoneyConfirm" class="addMoneyConfirm">确认充值</van-button>-->
    <!--</van-dialog>-->
<!--    <van-dialog-->
<!--      class="withdrawal-dialog"-->
<!--      closeOnClickOverlay-->
<!--      v-model="withdrawalShow"-->
<!--      :showConfirmButton="false"-->
<!--    >-->
<!--      <div class="title">提现</div>-->
<!--      <div class="tips">-->
<!--        我们程序小伙伴正在努力开发提现功能！-->
<!--        暂时还请联系客服小伙伴进行提现-->
<!--      </div>-->
<!--      <div class="tips2">-->
<!--        说明：请联系平台客服进行手动提现申请 <br>-->
<!--        客服电话：{{serverPhone}}<br>-->
<!--        客服微信：海蜀黎-->
<!--      </div>-->
<!--      <img class="QRcode" :src="getServerQR" alt="">-->
<!--      <van-button @click="withdrawalConfirm" class="btn">确认提现</van-button>-->
<!--    </van-dialog>-->
    <van-dialog
      class="withdrawal-dialog"
      closeOnClickOverlay
      v-model="withdrawalShow"
      :showConfirmButton="false"
    >
      <img @click="withdrawalShow = false" style="width: 100%;height: 100%;" src="../../assets/mine/withdraw_pop.png" alt="">
    </van-dialog>
    <van-dialog
      v-model="payShow"
      title="提示"
      message="为了你的账户安全，建议你设置支付密码哦！"
      show-cancel-button
      confirm-button-text="马上设置"
      @confirm="$router.push({name: 'PlayPassword'})"
    >
    </van-dialog>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import mineApi from '@/api/mine'
import orderApi from '@/api/order'
import WithdrawalDialog from './com/WithdrawalDialog'
import conf from '@/conf/params'
export default {
  name: 'AddMoney',
  components: {
    TopNav,
    WithdrawalDialog
  },
  data () {
    return {
      content: {},
      addMoneyShow: false,
      payShow: false,
      withdrawalShow: false,
      addMoneyErr: '',
      addMoney: null,
      withdrawalErr: '',
      withdrawal: null,
      serverPhone: null,
      isOldPasword: false
    }
  },
  created () {
    this.getBalanceDetails()
    this.getContact()
    this.getPaymentPasswordStatus()
  },
  methods: {
    getPaymentPasswordStatus () {
      mineApi.getPaymentPasswordStatus().then(res => {
        if (res.data.content === 1) {
          this.isOldPasword = true
        }
      })
    },
    goAddMoney () {
      if (this.isOldPasword) {
        this.addMoneyShow = true
      } else {
        this.payShow = true
      }
    },
    getContact () {
      mineApi.getContact().then(res => {
        this.serverPhone = res.data.content.serviceTel
      })
    },
    getBalanceDetails () {
      const data = {
        pageNumber: 1,
        pageSize: 10,
        status: 1
      }
      mineApi.getBalanceDetails(data).then(res => {
        console.log(res)
        this.content = res.data.content
      })
    },
    closeDialog () {
      this.addMoneyShow = false
      this.withdrawalShow = false
    },
    addMoneyConfirm (val) {
      if (!val) {
        this.addMoneyErr = '请输入正确的充值金额'
      } else {
        this.addMoneyErr = ''
        const data = {
          amount: val
        }
        orderApi.addRechargeOrder(data).then(res => {
          if (res.data.messageCode === 'MSG_1001') {
            const orderInfo = res.data.content
            orderInfo.isTopUp = true
            this.addMoneyShow = false
            orderInfo.token = document.cookie.split('token=')[1]
            this.$router.replace({name: 'Pay', params: {orderInfo: encodeURIComponent(JSON.stringify(orderInfo))}})
          } else {
            this.$toast(res.data.message)
            this.addMoneyShow = false
          }
        })
      }
    },
    withdrawalConfirm (val) {
      if (!val) {
        this.withdrawalErr = '请输入正确的提现金额'
      } else {
        this.withdrawalErr = ''
        this.withdrawalShow = false
        const data = {
          amount: parseFloat(val),
          status: 1
        }
        orderApi.transferForWeChatAudit(data).then(res => {
          console.log(res)
          // const orderInfo = res.data.content
          // orderInfo.isTopUp = true
          // this.$router.push({name: 'Pay', params: {orderInfo: encodeURIComponent(JSON.stringify(orderInfo))}})
        })
      }
    },
    goBalance () {
      this.$router.push({name: 'Balance'})
    }
  },
  computed: {
    getServerQR () {
      return conf.testEnvironmentHost + '/_download/img/qrcode_mall_support.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.AddMoney {
  height: 13.34rem;
  background: #F4F4F4;
  .money-container {
    padding: 0.46rem 0.21rem 0.21rem 0.21rem;
    /*width:7.50rem;*/
    /*height:3.28rem;*/
    background:rgba(255,255,255,1);
    .money-bg {
      width: 7.08rem;
      height: 2.31rem;
      background: url('../../assets/mine/recharge_card.png') no-repeat fixed top;
      /*background-image: url('../../assets/mine/recharge_card.png');*/
      .string {
        padding-top: 0.2rem;
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
      .back {
        padding-left: 0.54rem;
        font-size:0.24rem;
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
  .withdrawal-dialog {
    width:6.2rem;
    height:11.8rem;
    background:rgba(255,255,255,1);
    border-radius:0.24rem;
    .title {
      margin: 0.54rem 0 0.32rem 0.5rem;
      font-size:0.34rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
    .tips {
      margin-left: 0.5rem;
      font-weight:500;
      color:rgba(170,170,170,1);
      line-height:0.36rem;
      width:4.5rem;
      height:0.97rem;
      text-align: left;
      font-size:0.24rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(170,170,170,1);
    }
    .tips2 {
      margin-top: 0.28rem;
      margin-left: 0.5rem;
      font-weight:500;
      color:rgba(170,170,170,1);
      line-height:0.36rem;
      width:4.5rem;
      height:0.97rem;
      text-align: left;
      font-size:0.24rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(170,170,170,1);
    }
    .QRcode {
      margin: 0.44rem 1.48rem 0.54rem 1.5rem;
      width: 2.4rem;
      height: 2.4rem;
      display: block;
    }
    .btn {
      display: block;
      margin: 0 auto;
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
  .addMoneyConfirm {
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
}
</style>
