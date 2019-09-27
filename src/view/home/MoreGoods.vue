<template>
    <div class="search-content-results">
      <TopNav name="商品"></TopNav>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已经到底啦"
        @load="onLoad"
      >
        <!--<div slot="loading">-->
        <!--加载自定义-->
        <!--</div>-->
        <div
          v-for="(item, index) in goodsList"
          :key="index"
          @click="goGoodsDetail(item)"
          class="item van-hairline--bottom">
          <div class="img">
            <img :src="item.imageUrls[0]" alt="">
          </div>
          <div class="right">
            <div class="name">{{item.name}}</div>
            <div class="price">
              <div class="price1">￥{{parseFloat((item.dctPrice - item.marketingCashBack.totalAmount).toFixed(2))}}</div>
              <div class="price2">￥{{item.orgPrice}}</div>
            </div>
            <div class="share">
              <div class="name">
                <span style="color: #FF8D12">实付</span><span style="color: #FF2644">￥{{item.dctPrice}}</span>
                <span style="color: #FF8D12">返</span><span style="color: #FF2644">￥{{parseFloat((item.marketingCashBack.totalAmount).toFixed(2))}}</span>
              </div>
              <!--<img class="img" src="../../assets/home/pinzhi_list_share_icon@2x.png" alt="">-->
            </div>
          </div>
        </div>
      </van-list>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import homeApi from '@/api/home'
export default {
  name: 'MoreGoods',
  components: {
    TopNav
  },
  data () {
    return {
      loading: false,
      finished: false,
      pageNumber: 1,
      pageSize: 5,
      goodsList: []
    }
  },
  created () {
    this.getMoreGoods()
  },
  methods: {
    onLoad () {
      let self = this
      setTimeout(() => {
        self.getMoreGoods('pullUp')
      }, 100)
    },
    goGoodsDetail (item) {
      this.$router.push({name: 'GoodsDetail', params: {id: item.id}})
    },
    getMoreGoods (type) {
      if (type === 'pullUp') {
        this.pageNumber++
        const data = {
          keyword: this.$route.params.keyword,
          scope: 1, // 范围（1-商品；2-店铺；3-商品+店铺）
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
        homeApi.getSearchResults(data).then(res => {
          let arr = res.data.content.goodsResult.items
          this.goodsList = this.goodsList.concat(arr)
          if (arr.length < this.pageSize) {
            this.finished = true // 不在触发接口
          }
          this.loading = false
        })
      } else {
        const data = {
          keyword: this.$route.params.keyword,
          scope: 1, // 范围（1-商品；2-店铺；3-商品+店铺）
          pageNumber: 1,
          pageSize: this.pageSize
        }
        homeApi.getSearchResults(data).then(res => {
          this.goodsList = res.data.content.goodsResult.items
          // this.storeList = res.data.content.storeResult.items
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-content-results {
    .item {
      display: flex;
      padding: 0.2rem;
      background:rgba(255,255,255,1);
      .img {
        margin-right: 0.3rem;
        width: 2.4rem;
        height: 2rem;
        background:rgba(223,222,222,1);
        border-radius:8px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .right {
        height: 2rem;
        .name {
          width: 4.28rem;
          /*height: 0.6rem;*/
          /*margin-left: 0.3rem;*/
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /* ! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
        }
        .price {
          display: flex;
          margin-top: 0.2rem;
          .price1 {
            /*width:0.71rem;*/
            margin-right: 0.1rem;
            height:0.28rem;
            font-size:0.36rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(227,58,89,1);
          }
          .price2 {
            /*width:0.72rem;*/
            height:0.19rem;
            line-height: 0.6rem;
            font-size:0.24rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            text-decoration:line-through;
            color:rgba(153,153,153,1);
          }
        }
        .share {
          margin-top: 0.3rem;
          .name {
            padding-left: 0.1rem;
            padding-right: 0.1rem;
            background: #FCF3ED;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            float: left;
            width:2.75rem;
            font-size:0.24rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(153,153,153,1);
          }
          .img {
            float: right;
            width: 0.4rem;
            height: 0.4rem;
          }
        }
      }
    }
  }
</style>
