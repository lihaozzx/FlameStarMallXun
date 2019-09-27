<template>
  <div class="pay-loading">
    检测支付结果..
  </div>
</template>

<script>
import wxApi from '@/api/wx'
export default {
  name: 'Test',
  data () {
    return {

    }
  },
  created () {
    // console.log(this.$route.params.transStatementId)
    this.getResults()
  },
  methods: {
    getResults () {
      setTimeout(() => {
        const data = {
          transStatementId: parseInt(this.$route.params.transStatementId),
          client: 3
        }
        wxApi.wechatResult(data).then(res => {
          if (res.data.content === 'SUCCESS') {
            this.$toast('支付成功')
            this.$router.replace({name: 'OrderList', params: {active: 2}})
          } else {
            this.$toast('支付未完成')
            this.$router.replace({name: 'OrderList', params: {active: 1}})
          }
        })
      }, 3000)
    }
  },
  watch: {
  }
}
</script>

<style scoped>
  .pay-loading{
    font-size: 0.24rem;
  }
</style>
