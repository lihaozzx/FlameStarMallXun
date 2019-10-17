!<template>
  <div
    class="free_buy"
    id="freeBuy"
  >
    <TopNav
      name="全民FrreBuy"
      bc="#FF2644"
    ></TopNav>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <div class="head_imgbox">
        <img src="../../assets/activity/box.png">
        <img src="../../assets/activity/bottom.png">
      </div>
      <div
        class="content"
        :style="{height:contentHeight+'rem'}"
      >
        <!-- 三张背景图 -->
        <img src="../../assets/activity/paper_exit.png">
        <div class="back_box">
          <img src="../../assets/activity/paper_top.png">
          <div
            class="back_rpt"
            :style="{height:rptHeight+'rem'}"
          ></div>
          <img src="../../assets/activity/paper_bot.png">
        </div>

        <div class="detail">
          <p class="d_text">所支付金额均可全额返还，<br> 有权随时终止，<br> 信用卡支付也可返现金。</p>
          <div class="video_box">
            <van-swipe
              indicator-color="#FF2644"
              @change="onChange"
            >
              <van-swipe-item
                v-for="(src,i) in videoList"
                :key="i"
                @click="playVideo(i)"
              >
                <img :src="src.iconUrl">
                <!-- v-if="!(showVideo == i)" -->
                <img
                  class="video_player_btn"
                  src="../../assets/activity/video_play.png"
                >
                <!-- <video
                  v-if="isAndroid&&showVideo == i"
                  :id="'video'+i"
                  :src="src.videoUrl"
                  controls
                  x5-video-player-fullscreen="true"
                  x5-playsinline
                  playsinline
                  webkit-playsinline
                  preload="none"
                ></video>
                <video
                  v-if="!isAndroid&&showVideo == i"
                  :id="'video'+i"
                  :src="src.videoUrl"
                  controls
                  preload="none"
                ></video> -->

              </van-swipe-item>
              <!-- 自定义指示器 -->
              <div
                class="van-swipe__indicators"
                slot="indicator"
              >
                <i
                  :class="i == sindex?'van-swipe__indicator van-swipe__indicator--active':'van-swipe__indicator'"
                  v-for="(v,i) in videoList"
                  :key="i"
                  :style="i == sindex?'background-color: rgb(255, 38, 68);':''"
                ></i>
              </div>
            </van-swipe>
          </div>
          <p class="d_text_f">首次体验FreeBuy，送好礼
            <!-- <van-icon
              class="wenhao"
              name="question-o"
              @click="showRule=true"
            /> -->
          </p>
          <!-- 首单免费领的图 -->
          <img
            class="to_zero"
            @click="toZeroShop"
            src="../../assets/activity/capsule.png"
          >
          <p class="d_text_zero">全品类支持0元购买</p>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="goods_box">

              <div
                class="good_info"
                v-for="i in goodsList"
                :key="i.id"
              >
                <div
                  class="good_img"
                  :style="'background-image:url('+i.imageUrls[0]+')'"
                ></div>
                <p class="good_title">{{i.name}}</p>
                <p class="good_prise">购买原价：￥{{i.dctPrice}}</p>
                <van-button
                  class="good_btn"
                  round
                  @click="toGoodDetail(i.id)"
                >0元免费拿</van-button>
              </div>

            </div>
          </van-list>
          <p
            :class="nowScroll>1000?'see_more see_more_fixd':'see_more'"
            @click="toHome"
          >查看更多0元免费拿商品</p>
        </div>
      </div>
    </van-pull-refresh>

    <!-- 消息弹框 -->
    <van-popup
      v-model="showRule"
      round
      :style="{ height: '4.5rem',
      width:'5.9rem',
      fontSize:'.28rem',
      padding:'.44rem' }"
    >
      <p class="pop_title">活动说明</p>
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
import homeApi from "@/api/home.js"
import { setInterval } from 'timers';
export default {
  data() {
    return {
      showRule: false,//规则是否展示
      isLoading: false,//页面是否处于下拉加载
      loading: false,//商品列表是否处于加载
      finished: false,//商品列表是否加载完成
      isAndroid: false,//是安卓吗？
      nowScroll: 0,//滚动距离，判断浮动
      // showVideo: -1,//播放视频下标
      page: 1,//商品接口页数
      pageSize: 20,//商品接口单次加载数据
      goodsList: [],//商品列表
      videoList: [],//视频列表
      sindex: 0,//轮播图指示器
      videoSchedule: {},//视频进度储存
    };
  },
  components: {
    TopNav
  },
  computed: {
    /**
     * 盒子的高度
     */
    contentHeight() {
      return Math.ceil(this.goodsList.length / 2) * 5.1 + 15;
    },
    /**
     * 撑开div的高度
     */
    rptHeight() {
      return Math.ceil(this.goodsList.length / 2) * 5.1 - 10;
    }
  },
  watch: {

  },
  created() {
    this.getFreebuyVideo();
    let u = navigator.userAgent;
    if (u.indexOf("Android") > -1 || u.indexOf("Adr") > -1) {
      this.isAndroid = true;
    }
  },
  mounted() {
    //滑动距离
    const elfb = document.getElementById("freeBuy");
    elfb.addEventListener('scroll', (e) => {
      this.nowScroll = elfb.scrollTop;
    });
  },
  methods: {
    /**
     * 视频地址接口
     */
    getFreebuyVideo() {
      homeApi.getFreebuyVideo().then(res => {
        if (res.data.statusCode == 200 && res.data.messageCode == "MSG_1001") {
          this.videoList = res.data.content.videos;
        }
      })
    },
    /**
     * 商品接口
     */
    getFreebuygoods() {
      const params = {
        pageNumber: this.page,
        pageSize: this.pageSize
      };
      return new Promise((resolve, reject) => {
        homeApi.getFreebuyGoods(params)
          .then(res => {
            if (res.data.statusCode == 200 && res.data.messageCode == "MSG_1001") {
              this.goodsList.push(...res.data.content);
              this.page++;
              if (res.data.content.length < 20) {
                this.finished = true;
              }
              resolve();
            }
          })
          .catch(err => {
            resolve();
          });
      });
    },
    toZeroShop() {
      if (window.wv) {
        window.wv.freebuyToZeroshop();
        return;
      }
      this.$router.push({ path: '/zeroShop', query: { type: 4 } });
    },
    toHome() {
      if (window.wv) {
        window.wv.gotoHomeTab();
      }
      if (window.webkit && window.webkit.messageHandlers.goLogin && window.webkit.messageHandlers.goHome) {
        window.webkit.messageHandlers.goHome.postMessage();
      }
      this.$toast("qweqweqweqweqweqweqweqeqeqweqwe");
      this.$router.push({ name: 'Home' });
    },
    toGoodDetail(id) {
      if (window.wv) {
        window.wv.gotoGoodsDetail(id);
        return;
      }

      this.$router.push({ name: "GoodsDetail", params: { id: id } });
    },
    /**
     * 播放视频
     */
    playVideo(i) {
      if (window.wv) {
        window.wv.playVideo(this.videoList[i].videoUrl);
        return;
      }
      if (window.webkit && window.webkit.messageHandlers.goLogin && window.webkit.messageHandlers.playVideo) {
        window.webkit.messageHandlers.playVideo.postMessage();
      }
      // this.showVideo = i;
      // setTimeout(_ => {
      //   let el = document.getElementById("video" + i);
      //   el.play();
      //   //如果有播放记录就跳转记录点
      //   if (this.videoSchedule[this.showVideo]) {
      //     el.currentTime = this.videoSchedule[this.showVideo];
      //   }
      // }, 0);//等待dom加载完成

    },
    /**
     * 页面下拉刷新
     */
    onRefresh() {
      //初始化商品相关数据
      this.page = 1;
      this.goodsList = [];
      this.finished = false;
      this.getFreebuygoods()
        .then(_ => {
          this.isLoading = false;
        });
    },
    /**
     * 触底加载
     */
    onLoad() {
      this.getFreebuygoods()
        .then(_ => {
          this.loading = false;
        })
    },
    /**
     * 轮播图滚动
     */
    onChange(key) {
      // //记录播放时间
      // let el = document.getElementById("video" + this.showVideo);
      // if (el) {
      //   this.videoSchedule[this.showVideo] = el.currentTime;
      // }
      // this.showVideo = -1;//不暂停直接删除video的dom元素
      this.sindex = key;
    },
    /**
     * 跳转商品详情
     */
    gotoGoodDetail(item) {
      if (window.webkit && window.webkit.messageHandlers.goLogin && window.webkit.messageHandlers.goDetail) {
        window.webkit.messageHandlers.goDetail.postMessage(item.id);//id,type
      }
      if (window.wv) {
        window.wv.goToDetail(item.id);
      }
      this.$router.push({ name: "GoodsDetail", params: { id: item.id } });
    }
  },
};
</script>

