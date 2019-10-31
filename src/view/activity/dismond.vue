<template>
  <div>
    <div class="content">
      <div class="title">钻石合伙人</div>
      <div class="buy_box">
        <img
          src="../../assets/activity/dismond/card.png"
          alt=""
        >
        <div class="buy_tips">购买即视为同意《寻草记钻石合伙人服务协议》</div>
        <div
          class="buy_btn"
          @click="showBuy =true"
        >购买</div>
      </div>
      <div class="imgbox i1"></div>

      <div class="imgboxs">
        <div
          class="imgbox i2"
          @click="toInfo(0)"
        ></div>
        <div
          class="imgbox i8"
          @click="toInfo(5)"
        ></div>
        <div
          class="imgbox i3"
          @click="toInfo(1)"
        ></div>
        <div
          class="imgbox i4"
          @click="toInfo(2)"
        ></div>
        <div
          class="imgbox i5"
          @click="toInfo(3)"
        ></div>
        <div
          class="imgbox i6"
          @click="toInfo(4)"
        ></div>
      </div>
      <div class="imgbox i7"></div>

      <div class="shenqian">
        <p><span>平均每年可赚</span><span>￥200000.00</span></p>
        <p><span>平均每年可省</span><span>￥10000.00</span></p>
      </div>
    </div>
    <div
      class="findTec"
      @click="showTec = true"
    ></div>
    <van-dialog
      v-model="showBuy"
      :showConfirmButton="false"
      closeOnClickOverlay
    >
      <img
        class="dialog_img"
        src="../../assets/activity/dismond/dialog.png"
      >
    </van-dialog>
    <van-dialog
      v-model="showTec"
      :showConfirmButton="false"
      closeOnClickOverlay
    >
      <img
        class="dialog_img"
        src="../../assets/activity/dismond/dialog2.png"
      >
    </van-dialog>
  </div>
</template>

<script>
import wxApi from "../../api/wx";
import wx from 'weixin-js-sdk';
import params from '../../conf/params'
export default {
  data() {
    return {
      showBuy: false,
      showTec: false
    };
  },
  mounted() {
    const data = {
      url: window.location.href
    }
    wxApi.weChatSharingConfig(data).then(res => {
      if (res.status == 200 && res.data.messageCode == "MSG_1001") {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          ...res.data.content,
          jsApiList: ["updateAppMessageShareData"] // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {
          wx.updateAppMessageShareData({
            title: '【钻石合伙人招募令】', // 分享标题
            desc: '加入寻草记～共赢未来，带你提前实现财富自由！！！', // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: params.testEnvironmentHost + '/pop_logo.png', // 分享图标
            success: function () {
              // 设置成功
            }
          })
        });
      }
    })
  },
  methods: {
    toInfo(i) {
      this.$router.push({ name: 'dismondInfo', params: { type: i } });
    }
  },
};
</script>

<style scoped lang="scss">
img {
  display: block;
}
.content {
  background-image: linear-gradient(#ff2644 200px, #ffffff 1px);
  min-height: 100vh;
  padding-bottom: 1rem;
}

.title {
  padding-top: 0.6rem;
  font-size: 0.36rem;
  text-align: center;
  color: #ffffff;
}

.buy_box {
  width: 7rem;
  height: 4.8rem;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 0.15rem;
  box-sizing: border-box;
  margin-top: 0.3rem;
  padding: 0.45rem 0.4rem;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(99, 99, 99, 0.5);
}

.buy_box img {
  width: 100%;
}

.buy_tips {
  color: #999999;
  font-size: 0.22rem;
  text-align: center;
  margin-top: 0.11rem;
}

.buy_btn {
  width: 5.7rem;
  margin: 0 auto;
  height: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.3rem;
  color: #f4f4f4;
  background-color: #ff8d8d;
  border-radius: 0.35rem;
  margin-top: 0.3rem;
}

.imgbox {
  background-size: 100%;
  background-repeat: no-repeat;
}

.i1 {
  width: 5.8rem;
  height: 0.27rem;
  background-image: url("../../assets/activity/dismond/break.png");
  margin: 0.4rem auto 0.3rem;
}

.i2 {
  width: 3.18rem;
  height: 1.6rem;
  background-image: url("../../assets/activity/dismond/card_01.png");
}

.i3 {
  width: 3.18rem;
  height: 1.6rem;
  background-image: url("../../assets/activity/dismond/card_02.png");
}

.i4 {
  width: 3.18rem;
  height: 1.6rem;
  background-image: url("../../assets/activity/dismond/card_03.png");
}

.i5 {
  width: 3.18rem;
  height: 1.6rem;
  background-image: url("../../assets/activity/dismond/card_04.png");
}
.i8 {
  width: 3.18rem;
  height: 1.6rem;
  background-image: url("../../assets/activity/dismond/card_06.png");
}

.i6 {
  width: 3.18rem;
  height: 1.6rem;
  background-image: url("../../assets/activity/dismond/card_05.png");
}

.i7 {
  width: 5.8rem;
  height: 0.27rem;
  background-image: url("../../assets/activity/dismond/break2.png");
  margin: 0.32rem auto 0;
}

.imgboxs {
  width: calc(100% - 1rem);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}

.shenqian {
  width: 6rem;
  height: 1.4rem;
  margin: 0.4rem auto;
  box-shadow: 0 0.07rem 0.15rem 0 rgba(208, 176, 175, 0.3);
  border-radius: 0.08rem;
  padding: 0.3rem 0.47rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.3rem;
  line-height: 0.3rem;
}

.shenqian > p {
  display: flex;
  justify-content: space-between;
}

.shenqian > p > span:nth-of-type(2) {
  color: #ff8d8d;
  font-weight: bold;
}
.dialog_img {
  width: 100%;
  height: auto;
}
.findTec {
  width: 100vw;
  height: 1rem;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url("../../assets/activity/dismond/botbar.png");
  position: fixed;
  bottom: 0;
}
</style>
