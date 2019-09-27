// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import params from "@/conf/params";
import store from "./store/index";
import Vant from "vant";
import "vant/lib/index.css";
import Vuex from "vuex";
import axios from "axios";
import wxApi from "@/api/wx";
import sdk from "@/until/wx";
// import * as types from '@/store/mutation-types'
import "./custom-classname.css";
Vue.use(Vuex);
Vue.use(Vant);

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  let href = window.location.href;
  if (
    href.indexOf("groupmessage") > -1 ||
    href.indexOf("singlemessage") > -1 ||
    href.indexOf("timeline") > -1
  ) {
    href = href.replace(
      /\?from=(groupmessage|singlemessage|timeline)(\S*)#/,
      "#"
    );
    window.location.href = href;
  }
  if (to.name === "ZeroShop") {
    const url = params.testEnvironmentHost + "/#" + to.fullPath;
    const data2 = {
      mode: 3
    };
    wxApi.weChatSharingTarget(data2).then(res => {
      if (res.data.messageCode === "MSG_1001") {
        let uri = res.data.content.uri.replace(
          /{inviterCode}/g,
          localStorage.getItem("myInviterCode")
        );
        let obj = {
          title: res.data.content.title,
          desc: res.data.content.desc,
          linkurl: uri,
          img: res.data.content.imageUrl
        };
        sdk.getJSSDK(url, obj, data2.mode);
      }
    });
  } else if (to.name === "ZeroShopDetail") {
    const url = params.testEnvironmentHost + "/#" + to.fullPath;
    // console.log(to.fullPath.split('/')[2])
    const data2 = {
      mode: to.query.type == 1 ? 2 : 7,
      targetId: to.params.id
    };
    // alert(to.fullPath.split('/')[2])
    wxApi.weChatSharingTarget(data2).then(res => {
      if (res.data.messageCode === "MSG_1001") {
        let uri = res.data.content.uri.replace(
          /{inviterCode}/g,
          localStorage.getItem("myInviterCode")
        );
        let obj = {
          title: res.data.content.title,
          desc: res.data.content.desc,
          linkurl: uri,
          img: res.data.content.imageUrl
        };
        // console.log(res)
        sdk.getJSSDK(url, obj, data2.mode);
      }
    });
  } else if (to.name === "GoodsDetail") {
    const url = params.testEnvironmentHost + "/#" + to.fullPath;
    const data2 = {
      mode: 1,
      targetId: to.fullPath.split("/")[2]
    };
    wxApi.weChatSharingTarget(data2).then(res => {
      if (res.data.messageCode === "MSG_1001") {
        let uri = res.data.content.uri.replace(
          /{inviterCode}/g,
          localStorage.getItem("myInviterCode")
        );
        let obj = {
          title: res.data.content.title,
          desc: res.data.content.desc,
          linkurl: uri,
          img: res.data.content.imageUrl
        };
        sdk.getJSSDK(url, obj, data2.mode);
      }
    });
  } else if (to.name === "Team") {
    const url = params.testEnvironmentHost + "/#" + to.fullPath;
    const data2 = {
      mode: 4,
      targetId: ""
    };
    wxApi.weChatSharingTarget(data2).then(res => {
      if (res.data.messageCode === "MSG_1001") {
        let uri = res.data.content.uri.replace(
          /{inviterCode}/g,
          localStorage.getItem("myInviterCode")
        );
        let obj = {
          title: res.data.content.title,
          desc: res.data.content.desc,
          linkurl: uri,
          img: res.data.content.imageUrl
        };
        sdk.getJSSDK(url, obj, data2.mode);
      }
    });
  }
  let token = "";
  let name = "token=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      token = c.substring(name.length, c.length);
    }
  }
  // if (to.path !== '/login' && to.path !== '/register') {
  //   sessionStorage.setItem('referrer', from.path) // 储存来源路由
  //   alert('请登录')
  //   next({
  //     path: '/login'
  //   })
  // } else {
  //   next()
  // }
  if (token) {
    next();
  } else if (to.meta.tourists) {
    // 这里定义游客可访问的页面
    console.log("游客可访问");
    next();
  } else if (to.path.indexOf("/pay") !== -1) {
    next();
  } else if (to.path !== "/login") {
    console.log("你还没登录");
    sessionStorage.setItem("referrer", from.path);
    console.log(sessionStorage.getItem("referrer"));
    next({ path: "/login" });
  } else {
    next();
  }
});

Vue.filter("dateFormat1", function(t) {
  if (!t) {
    return "";
  }
  if (typeof t === "string" && (t.indexOf("T") > -1 || t.includes("T"))) {
    t = t.replace("T", " ").replace(/-/g, "/"); // 注意：指定一个具体的时间转换时间戳，需要yyyy/mm/dd hh:ii:ss格式，yyyy-mm-dd在IE和Safari下是有问题的。
  }
  const dt = new Date(t);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1).toString().padStart(2, "0");
  const d = dt
    .getDate()
    .toString()
    .padStart(2, "0");
  const hh = dt
    .getHours()
    .toString()
    .padStart(2, "0");
  const mm = dt
    .getMinutes()
    .toString()
    .padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}`;
});
window.onload = function() {
  if (isWeiXin()) {
    localStorage.setItem("isWeiXin", true);
    // const data = {
    //   status: true
    // }
    // this.$store.commit(types.SET_IS_WEI_XIN, data)
  } else {
    localStorage.setItem("isWeiXin", false);
    // const data = {
    //   status: false
    // }
    // console.log(this.$store)
    // this.$store.commit(types.SET_IS_WEI_XIN, data)
  }
};
function isWeiXin() {
  let ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
}

axios.interceptors.request.use(
  config => {
    let token = "";
    let name = "token=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        token = c.substring(name.length, c.length);
      }
    }
    config.timeout = 25000;
    if (token) {
      config.headers = {
        token: token,
        Accept: "application/json"
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
