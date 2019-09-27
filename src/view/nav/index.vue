<template>
<div>
  <van-tabbar
    fixed
    v-model="active"
    active-color="#FF2644"
  >
    <van-tabbar-item
      replace
      to="/home"
    >
      <span>首页</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? iconList[0].active : iconList[0].normal"
      >
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/member"
    >
      <span>会员</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? iconList[1].active : iconList[1].normal"
      >
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/cart"
    >
      <span>购物车</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? iconList[2].active : iconList[2].normal"
      >
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/mine"
    >
      <span>我的</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? iconList[3].active : iconList[3].normal"
      >
    </van-tabbar-item>
  </van-tabbar>
  <router-view/>
</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      iconList: [
        {
          normal: require('../../assets/nav/ic_home_n.png'),
          active: require('../../assets/nav/ic_home_5.png')
        },
        {
          normal: require('../../assets/nav/ic_member_n.png'),
          active: require('../../assets/nav/ic_member_s.png')
        },
        {
          normal: require('../../assets/nav/ic_cart_n.png'),
          active: require('../../assets/nav/ic_cart_s.png')
        },
        {
          normal: require('../../assets/nav/ic_my_n.png'),
          active: require('../../assets/nav/ic_my_s.png')
        }
      ]
    }
  },
  created () {
    if (this.$route.path === '/mine') {
      this.active = 3
    } else if (this.$route.path === '/cart') {
      this.active = 2
    } else if (this.$route.path === '/member') {
      this.active = 1
    } else if (this.$route.path === '/home') {
      this.active = 0
    }
  },
  watch: {
    $route (val) {
      console.log(val.name)
      if (val.name === 'Mine') {
        this.active = 3
      } else if (val.name === 'Cart') {
        this.active = 2
      } else if (val.name === 'Member') {
        this.active = 1
      } else if (val.name === 'Home') {
        this.active = 0
      }
    }
  }
}
</script>

<style scoped>
img{
  width: 0.54rem;
  height: 0.54rem !important;
}
</style>
