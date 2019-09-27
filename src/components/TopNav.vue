<template>
  <!--<div></div>-->
  <div class="topNav">
    <van-icon v-show="backShow" @click="goBack" class="back" name="arrow-left"></van-icon>
    <!--<img v-show="backShow" @click="goBack" src="../assets/nav/page_back_n.png" alt="">-->
    <div class="name">{{name}}</div>
<!--    <van-icon :style="{ visibility: shareShow }" @click="share" class="back" name="share"></van-icon>-->
    <div :style="{ visibility: shareShow }"  class="back">
      <img class="right-icon" @click="share" src="../assets/home/share.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    name: {
      type: String,
      default: '标题'
    },
    backShow: {
      type: Boolean,
      default: true
    },
    shareShow: {
      type: String,
      default: 'hidden'
    },
    special: '', // 如果存在导航返回就直接返回我的页面
    special2: '' // 如果存在清除selctAddressShow
  },
  created () {
  },
  methods: {
    goBack () {
      if (this.special2) {
        localStorage.removeItem('selctAddressShow')
      }
      if (this.special) {
        this.$router.push({name: 'Mine'})
      } else {
        this.$router.go(-1)
      }
    },
    share () {
      this.$emit('share')
    }
  }
}
</script>

<style lang="scss" scoped>
  .topNav {
    display: flex;
    align-items: center;
    width:100%;
    background: #fff;
    .back {
      width: 10%;
      font-size:0.54rem;
      font-weight:500;
      color:#333;
    }
    .name {
      margin: 0 auto;
      width: 80%;
      text-align: center;
      background: #fff;
      height:0.88rem;
      line-height: 0.88rem;
      font-size:0.34rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:#333;
    }
    .right-icon {
      width: 0.41rem;
      height: 0.41rem;
      display: block;
      float: right;
      margin-right: 0.2rem;
    }
    .right {
      width: 20%;
    }
  }
</style>
