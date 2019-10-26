<template>
  <div class="EvaluationPage">
    <TopNav name="评价"></TopNav>
    <div class="title van-hairline--bottom">
      <div class="left">
        综合评分
        <van-rate
          readonly
          style="height: 0.37rem"
          v-model="userInteract.avgGoddInteract"
        >
        </van-rate>
      </div>
      <div>
        <span style="color: #E33A59">{{userInteract.goodInteractRate}}%</span>
        <span>的人都觉得好</span>
      </div>
    </div>

    <div
      v-for="(item, index) in userInteractList"
      :key="index"
      class="evaluation van-hairline--bottom"
    >
      <div class="evaluation-top">
        <img
          v-if="item.avatarUrl"
          :src="item.avatarUrl"
          alt=""
        >
        <img
          v-else
          src="../../assets/zhanw_tb_n.png"
          alt=""
        >
        <div class="evaluation-top-center">
          <div class="name">{{item.nickname ? item.nickname : 'sds'}}</div>
          <div class="date">{{item.createTime | dateFormat1}}</div>
        </div>
        <div class="evaluation-top-center">
          <div
            class="name"
            style="margin-left: 0.8rem"
          >
            <van-rate
              readonly
              style="height: 0.37rem"
              v-model="item.score"
            >
            </van-rate>
          </div>
          <div class="date">{{item.spcDesc}}</div>
        </div>
      </div>
      <div class="evaluation-bottom">
        {{item.content}}
      </div>
      <div
        v-if="item.userInteractDetails.length > 0 && item.userInteractDetails[0].content"
        class="shop-reply"
      >
        <span class="shop-reply-title">商家回复：</span>
        <span class="shop-reply-content">{{item.userInteractDetails[0].content}}</span>
      </div>
      <div class="evaluation-img-box">
        <img
          v-for="(item2, index2) in item.interactImageUrlList"
          :key="index2"
          :src="item2"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import homeApi from '@/api/home'
export default {
  name: 'EvaluationPage',
  components: {
    TopNav
  },
  data() {
    return {
      rateValue: 5,
      userInteractList: [],
      userInteract: {}
    }
  },
  created() {
    this.getUserInteract()
  },
  methods: {
    /**
     * 用户评价
     */
    getUserInteract() {
      const data = {
        pageNumber: 1,
        pageSize: 10,
        goodsId: this.$route.params.id
      }
      homeApi.getUserInteract(data).then(res => {
        this.userInteract = res.data.content
        this.userInteractList = res.data.content.items
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.EvaluationPage {
  .title {
    width: 100%;
    height: 0.9rem;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.28rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    .left {
      display: flex;
    }
  }
  .evaluation {
    margin-top: 0.01rem;
    padding: 0.3rem 0.3rem 0.2rem 0.3rem;
    /*width:7.50rem;*/
    /*height:2.92rem;*/
    background: rgba(255, 255, 255, 1);
    .evaluation-top {
      height: 1rem;
      clear: both;
      img {
        float: left;
        display: block;
        height: 1rem;
        width: 1rem;
      }
      .evaluation-top-center {
        float: left;
        margin-left: 0.3rem;
        .name {
          margin-top: 0.1rem;
          font-size: 0.28rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .date {
          margin-top: 0.1rem;
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
    .evaluation-bottom {
      margin-top: 0.24rem;
      margin-bottom: 0.2rem;
      width: 6.86rem;
      /*height: 1.1rem;*/
      overflow: hidden;
      font-size: 0.28rem;
      text-overflow: ellipsis;
      word-break: break-all;
      font-size: 0.28rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.36rem;
    }
    .shop-reply {
      margin-top: 0.24rem;
      padding: 0.2rem;
      /*width:6.9rem;*/
      /*height:0.74rem;*/
      font-size: 0.28rem;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      /*line-height:0.36rem;*/
      background: rgba(244, 244, 244, 1);
      border-radius: 0.08rem;
    }
    .evaluation-img-box {
      display: flex;
      img {
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.2rem;
      }
    }
    .shop-reply-title {
      font-size: 0.28rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .shop-reply-content {
      font-size: 0.28rem;
      font-family: PingFang-SC-Medium;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>
