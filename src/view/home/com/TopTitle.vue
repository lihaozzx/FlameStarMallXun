<template>
  <div class="TopTitle">
    <div class="title-box">
      <div class="left">
        <img :src="src" alt="">
        <div class="font">{{title}}</div>
      </div>
      <div v-if="rightShow" class="right">
        累积已返<span style="color: #FF2644">{{rightNumber}}</span>元
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    rightShow: {
      type: Boolean,
      default: false
    },
    rightNumber: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  .title-box {
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:1.08rem;
    background:rgba(255,255,255,1);
    .left {
      display: flex;
      img {
        display: block;
        width: 0.36rem;
        height: 0.36rem;
        margin-top: 0.06rem;
        margin-right: 0.17rem;
        margin-left: 0.2rem;
      }
      .font {
        font-size:0.34rem;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
    }
    .right {
      margin-right: 0.26rem;
      font-size:0.26rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
  }
</style>
