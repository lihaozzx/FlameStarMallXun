<template>
  <div class="UpDataInfo">
    <TopNav name="个人资料"></TopNav>
    <van-cell-group class="cell-group-bg">
      <van-cell
        size="large"
        border
        is-link
        title="头像">
        <van-uploader :after-read="onRead">
          <img :src="infoData.avatarKeyUrl" class="head-img" ref="goodsImg"/>
        </van-uploader>
        <!--<img class="head-img" src="../../assets/nav/bq_home_icon_a.png" alt="">-->
      </van-cell>
      <van-field
        maxlength="10"
        minlength="1"
        input-align="right"
        size="large"
        v-model="infoData.nickname"
        label="昵称"
      >
      </van-field>
      <van-cell
        @click="sexShow = true"
        class="marginTop20"
        size="large"
        border
        is-link
        title="性别">
        {{infoData.gender === 1 ? '男' : '女'}}
      </van-cell>
      <van-cell
        @click="dateShow = true"
        size="large"
        border
        is-link
        title="生日">
        {{infoData.birthday}}
      </van-cell>
      <van-field
        input-align="right"
        class="marginTop20"
        size="large"
        v-model="infoData.career"
        label="职业"
      >
      </van-field>
      <!--<van-cell-->
        <!--@click="homeClike"-->
        <!--size="large"-->
        <!--border-->
        <!--is-link-->
        <!--title="所在地">-->
       <!--{{infoData.location}}-->
      <!--</van-cell>-->
      <van-field
        input-align="right"
        class="marginTop20"
        size="large"
        v-model="infoData.location"
        label="所在地"
      >
      </van-field>
      <van-field
        input-align="right"
        class="marginTop20"
        size="large"
        v-model="infoData.hometown"
        label="故乡"
      >
      </van-field>
      <!--<van-cell-->
        <!--@click="aa"-->
        <!--size="large"-->
        <!--border-->
        <!--is-link-->
        <!--title="故乡">-->
        <!--{{infoData.hometown}}-->
      <!--</van-cell>-->
    </van-cell-group>
    <van-actionsheet
      v-model="sexShow"
      :actions="actions"
      @select="onSelect"
    ></van-actionsheet>
    <van-popup v-model="dateShow" position="bottom">
      <van-datetime-picker
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dateConfirm"
        @cancel="dateShow = false"
        type="date"
      ></van-datetime-picker>
    </van-popup>
    <van-button @click="saveInfo" class="saveBtn" size="large" round type="warning">保存</van-button>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import mineApi from '@/api/mine'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  name: 'UpdataInfo',
  components: {
    TopNav
  },
  data () {
    return {
      currentDate: new Date(),
      sexShow: false,
      dateShow: false,
      actions: [
        {
          name: '男',
          val: 1
        },
        {
          name: '女',
          val: 2
        }
      ],
      areaListData: [],
      infoData: {
        avatarKey: {},
        avatarKeyUrl: '',
        nickname: '',
        career: '',
        gender: null,
        birthday: null,
        location: '',
        hometown: ''
      },
      minDate: new Date(1960, 1, 1),
      maxDate: new Date()
    }
  },
  created () {
    this.getMineInfo()
    this.getAreaList()
  },
  methods: {
    getAreaList () {
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
    onRead (file, detail) {
      this.$refs.goodsImg.src = file.content
      this.infoData.avatarKey = file.file
    },
    getMineInfo () {
      mineApi.queryBaseData().then(res => {
        this.infoData = res.data.content
        this.infoData = {
          avatarKeyUrl: res.data.content.avatarKey,
          nickname: res.data.content.nickname,
          career: res.data.content.career,
          gender: res.data.content.gender,
          birthday: res.data.content.birthday,
          location: res.data.content.location,
          hometown: res.data.content.hometown
        }
      })
    },
    onSelect (item) {
      this.infoData.gender = item.val
      this.sexShow = false
    },
    // aa () {
    //   const self = this
    //   weui.picker(this.areaListData, {
    //     className: 'custom-classname',
    //     container: 'body',
    //     defaultValue: [1, 3],
    //     onConfirm: function (result) {
    //       self.$set(self.infoData, 'hometown', result[0].name + result[1].name + result[2].name)
    //     },
    //     id: 'doubleLinePicker'
    //   })
    // },
    // homeClike () {
    //   const self = this
    //   weui.picker(this.areaListData, {
    //     className: 'custom-classname',
    //     container: 'body',
    //     defaultValue: [1, 3],
    //     onChange: function (result) {
    //       // console.log(result)
    //     },
    //     onConfirm: function (result) {
    //       self.$set(self.infoData, 'location', result[0].name + result[1].name + result[2].name)
    //     },
    //     id: 'doubleLinePicker'
    //   })
    // },
    dateConfirm (v) {
      // let res = moment(v, 'YYYY-MM-DD HH:mm:ss').valueOf()
      // this.infoData.birthday = res
      this.infoData.birthday = moment(v).format('YYYY-MM-DD')
      this.dateShow = false
    },
    saveInfo () {
      let formData = new FormData()
      for (let item in this.infoData) {
        if (this.infoData[item]) {
          formData.append(item, this.infoData[item])
        }
      }
      mineApi.modifyBaseData(formData).then(res => {
        console.log(res)
        if (res.data.messageCode === 'MSG_1001') {
          this.$toast({
            message: '资料修改成功'
          })
          this.$router.go(-1)
        } else {
          this.$toast(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .UpDataInfo {
    height: 13.34rem;
    background: #F4F4F4;
    .cell-group-bg {
      background: #F4F4F4;
    }
    .marginTop20 {
      margin-top: 0.2rem;
    }
    .head-img {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
    }
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
