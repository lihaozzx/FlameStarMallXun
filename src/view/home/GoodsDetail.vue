<template>
  <div>
    <div v-if="!failure">
      <div class="shop-detail-container">
        <TopNav name="商品详情"></TopNav>
        <div
          v-if="show"
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
        <transition name="fade">
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
        <van-swipe
          @change="onChange"
          show-indicators
          class="swipe"
          :autoplay="3000"
          indicator-color="#FF517A"
        >
          <van-swipe-item
            style="height: 7.5rem"
            v-for="(item, index) in goodsImgList"
            :key="index"
          >
            <img
              v-if="item"
              class="swipe-img"
              :src="item"
              alt
            />
            <img
              v-else
              class="swipe-img"
              src="../../assets/zhanw_tb_n.png"
              alt
            />
          </van-swipe-item>
          <div
            class="swipe-number"
            slot="indicator"
          >{{ current + 1 }}/{{goodsImgList.length}}</div>
        </van-swipe>
        <div class="shop-detail">
          <div class="price-container">
            <div class="left">
              <div class="price1">
                <span style="font-size: 0.24rem">¥</span>
                {{goodsDetail.marketingCashBack && parseFloat((goodsDetail.dctPrice - goodsDetail.marketingCashBack.totalAmount).toFixed(2))}}
              </div>
              <div class="price2">
                <span style="font-size: 0.24rem">¥</span>
                {{goodsDetail && goodsDetail.orgPrice}}
              </div>
            </div>
            <div class="center">
              <span class="price2">快递：¥{{goodsDetail && goodsDetail.expressFee}}</span>
            </div>
            <div class="right">
              <span class="price2">已抢{{goodsDetail && goodsDetail.grabbed}}件</span>
            </div>
          </div>
          <div class="shop-name">
            <div
              v-if="goodsDetail.tags && goodsDetail.tags[0] === 1"
              class="icon"
            >自营</div>
            {{goodsDetail && goodsDetail.name}}
          </div>
          <div
            v-for="(item, index) in goodsDetail && goodsDetail.competitorPrices"
            :key="index"
            class="shop-icon-container"
          >
            <div>
              <img
                v-if="item.mallKey === 'tmall' && item.price > 0"
                class="shop-icon-container-icon"
                src="../../assets/goods/tb_icon.png"
                alt
              />
              <img
                v-if="item.mallKey === 'jd'  && item.price > 0"
                class="shop-icon-container-icon"
                src="../../assets/goods/jd_icon.png"
                alt
              />
              <img
                v-if="item.mallKey === 'kaola'  && item.price > 0"
                class="shop-icon-container-icon"
                src="../../assets/goods/yx_icon.png"
                alt
              />
              <div
                v-if="item.price > 0"
                class="shop-icon-container-font"
              >￥{{item.price}}</div>
            </div>
          </div>
          <QualityCertification></QualityCertification>
          <!--<van-cell-->
          <!--class="van-hairline&#45;&#45;top"-->
          <!--border-->
          <!--@click="backShow = true"-->
          <!--is-link-->
          <!--&gt;-->
          <!--<div slot="title">-->
          <!--分期买返现<span style="color: #E33A59">{{getGoodsDeil.cashBack && getGoodsDeil.cashBack.totalAmount}}</span>元-->
          <!--</div>-->
          <!--已选 {{radio}}-->
          <!--</van-cell>-->
        </div>
        <!--        <div class="preferential2 van-hairline&#45;&#45;bottom">-->
        <!--          <img class="icon" src="../../assets/goods/youhui_bqian.png" alt="">-->
        <!--          <div class="font">-->
        <!--            当前商品将返现-->
        <!--            <span class="font2">{{goodsDetail && goodsDetail.marketingCashBack && goodsDetail.marketingCashBack.totalAmount}}</span>-->
        <!--            元，返后价-->
        <!--            <span class="font2">{{goodsDetail && goodsDetail.marketingCashBack &&parseFloat((goodsDetail.dctPrice - goodsDetail.marketingCashBack.totalAmount).toFixed(2))}}</span>-->
        <!--            元-->
        <!--          </div>-->
        <!--        </div>-->
        <van-cell
          class="preferential2"
          border
          title="请选择商品数量规格"
          @click="goPay"
          is-link
        >库存 {{goodsDetail && goodsDetail.stock}}</van-cell>
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
        <div
          v-for="(item, index) in userInteractList"
          :key="index"
          class="evaluation"
        >
          <div class="evaluation-top">
            <img
              v-if="item.avatarUrl"
              :src="item.avatarUrl"
              alt
            />
            <img
              v-else
              src="../../assets/zhanw_tb_n.png"
              alt
            />
            <div class="evaluation-top-center">
              <div class="name">{{item.nickname}}</div>
              <div class="date">{{item.createTime | dateFormat1}}</div>
            </div>
            <div class="evaluation-top-center">
              <div
                class="name"
                style="margin-left: 0.8rem"
              >
                <van-rate
                  readonly
                  style="height: 0.37rem"
                  v-model="item.score"
                ></van-rate>
              </div>
              <div class="date">{{item.spcDesc}}</div>
            </div>
          </div>
          <div class="evaluation-bottom">{{item.content}}</div>
          <div class="evaluation-img-box">
            <img
              v-for="(item2, index2) in item.interactImageUrlList"
              :key="index2"
              :src="item2"
              alt
            />
          </div>
        </div>
        <div
          @click="goStoreDetail(goodsDetail.store.id)"
          class="shop-info"
        >
          <div class="shop-icon">
            <img
              :src="goodsDetail.store && goodsDetail.store.logoUrl"
              alt
            />
          </div>
          <div class="shop-info-center">
            <div class="name">
              {{goodsDetail.store && goodsDetail.store.name}}
              <van-tag
                v-if="goodsDetail.store && goodsDetail.store.channel === 1"
                round
                type="danger"
                style="background: #FF2644"
              >自营</van-tag>
            </div>
            <div class="rate">店铺评分：{{goodsDetail.store && goodsDetail.store.score}}分</div>
          </div>
          <div class="shop-info-right">
            <img
              src="../../assets/goods/search_more_n.png"
              alt
            />
          </div>
        </div>
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
        <div class="product">
          <div class="line-div">
            <div class="line"></div>
            <div class="line2"></div>
          </div>
          <div class="title">爆品推荐</div>
          <div class="line-div">
            <div class="line"></div>
            <div class="line3"></div>
          </div>
        </div>
        <div>
          <van-list
            class="quality-container"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              class="quality-item"
              v-for="item in categoriesGoodsList"
              :key="item.id"
            >
              <div @click="checkGoodsDeil(item)">
                <img
                  class="img"
                  :src="item.imageUrls[0]"
                />
                <div class="content">
                  <div class="name">{{item.name}}</div>
                  <div class="price-container">
                    <div class="price1">
                      <span style="font-size: 0.24rem">￥</span>
                      {{parseFloat((item.dctPrice - item.marketingCashBack.totalAmount).toFixed(2))}}
                    </div>
                    <div class="price2">{{item.orgPrice}}</div>
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
      </div>
      <van-goods-action>
        <van-goods-action-icon
          @click="severShow = true"
          icon="chat-o"
          text="客服"
        ></van-goods-action-icon>
        <van-goods-action-icon
          :info="cartNum"
          @click="goShopCart"
          icon="cart-o"
          text="购物车"
        ></van-goods-action-icon>
        <van-goods-action-button
          style="background: #FF8898"
          icon="cart-o"
          @click="shareSnapshot"
          :text="getText"
        ></van-goods-action-button>
        <van-goods-action-button
          style="background: #FF2644"
          primary
          text="立即购买"
          @click="goPay"
        ></van-goods-action-button>
      </van-goods-action>
      <van-sku
        v-model="showBase"
        :sku="sku"
        :goods="goods"
        :hide-stock="sku.hide_stock"
        :initial-sku="initialSku"
        :custom-stepper-config="{max: 100}"
        @sku-selected="skuSelected"
        @buy-clicked="buyClicked"
        @add-cart="onAddCartClicked"
      >
        <div
          v-if="cashbackItems && cashbackItems.length > 0"
          class="preferential"
          slot="sku-body-top"
        >
          <img
            class="icon"
            src="../../assets/goods/youhui_bqian.png"
            alt
          />
          <div class="font">
            当前商品实付
            <span class="font2">{{this.dctPrice}}</span>
            元，返
            <span class="font2">{{parseFloat((totalAmount).toFixed(2))}}</span>
            元
          </div>
        </div>
        <div
          v-if="cashbackItems && cashbackItems.length > 0"
          slot="sku-messages"
        >
          <div class="back-box">
            <div class="title">购物返现:</div>
            <div class="back-box-item">
              <div
                v-for="(item, index) in cashbackItems"
                @click="backSelect(item, index)"
                :key="index"
                :class="{active: backSelectIndex === index, item: backSelectIndex !== index}"
              >
                <div class="font">
                  <div v-if="item.period === 0">立即返</div>
                  <div v-if="item.period !== 0">{{item.period}}期返{{item.totalAmount}}</div>
                  <div v-if="item.period === 0">返现{{item.totalAmount}}元</div>
                  <div v-if="item.period !== 0">每期返现{{item.amount}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-sku>
      <div class="payFloat">
        <div class="font">立即购买：省¥{{(goodsDetail.orgPrice - goodsDetail.dctPrice).toFixed(2)}}{{goodsDetail.cashBack && goodsDetail.cashBack.totalAmount ? '，返￥' + goodsDetail.cashBack.totalAmount : ''}}</div>
      </div>
      <van-dialog
        title="提示"
        message="为了您账户余额安全，请您先设置账户支付密码哦！"
        closeOnClickOverlay
        v-model="setPay"
        show-cancel-button
        confirm-button-color="#FF517A"
        @confirm="$router.push({name: 'PlayPassword'})"
      ></van-dialog>
      <van-dialog
        :message="serverPhone"
        closeOnClickOverlay
        v-model="severShow"
        title="客服"
        confirm-button-text="呼叫"
        confirm-button-color="#FF517A"
        @confirm="callPhone(serverPhone)"
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
    <div v-else>
      <TopNav name="商品详情"></TopNav>
      <div
        @click="$router.go(-1)"
        class="empty-div"
      >
        <img
          class="empty-img"
          src="../../assets/goods/shixiao_n.png"
          alt
        />
        <div class="empty-text">商品已失效，轻触屏幕回到首页</div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
import cartApi from "@/api/cart";
import homeApi from "@/api/home";
import mineApi from "@/api/mine";
import QualityCertification from "@/components/QualityCertification";
import * as types from "@/store/mutation-types";
import dom2image from "dom-to-image";
import html2canvas from "html2canvas";
import wxApi from "@/api/wx";
export default {
  name: "GoodsDetail",
  components: {
    TopNav,
    QualityCertification
  },
  data() {
    return {
      current: 0,
      snapshotShow: false,
      shareShow: false,
      severShow: false,
      loading: false,
      finished: false,
      backShow: false,
      visibel: false,
      messageShuffling: "",
      messageShufflingList: [], // 消息通知轮播列表
      goodsImgList: [],
      categoriesGoodsList: [],
      userInteractList: [],
      userInteract: {},
      rateValue: null,
      showBase: false,
      goodsDetail: {},
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: "", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        // collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 商品标题
        title: "",
        // 默认商品 sku 缩略图
        picture: ""
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
      customStepperConfig: {
        // 自定义限购文案
        quotaText: "每次限购xxx件",
        // 自定义步进器超过限制时的回调
        handleOverLimit: data => {
          const { action, limitType, quota, quotaUsed } = data;
          if (action === "minus") {
            this.$toast("至少选择一件商品");
          } else if (action === "plus") {
            // // const { LIMIT_TYPE } = Sku.skuConstants;
            // if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
            //   let msg = `单次限购${quota}件`
            //   if (quotaUsed > 0) msg += `，你已购买${quotaUsed}`
            //   this.$toast(msg)
            // } else {
            //   this.$toast('库存不够了')
            // }
          }
        }
      },
      skuData: {
        // 商品 id
        goodsId: "946755",
        // 留言信息
        // 另一种格式的留言，key 不同
        // 选择的商品数量
        selectedNum: 1,
        // 选择的 sku 组合
        selectedSkuComb: {
          id: 2257,
          price: 100,
          s1: "30349",
          s2: "1193",
          s3: "0",
          stock_num: 111
        }
      },
      info: {},
      show: true,
      dctPrice: null,
      totalAmount: null, // 总返现
      failure: false,
      serverPhone: null,
      goHomeShow: false, // 是否展示去首页按钮
      setPay: false,
      isOldPasword: false, // 是否设置过密码
      cartNum: null, // 购物车数量
      cashbackItems: [], // 分期返的选项
      cashBackId: "", // 分期返现id
      backSelectIndex: "" // 分期返现选中的index
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
    this.getGoodsDeil();
    this.getUserInteract();
    this.getCartCount();
    this.getPaymentPasswordStatus();
    this.getContact();
    this.weChatSnapshot();
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
    weChatSnapshot() {
      const data = {
        mode: 1,
        // targetId: 2
        targetId: this.$route.params.id
      };
      wxApi.weChatSnapshot(data).then(res => {
        this.info = res.data.content;
        // setTimeout(() => {
        //   this.snapshot()
        // }, 1000)
      });
    },
    parseValue: function (value) {
      return parseInt(value, 10);
    },
    getDpr: function () {
      if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio;
      }
      return 1;
    },
    shareSnapshot() {
      if (!document.cookie) {
        sessionStorage.setItem(
          "referrer",
          window.location.href.split("/#/")[1]
        );
        this.$router.replace({ name: "Login" });
      } else {
        this.snapshot();
        // if (this.isOldPasword) {
        //   this.snapshot()
        // } else {
        //   this.setPay = true
        // }
      }
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

      /* let _this = this;
      _this.shareShow = true;
      let dom = document.getElementById("snapshot");
      // let box = window.getComputedStyle(dom)
      // console.log(box)
      // console.log(box.width)
      let width = dom.offsetWidth;
      let height = dom.offsetHeight;
      // let scaleBy = _this.getDpr()
      let canvas = document.createElement("canvas");
      // 设置canvas元素属性宽高为 DOM 节点宽高 * 像素比
      let scaleBy = 2;
      canvas.width = width * scaleBy;
      canvas.height = height * scaleBy;
      // canvas.width = width
      // canvas.height = height
      // 设置canvas css 宽高为DOM节点宽高
      // canvas.style.width = width + 'px'
      // canvas.style.height = height + 'px'

      // 获取画笔
      let context = canvas.getContext("2d");
      context.scale(scaleBy, scaleBy);

      // 设置需要生成的图片的大小，不限于可视区域（即可保存长图）
      let w = document.getElementById("snapshot").style.width;
      let h = document.getElementById("snapshot").style.height;

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
        // var image = new Image()
        // image.src = url
        // console.log(document.getElementById('shareImg'))
        // document.getElementById('shareImg').appendChild(image)
      }); */
    },
    getContact() {
      mineApi.getContact().then(res => {
        this.serverPhone = res.data.content.serviceTel;
      });
    },
    callPhone(phoneNumber) {
      window.location.href = "tel://" + phoneNumber;
    },
    getPaymentPasswordStatus() {
      mineApi.getPaymentPasswordStatus().then(res => {
        if (res.data.content === 1) {
          this.isOldPasword = true;
        }
      });
    },
    goPay() {
      if (!document.cookie) {
        sessionStorage.setItem(
          "referrer",
          window.location.href.split("/#/")[1]
        );
        this.$router.replace({ name: "Login" });
      } else {
        this.showBase = true;
        // if (this.isOldPasword) {
        //   this.showBase = true
        // } else {
        //   this.setPay = true
        // }
      }
    },
    getCartCount() {
      cartApi.getCartCount().then(res => {
        let _a = res.data.content;
        if (_a === 0 || _a === "0") {
          this.cartNum = "";
        } else {
          this.cartNum = _a > 99 ? "99+" : res.data.content;
        }
      });
    },
    getCategoriesGoods() {
      const data = {
        categoryId: this.goodsDetail.categoryId,
        sortBy: 1,
        excludedGoodsId: this.$route.params.id,
        pageNumber: 1,
        pageSize: 10
      };
      homeApi.getCategoriesGoods(data).then(res => {
        this.categoriesGoodsList = res.data.content.items;
      });
    },
    backSelect(item, index) {
      this.totalAmount = item.totalAmount;
      this.cashBackId = item.cashbackId;
      this.backSelectIndex = index;
    },
    swipeChange(index) { },
    onLoad() {
      // // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      this.loading = false;
      //
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    },
    skuSelected(content) {
      if (!content.selectedSkuComb) {
        return;
      }
      const obj = this.goodsDetail.stockDetail;
      for (let i in obj) {
        if (obj[i].stockId === content.selectedSkuComb.id) {
          this.cashbackItems = obj[i].cashbackItems;
          this.dctPrice = obj[i].dctPrice;
          this.cashBackId = this.cashbackItems
            ? this.cashbackItems[0].cashbackId
            : "";
          this.totalAmount = this.cashbackItems
            ? this.cashbackItems[0].totalAmount
            : null;
          this.backSelectIndex = 0;
        }
      }
      this.goods.title = this.goodsDetail.name;
    },
    buyClicked(content) {
      if (this.cashbackItems && !this.cashBackId) {
        this.$toast("请选择分期返");
        return false;
      }
      const goodsInfo = {
        goodsId: this.$route.params.id,
        stockId: content.selectedSkuComb.id,
        quantity: content.selectedNum,
        cashBackId: this.cashBackId,
        orderType: 1
      };
      this.$router.push({
        name: "Order",
        params: { goodsInfo: encodeURIComponent(JSON.stringify(goodsInfo)) }
      });
    },
    onAddCartClicked(skuData) {
      const data = {
        goodsId: this.$route.params.id,
        stockId: skuData.selectedSkuComb.id,
        quantity: skuData.selectedNum,
        cashBackId: this.cashBackId
      };
      cartApi.addShoppingCart(data).then(res => {
        if (res.data.messageCode === "MSG_1001") {
          this.$toast("加入购物车成功");
          this.showBase = false;
          this.getCartCount();
        } else {
          this.$toast(res.data.message);
        }
      });
    },
    getGoodsDeil() {
      const data = {
        id: this.$route.params.id
      };
      const self = this;
      homeApi.getGoodsDeil(data).then(res => {
        if (res.data.messageCode === "MSG_1001") {
          self.failure = false;
          this.goodsDetail = res.data.content;
          const arr = [];
          this.goodsDetail &&
            this.goodsDetail.specs.forEach((v, i) => {
              const obj = {};
              obj.k = v.name;
              obj.v = v.items;
              obj.k_s = "s" + i;
              arr.push(obj);
              this.initialSku[obj.k_s] = v.items[0].id;
              this.initialSku["selectedNum"] = 1;
            });
          this.sku.tree = arr;
          const arr2 = [];
          const obj = this.goodsDetail.stockDetail;
          let str = "";
          const _arr = [];
          const _length = [];
          let a = 0;
          for (let i in obj) {
            const obj2 = {};
            obj2.id = obj[i].stockId;
            obj2.price = obj[i].dctPrice * 100; // 这里是商品图旁边的价格
            obj2.s0 = i.split(",")[0];
            obj2.s1 = i.split(",")[1];
            obj2.s2 = i.split(",")[2];
            obj2.stock_num = obj[i].quantity;
            arr2.push(obj2);
            if (obj[i].quantity) {
              a += 1;
              const arr = i.split(",");
              _length.push(arr.length);
              _arr[a - 1] = arr;
            }
          }
          _arr[0].forEach((v2, index) => {
            this.initialSku["s" + index] = parseFloat(v2); // 库存不足就往后取。这里才是真实的值，覆盖前面
          });
          if (this.initialSku["s2"]) {
            str =
              this.initialSku["s0"] +
              "," +
              this.initialSku["s1"] +
              "," +
              this.initialSku["s2"];
          } else if (this.initialSku["s1"]) {
            str = this.initialSku["s0"] + "," + this.initialSku["s1"];
          } else {
            str = this.initialSku["s0"];
          }
          for (let i in obj) {
            // 取分期返，暂时这样
            this.cashbackItems = obj[str] && obj[str].cashbackItems;
            this.cashBackId = this.cashbackItems
              ? this.cashbackItems[0].cashbackId
              : "";
            this.totalAmount = this.cashbackItems
              ? this.cashbackItems[0].totalAmount
              : null;
            this.dctPrice = obj[str] && obj[str].dctPrice;
            this.backSelectIndex = 0;
          }
          // 初始化规格值
          this.sku.list = arr2;
          this.sku.price = this.goodsDetail.dctPrice;
          this.sku.stock_num = this.goodsDetail.stock;
          this.goods.title = this.goodsDetail.name;
          this.goods.picture = this.goodsDetail.specs[0].items[0].iconUrl;
          this.goodsImgList = res.data.content && res.data.content.imageUrls;
          this.getCategoriesGoods();
        } else {
          self.failure = true;
        }
      });
    },
    onChange(index) {
      this.current = index;
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
    goEvaluation() {
      this.$router.push({
        name: "EvaluationPage",
        params: { id: this.$route.params.id }
      });
    },
    goShopCart() {
      this.$router.push({ name: "Cart" });
    },
    checkGoodsDeil(item) {
      this.$router.push({ name: "GoodsDetail", params: { id: item.id } });
      this.getGoodsDeil();
    },
    goStoreDetail(id) {
      this.$router.push({ name: "ShopDetail", params: { id: id } });
    },
    share() {
      if (!document.cookie) {
        sessionStorage.setItem(
          "referrer",
          window.location.href.split("/#/")[1]
        );
        this.$router.replace({ name: "Login" });
      } else {
        this.shareShow = true;
        // this.$router.replace({name: 'ShareGoods'})
      }
    }
  },
  computed: {
    getText() {
      if (this.goodsDetail.sharingProfit) {
        return "分享返" + this.goodsDetail.sharingProfit;
      } else {
        return "分享";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
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
#shareImg {
  width: 100%;
  height: 100%;
  display: block;
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
  background-image: url("../../assets/home/oval532.png");
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
.empty-div {
  text-align: center;
  height: 4.24rem;
  background: #ffffff;
  .empty-img {
    img {
      width: 2rem;
      height: 2rem;
    }
  }
  .empty-text {
    font-size: 0.28rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.payFloat {
  position: fixed;
  bottom: 1rem;
  right: 0.2rem;
  /*width: 2.23rem;*/
  height: 0.82rem;
  display: block;
  background-image: url("../../assets/goods/tanceng.png");
  background-size: 100% 100%;
  /*img {*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*display: block;*/
  /*}*/
  .font {
    padding: 0 0.2rem;
    /*position: relative;*/
    /*bottom: 0.7rem;*/
    line-height: 0.62rem;
    font-size: 0.24rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
.shop-detail-container {
  overflow-x: hidden;
  width: 100%;
  background: #f4f4f4;
  margin-bottom: 1rem;
  .swipe-img {
    width: 100%;
    height: 7.5rem;
  }
  .swipe-number {
    position: absolute;
    right: 0.2rem;
    top: 6.8rem;
    width: 0.64rem;
    height: 0.64rem;
    line-height: 0.64rem;
    text-align: center;
    background: rgba(0, 0, 0, 1);
    opacity: 0.2;
    border-radius: 50%;
    font-size: 0.24rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .shop-detail {
    width: 100%;
    /*height:4.20rem;*/
    background: rgba(255, 255, 255, 1);
    .price-container {
      display: flex;
      justify-content: space-between;
      /*padding: 0 0.3rem 0 0.3rem;*/
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
          text-decoration: line-through;
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }
      }
      .center {
        display: flex;
        align-items: flex-end;
        .price2 {
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
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
      margin-bottom: 0.23rem;
      width: 6.88rem;
      /*height:0.75rem;*/
      font-size: 0.32rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 0.44rem;
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
        background: #ff2644;
        border-radius: 0.14rem;
        font-size: 0.2rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin-top: 0.06rem;
        /*margin-right: 0.13rem;*/
      }
    }
    .shop-icon-container {
      padding-left: 0.2rem;
      margin: auto;
      width: 6.9rem;
      /*height:0.5rem;*/
      background: rgba(255, 246, 248, 1);
      border-radius: 8px;
      .shop-icon-container-icon {
        margin-top: 0.07rem;
        margin-right: 0.17rem;
        float: left;
        width: 0.36rem;
        height: 0.36rem;
      }
      .shop-icon-container-font {
        margin-top: 0.07rem;
        margin-right: 0.6rem;
        float: left;
        font-size: 0.24rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #ff6417;
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
      vertical-align: middle;
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
  .margin-top20 {
    margin-top: 0.2rem;
  }
  .evaluation {
    padding: 0.3rem 0.3rem 0.4rem 0.3rem;
    /*width:7.50rem;*/
    /*height:2.92rem;*/
    background: rgba(255, 255, 255, 1);
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
      margin-bottom: 0.2rem;
      word-break: break-all;
      width: 6.86rem;
      /*height: 1.1rem;*/
      overflow: hidden;
      font-size: 0.28rem;
      text-overflow: ellipsis;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.36rem;
    }
    .evaluation-img-box {
      display: flex;
      img {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.2rem;
      }
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
  .product {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 0.8rem;
    background: rgba(244, 244, 244, 1);
    .line-div {
      margin-top: 0.3rem;
      .line {
        width: 1rem;
        height: 0.03rem;
        background: #ff6417;
        border-radius: 1px;
      }
      .line2 {
        margin-top: 0.1rem;
        margin-left: 0.5rem;
        width: 0.5rem;
        height: 0.03rem;
        background: #ff6417;
        border-radius: 1px;
      }
      .line3 {
        margin-top: 0.1rem;
        width: 0.5rem;
        height: 0.03rem;
        background: #ff6417;
        border-radius: 1px;
      }
    }
    .title {
      margin: 0.1rem 0.2rem 0.2rem 0.2rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      font-size: 0.34rem;
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
      height: 5.7rem;
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
          margin-top: 0.17rem;
          margin-left: 0.17rem;
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
        }
        .price-container {
          padding-top: 0.15rem;
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          .price1 {
            padding-left: 0.17rem;
            padding-right: 0.16rem;
            font-size: 0.36rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(227, 58, 89, 1);
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
          .left {
            padding-left: 0.1rem;
            padding-right: 0.1rem;
            background: #fcf3ed;
            border-radius: 0.08rem;
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
.back-dialog {
  width: 5.4rem;
  height: 5.83rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.28rem;
  .back-item {
    width: 5.4rem;
    height: 1.12rem;
    background: #fff;
    display: flex;
    align-items: center;
    /*border-top: 1px salmon solid;*/
    .title {
      font-size: 0.28rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .label {
      font-size: 0.22rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 141, 18, 1);
    }
  }
}
.preferential {
  margin-top: 0.2rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 7.02rem;
  height: 0.6rem;
  background: rgba(252, 243, 237, 1);
  border-radius: 0.3rem;
  /*margin: 0 auto;*/
  .icon {
    width: 0.6rem;
    height: 0.36rem;
    display: block;
    margin-right: 0.2rem;
    margin-left: 0.2rem;
    vertical-align: middle;
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
.back-box {
  width: 100%;
  overflow-x: scroll;
  margin-bottom: 0.7rem;
  .title {
    /*width:111px;*/
    /*height:26px;*/
    font-size: 0.28rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    margin-left: 0.3rem;
    margin-bottom: 0.3rem;
    color: rgba(51, 51, 51, 1);
  }
  .back-box-item {
    width: 300%;
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    .active {
      background: #fff;
      border: 1px solid #ff517a;
      margin-left: 0.3rem;
      text-align: center;
      /*line-height: 1rem;*/
      float: left;
      width: 2.3rem;
      height: 1rem;
      border-radius: 0.12rem;
      font-size: 0.24rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      .font {
        margin-top: 0.16rem;
        color: #666666;
      }
    }
    .item {
      margin-left: 0.3rem;
      text-align: center;
      /*line-height: 1rem;*/
      float: left;
      width: 2.3rem;
      height: 1rem;
      background: #f4f4f4;
      border: 1px solid #f4f4f4;
      border-radius: 0.12rem;
      font-size: 0.24rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      .font {
        margin-top: 0.16rem;
        color: #666666;
      }
    }
  }
}
.tips {
  font-size: 0.22rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: white;
  position: absolute;
  top: 94%;
  line-height: 0.34rem;
  left: 16%;
}
.share-box {
  height: 6.3rem;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .content {
    width: 2.37rem;
    height: 1.16rem;
    position: absolute;
    text-align: center;
    top: 28%;
    left: 32%;
    font-size: 0.3rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: #ff517a;
    line-height: 0.44rem;
  }
  .btn {
    color: #fff;
    width: 2.35rem;
    height: 0.76rem;
    background: #ff517a;
    border-radius: 0.38rem;
    text-align: center;
    line-height: 0.76rem;
    position: absolute;
    top: 54%;
    left: 31%;
  }
}
</style>
