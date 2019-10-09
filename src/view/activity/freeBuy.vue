!<template>
  <div class="free_buy">
    <TopNav
      name="全民FrreBuy"
      bc="#FF2644"
    ></TopNav>
    <div class="head_imgbox">
      <img src="../../assets/activity/box.png">
      <img src="../../assets/activity/bottom.png">
    </div>
    <div class="content">
      <img src="../../assets/activity/paper_exit.png">
      <img src="../../assets/activity/paper_top.png">
      <img src="../../assets/activity/paper_bot.png">
      <div class="detail">
        <p class="d_text">所支付金额均可全额返还，<br> 有权随时终止，<br> 信用卡支付也可返现金。</p>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNavTwo";
export default {
  props: {

  },
  data() {
    return {

    };
  },
  components: {
    TopNav
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
.free_buy {
  background-color: #f9bdad;
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
    background-color: #f9bdad;
    height: 24rem;
    padding: 0;
    max-width: 7.5rem;
    margin: 0 auto;
    position: relative;
    img:nth-of-type(1) {
      width: 85%;
      margin: 0 7.5%;
    }
    img:nth-of-type(2) {
      width: 96%;
      margin: 0 2%;
      transform: translateY(-45%);
    }
    img:nth-of-type(3) {
      width: 96%;
      margin: 0 2%;
      transform: translateY(-6.48%);
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
    }
  }
}
</style>
