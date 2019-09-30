<template>
  <div>
    <van-tabs
      title-active-color="#FF6417"
      color="#FF8D12"
      v-model="active"
      animated
      sticky
      @click="categorieschange"
    >
      <van-tab
        v-for="item in categoriesList"
        :key="item.id"
        :title="item.name"
      >
        <transition name="fade">
          <!-- 某某某购买了xxx -->
          <div
            v-if="visibel"
            class="swipe-text"
          >
            <img
              src="../../assets/home/tzhi_icon.png"
              alt
            />
            <div class="font">{{messageShuffling}}</div>
          </div>
        </transition>
        <!--        <van-swipe-->
        <!--          :duration="2000"-->
        <!--          v-if="messageShufflingList.length > 0"-->
        <!--          class="swipe-text"-->
        <!--          :show-indicators="false"-->
        <!--          :autoplay="3000"-->
        <!--          indicator-color="#FF517A">-->
        <!--          <van-swipe-item-->
        <!--            v-for="(item, index) in messageShufflingList"-->
        <!--            :key="index"-->
        <!--          >-->
        <!--           {{item}}-->
        <!--          </van-swipe-item>-->
        <!--        </van-swipe>-->
        <van-swipe
          v-if="swipeList.length > 0"
          class="swipe"
          :autoplay="3000"
          indicator-color="#FF517A"
        >
          <van-swipe-item
            v-for="(item, index) in swipeList"
            :key="index"
          >
            <img
              v-if="item.imageUrl"
              @click="goPage(item.forwardDest, item.forwardParam)"
              :src="item.imageUrl"
              alt
            />
            <img
              v-else
              @click="goPage(item.forwardDest, item.forwardParam)"
              src="../../assets/lunbo_zhanwt_bg.png"
              alt
            />
          </van-swipe-item>
        </van-swipe>
        <img
          class="swipe"
          v-else
          src="../../assets/lunbo_zhanwt_bg.png"
          alt
        />
        <div v-if="categoryId === 0">
          <div class="security">
            <quality-certification></quality-certification>
          </div>
          <router-link
            :to="{ name: 'ZeroShop' }"
            tag="div"
            v-show="freeShoppingShow"
            class="activity"
          >
            <img
              v-if="bannerInfo"
              :src="bannerInfo.bannerUrl"
              alt
            />
          </router-link>
          <!-- <div @click="goFreeShopping" v-show="freeShoppingShow" class="activity">
            <img v-if="bannerInfo" :src="bannerInfo.bannerUrl" alt />
          </div>-->
          <!-- cashBackObj -->
          <top-title
            v-if="false"
            title="0元购好物"
            rightShow
            :rightNumber="cashBackObj.totalAmount"
            :src="topTitle[0].url"
          ></top-title>
          <span
            class="span"
            v-show="isShow"
          >111</span>
          <div
            v-if="false"
            class="back-box"
          >
            <div
              v-for="(item, x) in cashBackObj.items"
              :key="x"
              @click="goAllBack(item)"
              class="back-item"
            >
              <img
                v-if="item.imageUrls[0]"
                :src="item.imageUrls[0]"
                alt
              />
              <img
                v-else
                src="../../assets/zhanw_tb_n.png"
                alt
              />
              <div class="name">{{item.name}}</div>
              <div class="share">
                <div class="left">
                  返
                  <span>￥{{item.marketingCashBack.totalAmount}}</span>
                  返后价
                  <span>￥{{parseFloat((item.dctPrice - item.marketingCashBack.totalAmount).toFixed(2))}}</span>
                </div>
                <!--<img class="share-img" src="../../assets/home/pinzhi_list_share_icon@2x.png">-->
              </div>
              <!--<div class="describe">最高返<span style="font-size:0.2rem">￥</span><span style="font-size:0.28rem">{{item.marketingCashBack.totalAmount}}</span>-->
              <!--</div>-->
              <!--<div class="number">已抢{{item.grabbed}}</div>-->
            </div>
          </div>
          <top-title
            title="超值一口价"
            :src="topTitle[1].url"
          ></top-title>
          <div class="good-shop">
            <div
              v-for="(item, y) in lowPriceList"
              @click="checkGoodsDeil(item)"
              :key="y"
              class="good-shop-item"
            >
              <img
                v-if="item.imageUrls[0]"
                :src="item.imageUrls[0]"
                alt
              />
              <img
                v-else
                src="../../assets/zhanw_tb_n.png"
                alt
              />
              <div class="price">
                低至
                <span style="font-size:0.2rem">￥</span>
                <span style="font-size:0.28rem">{{item.dctPrice}}</span>
              </div>
            </div>
          </div>
          <!--<TopTitle-->
          <!--title="口碑爆品榜"-->
          <!--:src="topTitle[2].url"-->
          <!--&gt;</TopTitle>-->
          <!--<div class="trend-box">-->
          <!--<div-->
          <!--@click="checkGoodsDeil(item)"-->
          <!--v-for="(item, z) in topSalesList"-->
          <!--:key="z"-->
          <!--class="trend-item">-->
          <!--<div class="left">-->
          <!--<div class="name">{{item.name}}</div>-->
          <!--<div class="number">销量 {{item.sales}}</div>-->
          <!--</div>-->
          <!--<img v-if="item.imageUrls[0]" :src="item.imageUrls[0]" alt="">-->
          <!--<img v-else src="../../assets/zhanw_tb_n.png" alt="">-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <div
          v-if="categoryId !== 0 && categoriesTwoList.length > 0"
          class="two-categories"
        >
          <div
            @click="goCategoriesTwoPage(item)"
            class="two-categories-item"
            v-for="(item, index) in categoriesTwoList"
            :key="index"
          >
            <img
              class="img"
              v-if="item.iconUrl"
              :src="item.iconUrl"
              alt
            />
            <img
              class="img"
              v-else
              src="../../assets/zhanw_tb_n.png"
              alt
            />
            <div class="name">{{item.name}}</div>
          </div>
        </div>
        <top-title
          v-if="categoryId === 0"
          title="销量排行榜"
          :src="topTitle[3].url"
        ></top-title>
        <div v-if="categoryId === 0">
          <van-list
            class="quality-container"
            v-model="loading"
            :finished="finished"
            finished-text="已经到底啦"
            @load="onLoad"
          >
            <!--<div slot="loading">-->
            <!--加载自定义-->
            <!--</div>-->
            <div
              class="quality-item"
              v-for="(item, index2) in qualityList"
              :key="index2"
            >
              <div @click="checkGoodsDeil(item)">
                <img
                  class="img"
                  v-if="item.imageUrls[0]"
                  :src="item.imageUrls[0]"
                  alt
                />
                <img
                  class="img"
                  v-else
                  src="../../assets/zhanw_tb_n.png"
                  alt
                />
                <div class="content">
                  <div class="name">
                    <div
                      v-if="item.tags && item.tags[0] === 1"
                      class="icon"
                    >自营</div>
                    {{item.name}}
                  </div>
                  <div class="price-container">
                    <div class="price1">
                      <span style="font-size:0.24rem">￥</span>
                      <span style="font-size:0.36rem">{{parseFloat((item.dctPrice - item.marketingCashBack.totalAmount).toFixed(2))}}</span>
                    </div>
                    <div class="price2">￥{{item.orgPrice}}</div>
                  </div>
                  <div class="share">
                    <div class="left">
                      <span style="color: #FF8D12">实付</span>
                      <span style="color: #FF2644">￥{{item.dctPrice}}</span>
                      <span style="color: #FF8D12">返</span>
                      <span style="color: #FF2644">￥{{parseFloat((item.marketingCashBack.totalAmount).toFixed(2))}}</span>
                    </div>
                    <!--<img class="share-img" src="../../assets/home/pinzhi_list_share_icon@2x.png">-->
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </div>
        <Conditions
          :active="categoryId"
          :sortBy="sortBy"
          :sortFlag="sortFlag"
          :categoryId="categoryId"
        ></Conditions>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import homeApi from "@/api/home";
