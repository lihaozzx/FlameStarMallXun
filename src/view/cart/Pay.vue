<template>
  <div class="pay-oder">
    <TopNav name="支付订单"></TopNav>
    <div class="pay-time">
      <div class="content">
        <div
          v-if="orderInfo.cashBack > 0"
          class="money"
        >
          <span class="font1">支付</span>
          <span class="font2">￥</span>
          <span class="font1">{{orderInfo.paymentAmount}}返</span>
          <span class="font2">￥</span>
          <span class="font1">{{orderInfo.cashBack}}</span>
        </div>
        <div
          v-else
          class="money"
        >
          <span class="font2">￥</span>
          <span class="font1">{{orderInfo.paymentAmount}}</span>
        </div>
        <div
          v-if="payTimeFormat"
          class="time"
        >
          支付剩余时间
          <span>{{payTimeFormat}}</span>
        </div>
      </div>
    </div>
    <van-radio-group
      class="cell-radio"
      v-model="radio"
    >
      <van-cell-group>
        <van-cell
          title="余额支付"
          :label="'余额:￥' + myInfo.balance"
          clickable
          @click="changeRadio('1')"
        >
          <img
            slot="icon"
            src="../../assets/order/order_yhk_icon.png"
            style="width: 0.4rem;height: 0.4rem;margin-right: 0.3rem;margin-top: 0.2rem"
          />
          <van-radio
            checked-color="#FF6417"
            :disabled="orderInfo.isTopUp"
            name="1"
          >
          </van-radio>
        </van-cell>
        <van-cell
          title="微信支付"
          clickable
          @click="changeRadio('2')"
        >
          <img
            slot="icon"
            src="../../assets/order/order_weixin_icon.png"
            style="line-height: inherit;width: 0.4rem;height: 0.4rem;margin-right: 0.3rem"
          />
          <van-radio
            checked-color="#FF6417"
            :disabled="orderInfo.paymentAmount === 0 || orderInfo.paymentAmount === '0'"
            name="2"
          >
            <!--<img-->
            <!--slot="icon"-->
            <!--slot-scope="props"-->
            <!--:src="props.checked ? icon.active : icon.normal"-->
            <!--&gt;-->
          </van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-button
      @click="confirm"
      class="confirm"
    >确认支付</van-button>
    <van-popup
      class="showKeyboard"
      v-model="show"
      position="bottom"
      overlay
    >
      <van-password-input
        :length="6"
        :value="value"
        info="密码为 6 位数字"
        :error-info="errorInfo"
        @focus="showKeyboard = true"
      ></van-password-input>
      <van-number-keyboard
        show
        :maxlength="6"
        @input="onInput"
        @delete="onDelete"
        @blur="hide"
      ></van-number-keyboard>
    </van-popup>
    <van-dialog
      v-model="show2"
      title="提示"
      message="如果使用微信支付，请用外部浏览器打开支付"
      :show-cancel-button="false"
    >
    </van-dialog>
    <van-dialog
      v-model="balanceShow"
      title="提示"
      message="当前余额不足无法支付，建议您先去充值后再进行操作"
      show-cancel-button
      confirm-button-text="去充值"
      @confirm="goAddMoney"
    >
    </van-dialog>
    <van-dialog
      title="提示"
      message="为了您账户余额安全，请您先设置账户支付密码哦！"
      closeOnClickOverlay
      v-model="setPay"
      show-cancel-button
      confirm-button-color="#FF517A"
      @confirm="$router.push({name: 'PlayPassword'})"
    >
    </van-dialog>
  </div>

</template>

