<template>
  <div class="noteDetails">
    <!-- 头部 -->
    <HeaderTitle :title="title" :titleFlag="titleFlag"></HeaderTitle>
    <div class="detailsDiv">
      <div class="title">
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
  name: "noteDetails",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      title: "笔记详情",
      titleFlag: true,
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
      this.titleData = data.courseName;
      this.dataList = data.noteContent;
      this.name = data.courseTeacherName;
      this.date = data.noteUpdateTime;
    }
  },
  created() {
    this.getData();
  },
  mounted() {}
};
</script>
<style lang='scss' type='text/css' scoped>
// 与心得详情共用一套css
@import "../../style/details/details.scss";
</style>