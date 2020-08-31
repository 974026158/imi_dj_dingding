<template>
  <div class="classHourDiv">
    <!-- logo -->
    <div class="timeLogoDiv">
      <div style="padding:0rem 0 0 0.1rem">
        <img :src="imgUrl" alt style="width:1.3rem;height:1.3rem" />
      </div>
      <div class="userContainer">
        <span class="user">用户名:&nbsp;{{userName}}</span>
        <span class="hour">
          <span>必修课时:&nbsp;{{compulsory}}</span>
          <span>选修课时:&nbsp;{{elective}}</span>
        </span>
      </div>
    </div>
    <div style="background:#fafafc;position: absolute;width: 100%;">
      <!-- 两大课时 -->
      <div class="classHour">
        <div class="classHourChildren">
          <h1>{{totalHour}}</h1>
          <p class="classTourText">目标课时</p>
        </div>
        <span class="border"></span>
        <div class="classHourChildren">
          <h1 style="color:#5eb4f0">{{alreadyHour}}</h1>
          <p class="classTourText">已修课时</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  classHourTotal,
  classHouralready,
  classHourcompulsory,
  classHourelective
} from "../../../api/enterpriseCredit.js";
export default {
  name: "classHour",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      imgUrl: require("../../../assets/logo.png"),//logo
      name: "",//回去用户名
      compulsory: "", //必修课时
      elective: "", //选修课时
      totalHour: "", //总课时
      alreadyHour: "" //已修课时
    };
  },
  computed: {
    userName() {
      let userName = localStorage.getItem("username");
      return userName ? userName : this.name;
    }
  },
  methods: {
    // 获取课时
    obtainClassHour() {
      var _this = this;
      var token = _this.$token; // eslint-disable-line no-unused-vars
      var title = _this.$title;
      // 总课时
      classHourTotal(title, token)
        .then(function (res) {
          _this.totalHour = Math.round(res.resultValue);
        })
        .catch(function (err) {
          console.log(err, "error");
        });
      //已修课时
      classHouralready(title, new Date().getFullYear(), token)
        .then(function (res) {
          _this.alreadyHour = res.resultValue / (60 * 45);
        })
        .catch(function (err) {
          console.log(err, "error");
        });
      //必修课时
      classHourcompulsory(title, token)
        .then(function (res) {
          _this.compulsory = Math.round(res.resultValue.totalTime / (60 * 45));
        })
        .catch(function (err) {
          console.log(err, "error");
        });
      //选修课时
      classHourelective(title, _this.cateGory.category.optional.key, token)
        .then(function (res) {
          _this.elective = _this.secondToHour(res.resultValue.totalTime);
        })
        .catch(function (err) {
          console.log(err, "error");
        });
    }
  },

  created() {
    // 调用获取课时方法
    this.obtainClassHour();
  },
  mounted() { }
};
</script>
<style lang='scss' type='text/css' scoped>
@import "../../../style/classHour/classHour.scss";
</style>