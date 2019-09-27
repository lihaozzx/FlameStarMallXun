import * as types from "../mutation-types";
const state = {
  sheInviterCode: "",
  merchants: {},
  isWeiXin: false
};
let getters = {
  sheInviterCode: state => state.sheInviterCode,
  isWeiXin: state => state.isWeiXin,
  merchants: state => state.merchants
};
const mutations = {
  [types.SET_INVITER_CODE](state, data) {
    state.sheInviterCode = data;
  },
  [types.SET_IS_WEI_XIN](state, data) {
    state.isWeiXin = data.status;
  },
  [types.SET_MERCHANTS](state, data) {
    // 待处理
    state.merchants = {
      name: data.name ? data.name : state.merchants.name,
      idNumber: data.idNumber ? data.idNumber : state.merchants.idNumber,
      businessId: data.businessId
        ? data.businessId
        : state.merchants.businessId,
      businessName: data.businessName
        ? data.businessName
        : state.merchants.businessName,
      storeName: data.storeName ? data.storeName : state.merchants.storeName,
      areaId: data.areaId ? data.areaId : state.merchants.areaId,
      addressDetail: data.addressDetail
        ? data.addressDetail
        : state.merchants.addressDetail,
      lng: data.lng ? data.lng : state.merchants.lng,
      lat: data.lat ? data.lat : state.merchants.lat,
      rebate: data.rebate ? data.rebate : state.merchants.rebate,
      mobile: data.mobile ? data.mobile : state.merchants.mobile,
      code: data.code ? data.code : state.merchants.code,
      businessLicense: data.businessLicense
        ? data.businessLicense
        : state.merchants.businessLicense,
      businessLicenseUrl: data.businessLicenseUrl
        ? data.businessLicenseUrl
        : state.merchants.businessLicenseUrl
    };
  }
};
const actions = {
  putMyInfo({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        const data = { 
          name: "tnq",
          age: "20"
        };
        commit("SET_MY_INFO", data);
        resolve(data);
      }, 1000);
    });
  },
  putMyInfo2({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        const data = {
          name: "tnq",
          age: "20",
          say: "你好呀，很高心认识你"
        };
        commit("SET_SHE_INFO", data);
        resolve(data);
      }, 1000);
    });
  }
};
const user = {
  state,
  getters,
  mutations,
  actions
};
export default user;
