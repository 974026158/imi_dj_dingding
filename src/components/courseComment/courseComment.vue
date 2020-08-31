<template>
  <div class="courseComment">
    <HeaderTitle :title="title" :titleFlag="titleFlag" :titleIcon="titleIcon" :titleCourseAddFlag="titleCourseAddFlag"></HeaderTitle>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="headerBelowContainer">
        <div class="top" v-for="(item,index) in courseListL" :key="index">
          <span>
            <span>
              <van-icon name="manager" style="vertical-align: text-top;" />
              <i>{{item.userName}}</i>
            </span>
            <span>
              <!-- 点赞 -->
              <i>{{item.voteLikeNum}}</i>
              <img src="../../assets/plus.png" alt style="margin-right:0.2rem;vertical-align: text-top;" @click="voteLikeClick(item)" v-if="item.userDiscussLikeNum>0?false:true" />
              <img src="../../assets/acitveplus.png" alt style="margin-right:0.2rem;vertical-align: text-top;" @click="voteLikeClick(item)" v-if="item.userDiscussLikeNum>0?true:false" />
              <!-- 踩 -->
              <i>{{item.voteDisLikeNum}}</i>
              <img src="../../assets/step.png" alt @click="voteClick(item)" v-if="item.userDiscussDisLikeNum>0?false:true" />
              <img src="../../assets/activestep.png" alt @click="voteClick(item)" v-if="item.userDiscussDisLikeNum>0?true:false" />
            </span>
          </span>
          <div class="textDiv">{{item.discussContent}}</div>
          <div class="date">
            <em>{{item.discussTime}}</em>
            <em @click="reply(item,index)">回复</em>
            <em style="color:#ee2400" @click="deleteDiscuss(item)">删除</em>
            <em style="margin-left: 0.1rem;color:#8590a6" v-if="item.replyNum == 0?false:true" @click="commentClick(item,index)">
              <van-icon name="checked" style="vertical-align: text-top;" />
              展开评论({{item.replyNum}})
            </em>
          </div>
          <!-- 回复输入框 -->
          <reply v-if="index==electiveActive" :replyID="replyID" @replyEvent='replyEvent'></reply>
          <!-- 展开评论区域 -->
          <comment-on v-if="index==commentActive" :commentID="commentID" @replyEvent='replyEvent'></comment-on>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { discuss, voteLike, vote, deleteDiscuss } from "../../api/video.js";
import { Dialog } from "vant";
import reply from "./reply/reply.vue";
import commentOn from "./commentOn/commentOn.vue";
export default {
  name: "courseComment",
  components: {
    reply,
    "comment-on": commentOn
  },
  watch: {},
  props: {},
  data() {
    return {
      title: "课程讨论",
      titleFlag: true,
      titleCourseAddFlag: true,
      titleIcon: "column",
      courseListL: [], //存放评论信息
      electiveActive: -1,
      replyID: "",
      commentActive: -1,
      commentID: "",
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  computed: {},
  methods: {
    // 获取课程评论已有信息
    getdiscuss(pageNumber) {
      var _this = this;
      var _id = localStorage.getItem("videoData");
      discuss(_this.$title, _id, _this.$token, 20, pageNumber, 1594103199798).then(
        res => {
          // this.courseListL = res.resultValue.items;
          let rows = res.resultValue.items;//请求返回当页的列表
          if (rows == null || rows.length == 0) {
            this.finished = true;
            return;
          }
          this.courseListL = this.courseListL.concat(rows);
          if (this.courseListL.length >= res.resultValue.itemCount) {
            this.finished = true;

          }
        }
      );
    },
    // 上拉加载
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
          this.getdiscuss(this.$pageNumber);

        }
      }, 1200);
    },
    // 点赞
    voteLikeClick(item) {
      var _this = this;
      const req = {
        items: [{ id: item.discussId, voteType: 3, isLike: 1 }]
      };
      voteLike(_this.$title, _this.$token, req).then(() => {
        this.getdiscuss();
        this.$Toast("操作成功");
      });
    },
    // 踩
    voteClick(item) {
      var _this = this;
      const req = {
        items: [{ id: item.discussId, voteType: 3, isLike: 0 }]
      };
      vote(_this.$title, _this.$token, req).then(() => {
        this.getdiscuss();
        this.$Toast("操作成功");
      });
    },
    // 删除
    deleteDiscuss(item) {
      Dialog.confirm({
        title: "删除评论",
        message: "是否确认删除 " + item.discussContent + " 该评论"
      })
        .then(() => {
          // on confirm
          this.getdeleteDiscuss(item.discussId);
        })
        .catch(() => {
          // on cancel
        });
    },
    getdeleteDiscuss(reqId) {
      var _this = this;
      deleteDiscuss(_this.$title, reqId, _this.$token).then(() => {
        this.getdiscuss();
        this.$Toast("删除成功");
      });
    },
    // 回复点击事件
    reply(item, index) {
      this.replyID = item.discussId;
      this.electiveActive = this.electiveActive === index ? -1 : index;
    },
    // 展开评论奠基石
    commentClick(item, index) {
      this.commentID = item.discussId;
      this.commentActive = this.commentActive === index ? -1 : index;
    },
    // 子组件自定义事件
    replyEvent() {
      this.getdiscuss();
      this.electiveActive = -1;
      this.commentActive = -1
    }
  },
  created() {
    this.getdiscuss(this.$pageNumber);
  },
  mounted() { }
};
</script>
<style lang='scss' type='text/css' scoped>
@import "../../style/courseComment/courseComment.scss";
</style>