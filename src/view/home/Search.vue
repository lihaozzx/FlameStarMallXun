<template>
    <div class="search">
      <form action="/">
        <van-search
          v-model="keyword"
          placeholder="更多好货等你来发现"
          @search="onSearch"
          show-action
          @cancel="onCancel"
        ></van-search>
      </form>
      <transition name="fade">
        <div v-if="visibel" class="swipe-text">
          <img src="../../assets/home/tzhi_icon.png" alt="">
          <div class="font">{{messageShuffling}}</div>
        </div>
      </transition>
      <div class="search-content">
       <div v-if="goodsList.length <= 0 && storeList.length <= 0">
         <div class="search-content-title">
           <div class="title">搜索历史</div>
           <div class="clear" @click="clearSearchRecord">清空</div>
         </div>
         <div class="search-content-history">
           <van-tag
             v-for="(item, index) in getSearchRecordList"
             :key="index"
             class="tag"
             @click="nameSearch(item)"
             round>{{item}}</van-tag>
         </div>
         <div v-if="on" class="no-content">
           <img src="../../assets/nohave_n.png" alt="">
           <div class="font">无搜索结果，换个词试试吧~</div>
         </div>
       </div>
        <van-list
          v-if="goodsList.length > 0 || storeList.length > 0"
          v-model="loading"
          :finished="finished"
          finished-text="已经到底啦"
          @load="onLoad"
        >
          <div class="search-content-results">
            <div v-if="goodsList && goodsList.length > 0" class="results-title van-hairline--bottom">
              <div class="title">商品</div>
              <div v-if="allObj && allObj.goodsResult && allObj.goodsResult.totalSize > 5 && storeList.length !== 0" class="clear" @click="checkGoods">查看更多</div>
            </div>
            <div
              v-for="(item, index) in goodsList"
              :key="index"
              @click="goGoodsDetail(item)"
              class="item van-hairline--bottom">
              <div class="img">
                <img :src="item.imageUrls[0]" alt="">
              </div>
              <div class="right">
                <div class="name">
                  {{item.name}}
                  <div v-if="item.tags && item.tags[0] === 1" class="icon">
                    自营
                  </div>
                </div>
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
            <div v-if="storeList && storeList.length > 0" class="results-title van-hairline--bottom">
              <div class="title">电商店铺</div>
              <div v-if="allObj && allObj.storeResult && allObj.storeResult.totalSize > 5 && goodsList.length !== 0" class="clear" @click="MoreShop">查看更多</div>
            </div>
            <div
              v-for="(item, index) in storeList"
              :key="index + 100"
              @click="goShopDetail(item)"
              class="shop-item van-hairline--bottom">
              <div class="img">
                <img v-if="item.logoUrl" :src="item.logoUrl" alt="">
                <img v-else src="../../assets/zhanw_tb_n.png" alt="">
              </div>
              <div class="right">
                <div>
                  <div class="name">
                    {{item.name}}
                    <div v-if="item.tags && item.tags[0] === 1" class="icon">
                      自营
                    </div>
                  </div>
                  <div class="score">店铺评分：{{item.score}}分</div>
                </div>
                <img class="img2" src="../../assets/home/search_more_n.png" alt="">
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
</template>

