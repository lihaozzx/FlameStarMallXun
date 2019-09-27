<template>
  <div class="topNav">
    <img @click="$router.go(-1)" src="../../../assets/nav/page_back_n.png" alt="">
    {{name}}
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    name: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="scss" scoped>
  .topNav {
    text-align: center;
    width:7.50rem;
    height:0.88rem;
    line-height: 0.88rem;
    background:rgba(255,81,122,1);
    font-size:0.34rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    img {
      float: left;
      width: 0.56rem;
      height: 0.56rem;
      margin-top: 0.16rem;
    }
  }
</style>
