<template>
    <div class="app-background">
      <form action="/">
        <van-search
          @focus="goSearch"
          placeholder="更多好货等你来发现"
        ></van-search>
      </form>
      <Classify/>
    </div>
</template>

<script>
import Classify from './Classify'
export default {
  name: 'index',
  components: {
    Classify
  },
  created () {
    if (window.location.href.split('inviterCode=')[1]) {
      localStorage.setItem('sheInviterCode', window.location.href.split('inviterCode=')[1])
    } else {
      localStorage.removeItem('sheInviterCode')
    }
  },
  methods: {
    goSearch () {
      this.$router.push({name: 'Search'})
    }
  }
}
</script>

<style scoped>
.app-background {
  background: #F4F4F4;
  margin-bottom: 1rem;
}
</style>
