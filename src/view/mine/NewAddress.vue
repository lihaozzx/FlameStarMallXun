<template>
    <div>
      <TopNav name="添加收货地址"></TopNav>
      <van-field
        v-model="info.receiverName"
        label="收货人："
      >
      </van-field>
      <van-field
        type="number"
        v-model="info.mobileNumber"
        label="手机号码："
      >
      </van-field>
      <van-cell :value="info.allAddress" @click="getAddress" title="所在地区" is-link></van-cell>
      <van-field
        v-model="info.detailedAddress"
        placeholder="请输入详细地址: 如道路、门牌号、小区、楼梯、单元等"
      >
      </van-field>
      <van-switch-cell :active-value="1" :inactive-value="2" v-model="info.isDefault" title="设为默认地址"></van-switch-cell>
      <van-button @click="onSave" class="saveBtn" size="large" round type="warning">保存</van-button>
      <!--<van-address-edit-->
        <!--:address-info="info"-->
        <!--show-delete-->
        <!--show-set-default-->
        <!--show-search-result-->
        <!--:search-result="searchResult"-->
        <!--@change-area="changeArea"-->
        <!--@save="onSave"-->
        <!--@delete="onDelete"-->
        <!--@change-detail="onChangeDetail"-->
      <!--&gt;</van-address-edit>-->
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import mineApi from '@/api/mine'
export default {
  name: 'NewAddress',
  components: {
    TopNav
  },
  data () {
    return {
      areaListData: [],
      info: {
        isDefault: 2
      }
    }
  },
  created () {
    this.getCityData()
    this.getInfo()
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
          self.$set(self.info, 'allAddress', result[0].name + result[1].name + result[2].name)
        },
        id: 'doubleLinePicker'
      })
    },
    getInfo () {
      if (this.$route.params.info) {
        const info = JSON.parse(decodeURIComponent(this.$route.params.info))
        console.log(info)
        this.info = info
        // this.info = {
        //   receiverName: info.name,
        //   mobileNumber: info.tel,
        //   detailedAddress: info.districtName,
        //   districtId: info.districtId,
        //   districtName: info.districtName,
        //   id: info.id,
        //   isDefault: 2
        // }
      }
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
    isPoneAvailable (phone) {
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!myreg.test(phone)) {
        return false
      } else {
        return true
      }
    },
    onSave () {
      if (!this.info.receiverName) {
        this.$toast('请填写收货人')
        return
      }
      if (!this.info.mobileNumber) {
        this.$toast('请填写手机号')
        return
      }
      if (!this.isPoneAvailable(this.info.mobileNumber)) {
        this.$toast('请填写正确的手机号')
        return
      }
      if (!this.info.allAddress) {
        this.$toast('请选择地区')
        return
      }
      if (!this.info.detailedAddress) {
        this.$toast('请填写详细地址')
        return
      }
      if (!this.info.isDefault) {
        this.info.isDefault = 2
      }
      mineApi.updateAddressInfo(this.info).then(res => {
        console.log(res)
        if (res.data.messageCode === 'MSG_1001') {
          this.$router.go(-1)
        } else {
          this.$toast(res.data.message)
        }
      })
    },
    changeArea (values) {
      console.log(values)
      console.log('dddd')
    },
    onChangeDetail (val) {
      // if (val) {
      //   this.searchResult = [{
      //     name: '黄龙万科中心',
      //     address: '杭州市西湖区'
      //   }]
      // } else {
      //   this.searchResult = []
      // }
    }
  },
  watch: {
    areaList (v) {
      console.log(v)
      this.areaList = v
    }
  }
}
</script>

<style scoped>
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
