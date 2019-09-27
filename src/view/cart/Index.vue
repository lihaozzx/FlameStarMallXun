<template>
    <div class="cart">
      <!--<TopNav name="购物车" :backShow="false"></TopNav>-->
      <div class="cartMain">
        <transition name="fade">
          <div v-if="visibel" class="swipe-text">
            <img src="../../assets/home/tzhi_icon.png" alt="">
            <div class="font">{{messageShuffling}}</div>
          </div>
        </transition>
        <ul>
          <li v-for="shop in carts" :key="shop.id" class="cartList">
            <div @click="goShopDetail(shop)" class="cartList-title van-hairline--bottom">
              <label>
                <input type="checkbox"
                       name="shopRadio"
                       :value="shop.storeId"
                       @click.stop="shopCheck($event,carts)"
                       class="disN">
                <b></b>
              </label>
              <!--<van-checkbox style="margin-left: 0.2rem;margin-right: 0.1rem" @click="changeAllChecked()" v-model="checked" checked-color="#07c160"></van-checkbox>-->
              <img v-if="shop.imageUrl" class="cartList-title-img" :src="shop.imageUrl" alt="">
              <div>{{shop.storeName}}</div>
            </div>
            <van-swipe-cell v-for="goods in shop.cartDetails" :key="goods.id"  :right-width="80">
              <div class="cartList-content van-hairline--bottom">
                <!--<van-checkbox :key="item.id" v-model="checkedNames" checked-color="#07c160"></van-checkbox>-->
                <!--<div @click="danxuan(item)">-->
                  <!--<img v-if="!item.danxuan" class="select" src="../../assets/goods/shoppingcart_list_onchoose.png" alt="">-->
                  <!--<img v-if="item.danxuan" class="select" src="../../assets/goods/shoppingcart_list_choose.png" alt="">-->
                <!--</div>-->
                <label>
                  <input
                    :disabled="goods.status === 2 || goods.status === 3"
                    type="checkbox"
                    name="goodRadio"
                    :cartId="goods.id"
                    :price="goods.goodsPrice"
                    :num="goods.quantity"
                    :dataId="shop.storeId"
                    :value="goods.goodsId"
                    @click.stop="goodsCkeck($event,shop.cartDetails,carts,shop.storeId)"
                    class="disN">
                  <b></b>
                </label>
                <img v-if="goods.imageUrl" @click="checkGoodsDeil(goods.goodsId)" class="good-img" :src="goods.imageUrl" alt="">
                <div class="good-info">
                  <div class="name">{{goods.goodsName}}</div>
                  <div class="desc">{{goods.spcDesc}}</div>
                  <div class="price">{{goods.goodsPrice}}</div>
                  <div v-if="goods.status === 1" class="number">
                    <van-stepper  @change="quantityChange(goods)" v-model="goods.quantity"></van-stepper>
                  </div>
                  <div class="shixiao" v-else>商品已失效</div>
                </div>
              </div>
              <div @click="deleteGoods(goods)" class="delete" slot="right">删除</div>
            </van-swipe-cell>
          </li>
          <li v-if="carts.length === 0" class="cartList">
           <div class="no-goods">
             <img src="../../assets/goods/gouwuche_no_n.png" alt="">
             <div class="tip">
               还没有商品呦
             </div>
           </div>
          </li>
        </ul>
      </div>
      <div v-if="carts.length !== 0" class="cartFooter">
        <label class="checkAll">
          <input type="checkbox" name="allRadio" class="disN" @click="allCheck($event)">
          <b></b>
          <span>全选</span>
        </label>
        <!--<div class="checkAll" @click="quanxuan()" >-->
          <!--<img v-if="!qx" class="select" src="../../assets/goods/shoppingcart_list_onchoose.png" alt="">-->
          <!--<img v-if="qx" class="select" src="../../assets/goods/shoppingcart_list_choose.png" alt="">-->
          <!--<span>全选</span>-->
        <!--</div>-->
        <div class="freight">不含运费</div>
        <div class="Total">
          <div class="name">
            合计：
          </div>
          <div class="price">￥{{parseFloat((sumPrice).toFixed(2))}}</div>
        </div>

        <div @click="settlement" class="Settlement">
          结算
        </div>
        <!-- <div class="Settlementtwo">
            <router-link :to="{name:'Home'}" >继续购物</router-link>
        </div> -->
      </div>
    </div>
</template>

