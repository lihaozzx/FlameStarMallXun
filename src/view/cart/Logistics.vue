<template>
    <div class="order-bg">
      <TopNav name="订单详情"></TopNav>
      <div class="log-wrap">
        <div class="log-top">
          <img class="car" src="../../assets/order/ic_logistics.png" alt="">
          <div class="text">
            该订单已拆成{{logisticsDetailList.length}}个包裹发出，点击查看具体物
            流详情
          </div>
        </div>
        <div
          class="log-detail"
          v-for="(item, index) in logisticsDetailList"
          @click="goLogistics(item)"
          :key="index">
          <div class="log-title">
            <span>{{item.companyName}}</span>
            <span>{{item.trackingNumber}}</span>
          </div>
          <div class="log-list-item">{{item.logisticsDto.list.remark}}
          </div>
          <div class="log-list-scroll">
            <div class="log-list-img" v-for="itemName in item.goodsImageList">
              <img :src="itemName" alt="">
            </div>
          </div>
                  <div class="log-no" v-for="imageUrl in item.goodsImageList">
                    <div class="log-no-item">以下商品暂未发货，请耐心等待或是联系商家处理。</div>
                    <div class="log-no-scroll">
                      <div class="log-no-img">
                        <img :src="imageUrl" alt="">
                      </div>
                    </div>
                  </div>
        </div>
      </div>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import orderApi from '@/api/order'
export default {
  name: 'Logistics',
  components: {
    TopNav
  },
  data () {
    return {
      logisticsDetailList: [],
      goodsImageList: []
    }
  },
  created () {
    this.getQueryLogistics()
  },
  methods: {
    goLogistics (item) {
      console.log(item)
      this.$router.push({name: 'LogisticsDetail', params: {logisticsId: item.id}})
    },
    getQueryLogistics () {
      const data = {
        orderId: this.$route.params.orderId
      }
      orderApi.getQueryLogistics(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          let logisticsDetailList = res.data.content.logisticsDetailList
          logisticsDetailList.forEach((v,i)=>{
            v.logisticsDto.list = (v.logisticsDto.list.reverse())[0]
          })
          this.goodsImageList = res.data.content.goodsImageList
          this.logisticsDetailList = logisticsDetailList
          console.log(this.logisticsDetailList)
        } else {
          this.$toast(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-bg {
    background: #f4f4f4;
  }
  .log-top {
    height: 1.38rem;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: flex-start;
    padding-left: 0.3rem;
    align-items: center;
  }

  .log-top img {
    width: 0.4rem;
    height: 0.4rem;
  }

  .log-top .text {
    margin-left: 0.15rem;
    width: 5.93rem;
    font-size: 0.28rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 0.36rem;
  }

  .log-detail {
    margin-top: 0.2rem;
    background: rgba(255, 255, 255, 1);
    padding-bottom: 0.4rem;
  }

  .log-title {
    color: #333333;
    height: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.02rem solid #e7e7e7;
    font-size: 0.28rem;
    margin: 0 0.3rem;
    background: rgba(255, 255, 255, 1);
  }

  .log-list-item {
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 0.26rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 0.36rem;
    margin: 0.29rem 0.3rem;
  }

  .log-list-scroll {
    white-space: nowrap;
    display: flex;
    overflow: scroll;
    width: 100%;
    margin-left: 0.3rem;
  }

  .log-list-img {
    display: inline-block;
    width: 1.4rem;
    height: 1.4rem;
    border: 0.02rem solid #fff;
    margin-right: 0.15rem;
  }

  .log-list-img img {
    width: 1.4rem;
    height: 1.4rem;
  }

  .log-no {
    overflow: hidden;
    margin-top: 0.2rem;
    background: rgba(255, 255, 255, 1);
    padding-bottom: 0.4rem;
  }

  .log-no-item {
    width: 6.74rem;
    font-family: PingFang SC;
    font-size:0.26rem;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 0.36rem;
    margin: 0.29rem 0.3rem;
  }

  .log-no-scroll {
    white-space: nowrap;
    display: flex;
    width: 100%;
    overflow: scroll;
    margin-left: 0.3rem;
  }

  .log-no-img {
    display: inline-block;
    width: 1.4rem;
    height: 1.4rem;
    border: 0.02rem solid #fff;
    margin-right: 0.15rem;
  }

  .log-no-img img {
    width: 1.4rem;
    height: 1.4rem;
  }

</style>
