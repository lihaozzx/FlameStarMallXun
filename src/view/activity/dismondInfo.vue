<template>
  <div>
    <TopNav
      name="钻石合伙人6大回报"
      bc="#FF2644"
    ></TopNav>
    <van-tabs v-model="showTap">
      <van-tab
        v-for="(s,index) in ways"
        :key="index"
        :title="s"
        :line-height="8"
        :line-width="60"
      >
      </van-tab>
    </van-tabs>
    <hr style="color='#E7E7E7'">
    <van-swipe
      :initial-swipe="initIndex"
      :width="300"
      indicator-color="white"
      :show-indicators="false"
      @change="onChange"
    >
      <van-swipe-item><img
          class="info_img"
          src="../../assets/activity/dismond/ncard_05.png"
        ></van-swipe-item>
      <van-swipe-item><img
          class="info_img"
          src="../../assets/activity/dismond/ncard_01.png"
        ></van-swipe-item>
      <van-swipe-item><img
          class="info_img"
          src="../../assets/activity/dismond/ncard_04.png"
        > </van-swipe-item>
      <van-swipe-item><img
          class="info_img"
          src="../../assets/activity/dismond/ncard_02.png"
        ></van-swipe-item>
      <van-swipe-item><img
          class="info_img"
          src="../../assets/activity/dismond/ncard_03.png"
        ></van-swipe-item>
      <van-swipe-item><img
          class="info_img"
          src="../../assets/activity/dismond/ncard_06.png"
        ></van-swipe-item>
    </van-swipe>
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

    <div
      class="buy_btn"
      @click="showBuy=true"
    >开通</div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNavTwo";
export default {
  data() {
    return {
      initIndex: 0,
      showTap: 2,
      showBuy: false,
      ways: ['299元奖励金', '300元购物金', '坐享下级消费提成', '享FreeBuy下单优惠', '优先成为城市合伙人', '待返转让分佣']
    };
  },
  created() {
    this.showTap = parseInt(this.$route.params.type);
    this.initIndex = this.showTap;
    // (function () {
    //   let i = 1;
    //   let t = 0;
    //   setInterval(() => {
    //     if (i * 1000 == t) {
    //       console.log(i);
    //       i++;
    //       t = 0;
    //     }
    //     t += 100;
    //   }, 100);
    // })()

  },
  methods: {
    onChange(e) {
      this.showTap = e;
    }
  },
  components: {
    TopNav
  },
};
</script>

<style scoped lang="scss">
.buy_btn {
  width: 6.9rem;
  height: 0.8rem;
  background-color: #ff8d8d;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.32rem;
  color: #ffffff;
  margin: 0 auto;
  border-radius: 0.4rem;
}
.info_img {
  width: 6rem;
  margin-left: 10%;
  margin-top: 0.8rem;
}
.dialog_img {
  width: 100%;
  height: auto;
}
</style>
