import * as dd from 'dingtalk-jsapi';
const loginByCode = corpId => {
    // const _this = this;
    console.log("requestAuthCode begin");
    dd.runtime.permission.requestAuthCode({
        corpId: corpId,
        onSuccess: function (result) {
            console.log("requestAuthCode:" + result.code);
            // _this.$http({
            //     method: "get",
            //     url: this.$title + "/sysmanage/parameterSetting/getSetting?TOKEN=" + _this.$token
            // })
            // _this.httpUtils.appGet('/login/loginByCode?code=' + result.code).then(function (res) {
            //     const user = res.data;
            //     window.localStorage.setItem("user", JSON.stringify(user));
            // }, function (r) {
            //     _this.commonUtils.commonAlert(r.msg);
            // })
        },
        onFail: function (err) {
            alert("客户端-获取免登授权码失败:" + JSON.stringify(err));
        }
    })
}
export default loginByCode;