<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    autoRem() {
      document.addEventListener("DOMContentLoaded", () => {
        console.log('nihao')
        let html = document.documentElement
        let windowWidth = html.clientWidth
        // let windowHeight = html.clientHeight
        if (windowWidth >= 750) {
          windowWidth = 750
        }
        html.style.fontSize = windowWidth / 7.5 + 'px'
      }, false)
    }
  },
  mounted() {
    this.autoRem()
  }
}
</script>

<style>
.pop_title {
  font-size: 0.34rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.4rem;
}
</style>
