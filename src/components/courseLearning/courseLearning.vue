<template>
  <div class="courseLearning">
    <!-- :reqId="reqId" -->
    <HeaderTitle :title="title" :titleFlag="titleFlag" :titleVideoFlag="titleVideoFlag"></HeaderTitle>
    <div style="overflow:auto;margin-top: 0.32rem;">
      <div class="courseLearningCon">
        <!-- 视频 -->
        <div v-for="(itemVideo,indexVideo) in videoUrl" :key="indexVideo">
          <!--    @ended="endedEvent()" -->
          <div class="videoDiv" v-if="indexVideo==electiveActive">
            <video :src="itemVideo.sd_src" width="100%" height="100%" playsinline :autoplay="autoplay" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" controlslist="nodownload" controls @ended="endedEvent()" @canplay="canplayEvent()" id="video"></video>
          </div>
        </div>
        <!-- 没有视频时显示 -->
        <div class="noVideo" v-if="videoLoading">视频加载中...</div>
        <div class="noVideo" v-if="watchNo">视频暂时无法观看</div>
        <div class="sectionDiv">{{section}}</div>
        <div class="sectionDetails" v-if="this.videoUrl.length==0?false:true">
          <div class="sectionDetailsHeader">共{{classHourTotal}}个课时</div>
          <!-- 选择课时 -->
          <div class="choose" ref="wrapper">
            <div :style="{width:scrollStyle }" ref="containerWidth">
              <span class="chooseChildren" v-for="(item,index) in chooseList" :key="index" @click="tab(item,index)" :class="{'active':electiveActive==index}">
                <div class="chooseVideo" :class="{'activeVideo':electiveActive==index}">视频</div>
                <div class="chooseText">{{item}}</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import BScroll from "better-scroll";   courseId
import { showVideo, introduceTeacher } from "../../api/video.js";
export default {
  name: "app",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      titleVideoFlag: true,
      title: "课程学习",
      titleFlag: true,
      section: "", //章节内容
      classHourTotal: "", //共多少课时
      electiveActive: 0,
      chooseList: [], //存放章节
      videoUrl: [], //存放视频连接
      scrollStyle: 3.8 + "rem",
      autoplay: true, //控制是否自动播放视频
      andoridCanplay: 0, //canplay事件默认值
      locationTime: "",
      CurrentTime: 0,
      CheckTime: 0,
      videoLoading: true,
      watchNo: false
    };
  },
  computed: {},
  methods: {
    //   选择课时
    tab(item, index) {
      this.electiveActive = index;
      this.section = item;
    },
    // 获取视频
    getShowVideo() {
      var _this = this;
      var _id = localStorage.getItem("videoData");
      var courseinfo = {
        coursetype: 3
      };
      // 获取课程信息
      introduceTeacher(
        _this.$title,
        _id,
        courseinfo.coursetype,
        _this.$token
      ).then(resI => {
        var lessoninfo = resI.resultValue;
        var lesson_location = lessoninfo.app_lesson_location;
        // var iscdn = lessoninfo.iscdn;  //---------------------------------------------------
        var locationChapterIdx = 0,
          locationtime = 0;
        if (lesson_location && lesson_location.indexOf(",") != -1) {
          locationtime = lesson_location.split(",")[0];
          locationChapterIdx = lesson_location.split(",")[1];
        }
        this.locationtime = locationtime;
        // 获取视频
        showVideo(_this.$title, _id, _this.$token).then(res => {
          this.videoLoading = !this.videoLoading;
          // asdz
          var data = res.resultValue;
          data.map((item, idx) => {
            // 课程视频信息
            var _url = this.$videoUrl;
            var _token = _this.$token;
            var chapter = {};
            // 如果课程信息中的iscnd==1，说明需要使用cdn外链
            // if (iscdn == 1) _url = _this.$videoUrlCdn; //-------------------------------------------
            chapter.sd_src = _url + item.chapterSdPath;
            chapter.hd_src = _url + item.chapterHdPath + "?token=" + _token;
            chapter.fhd_src = _url + item.chapterFhdPath + "?token=" + _token;
            chapter.type = "视频";
            if (courseinfo.coursetype == 3 && idx == 0) {
              chapter.isLocation = true;
              chapter.locationTime = locationtime;
            }
            if (idx == locationChapterIdx) {
              chapter.isLocation = true;
              chapter.locationTime = locationtime;
            }
            this.chooseList.push(item.chapterName);
            this.videoUrl.push(chapter);
          });
          if (this.videoUrl.length == 0) {
            this.watchNo = !this.watchNo;
          }
          // 章节 视频赋值
          this.classHourTotal = this.chooseList.length;
          if (this.classHourTotal < 2) {
            this.scrollStyle = 0 + 'rem';
          }
          if (this.classHourTotal > 2 && this.classHourTotal < 6) {
            this.scrollStyle = 10 + "rem";
          } else if (this.classHourTotal > 6 && this.classHourTotal < 10) {
            this.scrollStyle = 18 + "rem";
          } else if (this.classHourTotal > 10 && this.classHourTotal < 14) {
            this.scrollStyle = 26 + "rem";
          } else if (this.classHourTotal > 14 && this.classHourTotal < 18) {
            this.scrollStyle = 34 + "rem";
          } else if (this.classHourTotal == 10) {
            this.scrollStyle = 20 + "rem";
          } else if (this.classHourTotal == 6) {
            this.scrollStyle = 12 + "rem";
          } else if (this.classHourTotal == 31) {
            this.scrollStyle = 62 + "rem";
          } else if (this.classHourTotal == 3) {
            this.scrollStyle = 6 + "rem";
          }
          // 如果数据为空显示标题
          if (data.length == 0) {
            this.section = this.$route.query.course_title ? this.$route.query.course_title : this.$route.query.courseName
          } else {
            this.section = data[0].chapterName;
          }
        });
      });
    },
    //判断当前视频是否是最后一个，否的话继续播放
    endedEvent() {
      if (this.electiveActive < this.videoUrl.length) {
        ++this.electiveActive;
        this.autoplay = true;
      }
      if (this.electiveActive == this.videoUrl.length) {
        this.electiveActive = 0;
        this.autoplay = false;
      }
    },
    // 视频已准备好开始播放事件
    canplayEvent() {
      if (this.andoridCanplay != 0) return;
      this.andoridCanplay = 1;
      if (this.locationTime) {
        document.getElementById("video").currentTime = this.locationTime;
      } else {
        document.getElementById("video").currentTime = 0;
      }
    }
  },
  created() {
    this.getShowVideo();
  },
  mounted() {
    var _currentTime = 0;
    var _checkTime = 0;
    setInterval(function () {
      var player = document.getElementById("video");
      if (player && !player.paused && !player.ended) {
        if (_currentTime != player.currentTime) {
          _currentTime = player.currentTime;
          _checkTime = 0;
        } else {
          _checkTime++;
        }
        // if pending over 8 seconds ,maybe 卡顿  当视频加载时间超过6S时，重新赋值重新加载视频
        if (_checkTime > 6) {
          var src = player.currentSrc;
          // 
          if (src == null || src == "") return;
          player.src = "";
          player.src = src;
          player.currentTime = _currentTime;
          _checkTime = 0;
          player.play();
        }
      }
    }, 1000);
  }
};
</script>
<style lang='scss' type='text/css' scoped>
@import "../../style/courseLearning/courseLearning.scss";
</style>