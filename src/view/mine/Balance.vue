<template>
    <div>
      <TopNav name="余额明细"></TopNav>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已经到底啦"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="balance-item"
        >
          <div class="left-box">
            <div class="name">{{item.remark}}</div>
            <div class="time">{{item.tradeTime | dateFormat1}}</div>
          </div>
          <div v-if="item.tradeAmount >= 0" class="number">
            +{{item.tradeAmount}}
          </div>
          <div v-else class="number2">
            {{item.tradeAmount}}
          </div>
        </div>
        <!--<div slot="loading">-->
        <!--加载自定义-->
        <!--</div>-->
      </van-list>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import mineApi from '@/api/mine'
export default {
  name: 'Balance',
  components: {
    TopNav
  },
  data () {
    return {
      loading: false,
      finished: false,
      pageSize: 5,
      pageNumber: 1,
      items: []
    }
  },
  created () {
    this.getBalanceDetails()
  },
  methods: {
    onLoad () {
      let self = this
      setTimeout(() => {
        self.getBalanceDetails('pullUp')
      }, 100)
    },
    getBalanceDetails (type) {
      if (type === 'pullUp') {
        this.pageNumber++
        const data = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          status: 1
        }
        mineApi.getBalanceDetails(data).then(res => {
          let arr = res.data.content.items.items
          this.items = this.items.concat(arr)
          if (arr.length < this.pageSize) {
            this.finished = true // 不在触发接口
          }
          this.loading = false
        })
      } else {
        const data = {
          pageNumber: 1,
          pageSize: this.pageSize,
          status: 1
        }
        mineApi.getBalanceDetails(data).then(res => {
          console.log(res)
          this.items = res.data.content.items.items
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.balance-item {
  width:100%;
  height:1.2rem;
  background:rgba(255,255,255,1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.01rem #f4f4f4 solid;
  .left-box {
    margin-left: 0.3rem;
    .name {
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
  .number {
    margin-right: 0.3rem;
    font-size:0.32rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,141,18,1);
  }
  .number2 {
    margin-right: 0.3rem;
    font-size:0.32rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:#E33A59;
  }
}
</style>
