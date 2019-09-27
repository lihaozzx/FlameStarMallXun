<template>
    <div>
      <van-dialog
        class="RefundDailog"
        v-model="show"
        show-cancel-button
        confirmButtonColor="#FF517A"
        @confirm="confirm"
        @cancel="cancel"
        :before-close="close"
      >
        <div class="title">{{title}}</div>
        <div class="select-box">
          <div
            v-for="(item, index) in selectList"
            @click="refundSelect(item)"
            :key="index"
            :class="{active: selectDesc === item, item: selectDesc !== item}"
          >{{item}}</div>
        </div>
        <div v-if="tips" class="tips">
          {{tips}}
        </div>
        <div v-if="evaluationd" class="evaluationd-box">
          <div class="rate">
            <div>商品评分</div>
            <van-rate color="#FF517A" v-model="score"></van-rate>
          </div>
          <van-field
            maxlength="100"
            v-model="content"
            type="textarea"
            clearable
            placeholder="您的评价是我们优化的目标"
          >
          </van-field>
        </div>
      </van-dialog>
    </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    selectList: {
      type: Array,
      default: function () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    evaluationd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectDesc: this.selectList[0],
      score: 5,
      content: ''
    }
  },
  created () {
    this.score = 5
    this.content = ''
  },
  methods: {
    close (action, done) {
      // 阻止closeOnClickOverlay的默认从子组件改变show而导致的错误
      done(false)
      this.$emit('close', done)
    },
    refundSelect (item) {
      this.selectDesc = item
    },
    cancel () {
      this.score = 5
      this.content = ''
    },
    confirm () {
      if (this.evaluationd) {
        const data = {
          score: this.score,
          content: this.content
        }
        this.$emit('confirm', data)
        setTimeout(() => {
          this.score = 5
          this.content = ''
        }, 1000)
      } else {
        this.$emit('confirm', this.selectDesc)
        setTimeout(() => {
          this.score = 5
          this.content = ''
        }, 1000)
      }
    }
  },
  destroyed () {
    this.score = 5
    this.content = ''
    console.log(this.content)
    console.log(1)
  }
}
</script>

<style lang="scss" scoped>
  .RefundDailog {
    width:5.4rem;
    .title {
      text-align: center;
      margin-top: 0.44rem;
      margin-bottom: 0.3rem;
      font-size:0.34rem;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(34,34,34,1);
    }
    .select-box {
      width:5.4rem;
      background:#fff;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .active {
        margin-left: 0.3rem;
        margin-bottom: 0.3rem;
        text-align: center;
        line-height: 0.76rem;
        width:2.25rem;
        height:0.76rem;
        border:0.01rem solid #FF517A;
        border-radius:0.25rem;
        font-size:0.3rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color: #FF517A;
      }
      .item {
        margin-left: 0.3rem;
        margin-bottom: 0.3rem;
        text-align: center;
        line-height: 0.76rem;
        width:2.25rem;
        height:0.76rem;
        border:0.01rem solid #AAAAAA;
        border-radius:0.25rem;
        font-size:0.3rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color: #333;
      }
    }
    .tips {
      margin: 0 auto;
      text-align: center;
      width:4.7rem;
      height:1rem;
      font-size:0.26rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(153,153,153,1);
    }
    .evaluationd-box{
      .rate {
        display: flex;
        justify-content: space-around;
      }
    }
  }
</style>
