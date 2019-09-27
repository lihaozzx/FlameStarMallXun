<template>
    <div>
      <TopNav name="分享"></TopNav>
      <div style="z-index: 20;width: 100%;height: 8rem;background: red"></div>
      <div v-if="show" id="snapshot">
        <div class="title">
          种草达人的欢乐场
        </div>
        <img class="icon" src="../../assets/goods/pop_logo.png" alt="">
        <div class="code">
          邀请码：{{info.inviterCode}}
        </div>
        <div class="img-box">
          <img class="goods-img" :src="info.imageUrl" alt="">
          <img class="img-box-bot" src="../../assets/goods/bg2.png" alt="">
        </div>
        <div class="tips">
          {{info.desc}}
        </div>
        <img class="solar-code" :src="info.appletQrCodeUrl" alt="">
      </div>
      <img id="shareImg" src="" alt="">
      <van-dialog
        class="share-dialog"
        closeOnClickOverlay
        v-model="shareShow"
        :showConfirmButton="false"
      >
        <!--<div id="shareImg" class="shareImg"></div>-->
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
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import html2canvas from 'html2canvas'
import wxApi from '@/api/wx'
export default {
  name: 'ShareGoods',
  components: {
    TopNav
  },
  data () {
    return {
      shareShow: false,
      show: true,
      info: {}
    }
  },
  created () {
    this.weChatSnapshot()
  },
  mounted () {
  },
  methods: {
    weChatSnapshot () {
      const data = {
        mode: 1,
        targetId: 2
      }
      wxApi.weChatSnapshot(data).then(res => {
        this.info = res.data.content
        setTimeout(() => {
          this.snapshot()
        }, 1000)
      })
    },
    parseValue: function (value) {
      return parseInt(value, 10)
    },
    getDpr: function () {
      if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio
      }
      return 1
    },
    snapshot () {
      let _this = this
      // _this.shareShow = true
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
      .goods-img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .img-box-bot {
        width: 5.62rem;
        position: absolute;
        top: 3.37rem;
        left: 0;
      }
    }
    .tips {
      padding-left: 0.74rem;
      margin-top: 1rem;
      text-align: left;
      font-size:0.28rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:0.4rem;
    }
    .solar-code {
      width: 2.23rem;
      height: 2.23rem;
      display: block;
      margin: 0 auto;
    }
  }
</style>
