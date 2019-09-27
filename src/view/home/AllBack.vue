<template>
    <div class="allBack">
      <TopNav name="0元购好物"></TopNav>
      <img class="allBack-bg" src="../../assets/home/qmf_bg.png" alt="">
      <div class="allBack-content">
        <div class="cumulative">
          已累积返现
        </div>
        <div class="num">{{this.cashBackObj.totalAmount}}元</div>
        <!--<div class="number-box">-->
          <!--<div-->
            <!--v-for="(item, index) in totalArr"-->
            <!--:key="index"-->
            <!--class="item">-->
              <!--{{item}}-->
          <!--</div>-->
        <!--</div>-->
        <div class="tips-box">
          <van-swipe class="swipe-content" vertical :show-indicators="false" :autoplay="3000">
            <van-swipe-item v-for="(item, index) in cashBackObj.userCashBackItems" :key="index">
              <div slot="default" ><span class="font">{{item.nickName}}已获得</span><span class="number">{{item.tradeAmount}}</span><span class="font">元返现</span></div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="product">
        <div class="line-div">
          <div class="line">

          </div>
          <div class="line2">

          </div>
        </div>
        <div class="title">
          0元购好物
        </div>
        <div class="line-div">
          <div class="line">

          </div>
          <div class="line3">

          </div>
        </div>
      </div>
      <div>
        <van-list
          class="quality-container"
          v-model="loading"
          :finished="finished"
          finished-text="已经到底啦"
          @load="onLoad"
        >
          <div
            class="quality-item"
            v-for="item in backList"
            :key="item.id"
          >
            <div @click="checkGoodsDeil(item)">
              <img class="img" :src="item.imageUrls[0]">
              <div class="content">
                <div class="name">{{item.name}}</div>
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
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import homeApi from '@/api/home'
export default {
  name: 'AllBack',
  components: {
    TopNav
  },
  data () {
    return {
      loading: false,
      finished: false,
      pageNumber: 1,
      pageSize: 5,
      cashBackObj: {},
      backList: [],
      totalArr: []
    }
  },
  created () {
    this.getCashBack()
  },
  methods: {
    onLoad () {
      let self = this
      setTimeout(() => {
        self.getCashBack('pullUp')
      }, 100)
    },
    getCashBack (type) {
      if (type === 'pullUp') {
        this.pageNumber++
        const data = {
          statistic: 1,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
        homeApi.getCashBack(data).then(res => {
          let arr = res.data.content.items
          this.backList = this.backList.concat(arr)
          if (arr.length < this.pageSize) {
            this.finished = true // 不在触发接口
          }
          this.loading = false
        })
      } else {
        const data = {
          statistic: 1,
          pageNumber: 1,
          pageSize: this.pageSize
        }
        homeApi.getCashBack(data).then(res => {
          this.cashBackObj = res.data.content
          this.backList = res.data.content.items
          this.loading = false
        })
      }
    },
    // numberSplit (num) {
    //   let arr = num.toString().split('').reverse()
    //   let totalArr = ['0', '0', '0', '0', '0', '0', '0', '0']
    //   for (let j = 0; j < arr.length; j++) {
    //     totalArr[7 - j] = arr[j]
    //   }
    //   this.totalArr = totalArr
    // },
    checkGoodsDeil (item) {
      this.$router.push({name: 'GoodsDetail', params: {id: item.id}})
    }
  }
}
</script>

<style lang="scss" scoped>
.allBack {
  background: #f4f4f4;
  .allBack-bg {
    height: 2.6rem;
  }
  .allBack-content {
    position: absolute;
    top: 1.2rem;
    left: 0.2rem;
    .cumulative {
      text-align: center;
      font-size:0.28rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
    .num {
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      text-align: center;
      font-size:0.54rem;
      font-family:FZLTDHK--GBK1-0;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .number-box {
      display: flex;
      justify-content: center;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      .item {
        text-align: center;
        line-height: 0.68rem;
        width:0.68rem;
        height:0.68rem;
        margin-right: 0.1rem;
        background:rgba(255,255,255,0.2);
        border:0.01rem solid rgba(255,255,255,1);
        font-size:0.42rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
    }
    .tips-box {
      margin: 0 auto;
      width:7.1rem;
      height:1.12rem;
      /*overflow: hidden;*/
      background:rgba(255,255,255,1);
      box-shadow:0 0.06rem 0.1rem 0 rgba(0, 0, 0, 0.1);
      border-radius:0.1rem;
      .swipe-content {
        width:7.1rem;
        height:1.12rem;
        text-align: center;
        /*overflow: hidden;*/
        line-height: 0.56rem;
        /*background: red;*/
        .font {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
        .number {
          font-size:0.28rem;
          color: #FF3162;
          font-family:PingFang-SC-Medium;
          font-weight:500;
        }
      }
    }
  }
  .product {
    margin-top: 0.8rem;
    display: flex;
    justify-content: center;
    width:100%;
    height:0.8rem;
    background: #f4f4f4;
    .line-div {
      margin-top: 0.3rem;
      .line {
        width:1rem;
        height:0.03rem;
        background:rgba(255,141,18,1);
        border-radius:1px;
      }
      .line2 {
        margin-top: 0.1rem;
        margin-left: 0.5rem;
        width:0.5rem;
        height:0.03rem;
        background:rgba(255,141,18,1);
        border-radius:1px;
      }
      .line3 {
        margin-top: 0.1rem;
        width:0.5rem;
        height:0.03rem;
        background:rgba(255,141,18,1);
        border-radius:1px;
      }
    }
    .title {
      margin: 0.1rem 0.2rem 0.2rem 0.2rem;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(51,51,51,1);
      font-size: 0.34rem;
    }
  }
  .quality-container {
    background: #f4f4f4;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .quality-item {
      float: left;
      margin-bottom: 0.2rem;
      width:3.48rem;
      height:5rem;
      background:rgba(255,255,255,1);
      border-radius:0.08rem;
      .img {
        display: block;
        width:3.48rem;
        height:2.9rem;
        border-radius:8px 8px 0 0;
      }
      .content {
        width:3.48rem;
        height:2.1rem;
        border-radius:0 0 8px 8px;
        .name {
          padding-top: 0.17rem;
          padding-left: 0.17rem;
          height: 0.9rem;
          flex-wrap: wrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
        .price-container {
          /*padding-top: 0.57rem;*/
          display: flex;
          justify-content: flex-start;
          .price1 {
            padding-left: 0.17rem;
            padding-right: 0.16rem;
            font-size:0.24rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(227,58,89,1);
          }
          .price2 {
            font-size:0.24rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            text-decoration:line-through;
            color:rgba(153,153,153,1);
          }
        }
        .share {
          padding-left: 0.17rem;
          /*padding-right: 0.17rem;*/
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.2rem;
          .left {
            padding-left: 0.1rem;
            padding-right: 0.1rem;
            background: #FCF3ED;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
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
}
</style>
