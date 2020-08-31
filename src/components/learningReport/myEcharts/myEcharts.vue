<template>
  <div id="myChart"></div>
</template>
<script>
import { getEcharts } from "../../../api/learningReport.js";
export default {
  name: "myEcharts",
  components: {},
  watch: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    // 获取学员每月活跃情况，放入echarts中
    getData() {
      var _this = this;
      var title = _this.$title;
      var token = _this.$token; // eslint-disable-line no-unused-vars
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      //获取年份
      var date = new Date();
      var year = date.getFullYear();
      //月
      var monthCategories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      //登录次数
      var loginCountData = []; // eslint-disable-line no-unused-vars
      var monthCountData = []; // eslint-disable-line no-unused-vars
      // 获取活跃度数据接口
      getEcharts(title, year, token)
        .then(res => {
          // 判断对应月份显示对应数据 放到表格中
          monthCategories.map(item => {
            res.resultValue.map(items => {
              // 拿到对应月份和对应月份的数据
              if (items.loginMonth == item) {
                loginCountData.push(items.loginNumber);
                monthCountData.push(items.loginMonth);
              }
            });
          });
          // 创建表格
          myChart.setOption({
            title: {
              text: "学员每月活跃度",
              left: "center",
              textStyle: {
                fontFamily: "Microsoft YaHei",
                fontSize: "13",
                width: "100%",
                align: "center"
              }
            },
            tooltip: { trigger: "axis" },
            grid: { containLabel: true },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: monthCountData,
              axisLine: { show: false },
              axisLabel: { show: true }
            },
            yAxis: {
              type: "value",
              axisLine: { show: false },
              axisLabel: { show: true }
            },
            series: [
              {
                name: "登陆次数",
                type: "line",
                stack: "总量",
                data: loginCountData,
                symbol: "circle",
                itemStyle: {
                  normal: {
                    color: "#71a9e3",
                    lineStyle: {
                      color: "#71a9e3" //折线颜色
                    }
                  }
                }
              }
            ]
          });
        })
        .catch(function(err) {
          console.log(err, "error");
        });
    }
  },
  created() {},
  mounted() {
    this.getData();
  }
};
</script>
<style lang='scss' type='text/css' scoped>
@import "../../../style/learningReport/learningReport.scss";
</style>