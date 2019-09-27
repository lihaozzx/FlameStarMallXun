<template>
    <div class="team">
      <TopNav name="我的团队"></TopNav>
      <div v-if="show" id="snapshot">
        <div class="title">
          种草达人的欢乐场
        </div>
        <img class="icon" src="../../assets/goods/pop_logo.png" alt="">
        <div v-if="info.inviterCode" class="code">
          邀请码：{{info.inviterCode}}
        </div>
        <div class="img-box">
          <!--<div class="robbed">已抢人数:{{info.grabbed}}</div>-->
          <img class="goods-img" src="../../assets/member/pic4.png" alt="">
          <div class="tips4">
            和我组队薅羊毛
          </div>
          <div class="img-box-bot">
            <div class="price">
              平台累计返现金额￥{{info.cashBack}}
            </div>
            <!--<div class="back-box">最高返￥{{info.cashBack}}</div>-->
          </div>
        </div>
        <div class="snapshot-tips">
          {{info.desc}}
        </div>
        <img class="solar-code" :src="info.appletQrCodeUrl" alt="">
        <div class="solar-code-tips">长按保存图片或识别二维码查看</div>
      </div>
      <!--<img style="-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;" src="../../assets/home/qmf_bg.png" width="90%" id="testImg">-->
      <!--<span id="saveImg" @click="save()" style="margin-bottom:.6rem;margin-top:.6rem;">保存图片</span>-->
      <!--<div id="qrcode" ref="qrcode"></div>-->
      <div class="big-class">
        <div class="item-box">
            <div class="item">
              <div class="number">{{teamInfo.total}}</div>
              <div class="font">团队人数</div>
            </div>
          <div class="item">
            <div class="number">{{teamInfo.plusMembers}}</div>
            <div class="font">Plus会员</div>
          </div>
          <div class="item">
            <div class="number">{{teamInfo.members}}</div>
            <div class="font">普通会员</div>
          </div>
        </div>
      </div>
      <van-button @click="snapshot" class="btn">团队招募</van-button>
      <!--<div id="qrcode" ref="qrcode"></div>-->
      <div class="mine-team">
        <div class="title-box">
          <img src="../../assets/mine/team_myteaml.png" alt="">
          <div class="font">我的团队</div>
        </div>
        <div v-for="item in teamInfo.followers && teamInfo.followers.items" :key="item.id" class="item">
          <div class="left-box">
            <div class="name">{{item.nikeName}}</div>
            <div class="time">{{item.regTime | dateFormat1}}</div>
          </div>
          <div class="right-box">{{item.role === 2 ? '普通会员' : 'Plus会员'}}</div>
        </div>
      </div>
      <van-dialog
        closeOnClickOverlay
        v-model="shareShow"
        :showConfirmButton="false"
      >
        <img id="shareImg" src="" alt="">
        <!--<div class="share-box">-->
        <!--<img src="../../assets/goods/box.png" alt="">-->
        <!--<div class="content">-->

        <!--分享朋友后 <br>-->
        <!--你将获得高额商品<br>-->
        <!--返利奖励-->

        <!--</div>-->
        <!--<div @click="snapshot" class="btn">这就去</div>-->
        <!--</div>-->
        <!--<div class="tips">提示：建议您使用浏览器自带分享功能进行分享</div>-->
      </van-dialog>
      <van-dialog
        class="my-dialog"
        v-model="teamShow"
        :show-confirm-button="false"
      >
        <div class="main-content">
          <div class="content">
            <img class="title-img" src="../../assets/member/team_pop_title.png" alt="">
            <img class="content-img" src="../../assets/member/pop_element.png" alt="">
            <div class="font">在好友填写您的邀请码以后，您将获得平台给您的一定的佣金和返利。</div>
            <div class="font2">邀请码:{{getCode}}</div>
            <div class="tips">
              提示：建议您使用浏览器自带分享功能进行分享
            </div>
            <van-button  @click="teamShow = false" class="btn-share">确认</van-button>
            <img @click="teamShow = false" class="close" src="../../assets/member/vip_close_Pop-ups.png" alt="">
          </div>
        </div>
      </van-dialog>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import mineApi from '@/api/mine'
