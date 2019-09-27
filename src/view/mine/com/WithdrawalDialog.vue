<template>
  <div class="WithdrawalDialog">
    <van-dialog
      @Confirm="withdrawalConfirm"
      closeOnClickOverlay
      :before-close="close"
      v-model="show"
      :showConfirmButton="false"
    >
      <div class="dialog-title">{{title}}</div>
      <van-field
        type="number"
        class="field"
        v-model="withdrawal"
        :error-message="withdrawalErr"
        label="￥"
        placeholder="请输入金额"
      >
      </van-field>
      <div class="tips">
        {{tip}}
      </div>
      <van-button @click="withdrawalConfirm" class="confirm-btn">{{btn}}</van-button>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'WithdrawalDialog',
  props: {
    title: {
      type: String,
      default: '提现'
    },
    withdrawalErr: {
      type: String,
      default: ''
    },
    btn: {
      type: String,
      default: '确认提现'
    },
    tip: {
      type: String,
      default: '所提现的佣金余额将进入后台审核，当审核通过后资金将到账至平台账户余额中。单笔提现需满1元，一天最高可提现3次。'
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      withdrawal: ''
    }
  },
  methods: {
    close (action, done) {
      // 阻止closeOnClickOverlay的默认从子组件改变show而导致的错误
      done(false)
      this.withdrawal = ''
      this.$emit('close', done)
    },
    withdrawalConfirm () {
      this.$emit('Confirm', this.withdrawal)
      this.withdrawal = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .WithdrawalDialog {
    .dialog-title {
      margin-left: 0.52rem;
      margin-top: 0.54rem;
      font-size:0.34rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
    .field {
      width: 5.4rem;
      margin-left: 0.2rem;
    }
    .confirm-btn {
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
    .tips {
      margin: 0.2rem 1rem ;
      text-align: center;
      font-size:0.24rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(170,170,170,1);
    }
  }
</style>