<script>
// import TopNav from '@/components/TopNav'
import cartApi from '@/api/cart'
import homeApi from '@/api/home'
// import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: 'Index',
  // components: {
  //   TopNav
  // },
  data () {
    return {
      qx: false,
      checked: false,
      visibel:false,
      messageShuffling: '',
      messageShufflingList: [], // 消息通知轮播列表
      checkedNames: [],
      checkedArr: [],
      carts: [],
      cartStatus: 'account', // 购物车状态，account结算，edit删除编辑状态
      cartShops: [], // 店铺列表
      sumPrice: 0, // 合计金额
      totalNumber: 0, // 总数
      shopList: [], // 店铺列表
      goodsList: [], // 商品列表
      cartList: [] // 选中商品的购物车id（购物车下单的时候需要）
    }
  },
  created () {
    this.getShoppingCart()
    this.getMessageShuffling()
  },
  methods: {
    getMessageShuffling () {
      const data = {
        pageNumber: 1,
        pageSize: 100000
      }
      homeApi.getTextSlideShow(data).then(res => {
        this.messageShufflingList  = res.data.content.items
      })
      let i = 0
      setInterval(()=> {
        this.visibel = !this.visibel
        if (this.visibel) {
          i++
          this.messageShuffling = this.messageShufflingList[i]
        }
      },3000)
    },
    goodsCkeck: function (event, goodsList, shopList, shopId) {
      // 商品列表+-，店铺是否checked(店铺列表+-),全选是否checked
      let input = document.getElementsByTagName('input')
      if (event.target.checked) {
        // input[i].getAttribute('dataId') == event.target.value
        this.goodsList.push(String(event.target.value))
        this.cartList.push(parseInt(event.target.getAttribute('cartId')))
        // 如果店铺内所有商品全选，店铺选中
        let newArr = this.goodsList
        let tt = goodsList.every(function (itemValue) {
          return (newArr.indexOf(String(itemValue.id)) !== -1)
        })
        if (tt) {
          // 店铺内全选,店铺checked,店铺列表+
          for (let i = 0; i < input.length; i++) {
            if (input[i].value == shopId) {
              input[i].checked = true
            }
          }
          this.shopList.push(String(shopId)) // 防止shopid是number类型造成麻烦
          // 如果所有店铺都全选，则全选按钮checked
          if (this.shopList.length === shopList.length) {
            // 所有店铺全选
            for (let i = 0; i < input.length; i++) {
              if (input[i].name == 'allRadio') {
                input[i].checked = true
              }
            }
          }
        }
      } else {
        // 商品列表--
        this.goodsList.splice(this.goodsList.indexOf(event.target.value), 1)
        this.cartList.splice(this.cartList.indexOf(event.target.getAttribute('cartId')), 1)
        // 如果店铺checked，则取消，店铺列表--
        for (let i = 0; i < input.length; i++) {
          if (input[i].value == shopId) {
            if (input[i].checked) {
              input[i].checked = false
              this.shopList.splice(this.shopList.indexOf(String(shopId)), 1) // 防止shopid是number类型造成麻烦
            }
          }
          // 任意一个不选，全选取消
          if (input[i].name == 'allRadio') {
            input[i].checked = false
          }
        }
      }
      // 计算总价和数量
      this.caculate()
    },
    // 店铺选择
    shopCheck: function (event, shopList) {
      // 店铺选中则对应商品全选，否则全不选
      let input = document.getElementsByTagName('input')
      if (event.target.checked) {
        // 店铺列表+，店铺checked,店铺内商品全checked，商品列表++
        this.shopList.push(String(event.target.value))
        // 店铺内商品全checked
        for (let i = 0; i < input.length; i++) {
          if (input[i].getAttribute('dataId') == event.target.value) {
            // 将没有选中的checked,并加入列表，去重
            if (!input[i].checked) {
              input[i].checked = true
              // 商品列表++event.target.getAttribute('cartId')
              this.goodsList.push(String(input[i].value))
              this.cartList.push(parseInt(input[i].getAttribute('cartId')))
            }
          }
        }
        // 所有店铺全选
        if (this.shopList.length == shopList.length) {
          for (let i = 0; i < input.length; i++) {
            if (input[i].name === 'allRadio') {
              input[i].checked = true
            }
          }
        }
      } else {
        // 店铺取消checked,店铺列表--，店铺内所有商品取消checked,商品列表--
        this.shopList.splice(this.shopList.indexOf(String(event.target.value)), 1)
        // 店铺内所有商品取消checked
        for (let i = 0; i < input.length; i++) {
          if (input[i].getAttribute('dataId') == event.target.value) {
            input[i].checked = false
            // 商品列表--
            this.goodsList.splice(this.goodsList.indexOf(input[i].value), 1)
            this.cartList.splice(this.cartList.indexOf(input[i].getAttribute('cartId')), 1)
          }
          // 任意一个不选，全选取消
          if (input[i].name == 'allRadio') {
            input[i].checked = false
          }
        }
      }
      // 计算总价和数量
      this.caculate()
    },
    // 所有全选
    allCheck: function (event) {
      let input = document.getElementsByTagName('input')
      if (event.target.checked) {
        // 全选checked,所有店铺checked,店铺列表++,所有商品checked,商品列表++
        for (let i = 0; i < input.length; i++) {
          // 去重
          if (!input[i].checked) {
            input[i].checked = true
            if (input[i].name == 'shopRadio') {
              this.shopList.push(String(input[i].value))
            }
            if (input[i].name == 'goodRadio') {
              this.goodsList.push(String(input[i].value))
              this.cartList.push(parseInt(input[i].getAttribute('cartId')))
            }
          }
        }
      } else {
        // 全不选取消checked,店铺全部取消checked,店铺列表清空，所有商品取消checked,商品列表清空
        for (let i = 0; i < input.length; i++) {
          input[i].checked = false
          this.shopList = []
          this.goodsList = []
          this.cartList = []
        }
      }
      // 计算总价和数量
      this.caculate()
    },
    // 计算总金额总数量
    caculate () {
      let input = document.getElementsByTagName('input')
      console.log(input.length)
      let newArr = []
      for (let i = 0; i < input.length; i++) {
        if (input[i].name == 'goodRadio' && input[i].checked) {
          let num = input[i].getAttribute('num')
          newArr.push(
            {
              'price': input[i].getAttribute('price'),
              'num': num
            }
          )
        }
      }
      this.totalNumber = newArr.length
      // 归零
      this.sumPrice = 0
      for (let j = 0, len = newArr.length; j < len; j++) {
        this.sumPrice += newArr[j].price * newArr[j].num
      }
    },
    quantityChange (goods) {
      const data = {
        id: goods.id,
        quantity: goods.quantity
      }
      cartApi.updateShoppingCart(data).then(res => {
        // this.getShoppingCart()
        this.caculate()
      })
    },
    deleteGoods (item) {
      this.$dialog.confirm({
        title: '提示',
        message: '确认删除购物车所选商品？'
      }).then(() => {
        const data = {
          id: item.id
        }
        cartApi.deleteById(data).then(res => {
          this.getShoppingCart()
        })
      }).catch(() => {
        // on cancel
      })
    },
    settlement () {
      if (this.sumPrice === 0) {
        this.$toast('请选择你要结算的商品')
      } else {
        const goodsInfo = {
          cardIds: this.cartList
        }
        this.$router.push({name: 'Order', params: {goodsInfo: encodeURIComponent(JSON.stringify(goodsInfo))}})
      }
    },

    quanxuan () {
      this.qx = !this.qx
      if (this.qx) {
        this.carts.forEach((v, i) => {
          v.cartDetails.forEach(v2 => {
            this.$set(v2, 'danxuan', true)
          })
        })
      } else {
        this.carts.forEach((v, i) => {
          v.cartDetails.forEach(v2 => {
            this.$set(v2, 'danxuan', false)
          })
        })
      }
    },
    danxuan (item) {
      this.$set(item, 'danxuan', !item.danxuan)
      // item.danxuan = !item.danxuan
      if (!item.danxuan) {
        this.qx = false
      }
    },
    changeAllChecked: function () {
      // if (this.checked) {
      //   this.checkedNames = this.checkedArr
      // } else {
      //   this.checkedNames = []
      // }
    },
    getShoppingCart () {
      const data = {
        pageNumber: 1,
        pageSize: 10
      }
      cartApi.queryShoppingCart(data).then(res => {
        this.carts = res.data.content.items
        console.log(this.carts)
        this.$nextTick(() => {
          this.caculate()
        })

      })
    },
    checkGoodsDeil (id) {
      this.$router.push({name: 'GoodsDetail', params: {id: id}})
    },
    goShopDetail (item) {
      this.$router.push({name: 'ShopDetail', params: {id: item.storeId}})
    }
  },
  watch: {
    'checkedNames': function () {
      if (this.checkedNames.length === this.checkedArr.length) {
        this.checked = true
      } else {
        this.checked = false
      }
    }
  },
  computed: {
    // carts () {
    //   return [{}]
    //   // return this.$store.state.carts
    // },
    // ...mapGetters(['this.$store.state.carts'])
    sum: function () {
      let sum = 0
      this.carts.forEach((v, i) => {
        v.cartDetails.forEach(v2 => {
          if (v2.danxuan) {
            sum += v2.quantity * v2.goodsPrice
          }
        })
      })
      return sum
    }
  }
}
</script>

