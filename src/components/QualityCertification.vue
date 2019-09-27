<template>
  <div class="icon-item">
    <template v-if="zero">
      <div class="item">
        <img src="../assets/home/xqing_protect_shouhou_icon.png" alt />
        源头直采
      </div>
      <div class="item">
        <img src="../assets/home/xqing_protect_renzheng_icon.png" alt />
        假一赔十
      </div>
      <div class="item">
        <img src="../assets/home/xqing_protect_changj_icon.png" alt />
        全场支持0成本购
      </div>
    </template>
    <template v-else>
      <div class="item">
        <img src="../assets/home/index_protect_shouhou_icon.png" alt />
        源头直采
      </div>
      <div class="item">
        <img src="../assets/home/index_protect_renzheng_icon.png" alt />
        假一赔十
      </div>
      <div class="item">
        <img src="../assets/home/index_protect_changj_icon.png" alt />
        全场支持0成本购
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "QualityCertification",
  props: {
    zero: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-item {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  background: #fff;
  /*padding-left: 0.3rem;*/
  display: flex;
  justify-content: flex-start;
  img {
    width: 0.24rem;
    height: 0.24rem;
    vertical-align: middle;
  }
  .item {
    height: 0.68rem;
    line-height: 0.68rem;
    margin-right: 0.39rem;
    font-size: 0.24rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(170, 170, 170, 1);
  }
}
</style>
