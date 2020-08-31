<template>
  <div class="compulsoryDiv">
    <!-- 微课头部 -->
    <div class="compulsoryHeader">
      <span><img src="../../../assets/star.png" alt="" style="width:100%;height:100%" /></span>
      <span class="recommend">微课推荐</span>
      <span v-if="this.defaultList.length>=4" @click="()=>{this.$router.push({path: '/microLecture'})}" class="commonMore" style="font-size: 15px;color: #7f7f7f;width: 70%;text-align: right;">更多</span>
    </div>
    <!-- 加载图标 -->
    <div v-show="defaultFlag" class="defaultFlag">
      <van-loading size="24px" color="#1989fa">数据加载中...</van-loading>
    </div>
    <!-- 微课展示区域 v-for="(item,index) in defaultList" :key="index" -->
    <div class="complete">
      <div class="tabData" v-for="(item,index) in defaultList" :key="index" @click="showVideo(item)">
        <img :src="electiveImg+item.catagory_img+micCoursesToken" alt style="width:100%;height:1rem;margin-bottom: 0.05rem;" />
        <p class="commonText" style=" width: 100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-size:14px !important">{{item.catalogName}}</p>
        <p class="commonText" style=" width: 100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-size:13px !important;color:#666 !important">课程数：{{item.courseCount}}</p>
      </div>
      <!-- 边线 -->
      <div class="placeholderBorder" v-show="!defaultFlag"></div>
    </div>

  </div>
</template>

<script>
import { micCourses } from "../../../api/enterpriseCredit.js";
export default {
  name: "elective",
  components: {},
  watch: {
    // 监听数据加载速度，展示加载图标
    defaultList: function () {
      this.$nextTick(function () {
        this.defaultFlag = false;
      });
    }
  },
  props: {},
  data() {
    return {
      //   图片拼接
      electiveImg: this.$title + this.$catalogPrefix,
      micCoursesToken: "&TOKEN=" + this.$token,
      // 储存数据
      defaultList: [],
      defaultFlag: true
    };
  },
  computed: {},
  methods: {
    //   获取微课信息
    getmicCourses() {
      micCourses(this.$title, this.$token).then(res => {
        // 将微课信息存入缓存
        localStorage.setItem("MicrolectureData", JSON.stringify(res.resultValue.microList));
        // localStorage.setItem("MicrolectureData", JSON.stringify(res.resultValue));
        //   默认显示四条数据
        res.resultValue.microList.length = 4;
        this.defaultList = res.resultValue.microList;
      });
    },
    // 跳转查看视频 microLecture
    showVideo(item) {
      localStorage.setItem("videoData", item.catalogId);
      this.$router.push({
        path: "/microclassification",
        query: {
            catalogId: item.catalogId
          }
      });
    }
  },
  created() {
    this.getmicCourses();
  },
  mounted() { }
};
</script>
<style lang='scss' type='text/css' scoped>
@import "../../../style/enterpriseCredit/enterpriseCredit.scss";
// 占位符边线
.placeholderBorder {
  width: 90%;
  height: 0.01rem;
  background: #e7e7e7;
  position: absolute;
  top: 0;
  bottom: 0.22rem;
  left: 0;
  right: 0;
  margin: auto;
}
.complete {
  flex-wrap: wrap;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.15rem;
  padding-right: 0.15rem;
  position: relative;
}
.tabData {
  flex: none !important;
  width: 47%;
  margin-bottom: 0.2rem;
}
// 重置微课高度
.compulsoryDiv {
  height: auto !important;
  margin-bottom: 0rem !important;
}
.defaultFlag {
  height: 1.215rem;
  background: #f8f8f8;
  font-size: 14px;
  text-align: center;
  line-height: 1.215rem;
}
</style>