import html2canvas from 'html2canvas'
import wxApi from '@/api/wx'
export default {
  name: 'Team',
  components: {
    TopNav
  },
  data () {
    return {
      teamShow: false,
      shareShow: false,
      teamInfo: {},
      info: {},
      show: true
    }
  },
  created () {
    const data = {
      pageNumber: 1,
      pageSize: 10
    }
    mineApi.getFollowers(data).then(res => {
      this.teamInfo = res.data.content
    })
    this.weChatSnapshot()
  },
  methods: {
    weChatSnapshot () {
      const data = {
        mode: 4
      }
      wxApi.weChatSnapshot(data).then(res => {
        this.info = res.data.content
        // setTimeout(() => {
        //   this.snapshot()
        // }, 1000)
      })
    },
    snapshot () {
      let _this = this
      _this.shareShow = true
      let dom = document.getElementById('snapshot')
      // let box = window.getComputedStyle(dom)
      let width = dom.offsetWidth
      let height = dom.offsetHeight
      // let scaleBy = _this.getDpr()
      let canvas = document.createElement('canvas')
      // 设置canvas元素属性宽高为 DOM 节点宽高 * 像素比
      let scaleBy = 2
      canvas.width = width * scaleBy
      canvas.height = height * scaleBy
      // canvas.width = width
      // canvas.height = height
      // 设置canvas css 宽高为DOM节点宽高
      // canvas.style.width = width + 'px'
      // canvas.style.height = height + 'px'

      // 获取画笔
      let context = canvas.getContext('2d')
      context.scale(scaleBy, scaleBy)
      // 设置需要生成的图片的大小，不限于可视区域（即可保存长图）
      let w = document.getElementById('snapshot').style.width
      let h = document.getElementById('snapshot').style.height
      html2canvas(document.getElementById('snapshot'), {
        allowTaint: true,
        scale: scaleBy,
        canvas: canvas, // 自定义 canvas
        logging: true, // 日志开关
        width: width, // dom 原始宽度
        height: height, // dom 原始高度
        useCORS: true
      }).then(function (canvas) {
        var url = canvas.toDataURL('image/png')// base64数据
        document.getElementById('shareImg').src = url
        _this.show = false
        // var image = new Image()
        // image.src = url
        // console.log(document.getElementById('shareImg'))
        // document.getElementById('shareImg').appendChild(image)
      })
    }
  },
  computed: {
    getCode () {
      return localStorage.getItem('myInviterCode')
    }
  }
}
</script>

