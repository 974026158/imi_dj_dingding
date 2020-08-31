<template>
  <div class="courseEvaluate">
    <HeaderTitle :title="title" :titleFlag="titleFlag" :titleIcon="titleIcon"></HeaderTitle>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="headerBelowContainer">
        <div class="headerBelowContainerCon" v-for="(item,index) in teacherList" :key="index">
          <span>
            <span class="top">
              <van-icon name="manager" style="vertical-align: text-top;" />
              <i>{{item.userName}}</i>
            </span>
            <!-- 日期与内容 -->
            <span class="middle">{{item.commentTime}}</span>
            <span class="bottom">{{item.commentContent}}</span>
          </span>
          <span>
            <!-- 评分 -->
            <van-rate v-model="item.commentScore" allow-half void-icon="star" void-color="#eee" />
          </span>
        </div>

      </div>
    </van-list>
  </div>
</template>

<script>
import axios from "axios";
// import { evaluate } from "../../api/video.js";
export default {
  name: "courseEvaluate",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      title: "课程评价",
      titleFlag: true,
      titleIcon: "award",
      teacherList: [],
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  computed: {},
  methods: {
    getevaluate(pageNumber) {
      var _this = this;
      var _id = localStorage.getItem("videoData");
      axios
        .get(
          _this.$title +
          "/course/courseComment/pageGetComments?filter={courseId:" +
          _id +
          "}&TOKEN=" +
          _this.$token +
          "&pageSize=" +
          20 +
          "&pageNumber=" +
          pageNumber +
          "&_=" +
          1594103199798
        )
        .then(res => {
          if (res.status == 200) {
            let rows = res.data.data;//请求返回当页的列表
            if (rows == null || rows.length == 0) {
              this.finished = true;
              return;
            }
            this.teacherList = this.teacherList.concat(rows);
            if (this.teacherList.length >= res.data.recordsTotal) {
              this.finished = true;
            }
          } else {
            return false;
          }
        });
    },
    onLoad() {
      setTimeout(() => {
        this.loading = false;
        if (this.refreshing) {
          this.list = [];
          this.getevaluate(1);
          // this.loading = false;
          this.refreshing = false;
          this.$Toast.loading({
            message: '刷新成功',
            forbidClick: true,
            type: 'success',
            duration: 700
          });
        } else {
          this.$pageNumber = 1;
          this.$pageNumber++;
          // this.loading = false;
          this.getevaluate(this.$pageNumber);

        }
      }, 1200);
    }
  },
  created() {
    this.getevaluate(this.$pageNumber);
  },
  mounted() { }
};
</script>
<style lang='scss' type='text/css' scoped>
.courseEvaluate {
  background: #f8f8f8 !important;
  height: auto !important;
  .headerBelowContainer {
    .headerBelowContainerCon {
      padding: 0.18rem 0.15rem 0.18rem 0.15rem;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: flex;
      }
      span:nth-child(1) {
        flex-direction: column;
        align-items: flex-start;
        .top {
          font-size: 14px;
          color: #006e6b;
          margin-bottom: 0.04rem;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .middle {
          color: #696969;
          font-size: 13px;
          margin-bottom: 0.05rem;
        }
        .bottom {
          font-size: 16px;
          color: #555;
        }
      }
      span:nth-child(2) {
        justify-content: flex-end;
        align-self: flex-start;
        /deep/.van-rate__icon--full {
          color: #cc090f;
        }
      }
    }
    div:last-child {
      border-bottom: none;
    }
  }
}
</style>