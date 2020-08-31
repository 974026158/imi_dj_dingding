<template>
  <div class="learningReport">
    <!-- 头部 -->
    <HeaderTitle :title="title" :titleFlag="titleFlag" :titleIcon="titleIcon"></HeaderTitle>
    <!-- 内容 -->
    <div class="learningReportData">
      <!-- 统计 -->
      <div>
        <div v-for="(item,index) in statistics" :key="index" class="statisticsDiv">
          <span>
            <van-icon :name="item.icon" class="iconColor" />
            <em>{{item.iconValue}}</em>
          </span>
          <span>{{item.number}}</span>
        </div>
        <!-- echarts表 -->
        <my-echarts></my-echarts>
      </div>
    </div>
  </div>
</template>

<script>
import myEcharts from "./myEcharts/myEcharts.vue";
import { getLoginFrequency, classHours } from "../../api/learningReport.js";
export default {
  name: "learningReport",
  components: {
    "my-echarts": myEcharts
  },
  watch: {},
  props: {},
  data() {
    return {
      title: "学习统计",
      titleFlag: true,
      titleIcon: "bar-chart-o",
      // 学习统计
      statistics: [
        {
          id: 0,
          icon: "star",
          iconValue: "登陆次数",
          number: ""
        },
        {
          id: 1,
          icon: "checked",
          iconValue: "已完成必修学时",
          number: ""
        },
        {
          id: 2,
          icon: "checked",
          iconValue: "已完成选修学时",
          number: ""
        },
        {
          id: 3,
          icon: "column",
          iconValue: "已完成必修课程数",
          number: ""
        },
        {
          id: 4,
          icon: "column",
          iconValue: "已完成选修课程数",
          number: ""
        }
      ]
    };
  },
  computed: {},
  methods: {
    // 获取登录次数 学时情况
    getLogin() {
      var _this = this;
      var title = _this.$title;
      var token = _this.$token; // eslint-disable-line no-unused-vars
      //获取年份
      var date = new Date();
      var year = date.getFullYear();
      // 获取登陆次数
      getLoginFrequency(title, year, token)
        .then(function(res) {
          _this.statistics[0].number = res.resultValue + "次";
        })
        .catch(function(err) {
          console.log(err, "error");
        });
      // 获取学时情况
      classHours(title, year, token)
        .then(function(res) {
          var result = res.resultValue[0];
          var data = _this.statistics;
          var compulsoryTime = result.compulsory_time_count / (60 * 45);
          var electiveTime = result.elective_time_count / (60 * 45);
          // 已完成必修学时
          var compulsoryTimeCount =
            compulsoryTime.toFixed(1).toString() == "0.0"
              ? "0"
              : compulsoryTime.toFixed(1).toString();
          data[1].number = compulsoryTimeCount + "学时";
          // 已完成选修修学时
          var electiveTimeCount =
            electiveTime.toFixed(1).toString() == "0.0"
              ? "0"
              : electiveTime.toFixed(1).toString();
          data[2].number = electiveTimeCount + "学时";
          // 已完成必修课程数
          data[3].number = result.compulsory_count.toString() + "门";
          // 已完成选修课程数
          data[4].number = result.elective_count.toString() + "门";
        })
        .catch(function(err) {
          console.log(err, "error");
        });
    }
  },
  created() {
    this.getLogin();
  },
  mounted() {}
};
</script>
<style lang='scss' type='text/css' scoped>
@import "../../style/learningReport/learningReport.scss";
</style>