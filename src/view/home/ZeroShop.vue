<template>
  <div>
    <TopNav name="新人0元购"></TopNav>
    <div class="zeroShop">
      <img
        class="banner"
        src="../../assets/home/banner.png"
        alt
      />
      <!-- <div class="list-box" v-for="(item, index) in zeroInfo.goodsItems" :key="index">
          <div class="list-left">
            <img :src="item.imageUrls[0]" alt="">
          </div>
          <div class="list-right">
            <div class="name">
             {{item.name}}
            </div>
            <div class="price">
              <div class="price1">原价：</div>
              <div class="price2">￥</div>
              <div class="price3">{{item.orgPrice}}</div>
            </div>
            <div @click="show2 = true" class="btn">
              进入公众号免费拿
            </div>
          </div>
      </div>-->
      <div style="position: relative;top: -0.4rem;">
        <van-swipe :loop="false">
          <van-swipe-item
            @click="goZeroDetail(item)"
            v-for="(item, index) in zeroInfo.goodsItems"
            :key="index"
          >
            <div class="zeroDetail">
              <img
                class="zeroDetail-img"
                :src="item.imageUrls[0]"
                alt
              />
              <div class="zeroDetail-name">{{item.name}}</div>
              <div class="tips">
                <div class="word">0元免费领后 还有钱送哦~</div>
                <img
                  class="icon"
                  src="../../assets/goods/ic_more.png"
                  alt
                />
              </div>
              <div class="oldPrice-box">
                <div class="oldPrice">
                  <div class="old">原价</div>
                  <div class="price-box">
                    <div class="symbol">￥</div>
                    <div class="price">{{item.orgPrice}}</div>
                  </div>
                </div>
                <img
                  class="oldPrice-icon"
                  src="../../assets/goods/icon-jianjiao.png"
                  alt
                />
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <van-dialog
      class="share-dialog"
      closeOnClickOverlay
      v-model="show22"
      :showConfirmButton="false"
    >
      <div @click="show=false">
        <img
          class="left"
          src="../../assets/goods/left.png"
          alt
        />
        <img
          class="right"
          src="../../assets/goods/right.png"
          alt
        />
        <div class="font">左右滑动选择商品哦</div>
      </div>
    </van-dialog>
    <van-dialog
      class="share-dialog2"
      v-model="show2"
      :showConfirmButton="false"
    >
      <div>
        <div class="bg">
          <div class="title">进入公众号方法如下</div>
          <div class="step1">
            <span class="font1">1、进入微信点击搜索</span>
            <span class="font2">“寻草记”</span>
            <span class="font1">进入公众号点击</span>
            <span class="font2">“关注”</span>
            <span class="font1">即可免费拿商品哦~</span>
          </div>
          <div class="step2">
            <span class="font1">2、长按保存二维码保存至相册，进入微信后点击</span>
            <span class="font2">“扫一扫”</span>
            <span class="font1">进入公众号点击“关注”即可免费拿商品哦~</span>
          </div>
          <div class="qr_code">
            <img
              src="../../assets/order/public_qr_code.jpg"
              alt
            />
          </div>
        </div>
        <img
          @click="show2=false"
          class="close"
          src="../../assets/goods/vip_close_Pop-ups.png"
          alt
        />
        <!--          <img class="left" src="../../assets/goods/bg3.png" alt="">-->
      </div>
    </van-dialog>
    <div
      v-if="goHomeShow"
      @click="$router.push({name: 'Home'})"
      class="goHome"
    >
      回
      <br />首
      <br />页
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
import homeApi from "@/api/home";
import * as types from "@/store/mutation-types";
export default {
  name: "ZeroShop",
  components: {
    TopNav
  },
  data() {
    return {
      show22: false, // show22 就是show  暂时不显示 (懒得写 )
      show: true,
      show2: false,
      goHomeShow: false,
      countDown: null,
      zeroInfo: {},
      hours: [],
      minutes: [],
      seconds: [],
      haoSeconds: []
    };
  },
  created() {
    if (window.location.href.split("inviterCode=")[1]) {
      this.goHomeShow = true;
      this.$store.commit(
        types.SET_INVITER_CODE,
        window.location.href.split("inviterCode=")[1]
      ); // 直接调用mutations改变值（不可异步）
      // localStorage.setItem('sheInviterCode', window.location.href.split('inviterCode=')[1])
    } else {
      this.$store.commit(types.SET_INVITER_CODE, ""); // 直接调用mutations改变值（不可异步）
      this.goHomeShow = false;
    }
    if (localStorage.getItem("zeroTwo")) {
      this.show = false;
    }
    localStorage.setItem("zeroTwo", true);
    this.getFreeShopping();
  },
  methods: {
    goZeroDetail(item) {
      this.$router.push({ name: "ZeroShopDetail", params: { id: item.id } });
    },
    getFreeShopping() {
      const data = {
        mode: 2,
        type: 1
      };
      homeApi.getFreeShopping(data).then(res => {
        if (res.data.content) {
          this.zeroInfo = res.data.content;
          this.countDown = this.zeroInfo.remainingTime;
          this.formatDuring(this.countDown);
          let interval = setInterval(() => {
            if (this.countDown > 0) {
              this.countDown -= 1000;
              this.formatDuring(this.countDown);
            } else {
              clearInterval(interval);
            }
          }, 1000);
        }
      });
    },
    formatDuring(mss) {
      const hours = parseInt(mss / (1000 * 60 * 60)).toString();
      this.hours = hours.split("");
      // this.minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
      const minutes = parseInt(
        (mss % (1000 * 60 * 60)) / (1000 * 60)
      ).toString();
      this.minutes = minutes.split("");
      const seconds = parseInt((mss % (1000 * 60)) / 1000).toString();
      this.seconds = seconds.split("");
      const haoSeconds = parseInt(mss % 60).toString();
      this.haoSeconds = haoSeconds.split("");
    }
  }
};
</script>

