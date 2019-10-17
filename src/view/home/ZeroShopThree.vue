<template>
  <div style="background: rgb(255,193,214);overflow-x: hidden;">
    <TopNav name="新品体验"></TopNav>
    <!-- 分享图片 -->
    <div
      v-if="sDomShow&&infoz"
      id="snapshotZ"
    >
      <!-- 0元购 -->

      <div class="title">"Free Buy"，自由买，免费拿</div>
      <div class="info_box">
        <img
          src="../../assets/home/partner.png"
          class="icon"
          alt=""
        >
        <div
          v-if="infoz.inviterCode"
          class="code"
        >
          我的邀请码：{{infoz.inviterCode}}
        </div>
        <div class="img-box">
          <div class="robbed">参与人数:{{infoz.participants}}</div>
          <img
            class="goods-img"
            src="../../assets/home/zero2_share_img.png"
            alt
          />
        </div>
        <div class="img-box-bot">
          <div class="price">￥<span class="num">{{infoz.price}}</span></div>
          <div class="back-box">参与返￥{{infoz.cashBack}}</div>
        </div>
        <div class="snapshot-tips">{{infoz.desc}}</div>
      </div>
      <img
        class="solar-code"
        :src="infoz.appletQrCodeUrl"
        alt
      />
      <div class="solar-code-tips">长按保存图片或识别二维码查看</div>
    </div>
    <!-- 信用卡 -->
    <div
      v-if="sDomShowC && infoc"
      id="snapshotC"
    >
      <div class="title">"Free Buy"，自由买，免费拿</div>
      <div class="info_box">
        <img
          src="../../assets/home/partner.png"
          class="icon"
          alt=""
        >
        <div
          v-if="infoc.inviterCode"
          class="code"
        >
          我的邀请码：{{infoc.inviterCode}}
        </div>
        <div class="img-box">
          <div class="robbed">参与人数:{{infoc.participants}}</div>
          <img
            class="goods-img"
            src="../../assets/home/card_share_img.png"
            alt
          />

        </div>
        <div class="img-box-bot">
          <span class="card_text">活动需支付1分钱，即可返还到账户内</span>
        </div>
        <div class="snapshot-tips">{{infoc.desc}}</div>
      </div>

      <img
        class="solar-code"
        :src="infoc.appletQrCodeUrl"
        alt
      />
      <div class="solar-code-tips">长按保存图片或识别二维码查看</div>
    </div>
    <!-- 分享图片完 -->
    <div class="zeroShop">
      <!-- 分享按钮 -->
      <img
        class="share"
        src="../../assets/home/ic_share@3x.png"
        alt
        @click="snapshot"
        style="display:none"
      />

      <div class="banner">
        <div class="b_title">新品免费体验</div>
        <div class="b_num">{{showInfo.status==2?showInfo.grabbedNumber+'人已抢到':'未开始'}}</div>
      </div>

      <div class="chose_way">
        <div
          class="way_bas s1"
          :class="showGoods == 2?'way_chosed':'way'"
          @click="changeShowGoods(2)"
        >
          <span>信用卡用户免费领</span>
        </div>
        <div
          class="way_bas s2"
          :class="showGoods == 1?'way_chosed':'way'"
          @click="changeShowGoods(1)"
        >
          <span>新人免费领</span>
        </div>
        <div
          class="way_bas s3"
          :class="showGoods == 4?'way_chosed':'way'"
          @click="changeShowGoods(4)"
        >
          <span>FreeBuy首单免费领</span>
        </div>
      </div>
      <div class="description">{{showGoods==1?'每天10~11点 ,14~15点 ,21~22点三场，每场2000份':' '}}</div>
      <div class="zero_good_list_box_bg">
        <div class="zero_good_list_box">
          <!-- 2-进行中；3-已中断；4-已结束 -->
          <!-- +outCountdown -->
          <p class="pf">{{zeroActivityText[showInfo.status]}}</p>
          <p class="ps">{{zeroGoodText[showGoods-1]}}</p>
          <div class="zero_good_list">
            <div class="box">
              <div
                class="good"
                v-for="(good, index) in showInfo.goodsItems"
                :key="index"
              >
                <div class="good_left">
                  <img
                    :src="good.imageUrls"
                    alt=""
                  >
                </div>
                <div class="good_right">
                  <p class="good_right_name">{{good.name}} </p>
                  <p class="good_right_price">原价：￥<span class="num">{{good.orgPrice}}</span></p>
                  <p
                    class="good_right_btn"
                    @click="goZeroDetail(good)"
                  >免费拿</p>
                </div>
              </div>
            </div>
            <p class="more">更多新品，即将上线，敬请期待</p>
          </div>
        </div>
      </div>
    </div>
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

    <van-dialog
      closeOnClickOverlay
      v-model="showShareZ"
      :showConfirmButton="false"
    >
      <img
        id="shareImg"
        src
        alt
      />
    </van-dialog>
    <van-dialog
      closeOnClickOverlay
      v-model="showShareC"
      :showConfirmButton="false"
    >
      <img
        id="shareImgC"
        src
        alt
      />
    </van-dialog>
    <!-- 消息弹框 -->
    <van-popup
      v-model="showRule"
      round
      :style="{ height: '4.5rem',
      width:'5.9rem',
      fontSize:'.28rem',
      padding:'.44rem' }"
    >
      <p class="pop_title">提示</p>
      <p>首次体验freebuy，送好礼条件<br>
        1、用freebuy的方式购买一个原价大于N元
        的商品或用freebuy的方式消费N次即可免费
        领取一份礼品。<br>
        2、达成条件后每人仅限一次免费领取机会<br>
        3、领取时间不限制<br>
        4、活动最终解释权归寻草记商城所有</p>
    </van-popup>
  </div>