<script>
import TopNav from '@/components/TopNav'
import cartApi from '@/api/cart'
import mineApi from '@/api/mine'
import conf from '@/conf/params'
export default {
  name: 'Pay',
  components: {
    TopNav
  },
  data() {
    return {
      radio: '1',
      show: false,
      show2: false,
      showKeyboard: false,
      balanceShow: false,
      setPay: false,
      isOldPasword: false,
      value: '',
      errorInfo: '',
      countDown: 300,
      orderInfo: {},
      payTime: 900,
      payTimeFormat: '',
      myInfo: {}
    }
  },
  created() {
    this.getPaymentPasswordStatus()
    if (localStorage.getItem('isWeiXin') === 'true') {
      window.location.href = window.location.href + '&wxr=' + new Date().getTime()
      this.setCurrentUrl()
      // this.show2 = true
    } else {
      this.show2 = false
    }
    this.orderInfo = JSON.parse(decodeURIComponent(this.$route.params.orderInfo))
    if (this.orderInfo.token) {
      this.setCookie('token', this.orderInfo.token, 1)
    }

    this.getMyInfo()
    if (this.orderInfo.isTopUp) {
      this.radio = '2'
    } else {
      this.getPayTime()
    }
  },
  methods: {
    getPaymentPasswordStatus() {
      mineApi.getPaymentPasswordStatus().then(res => {
        if (res.data.content === 1) {
          this.isOldPasword = true
        }
      })
    },
    setCurrentUrl: () => {
      // 删除 url 中手动添加的随机数 wxr
      let url = location.href.replace(/&wxr=[0-9]{13}/g, '')
      window.location.href = url
      // window.history.replaceState({}, document.title, url)
    },
    goAddMoney() {
      this.$router.replace({ name: 'AddMoney' })
    },
    getMyInfo() {
      mineApi.getMyInfo().then(res => {
        this.myInfo = res.data.content
      })
    },
    changeRadio(v) {
      if (!this.orderInfo.isTopUp) {
        this.radio = v
        console.log(this.radio)
      }
    },
    getPayTime() {
      let endTime = this.orderInfo.createTime + 15 * 60 * 1000
      let clientTime = new Date()
      let lastTime = (endTime - clientTime) / 1000
      let interval2 = setInterval(() => {
        if (lastTime > 0) {
          lastTime--
          let minuteTime = parseInt(lastTime / 60)
          let secondTime = parseInt(lastTime % 60)
          let minute = ''
          let second = ''
          if (minuteTime > 9) {
            minute = minuteTime
          } else {
            minute = '0' + minuteTime
          }
          if (secondTime > 9) {
            second = secondTime
          } else {
            second = '0' + secondTime
          }
          console.log(secondTime > 9)
          this.payTimeFormat = `${minute}:${second}`
        } else {
          clearInterval(interval2)
          this.payTimeFormat = ''
          this.$router.replace({ name: 'OrderList', params: { active: 12 } })
        }
      }, 1000)
    },
    onInput(key) {
      if (this.errorInfo.indexOf('重试') !== -1) {
        return
      }
      this.value = (this.value + key).slice(0, 6)
    },
    hide() {
      this.value = ''
      this.showKeyboard = false
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    confirm() {
      console.log(this.radio)
      if (!this.isOldPasword && this.radio === '1') {
        this.setPay = true
        return
      }
      if (localStorage.getItem('isWeiXin') === 'true' && this.radio === '2') {
        this.show2 = true
      } else {
        if (this.radio === '1' && this.orderInfo.paymentAmount > this.myInfo.balance) {
          this.balanceShow = true
        } else if (this.radio === '1' && this.orderInfo.paymentAmount >= 10) {
          this.show = true
        } else {
          this.payment()
        }
      }
    },
    payment() {
      // if (this.orderInfo.paymentAmount === 0) {
      //   // this.$router.replace({name: 'OrderList', params: {active: 2}})
      // } else {
      const data = {
        transStatementId: this.orderInfo.id,
        orderId: this.orderInfo.orderId,
        channel: this.radio,
        paymentPassword: this.value,
        client: 3
      }
      cartApi.payment(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          if (this.radio === '2') {
            let url = ''
            if (this.orderInfo.isTopUp) {
              url = res.data.content.wechat.paymentUrl + '&redirect_url=' + encodeURIComponent(`${conf.testEnvironmentHost}/#/test2/${this.orderInfo.id}`)
            } else {
              url = res.data.content.wechat.paymentUrl + '&redirect_url=' + encodeURIComponent(`${conf.testEnvironmentHost}/#/test/${this.orderInfo.id}`)
            }
            // const url = res.data.content.wechat.paymentUrl
            window.location.href = url
            // window.location.replace(url)
          } else {
            if (res.data.content.balance.success === 1) {
              this.$router.replace({ name: 'OrderList', params: { active: 2 } })
            } else if (res.data.content.balance.remainingCount > 0) {
              this.value = ''
              this.errorInfo = `密码错误，你还剩余${res.data.content.balance.remainingCount}次机会`
            } else {
              this.getPayTime2(res.data.content.balance.retryRemainingTime)
            }
          }
        } else if (res.data.messageCode === 'MSG_10001') {
          // 余额不足
          this.balanceShow = true
        } else {
          this.$toast(res.data.message)
        }
      })
      // }
    },
    setCookie(cname, cvalue, exdays) {
      let d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      let expires = 'expires=' + d.toGMTString()
      document.cookie = cname + '=' + cvalue + ';' + expires
    },
    getPayTime2(finalFailedTime) {
      let lastTime = finalFailedTime / 1000
      let interval = setInterval(() => {
        if (lastTime > 0) {
          lastTime--
          let minuteTime = parseInt(lastTime / 60)
          let secondTime = parseInt(lastTime % 60)
          this.errorInfo = `${minuteTime}分${secondTime}秒后重试`
        } else {
          this.errorInfo = ''
          clearInterval(interval)
        }
      }, 1000)
    }
  },
  watch: {
    value(v) {
      if (v !== null && v.length === 6) {
        this.payment()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-oder {
  background: #f4f4f4;
  height: 13.33rem;
  .pay-time {
    padding: 0.1rem 0;
    width: 100%;
    height: 2.5rem;
    background: rgba(255, 255, 255, 1);
    .content {
      margin: 0.5rem auto;
      /*width: 3rem;*/
      height: 1rem;
      text-align: center;
      .money {
        display: flex;
        justify-content: center;
        align-items: center;
        .font1 {
          font-size: 0.6rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        .font2 {
          font-size: 0.36rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
      }
      .time {
        font-size: 0.22rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        span {
          color: #ff8d12;
        }
      }
    }
  }
  .cell-radio {
    margin-top: 0.3rem;
  }
  .confirm {
    margin: 0.6rem auto;
    display: block;
    width: 6.9rem;
    height: 0.8rem;
    background: rgba(255, 81, 122, 1);
    border-radius: 0.4rem;
    font-size: 0.32rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .showKeyboard {
    height: 8.5rem;
    padding-top: 1rem;
  }
  .van-number-keyboard {
    left: 0;
    bottom: -6px;
    width: 100%;
    position: fixed;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #fff;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
</style>
