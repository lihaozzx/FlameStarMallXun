<template>
  <div>
    <div class="zero-detail-container">
      <TopNav
        @share="share"
        shareShow="visible"
        name="新人0元购"
      ></TopNav>
      <!--<div @click="$router.push({path: '/'})">回到首页</div>-->

      <div
        v-if="show&&info"
        id="snapshot"
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
            v-if="info.inviterCode"
            class="code"
          >
            我的邀请码：{{info.inviterCode}}
          </div>
          <div class="img-box">
            <div class="robbed">参与人数:{{info.participants}}</div>
            <img
              class="goods-img"
              :src="goodsImgList[0]"
              alt
            />
          </div>
          <div class="img-box-bot">
            <div class="price">￥<span class="num">{{info.price}}</span></div>
            <div class="back-box">参与返￥{{info.cashBack}}</div>
          </div>
          <div class="snapshot-tips">{{info.desc}}</div>
        </div>
        <img
          class="solar-code"
          :src="info.appletQrCodeUrl"
          alt
        />
        <div class="solar-code-tips">长按保存图片或识别二维码查看</div>
      </div>
      <div class="swipe">
        <van-swipe
          :autoplay="3000"
          indicator-color="#FF517A"
        >
          <van-swipe-item
            style="height: 7.5rem"
            v-for="(item, index) in goodsImgList"
            :key="index"
          >
            <img
              class="swipe-img"
              :src="item"
              alt
            />
          </van-swipe-item>
        </van-swipe>
        <div class="time-box">
          <span class="time_text">活动已开始，快来参与吧!</span>
          <!-- <div class="number">{{hours.length > 1 ? hours[0] : 0}}</div>
          <div class="number">{{hours.length > 1 ? hours[1] : hours[0]}}</div>
          <div class="word">时</div>
          <div class="number">{{minutes.length > 1 ? minutes[0] : 0}}</div>
          <div class="number">{{minutes.length > 1 ? minutes[1] : minutes[0]}}</div>
          <div class="word">分</div>
          <div class="number">{{seconds.length > 1 ? seconds[0] : 0}}</div>
          <div class="number">{{seconds.length > 1 ? seconds[1] : seconds[0]}}</div>
          <div class="word">秒</div>
          <div class="number">{{haoSeconds.length > 1 ? haoSeconds[0] : 0}}</div>
          <div class="number">{{haoSeconds.length > 1 ? haoSeconds[1] : haoSeconds[0]}}</div>
          <div class="word">毫秒</div> -->
        </div>
      </div>
      <div class="shop-detail">
        <div class="price-container">
          <div class="left">
            <div style="font-size: 0.24rem;font-family:PingFang-SC-Bold;font-weight:bold;color:#FF2644;">¥</div>
            <div class="price1">{{showPrice}}</div>
            <!-- <img
              style="width: 0.34rem;height: 0.34rem;display: block"
              src="../../assets/home/ic_clock.png"
              alt
            /> -->
            <div
              class="price2"
              v-if="goodsDetail && goodsDetail.expressFee"
            >快递：￥{{goodsDetail && goodsDetail.expressFee}}</div>
            <div
              class="price2"
              v-else
            >包邮</div>
          </div>
          <div class="right">
            <div class="price2">仅剩{{stockQuantity}}件未抢</div>
          </div>
        </div>
        <div class="shop-name">
          <!--<div v-if="goodsDetail.tags && goodsDetail.tags[0] === 1" class="icon">-->
          <!--自营-->
          <!--</div>-->
          <div class="font">{{goodsDetail && goodsDetail.name}}</div>
        </div>
        <QualityCertification zero></QualityCertification>
        <van-cell
          class="preferential2"
          border
          title="请选择商品数量规格"
          @click="goPay"
          is-link
        ></van-cell>
        <!-- <div class="van-hairline--top spec">{{specDesc}}</div> -->
      </div>
      <div class="notice">
        <img
          style="width: 0.36rem;height: 0.33rem;display: inline-block;margin-right: 0.1rem"
          src="../../assets/home/ic_hint.png"
          alt
        />
        <p>{{$route.query.type == 1?'成功邀请好友一起来拿可多得一次0元购机会哟':'微信支付时，请在支付方式内选择信用卡支付，其他方式支付自动退款。'}}</p>
      </div>
      <van-cell
        v-if="userInteractList && userInteractList.length > 0"
        @click="goEvaluation"
        class="margin-top20"
        border
        title="用户评价"
        is-link
      >
        <span style="color: #FF2644">{{userInteract.goodInteractRate}}%</span>
        <span>的人都觉得好</span>
      </van-cell>
      <van-cell
        v-if="userInteractList && userInteractList.length === 0"
        @click="goEvaluation"
        class="margin-top20"
        border
        title="用户评价"
        is-link
      >
        <span>当前暂无用户评价</span>
      </van-cell>
      <div
        v-for="(item, index) in userInteractList"
        :key="index"
        class="evaluation"
      >
        <div class="evaluation-top">
          <img
            src="../../assets/home/pinzhi_list_share_icon@2x.png"
            alt
          />
          <div class="evaluation-top-center">
            <div class="name">{{item.nickname ? item.nickname : 'sds'}}</div>
            <div class="date">{{item.createTime | dateFormat1}}</div>
          </div>
          <div class="evaluation-top-center">
            <div
              class="name"
              style="margin-left: 0.8rem"
            >
              <van-rate
                color="#FF2644"
                readonly
                style="height: 0.37rem"
                v-model="item.score"
              ></van-rate>
            </div>
            <div class="date">{{item.spcDesc}}</div>
          </div>
        </div>
        <div class="evaluation-bottom">{{item.content}}</div>
      </div>
      <!--<div class="shop-info">-->
      <!--<div class="shop-icon">-->
      <!--<img src="../../assets/home/pinzhi_list_share_icon@2x.png" alt="">-->
      <!--</div>-->
      <!--<div class="shop-info-center">-->
      <!--<div class="name">爆品多多 <van-tag round type="danger">自营</van-tag></div>-->
      <!--<div class="rate">店铺评分：3.8分</div>-->
      <!--</div>-->
      <!--<div class="shop-info-right">-->
      <!--<img src="../../assets/goods/search_more_n.png" alt="">-->
      <!--</div>-->
      <!--</div>-->
      <div class="img-font">
        <div
          v-for="(item, index) in goodsDetail.introductions"
          :key="index"
        >
          <img
            class="img"
            v-show="item.resourceType === 2"
            :src="item.content"
            alt
          />
          <div
            class="font"
            v-show="item.resourceType === 1"
          >{{item.content}}</div>
        </div>
      </div>
      <div
        @click="goPay"
        class="pay-btn"
      >免费领取</div>
    </div>
    <van-dialog
      class="share-dialog"
      v-model="shareShow2"
      :closeOnClickOverlay="true"
      :showConfirmButton="false"
    >
      <div class="share-box">
        <p>
          你已经领过一次了 <br>
          分享朋友后，可以再获得一次<br>
          新品免费体验的机会哦~
        </p>
        <img
          class="arrow"
          src="../../assets/home/ic_jiantou.png"
          alt
        />
        <div class="s_btn_box">
          <div>
            <img
              src="../../assets/share/share_tanc_haoyou_n.png"
              alt=""
            >
            <span>分享好友</span>
          </div>
          <div>
            <img
              src="../../assets/share/share_tanc_qun_n.png"
              alt=""
            >
            <span>分享群</span>
          </div>
          <div>
            <img
              src="../../assets/share/share_tanc_pic_n.png"
              alt=""
            >
            <span>分享图片</span>
          </div>
        </div>
        <!-- <div class="content">
          分享给朋友后
          <br />
          <span class="content">可以再次获得0元购的机会哟</span>
        </div>
        <img
          class="arrow"
          src="../../assets/goods/ic_jiantou.png"
          alt
        />
        <img
          class="bg"
          src="../../assets/goods/pic.png"
          alt
        /> 
        <div
          @click="shareShow2 = false"
          class="btn"
        >好的，现在就去</div>-->
      </div>
      <!-- <div class="tips">提示：建议您使用浏览器自带分享功能进行分享</div> -->
    </van-dialog>
    <van-dialog
      closeOnClickOverlay
      v-model="focusShow"
      :showConfirmButton="false"
    >
      <div class="focus-dialog">
        <div class="title">说明</div>
        <div class="tips">
          关注以下公众后获取公众号内验证码并且在下方输
          入后即可获得0元购，并且平台将赠送返现作为奖
          励给您。
        </div>
        <div class="modal-img">
          <div class="modal-img-text">寻草记商城</div>
          <img
            class="modal-img-a"
            src="../../assets/order/public_qr_code.jpg"
            alt
          />
        </div>
        <van-field
          type="number"
          v-model="code"
          placeholder="请输入6位数字"
        >
          <div
            class="qr_label"
            slot="label"
          >公众号验证码：</div>
        </van-field>
        <van-button
          @click="onSave"
          class="saveBtn"
          size="large"
          round
          type="warning"
        >完成</van-button>
      </div>
    </van-dialog>
    <van-dialog
      title="提示"
      message="为了您账户余额安全，请您先设置账户支付密码哦！"
      closeOnClickOverlay
      v-model="setPay"
      show-cancel-button
      confirm-button-color="#FF517A"
      @confirm="goSetPay"
    ></van-dialog>
    <van-dialog
      closeOnClickOverlay
      v-model="shareShow"
      :showConfirmButton="false"
    >
      <img
        id="shareImg"
        src
        alt
      />
      <!--<div class="share-box">-->
      <!--<img src="../../assets/goods/box.png" alt="">-->
      <!--<div class="content">-->

      <!--分享朋友后 <br>-->
      <!--你将获得高额商品<br>-->
      <!--返利奖励-->

      <!--</div>-->
      <!--<div @click="snapshot" class="btn">这就去</div>-->
      <!--</div>-->
      <!--<div class="tips">提示：建议您使用浏览器自带分享功能进行分享</div>-->
    </van-dialog>

    <van-dialog
      v-model="showCreditCardInfo"
      :showConfirmButton="false"
      :close-on-click-overlay="false"
    >
      <div class="creditCardInfo">
        <p class="cci_title">信用卡使用秘籍</p>
        <span class="cci_num"> 1 </span><span class="cci_ttitle">购物——0成本拿商品</span>
        <p class="cci_height_text">用Freebuy，选择1个月内全返，免费拿商品。</p>
        <p class="cci_hui">有5万信用卡，相当于年增加了5千至1万的工资（每月免费拿商品节约的开支，相当于工资增长）。</p>
        <span class="cci_num"> 2 </span><span class="cci_ttitle">急用钱—提现</span>
        <p style="margin-top:0.3rem">随时终止Freebuy，退还到余额提现，免手续费。</p>
        <p :style="canCloseInfo?'margin-bottom:0':'margin-bottom:60px'">不知道买什么，先充值到余额的提现，可免手续费。</p>
        <p
          class="i_know"
          @click="showCreditCardInfo=false"
          v-if="canCloseInfo"
        >我知道了</p>
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

    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      :initial-sku="initialSku"
      :quota="1"
      :custom-stepper-config="{max: 1}"
      :show-add-cart-btn="false"
      :buy-text="'免费领取'"
      @buy-clicked="onBuyClicked"
    >
    </van-sku>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
