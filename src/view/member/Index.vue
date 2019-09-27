<template>
  <div class="member-page">
    <TopNav
      :backShow="false"
      name="会员"
    ></TopNav>

    <div
      v-if="show&&info"
      id="snapshot"
    >
      <div class="title">"Free Buy"，自由买，免费拿</div>
      <div class="info_box">
        <img
          src="../../assets/home/partner.png"
          class="icon"
          alt=""
        >
        <div
          v-if="info.inviterCode"
          class="code"
        >
          我的邀请码：{{info.inviterCode}}
        </div>
        <div class="img-box">
          <div class="robbed">参与人数:{{info.participants}}</div>
          <img
            class="goods-img"
            src="../../assets/home/zero2_share_img.png"
            alt
          />
        </div>
        <div class="img-box-bot">
          <div class="price">￥<span class="num">{{info.price}}</span></div>
          <div class="back-box">参与返￥{{info.cashBack}}</div>
        </div>
        <div class="snapshot-tips">{{info.desc}}</div>
      </div>
      <img
        class="solar-code"
        :src="info.appletQrCodeUrl"
        alt
      />
      <div class="solar-code-tips">长按保存图片或识别二维码查看</div>
    </div>

    <div class="bg-box">
      <img
        class="bg1"
        src="../../assets/member/vip_radian_bg.png"
        alt=""
      >
      <img
        v-if="memberInfo.expireTime"
        class="bg2"
        src="../../assets/member/vip_card2.png"
        alt=""
      >
      <img
        v-else
        class="bg2"
        src="../../assets/member/vip_card.png"
        alt=""
      >
      <div
        v-if="memberInfo.expireTime"
        class="content"
      >
        <div>会员到期日</div>
        <div style="margin-top: 0.2rem">{{ memberInfo.expireTime | dateFormat1 }}</div>
      </div>
      <div
        v-else
        class="content2"
      >
        <div>你还不是会员</div>
        <!--<div style="margin-top: 0.2rem">{{ memberInfo.expireTime }}</div>-->
      </div>
    </div>
    <!--<div class="get-member-bg">-->
    <!--<img class="bg-img" src="../../assets/member/vip_get_vip(1).png" alt="">-->
    <!--<div class="content">-->
    <!--<div>首次开通会员仅</div>-->
    <!--<div>-->
    <!--需3元一个月！-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="main-box">
      <!--<div class="play">-->
      <!--<div class="package">-->
      <!--<div class="title">按月付</div>-->
      <!--<div class="package-box">-->
      <!--<div class="item" v-for="(item, index) in list" :key="index">-->
      <!--<div class="price">55</div>-->
      <!--<div class="time">sdad</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="package">-->
      <!--<div class="title">按年付</div>-->
      <!--<div class="package-box">-->
      <!--<div class="item" v-for="(item, index) in list" :key="index">-->
      <!--<div class="price">55</div>-->
      <!--<div class="time">sdad</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<van-button class="btn">开通会员</van-button>-->
      <!--</div>-->
      <div class="box-item">
        <div class="permissions-title">
          跟我做任务 一起当Plus会员
        </div>
        <div
          v-for="item in memberInfo.taskItems"
          @click="inviteFriends(item.key)"
          class="task-item"
          :key="item.key"
        >
          <div v-if="item.key === 'INVITEES_COUNT'">
            <div class="task-top">
              <img
                src="../../assets/member/vip_friends@2x.png"
                alt=""
              >
              <div class="right">
                <div class="title">
                  <span>邀请好友</span>
                  <span class="title-right">做任务</span>
                </div>
                <div class="progress">已完成{{item.count}}/{{item.value}}</div>
              </div>
            </div>
            <div class="describe">
              邀请{{item.value}}位好友成功注册即送1个月会员特权
            </div>
            <div class="line van-hairline--bottom"></div>
          </div>
          <div v-if="item.key === 'RECHARGE_AMOUNT'">
            <div class="task-top">
              <img
                src="../../assets/member/vip_friends(1).png"
                alt=""
              >
              <div class="right">
                <div class="title">
                  <span>充值满额送会员</span>
                  <span class="title-right">做任务</span>
                </div>
                <div class="progress">已完成{{item.count}}/{{item.value}}</div>
              </div>
            </div>
            <div class="describe">
              累计充值金额为{{item.value}}元送1个月会员特权
            </div>
            <div class="line van-hairline--bottom"></div>
          </div>
          <div v-if="item.key === 'ORDERS_COUNT'">
            <div class="task-top">
              <img
                src="../../assets/member/vip_get_vip.png"
                alt=""
              >
              <div class="right">
                <div class="title">
                  <span>购买即送会员</span>
                  <span class="title-right">做任务</span>
                </div>
                <div class="progress">已完成{{item.count}}/{{item.value}}</div>
              </div>
            </div>
            <div class="describe">
              下单次数大于等于{{item.value}}次送1个月会员特权
            </div>
            <div class="line van-hairline--bottom"></div>
          </div>
        </div>
        <!--<div @click="toast('快去给账户充值吧')" class="task-item">-->
        <!--<div class="task-top">-->
        <!--<img src="../../assets/member/vip_friends(1).png" alt="">-->
        <!--<div class="right">-->
        <!--<div class="title">-->
        <!--<span>充值满额送会员</span>-->
        <!--<span class="title-right">做任务</span>-->
        <!--</div>-->
        <!--<div class="progress">已完成</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="describe">-->
        <!--累计充值金额为200元送1个月会员特权-->
        <!--</div>-->
        <!--<div class="line van-hairline&#45;&#45;bottom"></div>-->
        <!--</div>-->
        <!--<div @click="toast('买点自己喜欢的商品吧')" class="task-item">-->
        <!--<div class="task-top">-->
        <!--<img src="../../assets/member/vip_get_vip.png" alt="">-->
        <!--<div class="right">-->
        <!--<div class="title">-->
        <!--<span>购买即送会员</span>-->
        <!--<span class="title-right">做任务</span>-->
        <!--</div>-->
        <!--<div class="progress">已完成 15/20</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="describe">-->
        <!--下单次数大于等于10次送1个月会员特权-->
        <!--</div>-->
        <!--<div class="line van-hairline&#45;&#45;bottom"></div>-->
        <!--</div>-->
      </div>
      <div class="box-item">
        <div class="permissions-title">
          会员权益
        </div>
        <div class="permissions-item">
          <img
            src="../../assets/member/vip_privilege.png"
            alt=""
          >
          <div class="font">成为会员预计平均每月获得1000元收入！</div>
        </div>
        <div class="permissions-item">
          <img
            src="../../assets/member/vip_commission.png"
            alt=""
          >
          <div class="font">分销功能开启每月预计多赚700元收入！</div>
        </div>
        <div class="permissions-item">
          <img
            src="../../assets/member/vip_cashback.png"
            alt=""
          >
          <div class="font">得到您所邀请用户消费金额的2%~4%返现!</div>
        </div>
        <div class="permissions-item">
          <img
            src="../../assets/member/vip_server.png"
            alt=""
          >
          <div class="font">专用客服接入通道，尽享VIP尊荣体验！</div>
        </div>
        <div class="permissions-item">
          <img
            src="../../assets/member/IC.png"
            alt=""
          >
          <div class="font">尊享特殊身份标识，彰显会员魅力！</div>
        </div>
      </div>
      <div style="height: 1.5rem"></div>
    </div>
    <van-dialog
      class="my-dialog"
      v-model="show2"
      :show-confirm-button="false"
    >
      <div class="main-content">
        <div class="content">
          <img
            class="title-img"
            src="../../assets/member/vip_pop_title.png"
            alt=""
          >
          <img
            class="content-img"
            src="../../assets/member/pop_element.png"
            alt=""
          >
          <div class="font">在好友填写您的邀请码以后，您将获得平台给您的一定的佣金和返利。</div>
          <div class="font2">邀请码:{{getCode}}</div>
          <div class="tips">
            提示：建议您使用浏览器自带分享功能进行分享
          </div>
          <van-button
            @click="show2 = false"
            class="btn-share"
          >确认</van-button>
          <img
            @click="show2 = false"
            class="close"
            src="../../assets/member/vip_close_Pop-ups.png"
            alt=""
          >
        </div>
      </div>

    </van-dialog>
    <van-dialog
      closeOnClickOverlay
      v-model="shareShow"
      :showConfirmButton="false"
    >
      <img
        id="shareImg"
        src=""
        alt=""
      >
    </van-dialog>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import mineApi from '@/api/mine'