</template>

<script>
import TopNav from "@/components/TopNavTwo";
import homeApi from "../../api/home";
import wxApi from "@/api/wx"
import * as types from "@/store/mutation-types";
import { log } from "util";
import dom2image from "dom-to-image";
import { resolve } from 'url';
export default {
  name: "ZeroShop",
  components: {
    TopNav
  },
  data() {
    return {
      shareShow: false,
      show: true,
      sDomShow: true,
      sDomShowC: true,
      infoz: null,
      infoc: null,
      showShareZ: false,
      showShareC: false,
      show2: false,
      goHomeShow: false,
      countDown: null,
      countDown2: null,
      countDown3: null,
      zeroInfo: {},
      creditInfo: {},
      freeInfo: {},
      hours: [],
      minutes: [],
      seconds: [],
      haoSeconds: [],
      showGoods: 2,
      zeroGoodText: ['需支付1分钱，支付成功后立刻返还至余额;每期新品限领一份，分享好友即可再领一份。', '需要支付1分钱（用信用卡支付），支付成功后立刻返还至余额，仅限领取一份。', ' ', ' '],
      zeroActivityText: ['', '活动暂未开始，请等待哦', '本活动正在进行中', '活动暂时中断，请等待哦', '活动已经结束'],
      showRule: false,
    };
  },
  created() {
    if (this.$route.query.type) {
      this.showGoods = this.$route.query.type;
    }
    this.show = !localStorage.getItem("zeroTwo");
    localStorage.setItem("zeroTwo", true);
    this.getWeChatSnapshot();
    this.getWeChatSnapshot2();
    this.getFreeShopping();
    this.getFreeShopping2();
    this.getFreeShopping3();

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
    if (window.webkit && window.webkit.messageHandlers.goLogin && window.webkit.messageHandlers.initDataZero) {
      window.webkit.messageHandlers.initDataZero.postMessage(0, this.showGoods);
    }
    if (window.wv) {
      window.wv.initDataZero(0, this.showGoods);
    }
  },
  computed: {
    outCountdown() {
      let time = null;

      if (this.showGoods == 1) {
        time = this.countDown;
      } else if (this.showGoods == 2) {
        time = this.countDown2;
      }

      let h = time / (1000 * 60 * 60);
      let m = (time % (1000 * 60 * 60)) / (1000 * 60);
      let s = (time % (1000 * 60)) / 1000;

      return (
        parseInt(h) +
        ":" +
        (parseInt(m) < 10 ? "0" + parseInt(m) : parseInt(m)) +
        ":" +
        (parseInt(s) < 10 ? "0" + parseInt(s) : parseInt(s))
      );
    },
    showInfo() {
      if (this.showGoods == 1) {
        return this.zeroInfo;
      } else if (this.showGoods == 2) {
        return this.creditInfo;
      } else {
        return this.freeInfo;
      }
    }
  },
  methods: {
    /**
     * 跳转详情
     */
    goZeroDetail(item) {
      if (this.showGoods == 4) {
        const data = {
          type: 4,
          goodsId: item.id
        }
        homeApi.validateRole(data).then(res => {
          if (res.status == 200 && res.data.messageCode != 'MSG_1001') {
            this.$dialog.alert({ title: '提示', message: res.data.message });
            return;
          }
        })
      }
      if (window.webkit && window.webkit.messageHandlers.goLogin && window.webkit.messageHandlers.goDetail) {
        window.webkit.messageHandlers.goDetail.postMessage(JSON.stringify({ type: this.showGoods, id: item.id }));//id,type
      }
      if (window.wv) {
        window.wv.goToDetail(item.id, this.showGoods);
      }
      this.$router.push({ name: "ZeroShopDetail", params: { id: item.id }, query: { type: this.showGoods } });
    },
    /**
    *新人免费领
     */
    getFreeShopping() {
      const data = {
        mode: 2,
        type: 1
      };
      homeApi.getFreeShopping(data).then(res => {
        if (res.data.content) {
          this.zeroInfo = res.data.content;//list赋值
          this.countDown = this.zeroInfo.remainingTime;//倒计时
          this.formatDuring(this.countDown);//格式化倒计时
          //开始倒计时
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
    /**
    信用卡用户免费领
     */
    getFreeShopping2() {
      const data = {
        mode: 2,
        type: 2
      };
      homeApi.getFreeShopping(data).then(res => {
        if (res.data.content) {
          this.creditInfo = res.data.content;
          this.countDown2 = this.creditInfo.remainingTime;
          this.formatDuring(this.countDown2);
          let interval2 = setInterval(() => {
            if (this.countDown2 > 0) {
              this.countDown2 -= 1000;
              this.formatDuring(this.countDown2);
            } else {
              clearInterval(interval2);
            }
          }, 1000);
        }
      });
    },
    /**
     *freebuy用户免费领
     */
    getFreeShopping3() {
      const data = {
        mode: 2,
        type: 4
      };
      homeApi.getFreeShopping(data).then(res => {
        if (res.data.content) {
          this.freeInfo = res.data.content;
          this.countDown3 = this.freeInfo.remainingTime;
          this.formatDuring(this.countDown3);
          let interval3 = setInterval(() => {
            if (this.countDown3 > 0) {
              this.countDown3 -= 1000;
              this.formatDuring(this.countDown3);
            } else {
              clearInterval(interval3);
            }
          }, 1000);
        }
      });
    },
    /**
     * 0元购分享图
     */
    getWeChatSnapshot() {
      const data = {
        mode: 3
      }
      wxApi.weChatSnapshot(data).then(res => {
        if (res.data.content) {
          this.sDomShow = true;
          this.infoz = res.data.content;

          this.convertImgToBase64(this.infoz.appletQrCodeUrl)
            .then(url => {
              this.infoz.appletQrCodeUrl = url;
            })
        }
      })
    },
    /**
     * 信用卡分享图
     */
    getWeChatSnapshot2() {
      const data = {
        mode: 6
      }
      wxApi.weChatSnapshot(data).then(res => {
        if (res.data.content) {
          this.infoc = res.data.content;
          this.convertImgToBase64(this.infoc.appletQrCodeUrl)
            .then(url => {
              this.infoc.appletQrCodeUrl = url;
            })
        }
      })
    },
    /**
     * 解决canvas图片跨域
     */
    convertImgToBase64(url) {
      return new Promise((resolve, reject) => {
        let canvas = document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0);
          let dataURL = canvas.toDataURL('image/png');
          canvas = null;
          resolve(dataURL);
        };
        img.src = url;
      })
    },
    /**
     * 格式化时间
     * 格式化时分秒毫秒后存入数组？
     * 然后页面也没用上？
     */
    formatDuring(mss) {
      const hours = parseInt(mss / (1000 * 60 * 60)).toString();
      this.hours = hours.split("");
      // this.minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
      const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)).toString();
      this.minutes = minutes.split("");
      const seconds = parseInt((mss % (1000 * 60)) / 1000).toString();
      this.seconds = seconds.split("");
      const haoSeconds = parseInt(mss % 60).toString();
      this.haoSeconds = haoSeconds.split("");
    },
    /**
    *dom截图img
    */
    snapshot() {
      let _this = this;
      if (this.showGoods == 1) {
        _this.showShareZ = true;
        let dom = document.getElementById("snapshotZ");
        if (!dom) return;
        dom2image.toPng(dom, { cacheBust: true }).then(url => {
          document.getElementById("shareImg").src = url;
          _this.sDomShow = false;
        });
      } else if (this.showGoods == 2) {
        _this.showShareC = true;
        let dom = document.getElementById("snapshotC");
        if (!dom) return;
        dom2image.toPng(dom).then(url => {
          document.getElementById("shareImgC").src = url;
          _this.sDomShowC = false;
        });

        /* let width = dom.offsetWidth;
        let height = dom.offsetHeight;
        let canvas = document.createElement("canvas");
        // 设置canvas元素属性宽高为 DOM 节点宽高 * 像素比
        let scaleBy = 4;
        canvas.width = width * scaleBy;
        canvas.height = height * scaleBy;
        // 获取画笔
        let context = canvas.getContext("2d");
        context.scale(scaleBy, scaleBy);
        // 设置需要生成的图片的大小，不限于可视区域（即可保存长图）
        html2canvas(document.getElementById("snapshotC"), {
          allowTaint: true,
          scale: scaleBy,
          canvas: canvas, // 自定义 canvas
          logging: true, // 日志开关
          width: width, // dom 原始宽度
          height: height, // dom 原始高度
          useCORS: true
        }).then(function (canvas) {
          var url = canvas.toDataURL("image/png"); // base64数据
          document.getElementById("shareImgC").src = url;
          _this.sDomShowC = false;
        }); */
      } else if (this.showGoods == 3) {
        return;
      }
    },
    changeShowGoods(k) {
      if (window.webkit && window.webkit.messageHandlers.goLogin) {
        window.webkit.messageHandlers.chageType.postMessage(k);
      }
      if (window.wv) {
        console.log(123);
        window.wv.chageType(k);
      }
      this.showGoods = k;
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
  background-position-y: -0.05rem;
  height: 100%;
  min-height: 13rem;
  position: relative;
  max-width: 7.5rem;
  margin: 0 auto;

  .chose_way {
    width: 100%;
    display: flex;
    position: relative;
    right: 0.04rem;
    .way_bas {
      white-space: nowrap;
      font-weight: bold;
      line-height: 0.18rem;
      text-shadow: 0px 3px 3px rgba(203, 74, 119, 0.2);
      box-sizing: border-box;
      border-radius: 0.04rem;
    }
    .way {
      font-size: 0.26rem;
      color: rgba(255, 255, 255, 1);
      border: solid rgba(203, 74, 119, 0.2);
      border-width: 0 0 0.04rem 0;
    }
    .way_chosed {
      font-size: 0.28rem;
      color: rgba(255, 254, 203, 1);
      border: solid rgba(203, 74, 119, 0.2);
      border-width: 0.04rem 0.04rem 0 0.04rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .way_chosed::after {
      width: 0;
      height: 0;
      border-left: 0.45rem solid #fffecb;
      border-right: 0.45rem solid #fffecb;
      border-top: 0.04rem solid #fffecb;
      border-bottom: 0.04rem solid #fffecb;
      border-radius: 0.04rem;
      margin-top: 0.2rem;
      content: "";
    }
    .s1 {
      padding: 0.14rem 0.25rem 0 0.5rem;
    }
    .s2 {
      padding: 0.14rem 0.17rem 0 0.17rem;
    }
    .s3 {
      padding: 0.14rem 0.5rem 0 0.17rem;
    }
    .s3.way_chosed {
      color: #a53e61 !important;
    }
    .s3.way_chosed::after {
      border-color: #a53e61 !important;
    }
  }

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
    margin-top: 0.28rem;
    font-size: 0.26rem;
    font-family: PingFang SC;
    -webkit-text-stroke: 0.015rem #fff;
    font-weight: bold;
    color: #ff607b;
    display: flex;
    justify-content: center;
    white-space: pre;
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
        border-radius: 0.28rem;
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
        white-space: pre-wrap;
      }
      .zero_good_list {
        width: 86%;
        height: 10rem;
        background-size: 100% auto;
        background-repeat: no-repeat;
        margin-top: 10px;
        margin-left: 7%;
        position: relative;
        .box::-webkit-scrollbar {
          display: none;
        }
        .box {
          width: 6rem;
          margin: 0 auto;
          height: 80%;
          overflow-y: scroll;

          .good {
            width: 100%;
            height: 2.9rem;
            background-image: url("../../assets/home/rear_card_bg.png");
            background-size: 100% auto;
            background-repeat: no-repeat;

            box-sizing: border-box;
            padding: 0.36rem;
            display: flex;
            .good_left {
              width: 2.2rem;
              height: 2.2rem;
              border-radius: 0.08rem;
              margin-right: 0.3rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .good_right {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .good_right_name {
                width: 2.83rem;
                font-size: 0.28rem;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .good_right_price {
                color: #ff607b;
                font-size: 0.22rem;
                .num {
                  font-size: 0.24rem;
                  font-weight: bold;
                }
              }
              .good_right_btn {
                color: #fff;
                font-size: 0.26rem;
                text-align: center;
                letter-spacing: 0.02rem;
                box-sizing: border-box;
                padding: 0.1rem 0.42rem;
                width: 2.9rem;
                height: 0.56rem;
                border-radius: 0.28rem;
                background: linear-gradient(
                  0deg,
                  rgba(255, 96, 123, 1) 0%,
                  rgba(255, 170, 184, 1) 100%
                );
              }
            }
          }
        }
        .more {
          position: absolute;
          bottom: 0;
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
#snapshotZ,
#snapshotC {
  position: absolute;
  top: 0;
  z-index: -10;
  text-align: center;
  width: 100%;
  padding-bottom: 1rem;
  max-width: 7.5rem;
  background-color: #fff;
  background-size: 100% auto;
  background-repeat: no-repeat;
  .title {
    margin-top: 0.25rem;
    margin-bottom: 0.1rem;
    font-size: 0.26rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .title::before {
    width: 100%;
    height: 4rem;
    border-radius: 0.22rem 0.22rem 100% 100% / 0.22rem 0.22rem 3rem 3rem;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background-color: rgb(248, 90, 83);
    z-index: -1;
  }
  .info_box {
    width: 86%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 0.16rem;
    box-shadow: 0 0 0.1rem 0.05rem rgba(0, 0, 0, 0.1);
    margin-top: 0.5rem;
    padding: 0.8rem 0 1rem 0;
    position: relative;
    .icon {
      width: 1.28rem;
      height: 1.02rem;
      position: absolute;
      top: 0;
      transform: translateY(-40%) translateX(-50%);
      left: 50%;
    }
    .code {
      font-size: 0.4rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 81, 122, 1);
    }
    .img-box {
      position: relative;
      margin: 0 auto;
      margin-top: 0.1rem;
      width: 85%;
      border: 0.1rem solid #fff;
      border-radius: 0.1rem;
      box-shadow: 0 0 0.2rem 0.01rem #888888;

      .robbed {
        position: absolute;
        top: 0.12rem;
        left: -0.16rem;
        width: 1.9rem;
        height: 0.52rem;
        line-height: 0.48rem;
        text-align: center;
        background-image: url("../../assets/home/tab.png");
        background-size: 100% auto;
        font-size: 0.24rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .goods-img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .img-box-bot {
      display: flex;
      align-items: center;
      width: 100%;
      height: 1rem;
      background-size: 100%;
      .price {
        margin-left: 0.44rem;
        margin-top: 0.4rem;
        font-size: 0.32rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(227, 58, 89, 1);
        transform: scale(1.2, 1.2);
        .num {
          font-size: 0.48rem;
        }
      }
      .back-box {
        width: 1.75rem;
        height: 0.4rem;
        background: rgba(255, 150, 175, 1);
        border-radius: 0.05rem;
        margin-left: 0.26rem;
        margin-top: 0.5rem;
        font-size: 0.24rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .card_text {
        font-size: 0.3rem;
        color: #f85a53;
        font-weight: bold;
        margin: 0 auto;
      }
    }
    .snapshot-tips {
      padding: 0 0.5rem;
      margin-top: 0.26rem;
      margin-bottom: 0.2rem;
      text-align: left;
      font-size: 0.28rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 0.4rem;
    }
  }

  .solar-code {
    width: 2.8rem;
    height: 2.8rem;
    display: block;
    margin: 0 auto;
    margin-top: 0.2rem;
  }
  .solar-code-tips {
    margin-top: 0.2rem;
    font-size: 0.24rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
}
#shareImg,
#shareImgC {
  width: 100%;
}
</style>
