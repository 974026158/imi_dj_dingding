<template>
  <div class="noteDetails">
    <!-- 头部 -->
    <HeaderTitle :title="title" :titleFlag="titleFlag"></HeaderTitle>
    <div class="detailsDiv">
        <h2>标题: {{titleValue}}</h2>
      <div class="title" style="padding-top:0.4rem;padding-bottom:0.4rem">
        <em>课程:&nbsp;</em>
        <em>{{titleData}}</em>
      </div>
      <div class="gap"></div>
      <div class="data">{{dataList}}</div>
      <div class="time">
        <p style="margin-bottom: 0.06rem;">{{name}}</p>
        <p>{{date}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "experienceDetails",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      title: "心得详情",
      titleFlag: true,
      titleValue:"",
      titleData: "",
      dataList: "",
      name: "",
      date: ""
    };
  },
  computed: {},
  methods: {
    getData() {
      var data = this.$route.query.value;
      this.titleValue = data.harvestTitle;
      this.titleData = data.courseName;
      this.dataList = data.harvestContent;
      this.name = data.userName;
      this.date = data.updateTime;
    }
  },
  created() {
      this.getData()
  },
  mounted() {}
};
</script>
<style lang='scss' type='text/css' scoped>
// 与笔记详情共用一套css
@import "../../style/details/details.scss";
</style>