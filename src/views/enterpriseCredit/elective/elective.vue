<template>
  <div class="compulsoryDiv">
    <!-- 选修头部 -->
    <div class="compulsoryHeader">
      <span></span>
      <span>选修</span>
    </div>
    <!-- 选修剩余部分 -->
    <div class="complete">
      <!-- tab切换 -->
      <div class="tabDiv">
        <span
          v-for="(item,index) in electiveList"
          @click="electiveTab(index)"
          :key="index"
          :class="{'active':electiveActive==index}"
        >{{item.tab}}</span>
      </div>
      <!-- tab切换内容 -->
      <div class="tabData">
        <!-- 未完成计划的div内容显示 -->
        <div v-if="electiveActive == 0?true:false">
          <span>
            <p>{{electiveValueNo}}</p>
            <span>
              <span>
                <span :style="{width:progressBarNo}"></span>
              </span>
              <em>{{progressBarNo}}</em>
            </span>
          </span>
          <span>
            <img :src="electiveImgNo" alt style="width:100%;height:100%" />
          </span>
        </div>
        <!-- 已完成计划的div内容显示 -->
        <div v-if="electiveActive == 1?true:false">
          <span>
            <p>{{electiveValue}}</p>
            <span>
              <span>
                <span :style="{width:progressBar}"></span>
              </span>
              <em>{{progressBar}}</em>
            </span>
          </span>
          <span>
            <img :src="electiveImg" alt style="width:100%;height:100%" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "elective",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      electiveActive: 0,
      electiveList: [{ tab: "未完成计划" }, { tab: "已完成计划" }],
      electiveValueNo: "未完成",
      progressBarNo: "32%",
      electiveImgNo: "",
      electiveValue: "已完成",
      progressBar: "100%",
      electiveImg: ""
    };
  },
  computed: {},
  methods: {
    // 选项卡tab切换事件
    electiveTab(index) {
      this.electiveActive = index;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' type='text/css' scoped>
@import "../../../style/enterpriseCredit/enterpriseCredit.scss";
</style>