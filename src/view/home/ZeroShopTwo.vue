<template>
  <div style="background: rgb(255,193,214);">
    <TopNav name="新品体验"></TopNav>
    <div class="zeroShop">
      <img
        class="share"
        src="../../assets/home/ic_share@3x.png"
        alt
        @click="shareShow=true"
      />
      <van-popup
        v-model="shareShow"
        round
        position="bottom"
        :style="{ height: '30%'}"
      >
        <img
          class="share_close"
          src="../../assets/share/tanc_close_n.png"
          alt
          @click="shareShow=false"
        />
        <p class="share_title">你喜欢那就分享给你朋友吧</p>
        <div class="share_btn_box">
          <div>
            <img
              class="share_icon"
              src="../../assets/share/share_tanc_haoyou_n.png"
              alt
            />
            <span>分享好友</span>
          </div>
          <div>
            <img
              class="share_icon"
              src="../../assets/share/share_tanc_qun_n.png"
              alt
            />
            <span>分享群</span>
          </div>
          <div>
            <img
              class="share_icon"
              src="../../assets/share/share_tanc_pic_n.png"
              alt
            />
            <span>分享图片</span>
          </div>
        </div>
      </van-popup>
      <div class="banner">
        <div class="b_title">新品免费体验</div>
        <div class="b_num">{{zeroInfo.grabbedNumber}}人已抢到</div>
      </div>
      <div class="description">每天10~11点 ,14~15点 ,21~22点三场，每场2000份</div>
      <div class="zero_good_list_box_bg">
        <div class="zero_good_list_box">
          <!-- 2-进行中；3-已中断；4-已结束 -->
          <p class="pf">{{zeroInfo.status==2?'据本场结束 '+outCountdown:zeroInfo.status==3?'活动暂时中断，请等待哦':zeroInfo.status==4?'活动已经结束':'活动暂未开始，请等待哦'}}</p>
          <p class="ps">需要支付一分钱，支付成功后立刻返还至余额，每期新品限领一份，分享好友即可在领取一份。每人最多领取两份，系统若判定刷单将不予发货!</p>
          <div class="zero_good_list">
            <van-swipe
              :autoplay="3000"
              :indicator-color="'#FF607B'"
            >
              <van-swipe-item
                @click="goZeroDetail(good)"
                v-for="(good, index) in zeroInfo.goodsItems"
                :key="index"
              >
                <div class="zero_good">
                  <div class="zero_good_info">
                    <div>
                      <img
                        :src="good.imageUrls"
                        alt
                      />
                    </div>
                    <p>{{good.name}}</p>
                    <span>原价：￥{{good.orgPrice}}</span>
                    <img
                      style="width:.58rem;height:.58rem;position: absolute;bottom: .1rem;right:.5rem"
                      src="../../assets/goods/ic_more.png"
                      alt
                    />
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
            <p class="more">更多新品，即将上线，敬请期待</p>
          </div>
        </div>
      </div>
    </div>

    <van-dialog
      class="share-dialog"
      closeOnClickOverlay
      v-model="show22"
      :showConfirmButton="false"
      :before-close="closeTutorial"
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
import TopNav from "@/components/TopNavTwo";
import homeApi from "@/api/home";
import * as types from "@/store/mutation-types";
import { log } from "util";
export default {
  name: "ZeroShop",
  components: {
    TopNav
  },
  data() {
    return {
      shareShow: false,
      show22: true, // show22 就是show  暂时不显示 (懒得写 )
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
    this.show22 = !localStorage.getItem("two");

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
    this.show = !localStorage.getItem("zeroTwo");
    localStorage.setItem("zeroTwo", true);
    this.getFreeShopping();
  },
  computed: {
    outCountdown() {
      let h = this.countDown / (1000 * 60 * 60);
      let m = (this.countDown % (1000 * 60 * 60)) / (1000 * 60);
      let s = (this.countDown % (1000 * 60)) / 1000;

      return (
        parseInt(h) +
        ":" +
        (parseInt(m) < 10 ? "0" + parseInt(m) : parseInt(m)) +
        ":" +
        (parseInt(s) < 10 ? "0" + parseInt(s) : parseInt(s))
      );
    }
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
    },
    closeTutorial(action, done) {
      done();
      localStorage.setItem("two", "yes");
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
  background-image: url("../../assets/home/bg@3x.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position-y: -5px;
  height: 100%;
  min-height: 13rem;
  position: relative;
  .share {
    position: absolute;
    right: 0;
    top: 0.5rem;
    width: 1.2rem;
    height: 0.7rem;
  }
  .share_title {
    font-size: 0.32rem;
    text-align: center;
    margin-top: 0.8rem;
  }
  .share_btn_box {
    display: flex;
    font-size: 0.28rem;
    justify-content: space-around;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .share_icon {
      width: 1.3rem;
      margin-top: 0.6rem;
      margin-bottom: 0.2rem;
    }
  }
  .share_close {
    width: 0.44rem;
    height: 0.44rem;
    position: absolute;
    top: 0.1rem;
    right: 0.2rem;
  }
  .banner {
    height: 7.1rem;
    width: 100%;
    color: #fff;
    .b_title {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-top: 0.4rem;
      font-size: 0.56rem;
      font-family: PingFang SC;
      font-weight: bold;
      text-shadow: 0px 5px 10px rgba(197, 63, 85, 0.25);
    }
    .b_num {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 0.06rem;
      font-size: 0.24rem;
      font-weight: bold;
    }
  }
  .description {
    font-size: 0.26rem;
    font-family: PingFang SC;
    -webkit-text-stroke: 0.5px #fff;
    font-weight: bold;
    color: #ff607b;
    display: flex;
    justify-content: center;
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
  .zero_good_list_box_bg {
    box-sizing: border-box;
    margin-top: 0.2rem;
    width: 100%;
    height: 13rem;
    padding: 0 0.2rem;
    .zero_good_list_box {
      width: 100%;
      height: 100%;
      background-image: url("../../assets/home/card_bg@3x.png");
      background-size: 100% auto;
      background-repeat: no-repeat;
      .pf {
        text-align: center;
        font-size: 0.38rem;
        padding-top: 0.25rem;
        font-family: Adobe Heiti Std;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        text-shadow: 0px 3px 5px rgba(232, 169, 136, 0.63);
      }
      .ps {
        width: 80%;
        margin-left: 10%;
        margin-top: 1rem;
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(240, 142, 150, 1);
        line-height: 0.4rem;
      }
      .zero_good_list {
        width: 86%;
        height: 450px;
        background-image: url("../../assets/home/card@3x.png");
        background-size: 100% auto;
        background-repeat: no-repeat;
        margin-top: 10px;
        margin-left: 7%;
        .van-swipe {
          width: 96%;
          margin-left: 2%;
        }
        .zero_good {
          width: 100%;
          height: 8rem;
          .zero_good_info {
            width: 100%;
            height: 93%;
            box-sizing: border-box;
            padding: 0.5rem 0.5rem 0 0.5rem;
            position: relative;
            div {
              width: 100%;
              height: 75%;
              overflow: hidden;
              border-radius: 0.08rem;
              img {
                width: 100%;
                height: auto;
              }
            }
            p {
              width: 96%;
              margin-left: 2%;
              font-size: 0.29rem;
              font-family: PingFang SC;
              font-weight: bold;
              letter-spacing: 1px;
              color: rgba(51, 51, 51, 1);
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            span {
              font-size: 0.38rem;
              letter-spacing: 4px;
              color: #ff607b;
              position: absolute;
              bottom: 0.1rem;
            }
          }
        }
        .more {
          margin-top: 0.8rem;
          font-size: 0.3rem;
          text-align: center;
          width: 100%;
          color: rgba(255, 255, 255, 1);
          text-shadow: 0px 2px 2px rgba(200, 82, 92, 0.7);
        }
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
