<template>
  <div class="compulsoryDiv">
    <!-- 必修头部 -->
    <div class="compulsoryHeader">
      <span></span>
      <span>必修</span>
    </div>
    <!-- 必修剩余部分 -->
    <div class="complete">
      <!-- tab切换 -->
      <div class="tabDiv">
        <span v-for="(item,index) in compulsoryList" @click="compulsoryTab(index)" :key="index" :class="{'active':compulsoryActive==index}">{{item.tab}}</span>
      </div>
      <!-- tab切换内容 -->
      <div class="tabData">
        <!-- 未完成计划的div内容显示 -->
        <div v-if="compulsoryActive == 0?true:false">
          <span>
            <p>{{compulsoryValueNo}}</p>
            <span>
              <span>
                <span :style="{width:progressBarNo}"></span>
              </span>
              <em>{{progressBarNo}}</em>
            </span>
          </span>
          <span>
            <img :src="compulsoryImgNo" alt style="width:100%;height:100%" />
          </span>
        </div>
        <!-- 已完成计划的div内容显示 -->
        <div v-if="compulsoryActive == 1?true:false">
          <span>
            <p>{{compulsoryValue}}</p>
            <span>
              <span>
                <span :style="{width:progressBar}"></span>
              </span>
              <em>{{progressBar}}</em>
            </span>
          </span>
          <span>
            <img :src="compulsoryImg" alt style="width:100%;height:100%" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "compulsory",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      compulsoryActive: 0,
      compulsoryList: [{ tab: "未完成计划" }, { tab: "已完成计划" }],
      compulsoryValueNo: "未完成",
      progressBarNo: "32%",
      compulsoryImgNo: "",
      compulsoryValue: "已完成",
      progressBar: "100%",
      compulsoryImg: ""
    };
  },
  computed: {},
  methods: {
    //   选项卡切换事件
    compulsoryTab(index) {
      this.compulsoryActive = index;
    }
  },
  created() { },
  mounted() { }
};
</script>
<style lang='scss' type='text/css' scoped>
@import "../../../style/enterpriseCredit/enterpriseCredit.scss";
</style>