<style lang="scss" scoped>
  .disN {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.2rem;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .swipe-text {
    z-index: 99;
    position: fixed;
    top: 2rem;
    margin-top: 0.24rem;
    margin-left: 0.16rem;
    line-height: 1rem;
    font-size: 0.24rem;
    /*width:4.04rem;*/
    height:0.44rem;
    background:rgba(0,0,0,1);
    opacity:0.45;
    border-radius:0.22rem;
    display: flex;
    align-items: center;
    /*justify-content: center;*/
    img {
      margin-left: 0.14rem;
      margin-right: 0.1rem;
      width: 0.24rem;
      height: 0.2rem;
      /*vertical-align: middle;*/
    }
    .font {
      margin-right: 0.1rem;
      width: 100%;
      height: 100%;
      line-height: 0.4rem;
      font-size:0.2rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      flex-wrap: nowrap;
      overflow: hidden;
    }
  }
  .cart {
    .cartMain {
      background: #f4f4f4;
      .cartList {
        background: #fff;
        .no-goods {
          padding-top: 2.8rem;
          img {
            margin: 0 auto;
            width: 2rem;
            height: 2rem;
            display: block;
          }
          .tip {
            text-align: center;
            font-size:0.28rem;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
        }
        .select {
          margin-left: 0.2rem;
          width: 0.64rem;
          height: 0.64rem;
        }
        .cartList-title {
          display: flex;
          align-items: center;
          width: 100%;
          height: 0.9rem;
          background: #fff;
          font-size:0.3rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
          .cartList-title-img {
            width: 0.36rem;
            height: 0.36rem;
            margin-right: 0.13rem;
          }
        }
        .cartList-content {
          display: flex;
          align-items: center;
          height: 2.42rem;
          .good-img {
            width: 1.68rem;
            height: 1.4rem;
            margin-right: 0.24rem;
          }
          .good-info {
            height: 1.4rem;
            .name {
              font-size:0.28rem;
              font-family:PingFang-SC-Medium;
              font-weight:500;
              color:rgba(51,51,51,1);
              height: 0.4rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              /* ! autoprefixer: off */
              -webkit-box-orient: vertical;
              /* autoprefixer: on */
              margin-bottom: 0.2rem;
            }
            .desc {
              font-size:0.24rem;
              font-family:PingFang-SC-Medium;
              font-weight:500;
              color:rgba(153,153,153,1);
              margin-bottom: 0.35rem;
            }
            .price {
              font-size:0.18rem;
              font-family:PingFang-SC-Medium;
              font-weight:500;
              color:rgba(227,58,89,1);
            }
            .number {
              position: relative;
              top: -0.6rem;
              right: -2.5rem;
            }
            .shixiao {
              position: relative;
              top: -0.6rem;
              left: 2.5rem;
              text-align: center;
              line-height: 0.5rem;
              width:1.68rem;
              height:0.5rem;
              background:rgba(189,189,189,1);
              border-radius:0.25rem;
              font-size:0.24rem;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
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
          line-height: 2.42rem;
        }
      }
    }
    .cartFooter {
      position: fixed;
      align-items: center;
      height:0.9rem;
      background:rgba(255,255,255,1);
      width: 100%;
      bottom: 1rem;
      display: flex;
      border-top: 1px solid #f4f4f4;
      .checkAll {
        display: flex;
        align-items: center;
        font-size:0.28rem;
        width: 1.5rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        img {
          margin-left: 0.2rem;
          width: 0.64rem;
          height: 0.64rem;
        }
      }
      .freight {
        margin-left: 0.5rem;
        margin-right: 0.2rem;
        font-size:0.24rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(136,136,136,1);
      }
      .Total {
        display: flex;
        align-items: center;
        width:2.5rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        .name {
          font-size:0.28rem;
          color:rgba(51,51,51,1);
        }
        .price {
          font-size:0.32rem;
          color:#E4405E
        }
      }
      .Settlement {
        text-align: center;
        line-height: 0.9rem;
        width:1.8rem;
        height:0.9rem;
        background:rgba(255,81,122,1);
        font-size:0.36rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
  }
</style>