import homeApi from "@/api/home";
import QualityCertification from "@/components/QualityCertification";
import mineApi from "@/api/mine";
import * as types from "@/store/mutation-types";
import wxApi from "@/api/wx";
import html2canvas from "html2canvas";
import dom2image from "dom-to-image";
import { log } from 'util';
export default {
  name: "ZeroShopDetail",
  components: {
    TopNav,
    QualityCertification
  },
  data() {
    return {
      focusShow: false,
      loading: false,
      finished: false,
      backShow: false,
      countDown: null,
      code: "",
      hours: [],
      minutes: [],
      seconds: [],
      haoSeconds: [],
      goodsImgList: [],
      qualityList: [],
      userInteractList: [],
      userInteract: {},
      rateValue: null,
      goodsDetail: {},
      isOldPasword: false,
      setPay: false,
      goHomeShow: false,
      shareShow: false,
      shareShow2: false,
      info: {},
      specDesc: "",
      show: true,
      noneLogin: true,
      showBase: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: "", // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        // collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s0: "",
        s1: "",
        s2: "",
        // 初始选中数量
        selectedNum: 1
      },
      goods: {
        // 商品标题
        title: "",
        // 默认商品 sku 缩略图
        picture: ""
      },
      showCreditCardInfo: false,//信用卡使用信息
      canCloseInfo: false,
    };
  },
  created() {
    this.getZeroGoodsDeil();
    this.getUserInteract();
    this.weChatSnapshot();
    // 与ios交互
    this.callTokenLostToApp();
    // this.getSystemInfoFromApp()

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
  },
  computed: {
    stockQuantity() {
      let out = 0;
      for (const key in this.goodsDetail.stockDetail) {
        if (this.goodsDetail.stockDetail.hasOwnProperty(key)) {
          const element = this.goodsDetail.stockDetail[key];
          out += element.quantity;
        }
      }
      return out;
    },
    showPrice() {
      let priceArr = [];
      for (const key in this.goodsDetail.stockDetail) {
        if (this.goodsDetail.stockDetail.hasOwnProperty(key)) {
          const element = this.goodsDetail.stockDetail[key];
          priceArr.push(element.dctPrice);
        }
      }
      priceArr.sort((a, b) => a - b);
      return priceArr[0];
    }
  },
  methods: {
    share() {
      this.snapshot();
    },
    weChatSnapshot() {
      const data = {
        mode: this.$route.query.type == 1 ? 2 : 7,
        targetId: this.$route.params.id
      };
      wxApi.weChatSnapshot(data).then(res => {
        this.info = res.data.content;
        this.convertImgToBase64(this.info.appletQrCodeUrl)
          .then(url => {
            this.info.appletQrCodeUrl = url;
          })
      });
    },
    snapshot() {
      let _this = this;
      _this.shareShow = true;
      let dom = document.getElementById("snapshot");
      if (!dom) return;
      dom2image.toPng(dom).then(url => {
        document.getElementById("shareImg").src = url;
        _this.show = false;
      });
      /* let width = dom.offsetWidth;
      let height = dom.offsetHeight;
      let canvas = document.createElement("canvas");
      // 设置canvas元素属性宽高为 DOM 节点宽高 * 像素比
      let scaleBy = 2;
      canvas.width = width * scaleBy;
      canvas.height = height * scaleBy;
      // 获取画笔
      let context = canvas.getContext("2d");
      context.scale(scaleBy, scaleBy);
      // 设置需要生成的图片的大小，不限于可视区域（即可保存长图）
      html2canvas(document.getElementById("snapshot"), {
        allowTaint: true,
        scale: scaleBy,
        canvas: canvas, // 自定义 canvas
        logging: true, // 日志开关
        width: width, // dom 原始宽度
        height: height, // dom 原始高度
        useCORS: true
      }).then(function (canvas) {
        var url = canvas.toDataURL("image/png"); // base64数据
        document.getElementById("shareImg").src = url;
        _this.show = false;
      }); */
    },
    callTokenLostToApp() {
      let u = navigator.userAgent;
      // Android终端
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      // iOS终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      console.log(u);
      if (isAndroid) {
        // window.tokenExpiredTransmit.jsMethod(1)
        // window.closePage.jsMethod(1)
      } else if (isiOS) {
        // window.webkit.messageHandlers.tokenExpiredTransmit.postMessage(1)
        // window.webkit.messageHandlers.closePage.postMessage(1)
      }
    },
    // 从App获取UUID(手机唯一标识)
    getSystemInfoFromApp(cb) {
      let u = navigator.userAgent;
      // Android终端
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      // iOS终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      // IOS 获取UUID
      if (isiOS) {
        // 这段代码是固定的，必须要放到js中
        this.setupWebViewJavascriptBridge();
        // 安卓获取UUID
      } else if (isAndroid) {
        let systemInfo = window.AndroidWebView.getSystemInfoFromApp();
        if (cb && typeof cb === "function") {
          cb(systemInfo);
        } else {
          return systemInfo;
        }
      }
    },
    setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement("iframe");
      WVJBIframe.style.display = "none";
      WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    },
    onSave() {
      if (!this.code) {
        this.$toast("请输入公众号验证码");
        return;
      }
      const data = {
        code: this.code
      };
      wxApi.weChatCheckCode(data).then(res => {
        if (res.data.messageCode === "MSG_1001") {
          this.focusShow = false;
          this.freeShoppingPlaceOrder();
        } else {
          this.$toast(res.data.message);
        }
      });
    },
    getPaymentPasswordStatus() {
      mineApi.getPaymentPasswordStatus().then(res => {
        if (res.data.messageCode === "MSG_2001") {
          this.noneLogin = true;
        } else {
          this.noneLogin = false;
        }
        if (res.data.content === 1) {
          this.isOldPasword = true;
        }
        let u = navigator.userAgent;
        // Android终端
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (this.noneLogin) {
          sessionStorage.setItem(
            "referrer",
            window.location.href.split("/#/")[1]
          );
          if (isiOS) {
            if (window.webkit) {
              window.webkit.messageHandlers.goLogin.postMessage(666);
              return;
            } else {
              this.$router.replace({ name: "Login" });
            }
          } else if (isAndroid) {
            if (window.wv) {
              wv.goLogin(666);
            } else {
              this.$router.replace({ name: "Login" });
            }
          }
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
    freeShoppingPlaceOrder() {
      mineApi.getPaymentPasswordStatus().then(res => {
        if (res.data.messageCode === "MSG_2001") {
          this.noneLogin = true;
        } else {
          this.noneLogin = false;
        }
        if (res.data.content === 1) {
          this.isOldPasword = true;
        }
        let u = navigator.userAgent;
        // Android终端
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (this.noneLogin) {
          sessionStorage.setItem(
            "referrer",
            window.location.href.split("/#/")[1]
          );
          if (isiOS) {
            if (window.webkit && window.webkit.messageHandlers.goLogin) {
              window.webkit.messageHandlers.goLogin.postMessage(666);
              return;
            } else {
              this.$router.replace({ name: "Login" });
            }
          } else if (isAndroid) {
            if (window.wv) {
              wv.goLogin(666);
            } else {
              this.$router.replace({ name: "Login" });
            }
          }
        } else {
          // if (this.isOldPasword) {
          const data = {
            stockId: this.$route.params.id,
            type: this.$route.query.type
          };
          homeApi.freeShoppingPlaceOrderValidate(data).then(res => {
            if (res.data.messageCode === "MSG_1001") {
              if (res.data.content.status === 3) {
                this.focusShow = true;
              } else if (res.data.content.status === 2) {
                this.shareShow2 = true;
              } else {
                const goodsInfo = {
                  activityGoodsId: this.goodsDetail.activityGoodsId,
                  orderType: 3,
                  type: 1
                };
                this.$router.push({
                  name: "Order",
                  params: {
                    goodsInfo: encodeURIComponent(JSON.stringify(goodsInfo))
                  }
                });
              }
            } else if (res.data.message === "请求未授权") {
              sessionStorage.setItem(
                "referrer",
                window.location.href.split("/#/")[1]
              );
              if (isiOS) {
                if (window.webkit && window.webkit.messageHandlers.goLogin) {
                  window.webkit.messageHandlers.goLogin.postMessage(666);
                } else {
                  this.$router.replace({ name: "Login" });
                }
              } else if (isAndroid) {
                if (window.wv) {
                  wv.goLogin(666);
                } else {
                  this.$router.replace({ name: "Login" });
                }
              }
            } else {
              this.$toast(res.data.message);
            }
          });
          // } else {
          //   this.setPay = true
          // }
        }
      });
      // if (!document.cookie || document.cookie.split('token=')[1] === 'null') {
      //   sessionStorage.setItem('referrer', window.location.href.split('/#/')[1])
      //   if (isiOS) {
      //     if (window.webkit) {
      //       window.webkit.messageHandlers.goLogin.postMessage(666)
      //       return
      //     } else {
      //       this.$router.replace({name: 'Login'})
      //     }
      //   } else if (isAndroid) {
      //     if (window.wv) {
      //       wv.goLogin(666)
      //     } else {
      //       this.$router.replace({name: 'Login'})
      //     }
      //   }
      // }
    },
    goSetPay() {
      let u = navigator.userAgent;
      // Android终端
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      // iOS终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS) {
        if (window.webkit && window.webkit.messageHandlers.goLogin) {
          window.webkit.messageHandlers.goSetPwd.postMessage(666);
        } else {
          this.$router.push({ name: "PlayPassword" });
        }
      } else if (isAndroid) {
        if (window.wv) {
          wv.goSetPwd(666);
        } else {
          this.$router.push({ name: "PlayPassword" });
        }
      }
    },
    getZeroGoodsDeil() {
      const data = {
        id: this.$route.params.id,
        type: this.$route.query.type
      };
      homeApi.getfreeShoppingDetail(data).then(res => {
        if (res.data.messageCode === "MSG_1001") {
          this.specDesc = res.data.content.specDesc;
          this.goodsDetail = res.data.content.goodsItem;
          this.setSku();
          this.countDown = res.data.content.remainingTime;
          this.goodsImgList =
            res.data.content && res.data.content.goodsItem.imageUrls;
          this.formatDuring(this.countDown);
          let interval = setInterval(() => {
            if (this.countDown > 0) {
              this.countDown -= 41;
              this.formatDuring(this.countDown);
            } else {
              clearInterval(interval);
            }
          }, 41);
        }
      });
    },
    getUserInteract() {
      const data = {
        pageNumber: 1,
        pageSize: 1,
        goodsId: this.$route.params.id
      };
      homeApi.getUserInteract(data).then(res => {
        this.userInteract = res.data.content;
        this.userInteractList = res.data.content.items;
      });
    },
    setSku() {
      let index = 0;
      for (let i = 0; i < this.goodsDetail.specs.length; i++) {
        let el = this.goodsDetail.specs[i];
        let a = { k: el.name, v: [], k_s: `s${i}` }
        for (let j = 0; j < el.items.length; j++) {
          let jel = el.items[j];
          a.v.push({ id: jel.id, name: jel.name, imgUrl: jel.iconUrl });
        }
        this.sku.tree.push(a);
      }

      for (let i = 0; i < this.goodsDetail.specs.length; i++) {
        if (this.goodsDetail.specs[i]) {
          this.initialSku['s' + i] = this.goodsDetail.specs[i].items[0].id || 0;
        }
      }

      let pkey = '';
      let index3 = 0;
      while (true) {
        if (this.initialSku['s' + index3]) {
          pkey += (index3 > 0 ? ',' : '') + this.initialSku['s' + index3];
          index3++;
        } else {
          break;
        }
      }

      this.sku.price = this.goodsDetail.stockDetail[pkey].dctPrice;
      this.sku.stock_num = this.stockQuantity;

      this.goods = {
        // 商品标题
        title: this.goodsDetail.name,
        // 默认商品 sku 缩略图
        picture: this.goodsDetail.imageUrls[0]
      }

      let arr = [];

      for (const sdet in this.goodsDetail.stockDetail) {
        if (this.goodsDetail.stockDetail.hasOwnProperty(sdet)) {
          const e = this.goodsDetail.stockDetail[sdet];
          let sa = sdet.split(',');
          let obj = {};
          obj.id = e.stockId;
          obj.price = e.dctPrice * 100;
          obj.stock_num = e.quantity;
          for (let i = 0; i < sa.length; i++) {
            if (sa[i]) {
              obj['s' + i] = sa[i];
            }
          }
          arr.push(obj);
        }
      }

      this.sku.list = arr;
    },
    goEvaluation() {
      this.$router.push({
        name: "EvaluationPage",
        params: { id: this.$route.params.id }
      });
    },
    goPay() {
      if (this.$route.query.type == 2 && !window.localStorage.getItem('showCreditCardInfo')) {
        this.showCreditCardInfo = true;
        window.localStorage.setItem('showCreditCardInfo', false);
        setTimeout(() => {
          this.canCloseInfo = true;
        }, 5000);
        return;
      }
      this.showBase = true;
    },
    onBuyClicked(skuData) {
      mineApi.getPaymentPasswordStatus().then(res => {
        if (res.data.messageCode === "MSG_2001") {
          this.noneLogin = true;
        } else {
          this.noneLogin = false;
        }
        if (res.data.content === 1) {
          this.isOldPasword = true;
        }
        let u = navigator.userAgent;
        // Android终端
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (this.noneLogin) {//未登录
          sessionStorage.setItem(
            "referrer",
            window.location.href.split("/#/")[1]
          );
          if (isiOS) {
            if (window.webkit && window.webkit.messageHandlers.goLogin) {
              window.webkit.messageHandlers.goLogin.postMessage(666);
              return;
            } else {
              this.$router.replace({ name: "Login" });
            }
          } else if (isAndroid) {
            if (window.wv) {
              wv.goLogin(666);
            } else {
              this.$router.replace({ name: "Login" });
            }
          }
        } else {
          // 支付校验
          const data = {
            stockId: skuData.selectedSkuComb.id,
            type: this.$route.query.type
          };
          homeApi.freeShoppingPlaceOrderValidate(data).then(res => {
            if (res.data.messageCode === "MSG_1001") {
              if (res.data.content.status === 3) {
                this.focusShow = true;
              } else if (res.data.content.status === 2) {
                this.shareShow2 = true;
              } else {//校验成功，跳转订单页面
                const goodsInfo = {
                  goodsId: this.goodsDetail.id,//商品id
                  stockId: skuData.selectedSkuComb.id,//规格id
                  type: this.$route.query.type,//商品方式1零元购 2信用卡 3freebuy
                  orderType: this.$route.query.type == 1 ? 3 : this.$route.query.type == 2 ? 4 : 0,//3零元购 4信用卡
                  quantity: 1//购买数量
                };
                this.$router.push({
                  name: "Order",
                  params: {
                    goodsInfo: encodeURIComponent(JSON.stringify(goodsInfo))
                  }
                });
              }
            } else if (res.data.message === "请求未授权") {
              sessionStorage.setItem(
                "referrer",
                window.location.href.split("/#/")[1]
              );
              if (isiOS) {
                if (window.webkit && window.webkit.messageHandlers.goLogin) {
                  window.webkit.messageHandlers.goLogin.postMessage(666);
                } else {
                  this.$router.replace({ name: "Login" });
                }
              } else if (isAndroid) {
                if (window.wv) {
                  wv.goLogin(666);
                } else {
                  this.$router.replace({ name: "Login" });
                }
              }
            } else {
              this.$toast(res.data.message);
            }
          });
          // } else {
          //   this.setPay = true
          // }
        }
      });
      // if (!document.cookie || document.cookie.split('token=')[1] === 'null') {
      //   sessionStorage.setItem('referrer', window.location.href.split('/#/')[1])
      //   if (isiOS) {
      //     if (window.webkit) {
      //       window.webkit.messageHandlers.goLogin.postMessage(666)
      //       return
      //     } else {
      //       this.$router.replace({name: 'Login'})
      //     }
      //   } else if (isAndroid) {
      //     if (window.wv) {
      //       wv.goLogin(666)
      //     } else {
      //       this.$router.replace({name: 'Login'})
      //     }
      //   }
      // }
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
  }
};
</script>

<style lang="scss" scoped>
#shareImg {
  width: 100%;
  height: 100%;
  display: block;
}
.preferential2 {
  margin-top: 0.2rem;
  margin-bottom: 0.01rem;
  width: 100%;
  height: 0.9rem;
  display: flex;
  align-items: center;
  background: #fff;
  .icon {
    width: 0.6rem;
    height: 0.36rem;
    display: block;
    margin-right: 0.2rem;
    margin-left: 0.2rem;
  }
  .font {
    font-size: 0.24rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .font2 {
    font-size: 0.24rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #e33a59;
  }
}
#snapshot {
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
.zero-detail-container {
  overflow-x: hidden;
  width: 100%;
  background: #f4f4f4;
  margin-bottom: 1rem;
  .swipe {
    width: 100%;
    height: 7.5rem;
    .time-box {
      position: relative;
      top: -0.5rem;
      left: 0.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 6.9rem;
      height: 0.8rem;
      line-height: 0.8rem;
      background: rgba(255, 186, 0, 1);
      border-radius: 0.4rem;
      .time_text {
        font-size: 0.4rem;
        color: white;
        font-weight: bold;
      }
      .number {
        text-align: center;
        width: 0.44rem;
        height: 0.44rem;
        background: linear-gradient(
          0deg,
          rgba(255, 192, 0, 1) 0%,
          rgba(255, 232, 140, 1) 100%
        );
        box-shadow: 0 0.02rem 0.03rem 0 rgba(100, 75, 0, 0.1);
        border-radius: 0.04rem;
        font-size: 0.4rem;
        font-family: PingFang-SC-Heavy;
        font-weight: 800;
        color: rgba(255, 255, 255, 1);
        line-height: 0.44rem;
        margin-right: 0.05rem;
      }
      .word {
        font-size: 0.3rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 0.34rem;
        margin-left: 0.06rem;
        margin-right: 0.09rem;
      }
    }
    .swipe-img {
      width: 100%;
      height: 7.5rem;
    }
  }
  .shop-detail {
    padding-top: 0.8rem;
    width: 100%;
    /*height:4.20rem;*/
    background: rgba(255, 255, 255, 1);
    .price-container {
      display: flex;
      justify-content: space-between;
      padding: 0 0.3rem 0.2rem 0.3rem;
      /*line-height: 1rem;*/
      .left {
        display: flex;
        align-items: flex-end;
        /*display:table-cell; !*按照单元格的样式显示元素*!*/
        /*vertical-align:bottom; !*底对齐*!*/
        .price1 {
          margin-right: 0.2rem;
          font-size: 0.48rem;
          line-height: 0.5rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: #ff2644;
        }
        .price2 {
          font-size: 0.24rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: #ff2644;
        }
      }
      .right {
        display: flex;
        align-items: flex-end;
        .price2 {
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
    .shop-name {
      padding: 0 0.3rem 0 0.3rem;
      width: 6.88rem;
      /*height:0.75rem;*/
      display: flex;
      .icon {
        text-align: center;
        width: 0.7rem;
        height: 0.28rem;
        line-height: 0.28rem;
        background: #ff2644;
        border-radius: 0.14rem;
        font-size: 0.2rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin-top: 0.06rem;
        margin-right: 0.13rem;
      }
      .font {
        font-size: 0.32rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 0.44rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* ! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
      }
    }
    .icon-item {
      margin-left: 0.3rem;
      width: 100%;
      line-height: 0.68rem;
      height: 0.68rem;
      background: rgba(255, 255, 255, 1);
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
    .spec {
      padding-left: 0.3rem;
      width: 100%;
      height: 0.9rem;
      line-height: 0.9rem;
      background: rgba(255, 255, 255, 1);
      font-size: 0.28rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }
  .notice {
    margin-top: 0.2rem;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    font-size: 0.26rem;
    font-family: PingFang-SC-Bold;
    vertical-align: middle;
    font-weight: bold;
    color: #ff2644;
    display: flex;
    align-items: center;
    img {
      margin: 0.4rem 0.1rem 0.4rem 0.3rem;
    }
    p {
      width: 85%;
      white-space: normal;
    }
  }
  .margin-top20 {
    margin-top: 0.2rem;
  }
  .evaluation {
    padding: 0.3rem 0.3rem 0 0.3rem;
    /*width:7.50rem;*/
    /*height:2.92rem;*/
    background: rgba(255, 255, 255, 1);
    margin-bottom: 0.4rem;
    .evaluation-top {
      height: 1rem;
      clear: both;
      img {
        float: left;
        display: block;
        height: 1rem;
        width: 1rem;
      }
      .evaluation-top-center {
        float: left;
        margin-left: 0.3rem;
        .name {
          height: 0.5rem;
          margin-top: 0.1rem;
          font-size: 0.28rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .date {
          margin-top: 0.1rem;
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
    .evaluation-bottom {
      margin-top: 0.24rem;
      word-break: break-all;
      width: 6.86rem;
      height: 1.1rem;
      overflow: hidden;
      font-size: 0.28rem;
      text-overflow: ellipsis;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.36rem;
    }
  }
  .shop-info {
    margin-top: 0.2rem;
    padding: 0.2rem 0.25rem 0.2rem 0.3rem;
    clear: both;
    /*width:7.50rem;*/
    height: 1rem;
    background: rgba(255, 255, 255, 1);
    .shop-icon {
      float: left;
      width: 1rem;
      height: 1rem;
      border-radius: 8px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .shop-info-center {
      float: left;
      margin-left: 0.3rem;
      .name {
        font-size: 0.28rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .rate {
        margin-top: 0.1rem;
        font-size: 0.22rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }
    }
    .shop-info-right {
      float: right;
      margin-top: 0.22rem;
      width: 0.56rem;
      height: 0.56rem;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .img-font {
    .img {
      width: 100%;
      display: block;
      /*height:10rem;*/
    }
    .font {
      padding: 0.3rem;
      font-size: 0.28rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(125, 116, 106, 1);
      line-height: 0.36rem;
    }
  }
  .pay-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background: #ff2644;
    font-size: 0.36rem;
    font-family: Adobe Heiti Std R;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    text-align: center;
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
.focus-dialog {
  padding: 0.5rem;
  .modal-img {
    margin: 0 auto;
    margin-top: 0.56rem;
    width: 3.8rem;
    height: 3.8rem;
    border: 0.08rem solid #ff2644;
    border-radius: 0.2rem;
  }

  .modal-img-text {
    text-align: center;
    width: 2.4rem;
    height: 0.53rem;
    background: rgba(255, 255, 255, 1);
    position: absolute;
    top: 2.7rem;
    left: 1.98rem;
    font-size: 0.4rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: #ff2644;
  }

  .modal-img img {
    margin-left: 0.24rem;
    width: 3.32rem;
    height: 3.32rem;
    margin-top: 0.2rem;
  }

  .section1 {
    font-size: 0.28rem;
    display: flex;
    margin-top: 0.44rem;
    margin-left: 1.02rem;
    width: 4.4rem;
    border-bottom: 0.02rem solid #ddd;
  }

  .input-price1 {
    margin-top: 0.07rem;
    font-size: 0.28rem;
    color: rgba(51, 51, 51, 1);
  }

  input {
    width: 2rem;
    padding-bottom: 0.06rem;
  }

  button {
    width: 4.4rem;
    height: 0.76rem;
    margin-top: 0.59rem;
    background: #ff6417;
    border-radius: 0.38rem;
    font-size: 0.32rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }

  button::after {
    border: none;
  }
  .qr_label {
    width: 2rem;
  }
  .title {
    margin-bottom: 0.4rem;
    font-size: 0.34rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .tips {
    width: 5.28rem;
    font-size: 0.24rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(170, 170, 170, 1);
    line-height: 0.34rem;
  }
  img {
    margin: 0 auto;
    width: 3.32rem;
    height: 3.32rem;
    display: block;
  }
  .saveBtn {
    display: block;
    margin-bottom: 0.2rem;
    margin-top: 0.6rem;
    margin-left: auto;
    margin-right: auto;
    line-height: 0.8rem;
    width: 4.4rem;
    height: 0.76rem;
    background: #ff6417;
    border-radius: 0.4rem;
  }
}
.share-dialog {
  width: 100%;
  // height: 12rem;
  position: fixed;
  top: 30%;
  left: 50%;
  overflow: hidden;
  font-size: 16px;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 4px;
  background-color: transparent;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  .share-box {
    margin: 2rem auto 0;
    background-image: url("../../assets/home/envelope.png");
    width: 6rem;
    height: 5.13rem;
    background-size: 100% auto;
    p {
      width: 100%;
      text-align: center;
      font-size: 0.4rem;
      color: #fff;
    }
    .s_btn_box {
      width: 100%;
      height: 2rem;
      display: flex;
      margin-top: 1.2rem;
      box-sizing: border-box;
      padding: 0 0.4rem;
      justify-content: space-around;
      div {
        display: flex;
        flex-direction: column;

        img {
          width: 1.15rem;
          height: 1.15rem;
        }
        span {
          margin-top: 0.1rem;
          text-align: center;
          font-size: 0.24rem;
        }
      }
    }
    .arrow {
      position: absolute;
      top: 0;
      right: 0.5rem;
      width: 0.82rem;
      height: 1.32rem;
    }
    .bg {
      width: 6rem;
      height: 5rem;
      margin: 0 auto;
      display: block;
    }
    .content {
      text-align: center;
      font-size: 0.3rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: #fff;
      line-height: 0.44rem;
    }
    .btn {
      width: 3rem;
      height: 0.76rem;
      background: rgba(255, 38, 68, 1);
      color: #fff;
      border-radius: 0.38rem;
      text-align: center;
      line-height: 0.76rem;
      position: absolute;
      top: 50%;
      left: 31%;
    }
  }
  .tips {
    font-size: 0.22rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: white;
    position: absolute;
    top: 67%;
    line-height: 0.34rem;
    left: 16%;
  }
}
.creditCardInfo {
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  padding: 0 0.5rem;
  box-sizing: border-box;
  .cci_title {
    color: #333333;
    font-size: 0.34rem;
    font-weight: bold;
    text-align: center;
    margin: 0.4rem 0 0.6rem 0;
  }
  .cci_height_text {
    margin: 0.3rem 0;
  }
  .cci_hui {
    color: #999999;
    margin-bottom: 0.5rem;
  }
  .cci_num {
    white-space: pre;
    border-radius: 100rem;
    background-color: #ff2644;
    color: #fff;
  }
  .cci_ttitle {
    color: #ff2644;
    margin-left: 0.1rem;
  }
  .i_know {
    width: 50%;
    margin: 15px auto;
    line-height: 30px;
    font-size: 20px;
    text-align: center;
    background-color: #ff2644;
    color: #fff;
    border-radius: 15px;
  }
}
</style>
