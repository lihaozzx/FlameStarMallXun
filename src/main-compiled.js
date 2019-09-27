"use strict";

var _vue = require("vue");

var _vue2 = _interopRequireDefault(_vue);

var _App = require("./App");

var _App2 = _interopRequireDefault(_App);

var _router = require("./router");

var _router2 = _interopRequireDefault(_router);

var _params = require("@/conf/params");

var _params2 = _interopRequireDefault(_params);

var _index = require("./store/index");

var _index2 = _interopRequireDefault(_index);

var _vant = require("vant");

var _vant2 = _interopRequireDefault(_vant);

require("vant/lib/index.css");

var _vuex = require("vuex");

var _vuex2 = _interopRequireDefault(_vuex);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _wx = require("@/api/wx");

var _wx2 = _interopRequireDefault(_wx);

var _wx3 = require("@/until/wx");

var _wx4 = _interopRequireDefault(_wx3);

require("./custom-classname.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
_vue2.default.use(_vuex2.default);
// import * as types from '@/store/mutation-types'

_vue2.default.use(_vant2.default);

_vue2.default.config.productionTip = false;
_router2.default.beforeEach(function (to, from, next) {
  var href = window.location.href;
  if (href.indexOf("groupmessage") > -1 || href.indexOf("singlemessage") > -1 || href.indexOf("timeline") > -1) {
    href = href.replace(/\?from=(groupmessage|singlemessage|timeline)(\S*)#/, "#");
    window.location.href = href;
  }
  if (to.name === "ZeroShop") {
    var url = _params2.default.testEnvironmentHost + "/#" + to.fullPath;
    var data2 = {
      mode: 3,
      targetId: ""
    };
    _wx2.default.weChatSharingTarget(data2).then(function (res) {
      if (res.data.messageCode === "MSG_1001") {
        var uri = res.data.content.uri.replace(/{inviterCode}/g, localStorage.getItem("myInviterCode"));
        var obj = {
          title: res.data.content.title,
          desc: res.data.content.desc,
          linkurl: uri,
          img: res.data.content.imageUrl
        };
        _wx4.default.getJSSDK(url, obj, data2.mode);
      }
    });
  } else if (to.name === "ZeroShopDetail") {
    var _url = _params2.default.testEnvironmentHost + "/#" + to.fullPath;
    // console.log(to.fullPath.split('/')[2])
    var _data = {
      mode: to.query.type == 1 ? 2 : 7,
      targetId: to.params.id
    };
    // alert(to.fullPath.split('/')[2])
    _wx2.default.weChatSharingTarget(_data).then(function (res) {
      if (res.data.messageCode === "MSG_1001") {
        var uri = res.data.content.uri.replace(/{inviterCode}/g, localStorage.getItem("myInviterCode"));
        var obj = {
          title: res.data.content.title,
          desc: res.data.content.desc,
          linkurl: uri,
          img: res.data.content.imageUrl
        };
        // console.log(res)
        _wx4.default.getJSSDK(_url, obj, _data.mode);
      }
    });
  } else if (to.name === "GoodsDetail") {
    var _url2 = _params2.default.testEnvironmentHost + "/#" + to.fullPath;
    var _data2 = {
      mode: 1,
      targetId: to.fullPath.split("/")[2]
    };
    _wx2.default.weChatSharingTarget(_data2).then(function (res) {
      if (res.data.messageCode === "MSG_1001") {
        var uri = res.data.content.uri.replace(/{inviterCode}/g, localStorage.getItem("myInviterCode"));
        var obj = {
          title: res.data.content.title,
          desc: res.data.content.desc,
          linkurl: uri,
          img: res.data.content.imageUrl
        };
        _wx4.default.getJSSDK(_url2, obj, _data2.mode);
      }
    });
  } else if (to.name === "Team") {
    var _url3 = _params2.default.testEnvironmentHost + "/#" + to.fullPath;
    var _data3 = {
      mode: 4,
      targetId: ""
    };
    _wx2.default.weChatSharingTarget(_data3).then(function (res) {
      if (res.data.messageCode === "MSG_1001") {
        var uri = res.data.content.uri.replace(/{inviterCode}/g, localStorage.getItem("myInviterCode"));
        var obj = {
          title: res.data.content.title,
          desc: res.data.content.desc,
          linkurl: uri,
          img: res.data.content.imageUrl
        };
        _wx4.default.getJSSDK(_url3, obj, _data3.mode);
      }
    });
  }
  var token = "";
  var name = "token=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
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

_vue2.default.filter("dateFormat1", function (t) {
  if (!t) {
    return "";
  }
  if (typeof t === "string" && (t.indexOf("T") > -1 || t.includes("T"))) {
    t = t.replace("T", " ").replace(/-/g, "/"); // 注意：指定一个具体的时间转换时间戳，需要yyyy/mm/dd hh:ii:ss格式，yyyy-mm-dd在IE和Safari下是有问题的。
  }
  var dt = new Date(t);
  var y = dt.getFullYear();
  var m = (dt.getMonth() + 1).toString().padStart(2, "0");
  var d = dt.getDate().toString().padStart(2, "0");
  var hh = dt.getHours().toString().padStart(2, "0");
  var mm = dt.getMinutes().toString().padStart(2, "0");
  return y + "-" + m + "-" + d + " " + hh + ":" + mm;
});
window.onload = function () {
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
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
}

_axios2.default.interceptors.request.use(function (config) {
  var token = "";
  var name = "token=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
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
}, function (error) {
  return Promise.reject(error);
});
/* eslint-disable no-new */
new _vue2.default({
  el: "#app",
  router: _router2.default,
  store: _index2.default,
  components: { App: _App2.default },
  template: "<App/>"
});
