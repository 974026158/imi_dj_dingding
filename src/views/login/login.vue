<template>
  <div class='login'>
    <div class="loginCon">
      <img src="../../assets/icon.png" alt="">
      <p>欢迎使用网上党校小程序!</p>
      <div style="display:flex">
        <van-button type="primary" @click="scanCode">扫一扫</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// import * as dd from 'dingtalk-jsapi';
import { Base64 } from 'js-base64';
export default {
  name: 'login',
  components: {},
  watch: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    scanCode() {
      // if (dd.env.platform !== 'notInDingTalk') {
      //   dd.biz.util.scan({
      //     type: String, // type 为 all、qrCode、barCode，默认是all。
      //     onSuccess: function (data) {
      //       // data.userId
      //       this.$emit("loginEvent", Base64.decode(data.userId));
      //     },
      //     onFail: function (err) {
      //       alert(err)
      //     }
      //   })

      //   // }
      //   // this.$emit("loginEvent","8a6e50b54dc19a24014dc1af740a1010");
      // }
      this.$emit("loginEvent", Base64.encode("8a6e50b54dc19a24014dc1af740a1010"));
    },

  },
  created() { },
  mounted() { },
}
</script>
<style lang='scss' type='text/css' scoped>
.login {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  .loginCon {
    width: 100%;
    img {
      margin: 0 auto;
      border-radius: 50%;
      width: 1.7rem;
    }
    p {
      font-size: 17px;
      font-weight: bold;
      color: #666;
      width: 100%;
      text-align: center;
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
      letter-spacing: 0.01rem;
    }
    /deep/.van-button--normal {
      width: 100%;
      font-size: 15px;
      font-weight: bold;
    }
    /deep/.van-button--primary {
      background-color: #ee2400;
      border: 1px solid #ccc;
    }
  }
}
</style>