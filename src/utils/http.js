import axios from 'axios';
import { Toast } from "vant";
const http = options => {
  return new Promise((resolve, reject) => {
    const defaultOptions = {};
    const newOptions = {
      ...defaultOptions,
      ...options
    };
    // "application/json" 'content-Type': 'application/x-www-form-urlencoded',
    newOptions.headers = {
      'content-Type': 'application/json',
      ...newOptions.headers
    };
    // if (options.method === 'post') {
    //   options.data = qs.stringify(options.data);
    // }
    axios({
      method: newOptions.method,
      url: newOptions.url,
      data: newOptions.data,
      headers: newOptions.headers
    }).then(res => {
      //根据返回的状态码判断
      if (res.status == 401) {
        //操作返回登录页面
        this.$router.push({ path: '/' });
        localStorage.setItem("401Code", "0");
        Toast("登陆失效，请下拉刷新重新登录");
      } else if (res.status == 200) {
        localStorage.removeItem("401Code");
        if (!res.data.successful) {
          Toast(res.data.resultHint);
        } else {
          resolve(res.data);
        }
      } else {
        reject(res);
        Toast("网络错误" + reject(res));
      }
    }).catch(err => {
      reject(err);
    })
  })
};
export default http