import html2canvas from 'html2canvas'
import wxApi from '@/api/wx'
export default {
  name: 'Index',
  components: {
    TopNav
  },
  data() {
    return {
      list: 5,
      show2: false,
      memberInfo: {},
      shareShow: false,
      info: {},
      show: true
    }
  },
  created() {
    this.getMyMember()
    this.weChatSnapshot()
  },
  methods: {
    weChatSnapshot() {
      const data = {
        mode: 4
      }
      wxApi.weChatSnapshot(data).then(res => {
        this.info = res.data.content
      })
    },
    snapshot() {
      let _this = this
      _this.shareShow = true
      let dom = document.getElementById('snapshot')
      console.log(dom)
      // let box = window.getComputedStyle(dom)
      // console.log(box)
      // console.log(box.width)
      let width = dom.offsetWidth
      let height = dom.offsetHeight
      console.log(width)
      // let scaleBy = _this.getDpr()
      let canvas = document.createElement('canvas')
      // 设置canvas元素属性宽高为 DOM 节点宽高 * 像素比
      let scaleBy = 2
      canvas.width = width * scaleBy
      canvas.height = height * scaleBy
      // canvas.width = width
      // canvas.height = height
      console.log(canvas.width)
      console.log(canvas.height)
      // 设置canvas css 宽高为DOM节点宽高
      // canvas.style.width = width + 'px'
      // canvas.style.height = height + 'px'

      // 获取画笔
      let context = canvas.getContext('2d')
      context.scale(scaleBy, scaleBy)
      console.log(context)
      // 设置需要生成的图片的大小，不限于可视区域（即可保存长图）
      let w = document.getElementById('snapshot').style.width
      let h = document.getElementById('snapshot').style.height
      console.log(w)
      console.log(h)
      html2canvas(document.getElementById('snapshot'), {
        allowTaint: true,
        scale: scaleBy,
        canvas: canvas, // 自定义 canvas
        logging: true, // 日志开关
        width: width, // dom 原始宽度
        height: height, // dom 原始高度
        useCORS: true
      }).then(function (canvas) {
        console.log(canvas)
        var url = canvas.toDataURL('image/png')// base64数据
        document.getElementById('shareImg').src = url
        _this.show = false
        // var image = new Image()
        // image.src = url
        console.log(url)
        // console.log(document.getElementById('shareImg'))
        // document.getElementById('shareImg').appendChild(image)
      })
    },
    getMyMember() {
      mineApi.getMyMember().then(res => {
        console.log(res)
        this.memberInfo = res.data.content
      })
    },
    inviteFriends(v) {
      if (v === 'INVITEES_COUNT') {
        this.snapshot()
      } else if (v === 'RECHARGE_AMOUNT') {
        this.$router.push({ name: 'AddMoney' })
      } else {
        this.$router.push({ name: 'Home' })
      }
    },
    toast(v) {
      this.$toast(v)
    }
  },
  computed: {
    getCode() {
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
  top: 0;
  z-index: -10;
  text-align: center;
  width: 100%;
  padding-bottom: 1rem;
  max-width: 7.5rem;
  background-color: #fff;
  background-image: url("../../assets/home/oval532.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  .title {
    margin-top: 0.25rem;
    margin-bottom: 0.1rem;
    font-size: 0.26rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .info_box {
    width: 86%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 0.16rem;
    box-shadow: 0 0 0.1rem 0.05rem rgba(0, 0, 0, 0.1);
    margin-top: 0.5rem;
    padding: 0.8rem 0 1rem 0;
    position: relative;
    .icon {
      width: 1.28rem;
      height: 1.02rem;
      position: absolute;
      top: 0;
      transform: translateY(-40%) translateX(-50%);
      left: 50%;
    }
    .code {
      font-size: 0.4rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(255, 81, 122, 1);
    }
    .img-box {
      position: relative;
      margin: 0 auto;
      margin-top: 0.1rem;
      width: 85%;
      border: 0.1rem solid #fff;
      border-radius: 0.1rem;
      box-shadow: 0 0 0.2rem 0.01rem #888888;

      .robbed {
        position: absolute;
        top: 0.12rem;
        left: -0.16rem;
        width: 1.9rem;
        height: 0.52rem;
        line-height: 0.48rem;
        text-align: center;
        background-image: url("../../assets/home/tab.png");
        background-size: 100% auto;
        font-size: 0.24rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .goods-img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .img-box-bot {
      display: flex;
      align-items: center;
      width: 100%;
      height: 1rem;
      background-size: 100%;
      .price {
        margin-left: 0.44rem;
        margin-top: 0.4rem;
        font-size: 0.32rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(227, 58, 89, 1);
        transform: scale(1.2, 1.2);
        .num {
          font-size: 0.48rem;
        }
      }
      .back-box {
        width: 1.75rem;
        height: 0.4rem;
        background: rgba(255, 150, 175, 1);
        border-radius: 0.05rem;
        margin-left: 0.26rem;
        margin-top: 0.5rem;
        font-size: 0.24rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .card_text {
        font-size: 0.3rem;
        color: #f85a53;
        font-weight: bold;
        margin: 0 auto;
      }
    }
    .snapshot-tips {
      padding: 0 0.5rem;
      margin-top: 0.26rem;
      margin-bottom: 0.2rem;
      text-align: left;
      font-size: 0.28rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 0.4rem;
    }
  }

  .solar-code {
    width: 2.8rem;
    height: 2.8rem;
    display: block;
    margin: 0 auto;
    margin-top: 0.2rem;
  }
  .solar-code-tips {
    margin-top: 0.2rem;
    font-size: 0.24rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
}
.member-page {
  background: #ffecdd;
  .bg-box {
    position: relative;
    width: 100%;

    .bg1 {
      height: 2.33rem;
    }

    .bg2 {
      margin: 0 auto;
      position: absolute;
      top: 0.48rem;
      left: 0.21rem;
      width: 7.08rem;
      height: 2.61rem;
    }

    .content {
      font-size: 0.36rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      z-index: 100;
      position: absolute;
      top: 1.1rem;
      left: 0.74rem;
    }
    .content2 {
      font-size: 0.36rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      z-index: 100;
      position: absolute;
      top: 1.4rem;
      left: 0.74rem;
    }
  }

  .get-member-bg {
    margin: 0.42rem 0.3rem 0 0.3rem;
    position: relative;
    width: 6.9rem;
    height: 1.8rem;

    .bg-img {
      width: 100%;
      height: 100%;
    }

    .content {
      position: absolute;
      top: 0.4rem;
      left: 0.86rem;
      font-size: 0.36rem;
      letter-spacing: 0.15rem;
      font-family: PingFang-SC-Medium;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 0.48rem;
      text-shadow: 0px 0.06rem 0.06rem rgba(249, 154, 6, 0.49);
    }
  }
  .main-box {
    width: 6.9rem;
    margin: 0 auto;
    .play {
      margin-bottom: 1rem;

      .package {
        clear: both;
        width: 6.9rem;
        height: 3.5rem;
        margin: 0 auto;

        .title {
          margin-top: 0.57rem;
          margin-bottom: 0.2rem;
          font-size: 0.34rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }

        .package-box {
          clear: both;

          .item {
            float: left;
            text-align: center;
            width: 2.1rem;
            height: 1.2rem;
            margin-right: 0.2rem;
            margin-bottom: 0.2rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            border-radius: 0.08rem;
            background: rgba(255, 255, 255, 1);
            border: 0.02rem solid rgba(204, 204, 204, 1);

            &:nth-child(3n + 0) {
              margin-right: 0;
            }

            &:hover {
              border: 0.02rem solid rgba(255, 141, 18, 1);
              color: rgba(255, 141, 18, 1);
            }

            .price {
              margin-top: 0.1rem;
              font-size: 0.34rem;
            }

            .time {
              margin-top: 0.1rem;
              font-size: 0.28rem;
            }
          }
        }
      }

      .btn {
        display: block;
        margin: 0.5rem auto;
        width: 6.9rem;
        height: 0.8rem;
        line-height: 0.8rem;
        background: rgba(255, 141, 18, 1);
        border-radius: 0.4rem;
        font-size: 0.32rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
    .box-item {
      background: #fff;
      margin: 0.6rem 0 0.4rem 0;
      border-radius: 0.08rem;
      .permissions-title {
        padding-top: 0.6rem;
        text-align: center;
        font-size: 0.32rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #ff6417;
      }
      .task-item {
        margin: 0.3rem;
        .task-top {
          display: flex;
          align-items: center;
          img {
            margin-right: 0.24rem;
            margin-bottom: 0.2rem;
            width: 0.88rem;
            height: 0.88rem;
            display: block;
          }
          .right {
            /*width:5.5rem;*/
            font-size: 0.28rem;
            font-family: PingFang-SC-Medium;
            /*font-weight: 500;*/
            color: rgba(51, 51, 51, 1);

            .title {
              width: 5rem;
              display: flex;
              justify-content: space-between;
              /*margin-bottom: 0.1rem;*/
              .title-right {
                width: 1.2rem;
                height: 0.48rem;
                line-height: 0.48rem;
                float: right;
                text-align: center;
                background: rgba(255, 255, 255, 1);
                border: 0.01rem solid #ff6417;
                border-radius: 0.24rem;
                font-size: 0.24rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: #ff6417;
              }
              .title-right2 {
                width: 0.92rem;
                height: 0.36rem;
                float: right;
                text-align: center;
                background: #e7e7e7;
                border: 0.01rem solid #e7e7e7;
                border-radius: 0.18rem;
                font-size: 0.2rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: #ffffff;
              }
            }
            .progress {
              font-size: 0.24rem;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: #ff2644;
            }
          }
        }
        .describe {
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(170, 170, 170, 1);
        }
        .line {
          height: 0.2rem;
        }
      }
      .permissions-item {
        display: flex;
        align-items: center;
        margin: 0.2rem;
        padding-bottom: 0.1rem;
        border-bottom: 1px #e7e7e7 solid;
        /*margin-top: 0.2rem;*/
        /*margin-bottom: 0.2rem;*/
        img {
          margin-right: 0.23rem;
          width: 0.88rem;
          height: 0.88rem;
          display: block;
        }
        .font {
          font-size: 0.28rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
  .my-dialog {
    background: rgba(255, 255, 255, 0);
    .main-content {
      width: 6.3rem;
      height: 10.72rem;
      .content {
        width: 6.3rem;
        height: 9.72rem;
        background: #ff7725;
        border-radius: 0.2rem;
        .tips {
          font-size: 0.24rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          position: absolute;
          top: 7.3rem;
          left: 0.56rem;
        }
        .title-img {
          width: 5.03rem;
          height: 0.56rem;
          display: block;
          position: absolute;
          top: 0.73rem;
          left: 0.56rem;
        }
        .content-img {
          width: 5.79rem;
          height: 4.96rem;
          position: absolute;
          top: 2rem;
          left: 0.33rem;
        }
        .font {
          width: 2.84rem;
          height: 1.35rem;
          z-index: 100;
          position: absolute;
          top: 2.8rem;
          left: 1.72rem;
          font-size: 0.28rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(251, 61, 0, 1);
          line-height: 0.36rem;
        }
        .font2 {
          width: 2.72rem;
          height: 0.32rem;
          z-index: 100;
          position: absolute;
          top: 5.6rem;
          left: 1.72rem;
          font-size: 0.34rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          line-height: 0.36rem;
          color: rgba(255, 255, 255, 1);
        }
        .btn-share {
          position: absolute;
          bottom: 2rem;
          left: 1.15rem;
          width: 4rem;
          height: 0.84rem;
          background: rgba(253, 71, 71, 1);
          border-radius: 0.42rem;
          font-size: 0.34rem;
          font-family: PingFang-SC-Bold;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 0.63rem;
        }
        .close {
          width: 0.76rem;
          height: 0.76rem;
          display: block;
          position: absolute;
          bottom: 0rem;
          left: 2.8rem;
        }
      }
    }
  }
}
</style>