<style lang="scss" scoped>
  #shareImg {
    width: 100%;
    height: 100%;
    display: block;
  }
  #snapshot {
    position: absolute;
    top:0;
    z-index: -10;
    text-align: center;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/goods/bg.png");
    background-size: 100% 100%;
    .title {
      margin-top: 0.25rem;
      margin-bottom: 0.1rem;
      font-size:0.26rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
    .icon {
      margin: 0 auto;
      width: 1.03rem;
      height: 1.03rem;
      display: block;
    }
    .code {
      font-size:0.4rem;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(255,81,122,1);
    }
    .img-box{
      position: relative;
      margin: 0 auto;
      width: 5.62rem;
      height: 4.37rem;
      box-shadow: 2px 15px 10px #888888;
      .robbed {
        position: absolute;
        top: 0.12rem;
        right: -0.13rem;
        width:1.9rem;
        height:0.48rem;
        line-height: 0.48rem;
        text-align: center;
        background:rgba(255,150,175,1);
        box-shadow:0 0.01rem 0.01rem 0 rgba(78,17,21,0.19);
        border-radius:0.24rem 0 0 0.24rem;
        font-size:0.24rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      .goods-img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .tips4 {
        margin-top: -1.8rem;
        font-size:0.53rem;
        font-family:zcoolwenyiti;
        font-weight:400;
        font-style:italic;
        color: #FF96AF;
      }
      .img-box-bot {
        display: flex;
        align-items: center;
        width: 5.62rem;
        height: 1.33rem;
        position: absolute;
        top: 3.37rem;
        left: 0;
        background: url("../../assets/goods/bg2.png");
        background-size: 100%;
        .price {
          margin-left: 0.44rem;
          margin-top: 0.4rem;
          font-size:0.36rem;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
          color:rgba(227,58,89,1);
        }
        .back-box {
          width:1.75rem;
          height:0.4rem;
          background:rgba(255,150,175,1);
          border-radius:0.05rem;
          margin-left: 0.26rem;
          margin-top: 1.1rem;
          font-size:0.24rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
      }
    }
    .snapshot-tips {
      padding-left: 1rem;
      padding-right: 1rem;
      margin-top: 0.6rem;
      margin-bottom: 0.2rem;
      text-align: left;
      font-size:0.28rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:0.4rem;
    }
    .solar-code {
      width: 2.8rem;
      height: 2.8rem;
      display: block;
      margin: 0 auto;
    }
    .solar-code-tips {
      margin-top: 0.2rem;
      font-size:0.24rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(153,153,153,1);
    }
  }
  .team {
    background: #F4F4F4;
    .big-class {
      display: flex;
      align-items: center;
      width: 100%;
      height:1.6rem;
      background: #fff;
      .item-box {
        display: flex;
        height: 0.96rem;
        width: 100%;
        background: #07c160;
        .item {
          width:2.5rem;
          height:0.96rem;
          background:rgba(255,255,255,1);
          box-shadow:1px 0px 0px 0px rgba(231,231,231,1);
          border-right: 0.01rem #E7E7E7 solid;
          /*margin-right: 0.01rem;*/
          text-align: center;
          .number {
            font-size:0.34rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .font {
            font-size:0.28rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(153,153,153,1);
          }
        }
      }
    }
    .btn {
      display: block;
      width:6.9rem;
      height:0.8rem;
      line-height: 0.8rem;
      background:rgba(255,141,18,1);
      border-radius:0.4rem;
      font-size:0.32rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      margin: 0.6rem auto;
    }
    .mine-team {
      background: #fff;
      height: 8rem;
      .title-box {
        display: flex;
        align-items: center;
        height:0.9rem;
        border-bottom: 1px #f4f4f4 solid;
        background:rgba(255,255,255,1);
        img {
          margin-left: 0.3rem;
          margin-right: 0.2rem;
          width: 0.36rem;
          height: 0.36rem;
        }
        .font {
          font-size:0.32rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
      }
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:1.2rem;
        background:rgba(255,255,255,1);
        border-bottom: 1px #f4f4f4 solid;
        .left-box {
          margin-left: 0.3rem;
          .name {
            font-size:0.3rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .time {
            font-size:0.24rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(153,153,153,1);
          }
        }
        .right-box {
          margin-right: 0.3rem;
          font-size:0.32rem;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(227,58,89,1);
        }
      }
    }
    .my-dialog {
      background:rgba(255,255,255,0);
      .main-content {
        width:6.3rem;
        height:10.72rem;
        .content {
          width:6.3rem;
          height:9.72rem;
          background:#FF7725;
          border-radius:0.2rem;
          .tips {
            font-size:0.24rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(255,255,255,1);
            position: absolute;
            top: 7.3rem;
            left:0.56rem;
          }
          .title-img {
            width: 5.03rem;
            height: 0.56rem;
            display: block;
            position: absolute;
            top: 0.73rem;
            left:0.56rem;
          }
          .content-img {
            width: 5.79rem;
            height: 4.96rem;
            position: absolute;
            top: 2rem;
            left:0.33rem;
          }
          .font {
            width:2.84rem;
            height:1.35rem;
            z-index: 100;
            position: absolute;
            top: 2.8rem;
            left:1.72rem;
            font-size:0.28rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            color:rgba(251,61,0,1);
            line-height:0.36rem;
          }
          .font2 {
            width:2.72rem;
            height:0.32rem;
            z-index: 100;
            position: absolute;
            top: 5.6rem;
            left:1.72rem;
            font-size:0.34rem;
            font-family:PingFang-SC-Medium;
            font-weight:500;
            line-height:0.36rem;
            color:rgba(255,255,255,1);
          }
          .btn-share {
            position: absolute;
            bottom: 2rem;
            left:1.15rem;
            width:4rem;
            height:0.84rem;
            background:rgba(253,71,71,1);
            border-radius:0.42rem;
            font-size:0.34rem;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:rgba(255,255,255,1);
            line-height:0.63rem;
          }
          .close {
            width: 0.76rem;
            height: 0.76rem;
            display: block;
            position: absolute;
            bottom: 0rem;
            left:2.8rem;
          }
        }
      }

    }
  }

</style>
