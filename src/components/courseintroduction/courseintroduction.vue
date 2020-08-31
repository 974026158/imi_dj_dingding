<template>
  <div class="courseintroduction">
    <HeaderTitle :title="title" :titleFlag="titleFlag" :titleIcon="titleIcon"></HeaderTitle>
    <div class="headerBelowContainer">
      <!-- 1.025 #f8f8f8 -->
      <div class="scoreDiv">
        <span>{{text}}</span>
        <!-- ☆ -->
        <van-rate v-model="value" allow-half void-icon="star" void-color="#eee" />
      </div>
      <!-- 课程介绍 -->
      <div class="curriculumData">
        <!-- 日期和title -->
        <span>
          <span style="font-size:16px;margin-bottom:0.1rem">
            <van-icon name="cluster" style="margin-right:0.03rem" />
            <i style="line-height: 21px;">课程介绍</i>
          </span>
          <span>{{startDate}}&nbsp;-&nbsp;{{endDate}}</span>
        </span>
        <!-- 内容 -->
        <span style="text-indent:0.28rem">{{data}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { introduceVideo } from "../../api/video.js";
export default {
  name: "courseintroduction",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      title: "课程介绍",
      titleFlag: true,
      titleIcon: "cluster",
      text: "",
      value: 4.5,
      startDate: "",
      endDate: "",
      data: ""
    };
  },
  computed: {},
  methods: {
    getintroduceVideo() {
      var _this = this;
      var _id = localStorage.getItem("videoData");
      introduceVideo(_this.$title, _id, _this.$token).then(res => {
        if (res.successful) {
          var _data = res.resultValue.items[0];
          this.text = _data.courseName;
          this.data = _data.courseIntroduction;
          this.endDate = _this.timestampToTime(_data.courseEndTime);
          this.startDate = _this.timestampToTime(_data.courseUploadTime);
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.getintroduceVideo();
  },
  mounted() {}
};
</script>
<style lang='scss' type='text/css' scoped>
.courseintroduction {
  background: #f5f5f5 !important;
  .headerBelowContainer {
    // 头部带评分的div
    .scoreDiv {
      min-height: 1.025rem;
      background: #f8f8f8;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 0.15rem;
      padding: 0.18rem 0.15rem 0.18rem 0.15rem;
      span {
        word-wrap: break-word;
        font-size: 15px;
        align-items: flex-start;
      }
      /deep/.van-rate__icon--full {
        color: #cc090f;
      }
    }
    // 课程介绍
    .curriculumData {
      background: #f8f8f8;
      padding: 0.18rem 0.15rem 0.18rem 0.15rem;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #555;
      span:nth-child(1) {
        display: flex;
        flex-direction: column;
        span:nth-child(1),
        span:nth-child(2) {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
        span:nth-child(2) {
          margin-bottom: 0.2rem;
        }
      }
    }
  }
}
</style>