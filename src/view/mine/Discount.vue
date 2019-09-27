<template>
  <div class="discount">
    <TopNav name="预计平均折扣"></TopNav>
    <!--<van-cell :value="info.districtName" @click="getAddress" title="所在地区" is-link></van-cell>-->
    <van-field
      type="number"
      v-model="info.rebate"
      center
      clearable
      placeholder="请输入折扣"
    >
      <div slot="button">折</div>
    </van-field>
    <div class="tips">
      预计平均折扣：
    </div>
    <div class="tips">
      寻草记可以为您的商品带来巨大的销量，是一个给您提供薄利多销的平台。采用让利的模式提高销量，吸引顾客。您可以根据您的实际商品毛利率来给填写一个预计的商品折扣，精确到小数点后一位，不得小于9.8折。
    </div>
    <van-button @click="onSave" class="saveBtn" size="large" round type="warning">完成</van-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopNav from '@/components/TopNav'
import * as types from '@/store/mutation-types'
import mineApi from '@/api/mine'
export default {
  name: 'Discount',
  data () {
    return {
      areaListData: [],
      info: {
        rebate: ''
      }
    }
  },
  created () {
    console.log(this.$store.state.user.merchants)
    if (this.$store.state.user.merchants) {
      this.info = this.$store.state.user.merchants
    }
  },
  methods: {
    onSave () {
      this.$store.commit(types.SET_MERCHANTS, this.info) // 直接调用mutations改变值（不可异步）
      this.$router.push({name: 'MerchantsRegisterNext'})
    }
  },
  components: {
    TopNav
  },
  computed: {
    ...mapGetters([
      'merchants'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .discount {
    height: 13.34rem;
    background: #f4f4f4;
    .saveBtn {
      display: block;
      margin: 0.6rem auto;
      line-height: 0.8rem;
      width:6.9rem;
      height:0.8rem;
      background:rgba(255,141,18,1);
      border-radius:0.4rem;
    }
    .saveBtn2 {
      display: block;
      margin: 0.6rem auto;
      line-height: 0.8rem;
      width:6.9rem;
      height:0.8rem;
      background:#FF92A3;
      border-radius:0.4rem;
    }
    .tips {
      padding: 0.2rem 0.3rem 0 0.3rem;
      font-size:0.28rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(102,102,102,1);
    }
  }
</style>
