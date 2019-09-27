<template>
  <div class="search-content-results">
    <TopNav name="电商店铺"></TopNav>
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
        v-for="(item, index) in storeList"
        :key="index"
        @click="goShopDetail(item)"
        class="shop-item van-hairline--bottom">
        <div class="img">
          <img :src="item.logoUrl" alt="">
        </div>
        <div class="right">
          <div>
            <div class="name">{{item.name}}</div>
            <div class="score">店铺评分：{{item.score}}分</div>
          </div>
          <img class="img2" src="../../assets/home/search_more_n.png" alt="">
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import homeApi from '@/api/home'
export default {
  name: 'MoreShop',
  components: {
    TopNav
  },
  data () {
    return {
      loading: false,
      finished: false,
      pageNumber: 1,
      pageSize: 5,
      storeList: []
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
    goShopDetail (item) {
      this.$router.push({name: 'ShopDetail', params: {id: item.id}})
    },
    getMoreGoods (type) {
      if (type === 'pullUp') {
        this.pageNumber++
        const data = {
          keyword: this.$route.params.keyword,
          scope: 3, // 范围（1-商品；2-附近店铺；3-电商或自营店铺；4-全部）
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
        homeApi.getSearchResults(data).then(res => {
          let arr = res.data.content.storeResult.items
          this.storeList = this.storeList.concat(arr)
          if (arr.length < this.pageSize) {
            this.finished = true // 不在触发接口
          }
          this.loading = false
        })
      } else {
        const data = {
          keyword: this.$route.params.keyword,
          scope: 3, // 范围（1-商品；2-附近店铺；3-电商或自营店铺；4-全部）
          pageNumber: 1,
          pageSize: this.pageSize
        }
        homeApi.getSearchResults(data).then(res => {
          this.storeList = res.data.content.storeResult.items
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-content-results {
    .shop-item {
      display: flex;
      padding: 0.2rem 0.25rem 0.2rem 0.3rem;
      background:rgba(255,255,255,1);
      .img {
        margin-right: 0.3rem;
        width: 1rem;
        height: 1rem;
        background:rgba(223,222,222,1);
        border-radius:8px;
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
          width: 4.28rem;
          /*height: 0.6rem;*/
          /*margin-left: 0.3rem;*/
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
        .score {
          margin-top: 0.2rem;
          font-size:0.22rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(102,102,102,1);
        }
        .img2 {

        }
      }
    }
  }
</style>
