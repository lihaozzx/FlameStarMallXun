import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer (val) {
      return {
        // 只储存state中的user
        user: val.user
      }
    }
  })]
})
