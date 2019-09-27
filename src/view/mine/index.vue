<template>
    <div class="mine">
      <!--<div class="mine-nav">我的</div>-->
      <div class="mine-info">
        <div class="top">
          <img v-if="myInfo.avatarKey" @click="goUpDataInfo" class="img" :src="myInfo.avatarKey">
          <img v-else @click="goUpDataInfo" class="img" src="../../assets/zhanw_tb_n.png">
          <div class="center">
            <div class="name">{{myInfo.nickname}}</div>
            <div class="money">
              <div class="money-font">余额</div>
              <div class="money-number">￥{{myInfo.balance}}</div>
            </div>
          </div>
          <van-button @click="goAddMoney" class="right" round type="danger">充值</van-button>
        </div>
        <div v-if="myInfo.isMember === 1" class="bottom">
          <img class="bottom-icon" src="../../assets/mine/my_imassage_huiy_icon.png" alt="">
          <div class="bottom-font">
            您已经是会员，
          </div>
          <div @click="$router.push({name: 'Member'})" class="bottom-link">领会员</div>
        </div>
        <div v-else class="bottom">
          <img class="bottom-icon" src="../../assets/mine/my_imassage_nohuiy_icon.png" alt="">
          <div class="bottom-font2">
            您还不是会员，
          </div>
          <div @click="$router.push({name: 'Member'})" class="bottom-link">领会员</div>
        </div>
      </div>
      <van-cell
        center
        border
        class="order margin-top20"
      >
        <template slot="icon">
          <img class="order-img" src="../../assets/mine/my_order_icon@2x.png" alt="">
        </template>
        <template slot="title">
          <span @click="goOder(0)" class="custom-text">我的订单</span>
        </template>
      </van-cell>
      <div class="order-container">
        <div @click="goOder(1)" class="order-item">
          <div v-if="getStatus(1)" class="circle1">{{getStatus(1)}}</div>
          <img class="order-item-img" src="../../assets/mine/my_order_list1_icon@2x.png" alt="">
          <div class="order-item-name">待支付</div>
        </div>
        <div class="order-item">
          <div v-if="getStatus(4)" class="circle2">{{getStatus(4)}}</div>
          <img @click="goOder(4)" class="order-item-img" src="../../assets/mine/my_order_list2_icon@2x.png" alt="">
          <div class="order-item-name">待收货</div>
        </div>
        <div @click="goOder(5)" class="order-item">
          <div v-if="getStatus(5)" class="circle3">{{getStatus(5)}}</div>
          <img class="order-item-img" src="../../assets/mine/my_order_list3_icon@2x.png" alt="">
          <div class="order-item-name">待评价</div>
        </div>
        <div @click="goOder(10)" class="order-item">
          <!--<div v-if="getStatus(7)" class="circle4">{{getStatus(7)}}</div>-->
          <img class="order-item-img" src="../../assets/mine/my_order_list4_icon@2x.png" alt="">
          <div class="order-item-name">退款/售后</div>
        </div>
      </div>
      <van-cell
        center
        border
        class="order margin-top20"
      >
        <template slot="icon">
          <img class="order-img" src="../../assets/mine/my_service_icon@2x.png" alt="">
        </template>
        <template slot="title">
          <span class="custom-text">我的服务</span>
        </template>
      </van-cell>
      <div class="service-container">
        <div @click="goCommissionPage" class="service-item">
          <img class="service-item-img" src="../../assets/mine/my_service_list1_icon@2x.png" alt="">
          <div class="service-item-container">
            <div class="service-item-name">佣金</div>
            <div class="service-item-describe">收支明细一目了然</div>
          </div>
        </div>
        <div @click="goTeam" class="service-item">
          <img class="service-item-img" src="../../assets/mine/my_service_list2_icon@2x.png" alt="">
          <div class="service-item-container">
            <div class="service-item-name">我的团队</div>
            <div class="service-item-describe">轻轻松松管理团队</div>
          </div>
        </div>
      </div>
      <van-cell
        @click="goMyAddress"
        center
        border
        class="order margin-top20"
      >
        <template slot="icon">
          <img class="order-img" src="../../assets/mine/my_otherservice_list1_icon@2x(1).png" alt="">
        </template>
        <template slot="title">
          <span class="custom-text">我的地址</span>
        </template>
      </van-cell>
      <van-cell
        @click="goPlayPassword"
        center
        border
        class="order"
      >
        <template slot="icon">
          <img class="order-img" src="../../assets/mine/my_otherservice_list2_icon@2x.png" alt="">
        </template>
        <template slot="title">
          <span class="custom-text">支付密码</span>
        </template>
      </van-cell>
      <van-cell
        center
        border
        class="order"
        @click="InviteCodeShow = true"
      >
        <template slot="icon">
          <img class="order-img" src="../../assets/mine/my_otherservice_list3_icon@2x.png" alt="">
        </template>
        <template slot="title">
          <span class="custom-text">邀请码</span>
        </template>
      </van-cell>
      <!--<van-cell-->
        <!--center-->
        <!--border-->
        <!--class="order"-->
        <!--@click="goRegister"-->
      <!--&gt;-->
        <!--<template slot="icon">-->
          <!--<img class="order-img" src="../../assets/mine/my_otherservice_list4_icon@2x.png" alt="">-->
        <!--</template>-->
        <!--<template slot="title">-->
          <!--<span class="custom-text">商家入驻</span>-->
        <!--</template>-->
      <!--</van-cell>-->
      <van-cell
        @click="severShow = true"
        center
        border
        class="order"
      >
        <template slot="icon">
          <img class="order-img" src="../../assets/mine/my_otherservice_list5_icon@2x.png" alt="">
        </template>
        <template slot="title">
          <span class="custom-text">客服</span>
        </template>
      </van-cell>
      <van-cell
        @click="userSwitch"
        center
        border
        class="order margin-top20"
      >
        <template slot="icon">
          <img class="order-img" src="../../assets/mine/my_otherservice_list1_icon@2x.png" alt="">
        </template>
        <template slot="title">
          <span class="custom-text">账户切换</span>
        </template>
      </van-cell>
      <!--<a href="tel:178xxxx90xx">178xxxx90xx</a>-->
      <van-dialog
        :message="myInfo.servicePhone"
        closeOnClickOverlay
        v-model="severShow"
        title="客服"
        confirm-button-text="呼叫"
        confirm-button-color="#FF517A"
        @confirm="callPhone(myInfo.servicePhone)"
      >
      </van-dialog>
      <van-dialog
        class="invite-code-box"
        closeOnClickOverlay
        :show-confirm-button="false"
        v-model="InviteCodeShow"
      >
        <div class="invite-code">
          <img src="../../assets/mine/my_code_bg.png" alt="">
          <div class="content">
            <div class="invite-code-title">
              我的邀请码
            </div>
            <div class="code-number">
              {{myInfo.inviterCode}}
            </div>
            <div class="copy" :data-clipboard-text="myInfo.inviterCode" @click="copy">
              点击复制
            </div>
            <div class="line"></div>
            <div class="referees-img">
              <img v-if="myInfo.inviterAvatarKey" :src="myInfo.inviterAvatarKey" alt="">
              <img v-else src="../../assets/zhanw_tb_n.png" alt="">
            </div>
            <div v-if="myInfo.inviterNickname" class="referees-vip">
              {{myInfo.inviterIsMember === 1 ? 'Plus会员': '非Plus会员'}}
            </div>
            <!--<img class="referees-vip" src="../../assets/mine/my_viptag_bg.png" alt="">-->
            <div class="referees-title">我的推荐人</div>
            <div class="referees-name">{{myInfo.inviterNickname ? myInfo.inviterNickname : '寻草记'}}</div>
          </div>

        </div>
      </van-dialog>
    </div>