<style lang="scss" scoped>
.share-dialog {
  background-color: transparent;
  .left {
    width: 1.86rem;
    height: 2.5rem;
    display: block;
    position: absolute;
    left: -0.4rem;
    top: 31%;
  }
  .right {
    width: 1.86rem;
    height: 2.5rem;
    display: block;
    position: relative;
    right: -4.8rem;
  }
  .font {
    margin-top: -1rem;
    padding-bottom: 1rem;
    text-align: center;
    font-size: 0.36rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 0.7rem;
  }
}
.share-dialog2 {
  background-color: transparent;
  .bg {
    position: relative;
    margin: 0 auto;
    width: 5.81rem;
    height: 8.63rem;
    background-image: url("../../assets/goods/bg3.png");
    background-size: 100% 100%;
    .title {
      /*width:321px;*/
      height: 1.45rem;
      text-align: center;
      /*margin: 1.03rem auto 0 auto;*/
      font-size: 0.36rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 2.45rem;
    }
    .step1 {
      padding: 0 0.3rem;
      margin: 0.17rem 0.36rem 0 0.36rem;
      /*width:4.7rem;*/
      height: 1.62rem;
      background: rgba(250, 180, 189, 1);
      border-radius: 0.08rem;
      .font1 {
        font-size: 0.3rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 0.45rem;
      }
      .font2 {
        font-size: 0.3rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #d7495b;
        line-height: 0.45rem;
      }
    }
    .step2 {
      padding: 0 0.3rem;
      margin: 0.17rem 0.36rem 0.4rem 0.36rem;
      /*width:5.1rem;*/
      height: 2.07rem;
      background: rgba(250, 180, 189, 1);
      border-radius: 0.08rem;
      .font1 {
        font-size: 0.3rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 0.45rem;
      }
      .font2 {
        font-size: 0.3rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #d7495b;
        line-height: 0.45rem;
      }
    }
    .qr_code {
      margin: 0 auto;
      width: 2.4rem;
      height: 2.4rem;
      background: rgba(250, 180, 189, 1);
      border-radius: 0.08rem;
      text-align: center;
      line-height: 4.4rem;
      img {
        width: 2.18rem;
        height: 2.2rem;
        /*display: block;*/
      }
    }
  }
  .close {
    width: 0.5rem;
    height: 0.5rem;
    display: block;
    margin: 0.32rem auto 0 auto;
  }
}
.zeroShop {
  background: #fcb3bc;
  height: 100%;
  min-height: 13rem;
  .banner {
    height: 4.01rem;
    width: 100%;
  }
  .list-box {
    width: 6.9rem;
    height: 3rem;
    margin: 0 auto 0.29rem auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.08rem;
    display: flex;
    .list-left {
      img {
        margin: 0.3rem 0.33rem 0.3rem 0.24rem;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 0.08rem;
      }
    }
    .list-right {
      .name {
        margin-top: 0.48rem;
        margin-bottom: 0.1rem;
        width: 3.66rem;
        /*height:0.67rem;*/
        height: 0.8rem;
        font-size: 0.28rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #333333;
        line-height: 0.4rem;
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
        align-items: flex-end;
        .price1 {
          font-size: 0.22rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(255, 38, 68, 1);
        }
        .price2 {
          font-size: 0.24rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(255, 38, 68, 1);
        }
        .price3 {
          font-size: 0.36rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(255, 38, 68, 1);
        }
      }
      .btn {
        margin-top: 0.2rem;
        text-align: center;
        line-height: 0.56rem;
        width: 3.7rem;
        height: 0.56rem;
        background: linear-gradient(
          -90deg,
          rgba(255, 100, 23, 1) 0%,
          rgba(255, 154, 104, 1) 100%
        );
        border-radius: 28px;
        font-size: 0.26rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .title {
    text-align: center;
    font-size: 0.3rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: #ff517a;
    line-height: 0.34rem;
    margin-bottom: 0.23rem;
  }
  .zeroDetail {
    width: 6.1rem;
    height: 7.85rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0.05rem 0.1rem 0 rgba(3, 0, 1, 0.1);
    border-radius: 0.08rem;
    margin-bottom: 0.7rem;
    margin-left: auto;
    margin-right: auto;
    .zeroDetail-img {
      margin: 0 auto;
      width: 5.2rem;
      height: 5.2rem;
      display: block;
    }
    .zeroDetail-name {
      margin-top: 0.4rem;
      margin-left: 0.24rem;
      font-size: 0.3rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 0.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      /* ! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
    }
    .tips {
      margin-left: 0.24rem;
      margin-top: 0.32rem;
      padding-bottom: 0.3rem;
      display: flex;
      justify-content: space-between;
      .word {
        font-size: 0.32rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 81, 122, 1);
        line-height: 0.5rem;
      }
      .icon {
        margin-right: 0.38rem;
        width: 0.48rem;
        height: 0.48rem;
        background: rgba(255, 81, 122, 1);
        border-radius: 50%;
      }
    }
    .oldPrice-box {
      position: absolute;
      top: 0.3rem;
      display: flex;
      .oldPrice {
        padding-top: 0.1rem;
        padding-left: 0.2rem;
        padding-right: 0.3rem;
        /*width:1.62rem;*/
        height: 0.76rem;
        background: rgba(255, 141, 18, 1);
        /*border-radius:0 0 0.08rem 0.08rem;*/
        .old {
          font-size: 0.22rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 0.34rem;
        }
        .price-box {
          display: flex;
          .symbol {
            font-size: 0.22rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 0.34rem;
          }
          .price {
            font-size: 0.32rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 0.34rem;
          }
        }
      }
      .oldPrice-icon {
        margin-left: -0.02rem;
        display: block;
        height: 0.86rem;
      }
    }
  }
}
.goHome {
  background: #f4f4f4;
  width: 0.5rem;
  text-align: center;
  height: 1.2rem;
  position: fixed;
  right: 0;
  top: 2rem;
  font-size: 0.24rem;
}
</style>
