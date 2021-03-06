import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "./style/common/common.css";
import Vant from 'vant';
import 'vant/lib/index.css';
import HeaderTitle from './components/headerTitle/headerTitle.vue';
import HeaderSearch from "./components/headerSearch/headerSearch.vue";
import HeaderNavigation from "./components/headerNavigation/headerNavigation.vue";
import NOmore from "./components/noMore/noMore.vue";
import http from "./utils/http.js";
import loginByCode from "./utils/loginBycode.js";
import echarts from 'echarts';
import dialog from "./utils/dialog.js";
import { Toast } from "vant";
import * as dd from 'dingtalk-jsapi';
import { PullRefresh } from 'vant';
import { List } from 'vant';
import { Button } from 'vant';
import { Search } from 'vant';
Vue.use(Search);
Vue.use(Button);
Vue.use(List);
Vue.use(Vant);
Vue.use(dd);
Vue.use(PullRefresh);
// 钉钉系列
// dd.config({
//   agentId: agentid, // 必填，微应用ID
//   corpId: corpId,//必填，企业ID
//   timeStamp: timeStamp, // 必填，生成签名的时间戳
//   nonceStr: nonceStr, // 必填，生成签名的随机串
//   signature: signature, // 必填，签名
//   type: 0,
//   jsApiList: ['runtime.info', 'biz.contact.choose', 'biz.contact.chooseMobileContacts',
//     'device.notification.confirm', 'device.notification.alert',
//     'device.notification.prompt', 'biz.ding.post', 'biz.util.previewImage',
//     'biz.util.openLink', 'device.geolocation.start', 'device.geolocation.get', 'biz.util.uploadImageFromCamera', 'biz.util.uploadImage', 'biz.conference.videoConfCall',
//     'device.audio.startRecord', 'device.audio.stopRecord', 'device.audio.play', 'device.audio.pause', 'device.audio.download', 'device.audio.translateVoice', 'device.audio.onPlayEnd'
//   ] // 必填，需要使用的jsapi列表，注意：不要带dd。
// });
//全局组件
Vue.component("HeaderTitle", HeaderTitle);
Vue.component("header-search", HeaderSearch);
Vue.component("header-navigation", HeaderNavigation);
Vue.component("no-more", NOmore);
Vue.config.productionTip = false;
Vue.prototype.$title = "http://wsdx.sgcc.com.cn/api";
Vue.prototype.$videoUrl = "http://wsdx.sgcc.com.cn/app/video/";
Vue.prototype.$videoUrlCdn = "http://cdnwsdx.sgcc.com.cn/app/video/";
Vue.prototype.$coursePrefix = "/resourcemanage/course/showCover/?url=";
Vue.prototype.$catalogPrefix = "/resourcemanage/catalog/showCover/?url=";
// http://wsdx.sgcc.com.cn/api/resourcemanage/catalog/showCover/?url=1596094480182.jpg&TOKEN=c5a99cf6-e186-4469-91f4-83e98e223671
Vue.prototype.$dd = dd;
Vue.prototype.$corpid = "";
Vue.prototype.$pageNumber = 1;
Vue.prototype.$Toast = Toast;
Vue.prototype.secondToHour = function (second) {
  if (second % 2700.0 != 0) return Math.floor((second / 2700.0) * 10) / 10;
  else return second / 2700;
};
// 时间戳转换
Vue.prototype.timestampToTime = function (data) {
  var date = new Date(data)
  var Y = date.getFullYear() + '年'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' 日'
  return Y + M + D
}

// 课程类别
Vue.prototype.cateGory = {
  category: {
    "required": { "key": "1", value: "必修课" },
    "optional": { "key": "2", value: "选修课" },
    "micro": { "key": "3", value: "微课" }
  }
}
// 获取token
var token = localStorage.getItem("token");
var videoID = localStorage.getItem("videoData");
Vue.prototype.$token = token;
Vue.prototype.$videoID = videoID;
Vue.prototype.$dislog = dialog;
// 引入echarts loginByCode
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = http;
Vue.prototype.$loginByCode = loginByCode;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