import mineApi from "@/api/mine";
import Conditions from "./com/Conditions";
import TopTitle from "./com/TopTitle";
import QualityCertification from "@/components/QualityCertification";

export default {
  name: "Classify",
  components: {
    Conditions,
    QualityCertification,
    TopTitle
  },
  data() {
    return {
      url: "",
      isShow: true,
      loading: false,
      finished: false,
      freeShoppingShow: false,
      categoryId: 0,
      active: 0,
      visibel: false,
      messageShuffling: "",
      messageShufflingList: [], // 消息通知轮播列表
      categoriesList: [], // 1级分类
      categoriesTwoList: [], // 2级分类
      pageNumber: 1,
      pageSize: 20,
      qualityList: [],
      swipeList: [],
      topSalesList: [],
      cashBackObj: {},
      lowPriceList: [],
      sortBy: 1, // 排序分类（1-综合；2-价格；3-上新）
      sortFlag: 1, // 排序方式（1-升序；2-降序）排序方式为价格或上新时，必须提供
      topTitle: [
        {
          url: require("../../assets/home/quanmfan_icon.png")
        },
        {
          url: require("../../assets/home/tuijian_haowu_icon.png")
        },
        {
          url: require("../../assets/home/tuijian_qushi_icon.png")
        },
        {
          url: require("../../assets/home/tuijian_pinzhi_icon.png")
        }
      ],
      bannerInfo: {}
    };
  },
  created() {
    this.categoryId = parseInt(localStorage.getItem("categoryId")) || 0;
    this.getCategoriesList(1);
    if (this.categoryId !== 0) {
      this.getCategoriesList(-1);
    }
    this.getSwipeList();
    this.getBestChoice();
    this.getCashBack();
    this.getLowPrice();
    this.getTopSales();
    this.getFreeShopping();
    this.getPaymentPasswordStatus();
    this.getZeroBanner();
    this.getMessageShuffling();
  },
  methods: {
    getMessageShuffling() {
      const data = {
        pageNumber: 1,
        pageSize: 100000
      };
      homeApi.getTextSlideShow(data).then(res => {
        this.messageShufflingList = res.data.content.items;
      });
      let i = 0;
      setInterval(() => {
        this.visibel = !this.visibel;
        if (this.visibel) {
          i++;
          this.messageShuffling = this.messageShufflingList[i];
        }
      }, 3000);
    },
    getZeroBanner() {
      homeApi.getfreeShoppingEntry().then(res => {
        this.bannerInfo = res.data.content;
      });
    },
    getPaymentPasswordStatus() {
      mineApi.getPaymentPasswordStatus().then(res => {
        if (res.data.content === 1) {
          this.isOldPasword = true;
          localStorage.setItem("payPasword", true);
        }
      });
    },
    goPage(forwardDest, forwardParam) {
      // // forwardDest1-商品详情页；2-商品一级分类页；3-商品二级分类页；4-会员页；5-话题分类页；6-话题详情页；7-充值页；8-商家入驻页
      switch (forwardDest) {
        case 1:
          this.$router.push({
            name: "GoodsDetail",
            params: { id: forwardParam }
          });
          break;
        case 2:
          console.dir(this.categoriesList);
          this.categoryId = forwardParam;
          this.categoriesList.forEach((v, i) => {
            if (v.id === forwardParam) {
              this.active = i;
            }
          });
          // this.$router.push({name: 'Home'})
          break;
        case 3:
          this.$router.push({
            name: "ClassifyTwo",
            params: { id: forwardParam }
          });
          break;
        case 4:
          this.$router.push({ name: "Member" });
          return "待收货";
        case 5:
          return "待评价";
        case 6:
          return "已完成";
        case 7:
          this.$router.push({ name: "AddMoney" });
          break;
        case 8:
          this.$router.push({ name: "MerchantsRegister" });
          break;
      }
    },
    goFreeShopping() {
      this.$router.push({ name: "ZeroShop" });
    },
    checkGoodsDeil(item) {
      this.$router.push({ name: "GoodsDetail", params: { id: item.id } });
    },
    goCategoriesTwoPage(item) {
      this.$router.push({ name: "ClassifyTwo", params: { id: item.id } });
      // this.categoryId = item.id
      // this.getCategoriesGoods()
    },
    goAllBack(item) {
      this.$router.push({ name: "AllBack", params: { id: item.id } });
    },
    getFreeShopping() {
      const data = {
        mode: 1,
        type: 1
      };
      homeApi.getFreeShopping(data).then(res => {
        if (res.data.content) {
          this.freeShoppingShow = true;
        }
      });
    },
    getTopSales() {
      homeApi.getTopSales().then(res => {
        this.topSalesList = res.data.content;
      });
    },
    getLowPrice() {
      homeApi.getLowPrice().then(res => {
        this.lowPriceList = res.data.content;
      });
    },
    getCashBack() {
      const data = {
        statistic: 1,
        pageNumber: 1,
        pageSize: 6
      };
      homeApi.getCashBack(data).then(res => {
        this.cashBackObj = res.data.content;
      });
    },
    getBestChoice(type) {
      if (type === "pullUp") {
        this.pageNumber++;
        const data = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        };
        homeApi.getBestChoice(data).then(res => {
          let arr = res.data.content.items;
          this.qualityList = this.qualityList.concat(arr);
          if (arr.length < this.pageSize) {
            this.finished = true; // 不在触发接口
          }
          this.loading = false;
          console.log(this.qualityList);
        });
      } else {
        const data = {
          pageNumber: 1,
          pageSize: this.pageSize
        };
        homeApi.getBestChoice(data).then(res => {
          this.qualityList = res.data.content.items;
          this.loading = false;
        });
      }
      console.log(this.pageNumber);
    },
    onLoad() {
      let self = this;
      setTimeout(() => {
        self.getBestChoice("pullUp");
      }, 100);
    },
    categorieschange(index, title) {
      this.categoryId = this.categoriesList[index].id;
      localStorage.setItem("categoryId", this.categoryId);
      this.getSwipeList();
      this.pageNumber = 1;
      this.pageSize = 5;
      this.finished = false;
      if (index === 0) {
        this.getCategoriesList(1);
        this.getBestChoice();
      } else {
        this.getCategoriesList(-1);
      }
    },
    getSwipeList() {
      const data = {
        slideShowCategory: this.categoryId === 0 ? 1 : 2,
        goodsCategoryId: this.categoryId
      };
      homeApi.getSwipeList(data).then(res => {
        console.log(res.data.content);
        this.swipeList = res.data.content;
      });
    },
    getCategoriesList(val) {
      if (val === 1) {
        homeApi.getCategoriesList().then(res => {
          console.log(res.data.content);
          this.categoriesList = res.data.content;
        });
      } else {
        const data = {
          parentId: this.categoryId === 0 ? null : this.categoryId
        };
        homeApi.getCategoriesList(data).then(res => {
          this.categoriesTwoList = res.data.content;
          this.categoriesList.forEach((v, i) => {
            if (v.id === this.categoryId) {
              this.active = i;
            }
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.span {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.swipe {
  background: #fff;
  height: 3.2rem;
  display: block;
  img {
    object-fit: cover;
    height: 3.2rem;
    width: 100%;
  }
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
  height: 0.44rem;
  background: rgba(0, 0, 0, 1);
  opacity: 0.45;
  border-radius: 0.22rem;
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
    font-size: 0.2rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    flex-wrap: nowrap;
    overflow: hidden;
  }
}
.security {
  width: 100%;
  /*height:1.20rem;*/
  background: rgba(255, 255, 255, 1);

  .title {
    padding-top: 0.26rem;
    margin-left: 0.3rem;
    margin-bottom: 0.18rem;
    width: 2.07rem;
    height: 0.26rem;
    font-size: 0.28rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(255, 109, 2, 1);
  }

  .icon-item {
    margin-left: 0.3rem;
    display: flex;
    justify-content: flex-start;

    img {
      width: 0.24rem;
      height: 0.24rem;
    }

    .item {
      margin-right: 0.39rem;
      font-size: 0.24rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);
    }
  }
}

.activity {
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  width: 100%;
  height: 1.8rem;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.back-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-left: 0.17rem;
  background: #fff;
  margin-bottom: 0.3rem;
  .back-item {
    width: 2.24rem;
    height: 3.38rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.08rem;
    margin-right: 0.17rem;
    img {
      display: block;
      width: 2.24rem;
      height: 2.24rem;
      border-radius: 0.08rem;
    }
    .name {
      width: 2.24rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 0.1rem;
      font-size: 0.28rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .share {
      /*padding-left: 0.17rem;*/
      /*padding-right: 0.17rem;*/
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
        color: #ff2644;
      }

      .share-img {
        width: 0.44rem;
        height: 0.44rem;
      }
    }
    .describe {
      margin-left: 0.1rem;
      font-size: 0.24rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(227, 58, 89, 1);
    }

    .number {
      position: relative;
      top: -2.8rem;
      left: 0.5rem;
      width: 1.5rem;
      height: 0.3rem;
      text-align: center;
      background: rgba(255, 81, 122, 1);
      opacity: 0.8;
      border-radius: 0.15rem;
      font-size: 0.08rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.good-shop {
  width: 100%;
  overflow-x: scroll;
  background: #fff;
  display: flex;
  padding-left: 0.2rem;
  margin-bottom: 0.3rem;
  .good-shop-item {
    text-align: center;
    margin-right: 0.2rem;
    img {
      display: block;
      width: 1.92rem;
      height: 1.92rem;
      border-radius: 0.08rem;
    }
    .price {
      width: 1.6rem;
      height: 0.44rem;
      line-height: 0.44rem;
      background: #ff2644;
      border-radius: 0.22rem;
      font-size: 0.24rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      margin: 0.3rem auto;
    }
  }
}
.trend-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #fff;
  .trend-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 3.65rem;
    height: 1.5rem;
    background: rgba(248, 248, 248, 1);
    margin-bottom: 0.1rem;
    .left {
      width: 2rem;
      .name {
        font-size: 0.24rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 0.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        padding: 0 0.1rem;
        -webkit-line-clamp: 1;
        /* ! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
      }
      .number {
        font-size: 0.2rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        padding: 0 0.1rem;
      }
    }
    img {
      display: block;
      width: 1rem;
      height: 1rem;
    }
  }
}
.purchase {
  .purchase-title {
    height: 1.08rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(255, 255, 255, 1);
  }
}

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
    margin-bottom: 0.2rem;
    width: 3.48rem;
    /*height: 5rem;*/
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
      /*height: 2.1rem;*/
      border-radius: 0 0 8px 8px;

      .name {
        padding-top: 0.17rem;
        padding-left: 0.17rem;
        font-size: 0.28rem;
        height: 0.78rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #333333;
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

        .price1 {
          padding-left: 0.17rem;
          padding-right: 0.16rem;
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(227, 58, 89, 1);
        }

        .price2 {
          line-height: 0.6rem;
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          text-decoration: line-through;
          color: rgba(153, 153, 153, 1);
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

.two-categories {
  background: #fff;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0.2rem 0.1rem 0 0.1rem;
  margin-bottom: 0.3rem;

  .two-categories-item {
    width: 1.46rem;
    height: 1.72rem;
    background: rgba(255, 255, 255, 1);
    text-align: center;

    .name {
      font-size: 0.24rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }

    .img {
      width: 0.9rem;
      height: 0.9rem;
      margin: 0.2rem auto;
      display: block;
    }
  }
}
</style>
