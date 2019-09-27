<template>
  <div>
    <TopNav name="添加收货地址"></TopNav>
    <van-cell :value="info.districtName" @click="getAddress" title="所在地区" is-link></van-cell>
    <van-field
      v-model="info.addressDetail"
      label="详细地址："
      placeholder="请输入详细地址"
    >
    </van-field>
    <van-button @click="onSave" class="saveBtn" size="large" round type="warning">保存</van-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopNav from '@/components/TopNav'
import * as types from '@/store/mutation-types'
import mineApi from '@/api/mine'
export default {
  name: 'MerchantsAddress',
  data () {
    return {
      areaListData: [],
      info: {
        addressDetail: '',
        districtId: null,
        districtName: ''
      }
    }
  },
  created () {
    console.log(this.$store.state.user.merchants)
    if (this.$store.state.user.merchants) {
      this.info = this.$store.state.user.merchants
    }
    this.getCityData()
  },
  methods: {
    getAddress () {
      const self = this
      weui.picker(this.areaListData, {
        className: 'custom-classname',
        container: 'body',
        defaultValue: [1, 3],
        onConfirm: function (result) {
          console.log(result)
          self.$set(self.info, 'districtId', result[2].value)
          self.$set(self.info, 'districtName', result[0].name + result[1].name + result[2].name)
        },
        id: 'doubleLinePicker'
      })
    },
    getCityData () {
      mineApi.getCityData().then(res => {
        const cityData = res.data.content
        cityData.forEach((v, i) => {
          v.label = v.name
          v.value = v.id
          if (v.cityList.length > 0) {
            v.children = v.cityList
            v.cityList.forEach((v2, i2) => {
              v2.label = v2.name
              v2.value = v2.id
              if (v2.areaList.length > 0) {
                v2.children = v2.areaList
                v2.areaList.forEach((v3, i3) => {
                  v3.label = v3.name
                  v3.value = v3.id
                })
              }
            })
          }
        })
        this.areaListData = cityData
      })
    },
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
</style>
