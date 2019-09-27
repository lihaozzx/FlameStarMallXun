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
/* #app {
  background: #F4F4F4;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