<script>
import homeApi from '@/api/home'
export default {
  name: 'Search',
  data () {
    return {
      on: false,
      loading: false,
      finished: false,
      visibel:false,
      messageShuffling: '',
      messageShufflingList: [], // 消息通知轮播列表
      pageNumber: 1,
      pageSize: 5,
      keyword: '',
      scope: 4, // 范围（1-商品；2-附近店铺；3-电商或自营店铺；4-全部）
      allObj: {},
      goodsList: [],
      storeList: [],
      getSearchRecordList: [] // 搜素历史
    }
  },
  created () {
    this.getSearchRecord()
    this.getMessageShuffling()
  },
  methods: {
    getMessageShuffling () {
      const data = {
        pageNumber: 1,
        pageSize: 100000
      }
      homeApi.getTextSlideShow(data).then(res => {
        this.messageShufflingList  = res.data.content.items
      })
      let i = 0
      setInterval(()=> {
        this.visibel = !this.visibel
        if (this.visibel) {
          i++
          this.messageShuffling = this.messageShufflingList[i]
        }
      },3000)
    },
    onLoad () {
      let self = this
      if ((this.allObj && this.allObj.goodsResult && this.allObj.goodsResult.totalSize > 5 && this.storeList.length === 0) || (this.goodsList.length === 0 && this.allObj && this.allObj.storeResult && this.allObj.storeResult.totalSize > 5)) {
        setTimeout(() => {
          self.onSearch('pullUp')
        }, 100)
      } else {
        this.loading = false
      }
    },
    goShopDetail (item) {
      this.$router.push({name: 'ShopDetail', params: {id: item.id}})
    },
    goGoodsDetail (item) {
      this.$router.push({name: 'GoodsDetail', params: {id: item.id}})
    },
    clearSearchRecord () {
      localStorage.removeItem('searchRecord')
      this.$toast('历史记录已删除')
      this.getSearchRecord()
    },
    nameSearch (item) {
      this.keyword = item
      console.log(this.keyword)
      this.onSearch()
    },
    getSearchRecord () {
      if (localStorage.getItem('searchRecord')) {
        this.getSearchRecordList = localStorage.getItem('searchRecord').split(',')
      } else {
        this.getSearchRecordList = []
      }
    },
    onSearch (type) {
      this.on = true
      console.log(type)
      if (type === 'pullUp') {
        this.pageNumber++
        const data = {
          keyword: this.keyword,
          scope: this.scope,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
        homeApi.getSearchResults(data).then(res => {
          let goodsArr = res.data.content.goodsResult.items
          let storeArr = res.data.content.storeResult.items
          this.goodsList = this.goodsList.concat(goodsArr)
          this.storeList = this.storeList.concat(storeArr)
          if (goodsArr.length < this.pageSize && storeArr.length < this.pageSize) {
            this.finished = true // 不在触发接口
          }
          this.loading = false
        })
      } else {
        const data = {
          keyword: this.keyword,
          scope: this.scope,
          pageNumber: 1,
          pageSize: 5
        }
        homeApi.getSearchResults(data).then(res => {
          this.allObj = res.data.content
          if (res.data.content.goodsResult) {
            this.goodsList = res.data.content.goodsResult.items
          }
          if (res.data.content.storeResult) {
            this.storeList = res.data.content.storeResult.items
          }
          this.loading = false
        })
      }
      if (localStorage.getItem('searchRecord')) {
        const arr = localStorage.getItem('searchRecord').split(',')
        if (arr.findIndex((v) => {
          return v === this.keyword
        }) === -1) {
          arr.push(this.keyword)
          localStorage.setItem('searchRecord', arr)
        }
      } else {
        const arr = []
        arr.push(this.keyword)
        localStorage.setItem('searchRecord', arr)
      }
      this.getSearchRecord()
    },
    onCancel () {
      this.$router.go(-1)
      console.log('sdas')
    },
    checkGoods () {
      this.$router.push({name: 'MoreGoods', params: {keyword: this.keyword}})
    },
    MoreShop () {
      this.$router.push({name: 'MoreShop', params: {keyword: this.keyword}})
    }
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .swipe-text {
    z-index: 99;
    position: fixed;
    top: 2rem;
    margin-top: 0.24rem;
    margin-left: 0.16rem;
    line-height: 1rem;
    font-size: 0.24rem;
    /*width:4.04rem;*/
    height:0.44rem;
    background:rgba(0,0,0,1);
    opacity:0.45;
    border-radius:0.22rem;
    display: flex;
    align-items: center;
    /*justify-content: center;*/
    img {
      margin-left: 0.14rem;
      margin-right: 0.1rem;
      width: 0.24rem;
      height: 0.2rem;
      /*vertical-align: middle;*/
    }
    .font {
      margin-right: 0.1rem;
      width: 100%;
      height: 100%;
      line-height: 0.4rem;
      font-size:0.2rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      flex-wrap: nowrap;
      overflow: hidden;
    }
  }
  .search-content {
    /*padding: 0 0.3rem;*/
    .search-content-title {
      display: flex;
      justify-content: space-between;
      padding: 0.37rem 0.3rem;
      /*width:7.5rem;*/
      /*height:0.8rem;*/
      background:rgba(255,255,255,1);
      .title {
        font-size:0.28rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      .clear {
        font-size:0.28rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,81,122,1);
      }
    }
    .no-content {
      margin-top:30%;
      img{
        margin: 0 auto;
        width: 2rem;
        height: 2rem;
        display: block;
      }
      .font {
        text-align: center;
        font-size:0.28rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(102,102,102,1);
      }
    }
    .search-content-history {
      padding: 0 0.5rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .tag {
        margin-right: 0.2rem;
        margin-top: 0.2rem;
      }
    }
    .search-content-results {
      .results-title {
        display: flex;
        justify-content: space-between;
        padding: 0.37rem 0.3rem;
        /*width:7.5rem;*/
        /*height:0.8rem;*/
        background:rgba(255,255,255,1);
        .title {
          font-size:0.28rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
        .clear {
          font-size:0.24rem;
          font-family:PingFang-SC-Medium;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
      }
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
            height: 0.9rem;
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
            .icon {
              text-align: center;
              width:0.7rem;
              height:0.28rem;
              line-height: 0.28rem;
              background:rgba(255,81,122,1);
              border-radius:0.14rem;
              font-size:0.2rem;
              font-family:PingFang-SC-Medium;
              font-weight:500;
              color:rgba(255,255,255,1);
              margin-top: 0.06rem;
              margin-left: 0.13rem;
            }
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
            display: flex;
            .icon {
              text-align: center;
              width:0.7rem;
              height:0.28rem;
              line-height: 0.28rem;
              background:rgba(255,81,122,1);
              border-radius:0.14rem;
              font-size:0.2rem;
              font-family:PingFang-SC-Medium;
              font-weight:500;
              color:rgba(255,255,255,1);
              margin-top: 0.06rem;
              margin-left: 0.13rem;
            }
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
  }

</style>
