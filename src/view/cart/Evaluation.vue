<template>
    <div style="background: #F4F4F4;">
      <TopNav name="商品评价"></TopNav>
      <div
        style="margin-bottom: 0.2rem;background: #FFF;"
        v-for="(item, index2) in goodsData"
        :key="index2"
      >
        <div class="goods-box">
          <img class="goods-img" :src="item.imageUrl" alt="">
          <div>
            <div class="goods-top">
              <div class="name">{{item.goodsName}}</div>
              <div class="price"><span style="font-size: 0.24rem">￥</span>{{item.price}}</div>
            </div>
            <div class="goods-bottom">
              <div class="spec">{{item.specDesc}}</div>
              <div class="number">x{{item.quantity}}</div>
            </div>
          </div>
        </div>
        <div class="evaluationd-box">
          <div class="rate">
            <div class="font">商品评分</div>
            <van-rate color="#FF517A" v-model="goodsData[index2].commentNum"></van-rate>
          </div>
          <van-field
            maxlength="100"
            v-model="goodsData[index2].goodsComment"
            type="textarea"
            clearable
            placeholder="快来说说宝贝它的优点和美中不足的地方吧(0/100)"
          >
          </van-field>
        </div>
        <van-uploader style="margin-left: 0.2rem" v-model="goodsData[index2].imgList" multiple />
      </div>
      <div class="btn" @click="submit">发布</div>
    </div>
</template>

<script>
  import TopNav from '@/components/TopNav'
  import orderApi from '@/api/order'
    export default {
        name: "Evaluation",
      components: {
        TopNav
      },
      data () {
          return {
            commentNum: 1,
            imgList: [],
            imgList2: [],
            goodsComment: '',
            goodsData: []
          }
      },
      created () {
        this.queryOrder()
      },
      methods: {
        afterRead (file) {
          console.log(file)
          this.imgList2.push(file.content)
          let obj = {
            url: file.content.substring(file.content.indexOf(",") + 1)
          }
          this.imgList.push(obj)
          console.log(this.imgList)
          // this.userInteractGoodsList[index2].avatarKeyUrl = file.file
        },
        submit () {
          let that = this
          let userInteractGoodsList = []
          let userInteractGoodsList_item = {}
          for (let item in this.goodsData) {
            console.log(this.goodsData[item].imgList)
            let arr = []
            this.goodsData[item].imgList && this.goodsData[item].imgList.forEach((v, i) => {
              let obj = {}
              obj.url = v.content.substring(v.content.indexOf(",") + 1)
              arr.push(obj)
            })
            userInteractGoodsList_item = {
              interactImageFiles: arr,
              score: this.goodsData[item].commentNum,
              content: this.goodsData[item].goodsComment,
              goodsId: this.goodsData[item].goodsId,
              orderDetailId: this.goodsData[item].id,
            }
            userInteractGoodsList.push(userInteractGoodsList_item)
          }
          console.log(userInteractGoodsList)
          let infoData = {
            action: 1,
            orderId: this.$route.params.orderId,
            userInteractGoodsList: userInteractGoodsList
          }
          console.log(that.goodsData)
          console.log(infoData)
          let formData = new FormData()
          for (let item in infoData) {
            console.log(infoData[item].length)
            if (infoData[item]) {
              console.log(infoData[item])
              formData.append(item, infoData[item])
            }
          }
          orderApi.addUserInteractGoods(infoData).then(res => {
            if (res.data.messageCode === 'MSG_1001') {
              this.$toast('感谢您的认真评价')
              this.$router.replace({name: 'Home'})
              // this.goodsData =  res.data.content.orderGoodsDetail
            } else {
              this.$toast(res.data.message)
            }
          })

        },
        queryOrder () {
          const data = {
            orderId: this.$route.params.orderId
          }
          orderApi.getQueryOrder(data).then(res => {
            if (res.data.messageCode === 'MSG_1001') {
              this.goodsData =  res.data.content.orderGoodsDetail
            } else {
              this.$toast(res.data.message)
            }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  .goods-box {
    /*height:1.46rem;*/
    display: flex;
    background: #fff;
    padding: 0.2rem 0.3rem 0.2rem 0.3rem;
    border-bottom: 1px #E7E7E7 solid;
    .goods-img {
      width:1.2rem;
      height:1.2rem;
      margin-right: 0.3rem;
      background:rgba(241,241,241,1);
      border-radius:0.08rem;
    }
    .goods-top {
      display: flex;
      /*align-items: center;*/
      justify-content: space-between;
      /*margin-bottom: 0.2rem;*/
      width: 5.3rem;
      .name {
        height: 0.8rem;
        line-height: normal;
        width:3.3rem;
        font-size:0.28rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* ! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
      }
      .price {
        font-size:0.32rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:#999999;
      }
    }
    .goods-bottom {
      display: flex;
      justify-content: space-between;
      width: 5.3rem;
      .spec {
        font-size:0.24rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
      }
      .number {
        font-size:0.24rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:#999999;
      }
    }
  }
  .evaluationd-box{
    .rate {
      height: 0.8rem;
      font-size: 0.24rem;
      display: flex;
      align-items: center;
      border-bottom: 1px #E7E7E7 solid;
      .font {
        margin-left: 0.3rem;
        margin-right: 0.3rem;
      }
    }
  }
  .head-img {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }
  .img-box {
    display: flex;
    .img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.2rem;
    }
  }
  .btn{
    width:6.7rem;
    height:0.8rem;
    background-color: #FF2644;
    margin:0 auto;
    margin-top: 0.4rem;
    border-radius: 0.4rem;
    font-size: 0.32rem;
    color:#fff;
    line-height: 0.8rem;
    text-align: center;
  }
</style>
