<template>
    <div class="order-bg">
      <TopNav name="物流详情"></TopNav>
      <van-steps direction="vertical" :active="0">
        <van-step
          v-for="(item, i) in logisticsList"
          :key="i"
        >
          <h3>{{item.remark}}</h3>
          <p>{{item.datetime}}</p>
        </van-step>
      </van-steps>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import orderApi from '@/api/order'
export default {
  name: 'Logistics',
  components: {
    TopNav
  },
  data () {
    return {
      logisticsList: []
    }
  },
  created () {
    this.queryOrder()
  },
  methods: {
    queryOrder () {
      const data = {
        logisticsId: this.$route.params.logisticsId
      }
      orderApi.getQueryLogisticsById(data).then(res => {
        if (res.data.messageCode === 'MSG_1001') {
          this.logisticsList = res.data.content.list.reverse()
        } else {
          this.$toast(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
