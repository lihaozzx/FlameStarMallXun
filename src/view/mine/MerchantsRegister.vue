<template>
  <div class="merchantsRegister">
    <TopNav name="商家入驻"></TopNav>
    <van-cell title="一、基本信息"></van-cell>
    <van-field
      v-model="merchantsinfo.name"
      label="姓名："
    >
    </van-field>
    <van-field
      v-model="merchantsinfo.idNumber"
      label="身份证号："
    >
    </van-field>
    <van-cell @click="show = true" title="所属行业" is-link>
      {{merchantsinfo.businessName}}
    </van-cell>
    <van-actionsheet
      v-model="show"
      :actions="industryList"
      @select="onSelect"
    ></van-actionsheet>
    <van-button @click="onSave" class="saveBtn" size="large" round type="warning">下一步</van-button>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import mineApi from '@/api/mine'
import * as types from '@/store/mutation-types'
export default {
  name: 'MerchantsRegister',
  components: {
    TopNav
  },
  data () {
    return {
      show: false,
      industryList: [],
      merchantsinfo: {
        idNumber: '',
        name: '',
        businessId: '',
        businessName: ''
      },
      value1: 0,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ]
    }
  },
  created () {
    console.log(this.$store.state.user.merchants)
    if (this.$store.state.user.merchants) {
      this.merchantsinfo = this.$store.state.user.merchants
    }
    this.getIndustry()
  },
  methods: {
    onSelect (item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      console.log(item)
      this.merchantsinfo.businessId = item.id
      this.merchantsinfo.businessName = item.name
    },
    getIndustry () {
      mineApi.getMerchantBusinessList().then(res => {
        console.log(res)
        if (res.data.messageCode === 'MSG_1001') {
          this.industryList = res.data.content
        }
      })
    },
    onSave () {
      console.log(this.merchantsinfo)
      this.$store.commit(types.SET_MERCHANTS, this.merchantsinfo)
      // window.localStorage.setItem()
      // if (localStorage.getItem('searchRecord')) {
      //   const arr = localStorage.getItem('searchRecord').split(',')
      //   if (arr.findIndex((v) => {
      //     return v === this.search.keyword
      //   }) === -1) {
      //     arr.push(this.search.keyword)
      //     localStorage.setItem('searchRecord', arr)
      //   }
      // } else {
      //   const arr = []
      //   arr.push(this.search.keyword)
      //   localStorage.setItem('searchRecord', arr)
      // }
      this.$router.push({name: 'MerchantsRegisterNext'})
    },
    getIndustryName (val) {
      this.industryList.forEach((v, i) => {
        if (v.id === val) {
          return v.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.merchantsRegister {
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
}
</style>