<style scoped lang="scss">
.free_buy {
  background-color: #f9bdad;
  height: 100vh;
  overflow-y: scroll;
  .head_imgbox {
    height: 3.8rem;
    max-width: 7.5rem;
    margin: 0 auto;
    background-color: #ff2644;
    position: relative;
    img:nth-of-type(1) {
      position: absolute;
      width: 70%;
      left: 15%;
      z-index: 10;
    }
    img:nth-of-type(2) {
      width: 100%;
      position: absolute;
      bottom: 0;
    }
  }
  .content {
    height: 24rem;
    padding: 0;
    max-width: 7.5rem;
    margin: 0 auto;
    position: relative;
    img:nth-of-type(1) {
      width: 85%;
      margin: 0 7.5%;
    }
    .back_box {
      width: 100%;
      transform: translateY(-0.9rem);
      img:nth-of-type(1) {
        width: 97%;
        margin: 0 1.5%;
        display: block;
        transform: translateY(0.05rem);
      }
      .back_rpt {
        width: 96%;
        margin: 0 2%;
        background-image: url("../../assets/activity/paper_bot_repete.png");
        background-size: 100% auto;
      }
      img:nth-of-type(2) {
        width: 96%;
        margin: 0 2%;
      }
    }

    .detail {
      position: absolute;
      width: 100%;
      top: 0;
      box-sizing: border-box;
      padding: 1.5rem 0.5rem 0;
      .d_text {
        width: 4.5rem;
        margin: 0 auto;
        font-size: 0.36rem;
        font-weight: 800;
        color: #cb6380;
        line-height: 0.6rem;
        text-align: center;
      }
      .video_box {
        margin: 0.36rem auto 0;
        width: 6.4rem;
        height: 4rem;
        border-radius: 0.08rem;
        overflow: hidden;
        .van-swipe {
          width: 100%;
          height: 100%;
          .van-swipe-item {
            position: relative;
            .video_player_btn {
              width: 1.2rem;
              height: 1.2rem;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translateX(-50%) translateY(-50%);
            }
            img {
              margin: 0;
              width: 100%;
              height: calc(100% - 0.2rem);
            }
            video {
              margin: 0;
              width: 100%;
              height: calc(100% - 0.2rem);
            }
          }
          .van-swipe__indicators {
            bottom: 0;
            .van-swipe__indicator {
              width: 0.16rem;
              height: 0.16rem;
              background-color: #a8a8a8;
            }
          }
        }
      }
      .d_text_f {
        width: 100%;
        text-align: center;
        color: #cb6380;
        font-size: 0.28rem;
        margin: 0.6rem 0 0.35rem;
        .wenhao {
          transform: translateY(18%);
          font-size: 0.35rem;
          font-weight: bold;
        }
      }
      .to_zero {
        width: 5.68rem;
        margin: 0 calc((100% - 5.68rem) / 2);
      }
      .d_text_zero {
        width: 3.4rem;
        margin: 0 auto;
        font-size: 0.28rem;
        text-align: center;
        background-image: url("../../assets/activity/decoration.png");
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position-y: 40%;
      }
      .goods_box {
        width: 100%;
        margin-top: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .good_info {
          width: 3rem;
          height: 4.7rem;
          margin-bottom: 0.4rem;
          position: relative;
          .good_img {
            width: 100%;
            height: 3rem;
            border-radius: 0.04rem;
            background-size: 100% auto;
            background-repeat: no-repeat;
          }
          .good_title {
            width: 100%;
            margin-top: 0.24rem;
            font-size: 0.28rem;
            color: #333333;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .good_prise {
            font-size: 0.28rem;
            color: #ff2644;
          }
          .good_btn {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 0.64rem;
            color: #ffffff;
            background-color: #ff2644;
            font-size: 0.3rem;
            border-radius: 0.32rem;
            border: none;
            line-height: 0.64rem;
          }
        }
      }
      .see_more {
        margin-top: 0.1rem;
        text-align: center;
        font-size: 0.32rem;
        color: #ff2644;
        font-family: PingFang SC;
        white-space: nowrap;
        padding: 0.1rem;
      }
      .see_more_fixd {
        position: fixed;
        bottom: 0.7rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba($color: #ffffff, $alpha: 0.4);
        border-radius: 0.1rem;
      }
      .see_more::after {
        content: "";
        background-image: url("../../assets/activity/ic_more.png");
        background-size: 100%;
        background-position-y: 50%;
        background-repeat: no-repeat;
        padding: 0.2rem;
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
