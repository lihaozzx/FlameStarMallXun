<template>
  <div class="shop-detail">
    <TopNav name="店铺详情"></TopNav>
    <div class="shop-item van-hairline--bottom">
      <div class="img">
        <img
          :src="shopInfo.logoUrl"
          alt=""
        >
      </div>
      <div class="right">
        <div>
          <div style="display: flex">
            <div
              v-if="shopInfo.channel === 1"
              class="icon"
            >
              自营
            </div>
            <div class="name">
              {{shopInfo.name}}
            </div>
          </div>
          <div class="score">店铺评分：<span style="color: #FF8D12">{{shopInfo.score}}分</span></div>
        </div>
        <!--<img class="img2" src="../../assets/home/search_more_n.png" alt="">-->
      </div>
    </div>
    <div
      v-if="shopInfo.appletQrCodeUrl || shopInfo.intro"
      class="shop-detail_intro"
    >
      <div
        v-if="shopInfo.intro"
        class="intro"
      >
        {{shopInfo.intro}}
      </div>
      <img
        v-if="shopInfo.appletQrCodeUrl"
        class="img"
        :src="shopInfo.appletQrCodeUrl"
        alt=""
      >
    </div>
    <div class="quality">
      <div class="item">
        <img
          src="../../assets/goods/ic_goods.png"
          alt=""
        >
        店铺商品
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
          v-for="item in shopGoodsList"
          :key="item.id"
        >
          <div @click="checkGoodsDeil(item)">
            <img
              class="img"
              :src="item.imageUrls[0]"
            >
            <div class="content">
              <div class="name">{{item.name}}</div>
              <div class="price-container">
                <div class="price1"><span style="font-size: 0.24rem">￥</span>{{parseFloat((item.dctPrice - item.marketingCashBack.totalAmount).toFixed(2))}}</div>
                <div class="price2">{{item.orgPrice}}</div>
              </div>
              <div class="share">
                <div class="left">
                  <span style="color: #FF8D12">实付</span><span style="color: #FF2644">￥{{item.dctPrice}}</span>
                  <span style="color: #FF8D12">返</span><span style="color: #FF2644">￥{{parseFloat((item.marketingCashBack.totalAmount).toFixed(2))}}</span>
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
  name: 'ShopDetail',
  components: {
    TopNav
  },
  data() {
    return {
      finished: false,
      loading: false,
      pageNumber: 1,
      pageSize: 5,
      shopGoodsList: [],
      shopInfo: {}
    }
  },
  created() {
    this.shopDetail()
    this.shopGoods()
  },
  methods: {
    checkGoodsDeil(item) {
      this.$router.push({ name: 'GoodsDetail', params: { id: item.id } })
    },
    onLoad() {
      let self = this
      setTimeout(() => {
        self.shopGoods('pullUp')
      }, 100)
    },
    shopGoods(type) {
      if (type === 'pullUp') {
        this.pageNumber++
        const data = {
          storeId: this.$route.params.id,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
        homeApi.getShopGoods(data).then(res => {
          let arr = res.data.content.items
          this.shopGoodsList = this.shopGoodsList.concat(arr)
          if (arr.length < this.pageSize) {
            this.finished = true // 不在触发接口
          }
          this.loading = false
        })
      } else {
        const data = {
          storeId: this.$route.params.id,
          pageNumber: 1,
          pageSize: this.pageSize
        }
        homeApi.getShopGoods(data).then(res => {
          this.shopGoodsList = res.data.content.items
          this.loading = false
        })
      }
    },
    shopDetail() {
      const data = {
        id: this.$route.params.id
      }
      homeApi.getShopDetail(data).then(res => {
        console.log(res.data)
        this.shopInfo = res.data.content
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-detail {
  background: #f4f4f4;
  .quality {
    /*width:7.50rem;*/
    /*height:1.08rem;*/
    padding: 0.36rem 0.2rem;
    background: rgba(255, 255, 255, 1);
    .item {
      /*margin: 0.36rem 0.2rem;*/
      img {
        width: 0.36rem;
        height: 0.36rem;
        margin-right: 0.17rem;
      }
      font-size: 0.34rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }
  .quality-container {
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .quality-item {
      float: left;
      margin-bottom: 0.2rem;
      width: 3.48rem;
      /*height:5rem;*/
      background: rgba(255, 255, 255, 1);
      border-radius: 0.08rem;
      .img {
        display: block;
        width: 3.48rem;
        height: 3.48rem;
        border-radius: 8px 8px 0 0;
      }
      .content {
        width: 3.48rem;
        /*height:2.1rem;*/
        border-radius: 0 0 8px 8px;
        .name {
          padding-top: 0.17rem;
          padding-left: 0.17rem;
          font-size: 0.28rem;
          height: 0.78rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          display: flex;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /* ! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          .icon {
            display: inline-block;
            text-align: center;
            width: 0.7rem;
            height: 0.28rem;
            line-height: 0.28rem;
            background: rgba(255, 81, 122, 1);
            border-radius: 0.14rem;
            font-size: 0.2rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            margin-top: 0.06rem;
            margin-right: 0.13rem;
          }
        }
        .price-container {
          padding-top: 0.23rem;
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          .price1 {
            padding-left: 0.17rem;
            padding-right: 0.16rem;
            font-size: 0.36rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: #ff6417;
          }
          .price2 {
            font-size: 0.24rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            text-decoration: line-through;
            color: rgba(153, 153, 153, 1);
          }
        }
        .share {
          padding-left: 0.17rem;
          padding-right: 0.17rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.2rem;
          .left {
            padding-left: 0.1rem;
            padding-right: 0.1rem;
            background: #fcf3ed;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
  .shop-item {
    display: flex;
    width: 7.2rem;
    height: 1.4rem;
    margin: 0.28rem auto;
    background: rgba(255, 255, 255, 1);
    .img {
      margin: 0.3rem;
      width: 0.8rem;
      height: 0.8rem;
      background: rgba(223, 222, 222, 1);
      border-radius: 8px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      .name {
        margin-top: 0.3rem;
        width: 4.28rem;
        /*height: 0.6rem;*/
        /*margin-left: 0.3rem;*/
        font-size: 0.28rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        /*display: flex;*/

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .icon {
        text-align: center;
        width: 0.7rem;
        height: 0.28rem;
        line-height: 0.28rem;
        background: rgba(255, 81, 122, 1);
        border-radius: 0.14rem;
        font-size: 0.2rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin-top: 0.36rem;
        margin-right: 0.13rem;
      }
      .score {
        margin-top: 0.1rem;
        font-size: 0.22rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }
      // .img2 {

      // }
    }
  }
  .shop-detail_intro {
    margin: 0.2rem auto;
    width: 7.2rem;
    /*height:5.65rem;*/
    background: rgba(255, 255, 255, 1);
    border-radius: 0.1rem;
    .intro {
      padding: 0.3rem;
      font-size: 0.26rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 0.4rem;
    }
    .img {
      display: block;
      margin: 0 auto;
      width: 6.3rem;
      height: 2.8rem;
      border-radius: 0.14rem;
      padding-bottom: 0.4rem;
    }
  }
}
</style>