</template>

<script>
import mineApi from '@/api/mine'
import Clipboard from 'clipboard'
export default {
  name: 'index',
  data () {
    return {
      severShow: false,
      InviteCodeShow: false,
      myInfo: {}
    }
  },
  created () {
    this.getMyInfo()
  },
  methods: {
    callPhone (phoneNumber) {
      window.location.href = 'tel://' + phoneNumber
    },
    copy () {
      let clipboard = new Clipboard('.copy')
      clipboard.on('success', e => {
        alert('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        alert('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    goOder (v) {
      this.$router.push({name: 'OrderList', params: {active: v}})
    },
    getStatus (v) {
      console.log(this.myInfo.orderCount)
      if (!this.myInfo.orderCount) {
        return ''
      }
      let count = null
      this.myInfo.orderCount.forEach((item, index) => {
        if (item.status === v) {
          count = item.count
        }
      })
      return count
    },
    getMyInfo () {
      mineApi.getMyInfo().then(res => {
        this.myInfo = res.data.content
      })
    },
    goUpDataInfo () {
      this.$router.push({name: 'UpDataInfo', params: {id: 1}})
    },
    goAddMoney () {
      this.$router.push({name: 'AddMoney'})
    },
    goMyAddress () {
      this.$router.push({name: 'Address'})
    },
    goPlayPassword () {
      this.$router.push({name: 'PlayPassword'})
    },
    userSwitch () {
      this.$router.push({name: 'UserSwitch'})
    },
    goCommissionPage () {
      this.$router.push({name: 'CommissionPage', params: {isMember: this.myInfo.isMember}})
    },
    goTeam () {
      this.$router.push({name: 'Team'})
    },
    goRegister () {
      this.$router.push({name: 'MerchantsRegister'})
    }
  }
}
</script>

<style lang="scss" scoped>
.mine{
  background: #F4F4F4;
  margin-bottom: 1rem;
  .invite-code-box {
    width: 5.4rem;
    height: 6.96rem;
    .invite-code {
      background: #4C4C4C;
      /*opacity:0.5;*/
      width: 5.4rem;
      height: 6.96rem;
      margin-right: 0;
      img {
        width: 100%;
        height: 100%;
        display: block;
        pointer-events: none;
      }
      .content {
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        margin: 0.5rem 0.35rem;
        width: 4.7rem;
        height: 5.96rem;
        .invite-code-title {
          width: 2.5rem;
          height: 0.4rem;
          margin: 0 auto;
          text-align: center;
          font-size:0.32rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(255,141,18,1);
          background: url('../../assets/mine/my_code_title.png') no-repeat;
          background-size:100% 100%;
        }
        .code-number {
          /*position: absolute;*/
          /*top: 1.5rem;*/
          /*left: 0.61rem;*/
          margin: 0.5rem auto;
          width:4.17rem;
          /*height:0.5rem;*/
          font-size:0.66rem;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
          font-style:italic;
          letter-spacing:0.1rem;
          color:rgba(255,141,18,1);
        }
        .copy {
          /*position: absolute;*/
          /*top: 2.8rem;*/
          /*left: 1.8rem;*/
          margin: 0.5rem auto;
          width:1.6rem;
          height:0.6rem;
          line-height: 0.6rem;
          text-align: center;
          background:linear-gradient(90deg,rgba(255,141,18,1),rgba(255,43,68,1));
          border-radius:0.3rem;
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
        .line {
          /*position: absolute;*/
          /*top: 3.9rem;*/
          /*left: 0.5rem;*/
          width: 100%;
          border-bottom: 1px #999999 dashed;
        }
        .referees-img {
          margin: 0.3rem auto;
          width:1.2rem;
          height:1.2rem;
          img {
            border-radius: 50%;
            display: block;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }
        }
        .referees-vip {
          width: 1.5rem;
          height: 0.5rem;
          line-height: 0.5rem;
          text-align: center;
          position: absolute;
          top: 3.7rem;
          left: 3rem;
          font-size:0.2rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(255,141,18,1);
          background: url('../../assets/mine/my_viptag_bg.png') no-repeat;
          background-size: 100% 100%;
        }
        .referees-title {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
        .referees-name {
          margin-top: 0.1rem;
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(153,153,153,1);
        }
      }
    }
  }
  .margin-top20 {
    margin-top: 0.2rem;
  }
  .mine-nav{
    width:7.50rem;
    height:0.88rem;
    line-height:0.88rem;
    text-align: center;
    background: #FF517A;
    color: #fff;
    font-size:0.34rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
  }
  .mine-info {
    width:7.50rem;
    height:3.12rem;
    background:rgba(255,255,255,1);
    .top {
      clear: both;
      height: 1.92rem;
      .img {
        float: left;
        margin-top: 0.4rem;
        margin-left: 0.4rem;
        margin-right: 0.3rem;
        /*margin-bottom: 0.24rem;*/
        width: 1.28rem;
        height: 1.28rem;
        border-radius: 50%;
      }
      .center {
        float: left;
        .name{
          margin-top: 0.54rem;
          margin-bottom: 0.1rem;
          font-size:0.35rem;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
          color:rgba(51,51,51,1);
        }
        .money {
          display: flex;
          .money-font {
            line-height: 0.4rem;
            margin-right: 0.06rem;
            color: red;
            font-size:0.28rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .money-number {
            line-height: 0.4rem;
            font-size:0.28rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:#FF2644;
          }
        }
      }
      .right{
        float: right;
        margin-right: 0.5rem;
        margin-top: 1.09rem;
        line-height: 0.4rem;
        /*width:1.12rem;*/
        text-align: center;
        height:0.44rem;
        background:#FF6417;
        border-radius:0.22rem;
        font-size:0.24rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      margin: 0 auto;
      width:6.9rem;
      height:0.8rem;
      background:linear-gradient(90deg,rgba(252,241,218,1) 0%,rgba(250,228,184,1) 100%);
      border-radius:0.4rem;
      .bottom-icon {
        margin-left: 0.4rem;
        margin-right: 0.2rem;
        width: 0.4rem;
        height: 0.4rem;
        img {
          position: relative;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
      .bottom-font {
        font-size:0.28rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:#916814;
      }
      .bottom-font2 {
        font-size:0.28rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:#AAAAAA;
      }
      .bottom-link {
        color: #FF6417;
        font-size:0.28rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
      }
    }
  }
  .order {
    /*margin-top: 0.2rem;*/
    width:7.5rem;
    height:0.9rem;
    background:rgba(255,255,255,1);
    .order-img {
      width: 0.36rem;
      height: 0.36rem;
      margin-right: 0.16rem;
      pointer-events: none;
    }
    .order-name {
      font-size:0.32rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
  }
  .order-container {
    background: #fff;
    width: 100%;
    height: 1.48rem;
    clear: both;
    .order-item {
      width: 25%;
      height: 1.48rem;
      float: left;
      text-align: center;
      .order-item-img {
        display: block;
        margin-top: 0.3rem;
        margin-left: 0.71rem;
        margin-bottom: 0.2rem;
        width: 0.44rem;
        height: 0.44rem;
      }
      .order-item-name {
        font-size:0.24rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(85,85,85,1);
      }
    }
  }
  .service-container {
    background: #fff;
    width: 100%;
    height: 1.6rem;
    clear: both;
    .service-item {
      width: 50%;
      height: 1.6rem;
      float: left;
      text-align: center;
      .service-item-img {
        float: left;
        display: block;
        margin: 0.56rem 0.33rem 0.56rem 0.4rem;
        width: 0.48rem;
        height: 0.48rem;
      }
      .service-item-container {
        float: left;
        text-align: left;
        margin-top: 0.47rem;
        .service-item-name {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(85,85,85,1);
        }
        .service-item-describe {
          font-size:0.24rem;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(170,170,170,1);
        }
      }
    }
  }
  .circle1 {
    position: absolute;
    left: 1rem;
    top: 4.4rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    width: 0.3rem;
    border-radius: 50%;
    background: #ff517a;
    font-size: 0.2rem;
    color: #fff;
  }

  .circle2 {
    position: absolute;
    left: 2.9rem;
    top: 4.4rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    width: 0.3rem;
    border-radius: 50%;
    background: #ff517a;
    font-size: 0.2rem;
    color: #fff;
  }

  .circle3 {
    position: absolute;
    left: 4.8rem;
    top: 4.4rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    width: 0.3rem;
    border-radius: 50%;
    background: #ff517a;
    font-size: 0.2rem;
    color: #fff;
  }

  .circle4 {
    position: absolute;
    left: 6.7rem;
    top: 4.4rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    width: 0.3rem;
    border-radius: 50%;
    background: #ff517a;
    font-size: 0.2rem;
    color: #fff;
  }

  .circle5 {
    position: absolute;
    right: 50rem;
    top: 440rem;
    height: 30rem;
    line-height: 30rem;
    text-align: center;
    width: 30rem;
    border-radius: 50%;
    background: #ff517a;
    font-size: 20rem;
    color: #fff;
  }
}
</style>
