<template>
    <div>
      <TopNav name="我的地址" special2="true"></TopNav>
      <van-swipe-cell
        v-for="(item, index) in list"
        :key="index"
        class="swipe-item"  :right-width="80">
        <div @click="setDefault(item)" class="address-content van-hairline--bottom">
          <div class="good-img">{{item.receiverName && item.receiverName.split('')[0]}}</div>
          <div class="content-div">
            <div class="name-div">
              <div class="name">
                {{item.receiverName}}
              </div>
              <div class="phone">
                {{item.mobileNumber}}
              </div>
              <div v-if="index === 0" class="icon">
                默认
              </div>
            </div>
            <div class="address-div">
              {{item.provinceName}}省{{item.cityName}}市{{item.districtName}}{{item.detailedAddress}}
            </div>
          </div>
          <img @click.stop="onEdit(item, index)" class="edit" src="../../assets/mine/location_edit.png" alt="">
        </div>
        <div @click="deleteAddress(item.id)" class="delete" slot="right">删除</div>
      </van-swipe-cell>
      <van-button @click="onAdd" class="saveBtn" size="large" round type="warning">新增地址</van-button>
      <van-dialog
        v-model="show"
        title="提示"
        message="是否删除收货地址？"
        show-cancel-button
        confirm-button-color="#FF517A"
        @confirm="onDelete"
      >
      </van-dialog>
    </div>
</template>

<script>
import mineApi from '@/api/mine'
import TopNav from '@/components/TopNav'
export default {
  name: 'Address',
  components: {
    TopNav
  },
  data () {
    return {
      show: false,
      addressId: null,
      chosenAddressId: '1',
      list: []
    }
  },
  created () {
    this.getAddress()
  },
  methods: {
    deleteAddress (id) {
      this.addressId = id
      this.show = true
    },
    onDelete () {
      const data = {
        id: this.addressId
      }
      mineApi.deleteAddress(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          // this.$router.push({name: 'Address'})
          this.getAddress()
        } else {
          this.$toast(res.data.message)
        }
      })
    },
    getAddress () {
      mineApi.getAddressInfo().then(res => {
        console.log(res)
        this.list = res.data.content
        // res.data.content.forEach((v, i) => {
        //   const obj = {
        //     id: v.id,
        //     districtId: v.districtId,
        //     name: v.receiverName,
        //     tel: v.mobileNumber,
        //     address: v.provinceName + v.cityName + v.districtName + v.detailedAddress,
        //     districtName: v.detailedAddress
        //   }
        //   this.list.push(obj)
        // })
      })
    },
    onAdd () {
      this.$router.push({name: 'NewAddress'})
    },
    setDefault (item) {
      console.log(localStorage.getItem('selctAddressShow'))
      if (!localStorage.getItem('selctAddressShow')) {
      } else {
        const objToStr = JSON.stringify(item)
        localStorage.setItem('selctAddress', objToStr)
        this.$router.go(-1)
      }
      // item.isDefault = 1
      // mineApi.updateAddressInfo(item).then(res => {
      //   if (res.data.messageCode === 'MSG_1001') {
      //     this.$toast('设置默认地址成功')
      //     this.$router.go(-1)
      //   } else {
      //     this.$toast(res.data.message)
      //   }
      // })
    },
    onEdit (item, index) {
      let data = item
      if (index === 0) {
        data.isDefault = 1
      }
      data.allAddress = item.provinceName + item.cityName + item.districtName
      this.$router.push({name: 'EditAddress', params: {info: encodeURIComponent(JSON.stringify(data))}})
    }
  }
  // destroyed () {
  //   localStorage.removeItem('selctAddressShow')
  // }
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
  .swipe-item {
    .address-content {
      display: flex;
      align-items: center;
      width:100%;
      height:1.74rem;
      background:rgba(255,255,255,1);
      .good-img {
        text-align: center;
        line-height: 0.64rem;
        width:0.64rem;
        height:0.64rem;
        background:rgba(170,170,170,1);
        border-radius:50%;
        margin-right: 0.24rem;
        margin-left: 0.3rem;
        font-size:0.28rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      .content-div {
        width: 4.9rem;
        .name-div {
          display: flex;
          align-items: center;
          .name {
            /*width:58px;*/
            /*height:28px;*/
            font-size:0.3rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .phone {
            /*width:194px;*/
            /*height:23px;*/
            margin-left: 0.1rem;
            font-size:0.3rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .icon {
            margin-left: 0.2rem;
            text-align: center;
            width:0.76rem;
            height:0.34rem;
            background:rgba(255,246,237,1);
            border:0.01rem solid rgba(255,141,18,1);
            font-size:0.24rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(255,141,18,1);
          }
        }
        .address-div {
          margin-top: 0.1rem;
          width:4.9rem;
          height:0.7rem;
          font-size:0.26rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:0.36rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          /* ! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
        }
      }
      .edit {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        margin-left: 0.4rem;
      }
    }
    .delete {
      width:1.6rem;
      height:2.42rem;
      background:rgba(227,58,89,1);
      font-size:0.3rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      text-align: center;
      line-height: 1.72rem;
    }
  }
</style>
