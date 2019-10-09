<template>
  <!--<div></div>-->
  <div
    class="topNav"
    :style="'background:'+this.bc"
  >
    <van-icon
      v-show="backShow"
      @click="goBack"
      class="back"
      :style="'color:'+this.tc"
      name="arrow-left"
    ></van-icon>
    <div
      class="name"
      :style="{background:this.bc,color:this.tc}"
    >{{name}}</div>
    <div
      :style="{ visibility: shareShow }"
      class="back"
    >
      <img
        class="right-icon"
        @click="share"
        src="../assets/home/share.png"
        alt=""
      >
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
    bc: {
      type: String,
      default: '#ff93a8'
    },
    tc: {
      type: String,
      default: '#fff'
    },
    special: '', // 如果存在导航返回就直接返回我的页面
    special2: '' // 如果存在清除selctAddressShow
  },
  created() {
  },
  methods: {
    goBack() {
      if (this.special2) {
        localStorage.removeItem('selctAddressShow')
      }
      if (this.special) {
        this.$router.push({ name: 'Mine' })
      } else {
        this.$router.go(-1)
      }
    },
    share() {
      this.$emit('share')
    }
  }
}
</script>

<style lang="scss" scoped>
.topNav {
  display: flex;
  align-items: center;
  width: 100%;
  .back {
    width: 10%;
    font-size: 0.54rem;
    font-weight: 500;
    color: #fff;
  }
  .name {
    margin: 0 auto;
    width: 80%;
    text-align: center;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.34rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #fff;
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
