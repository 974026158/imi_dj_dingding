<template>
  <div class="compulsoryDiv">
    <div style="height:0.8rem">
      <!-- @childrenGetData='childrenGetData' -->
      <header-search :placeHolder="placeHolder" @childrenEvent='childrenEvent'></header-search>
      <header-navigation :showID="Number(type)"></header-navigation>
    </div>
    <!-- 搜索内容 -->
    <van-loading size="24px" color="rgb(94, 180, 240)" type="spinner" v-show="defaultFlag" class="vanLoading">数据加载中...</van-loading>
    <div class="search-content complete" v-show="keyword">
      <van-pull-refresh v-model="refreshing" loading-text="刷新中..." success-text="刷新成功" @refresh="onRefresh" head-height="50">
        <ul :class="compulsoryViewStyle==2?'tabDatacompulsory':'tabData'">
          <li class="search-item tabDataChildren" v-for="item of list" :key="type==='0'?item.courseId:item.catalogId">
            <span>
              <span>
                <img :src="type==='0'?coursePrefix + item.coursePathCover + suffix:catalogPrefix + item.catagory_img + suffix" alt :style="{'width':compulsoryViewStyle==2?'97%':'1.2rem','height':compulsoryViewStyle==2?'1rem':'0.7rem'}" class="commonImgStyle" />
              </span>
              <div class="barContainerParent">
                <p style="margin-top:0.1rem;margin-bottom:0.1rem" class="commonText wrapSize">{{type==='0'?item.courseName:item.catalogName}}</p>
                <p style="margin-top:0.1rem;margin-bottom:0.1rem" class="commonText wrapSize courseCount" v-if="type === '0'">讲师：{{item.courseTeacherName}}</p>
                <p style="margin-top:0.1rem;margin-bottom:0.1rem" class="commonText wrapSize courseCount" v-else>课程数：{{item.courseCount}}</p>
                <span class="barContainer">
                  <span class="barContainerChildren progressBar">
                    <span class="progressBarConduct" :style="{width:type==='0'?item.currentStudyTime / item.courseTotalTime * 100 + '%':item.catalogFinishiTime / item.catalogTotalTime * 100 + '%',display:barBlock,background:barColor,height:barHeight,'border-radius': '0 0.1rem 0.1rem 0'}"></span>
                  </span>
                  <em class="progressBarSize">{{type==='0'?item.currentStudyTime / item.courseTotalTime * 100 + '%':(item.catalogFinishiTime / item.catalogTotalTime * 100).toFixed(0) + '%'}}</em>
                </span>
              </div>
            </span>
          </li>

          <li v-show="hasNoData" class="hasData">
            没有找到匹配数据
          </li>
        </ul>
        <no-more v-if="noMoreFalge" v-show="!hasNoData"></no-more>
      </van-pull-refresh>
    </div>
    <!-- 上拉加载中 -->
    <div class="complete" v-show="!keyword">
      <van-pull-refresh v-model="refreshing" loading-text="刷新中" success-text="刷新成功" @refresh="onRefresh" head-height="50">
        <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
        <div :class="compulsoryViewStyle==2?'tabDatacompulsory':'tabData'">
          <div class="tabDataChildren" v-for="item in index===0?unfinishedCourseList:finishedCourseList" :key="type==='0'?item.courseId:item.catalogId" @click="toDetail(item)">
            <span>
              <span>
                <img :src="type==='0'?coursePrefix + item.coursePathCover + suffix:catalogPrefix + item.catagory_img + suffix" alt class="commonImgStyle" :style="{'width':compulsoryViewStyle==2?'97%':'1.2rem','height':compulsoryViewStyle==2?'1rem':'0.7rem'}" />
              </span>
              <div class="barContainerParent">
                <p style="margin-top:0.1rem;margin-bottom:0.1rem" class="commonText wrapSize">{{type==='0'?item.courseName:item.catalogName}}</p>
                <p style="margin-top:0.1rem;margin-bottom:0.1rem" class="commonText wrapSize courseCount" v-if="type === '0'">讲师：{{item.courseTeacherName}}</p>
                <p style="margin-top:0.1rem;margin-bottom:0.1rem" class="commonText wrapSize courseCount" v-else>课程数：{{item.courseCount}}</p>
                <span class="barContainer">
                  <span class="barContainerChildren progressBar">
                    <span class="progressBarConduct" :style="{width:type==='0'?item.currentStudyTime / item.courseTotalTime * 100 + '%':item.catalogFinishiTime / item.catalogTotalTime * 100 + '%',display:barBlock,background:barColor,height:barHeight,'border-radius': '0 0.1rem 0.1rem 0'}"></span>
                  </span>
                  <em class="progressBarSize">{{type==='0'?item.currentStudyTime / item.courseTotalTime * 100 + '%':(item.catalogFinishiTime / item.catalogTotalTime * 100).toFixed(0) + '%'}}</em>
                </span>
              </div>
            </span>
          </div>
        </div>
        <!-- </van-list> -->
        <no-more v-if="noMoreFalge"></no-more>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { finishedCourses, unFinishedCourses, catalogCourses } from "../../../api/finishedCourses.js";
export default {
  name: "planCourseList",
  components: {},
  props: {},
  data() {
    return {
      keyword: '',
      barHeight: '0.1rem',
      barColor: '#cb0a0f',
      barBlock: "block",
      unfinishedCourseList: [],
      finishedCourseList: [],
      list: [],//存放搜索结果数据
      coursePrefix: this.$title + this.$coursePrefix,
      catalogPrefix: this.$title + this.$catalogPrefix,
      suffix: '&TOKEN=' + this.$token,
      type: this.$route.query.type,//选修还是必修
      index: this.$route.query.index,//已完成还是未完成
      placeHolder: this.$route.query.type == 0 ? '输入课程名称' : '输入课程分类名称',
      defaultFlag: true,
      noMoreFalge: false,
      refreshing: false,
      compulsoryViewStyle: this.$route.query.viewStyle //compulsoryViewStyle == 1 ? 按分类显示必修课 : compulsoryViewStyle == 2 ? 按课程显示必修课 : ''
    };
  },
  computed: {
    hasNoData() {
      return !this.list.length;
    }
  },
  watch: {
    keyword() {//监听搜索
      if (!this.list) {
        this.list = [];
        return;
      }
      const result = [];
      let courseList = [];
      if (this.index === 0) {//未完成
        courseList = this.unfinishedCourseList;
      } else {//已完成
        courseList = this.finishedCourseList;
      }
      for (let i in courseList) {
        if (courseList[i].courseName.indexOf(this.keyword) > -1) {
          result.push(courseList[i]);
        }
      }
      this.list = result;
    },
    finishedCourseList() {
      this.$nextTick(function () {
        this.defaultFlag = false;
        this.noMoreFalge = true;
      });
    },
    unfinishedCourseList() {
      this.$nextTick(function () {
        this.defaultFlag = false;
        this.noMoreFalge = true;
      });
    }
  },
  methods: {
    getUnfinishedCourses(res) {
      if (res.successful) {
        this.unfinishedCourseList = res.resultValue.items;
      }
    },
    getFinishedCourses(res) {
      if (res.successful) {
        this.finishedCourseList = res.resultValue.items;
      }
    },
    getCatalogCourses(res) {
      if (res.successful) {
        if (this.index === 0) {//未完成
          this.unfinishedCourseList = res.resultValue.unfinishedList;
        } else {//已完成
          this.finishedCourseList = res.resultValue.finishedList;
        }
      }

    },
    toDetail(item) {
      if (this.type === '0') {
        localStorage.setItem("videoData", item.courseId);
        this.$router.push({
          path: "/courseLearning",
          query: {
            value: item,
            courseName: item.courseName
          }
        });
      } else {
        this.$router.push({
          path: "/catalogList",
          query: {
            catalogId: item.catalogId
          }
        });
      }
    },
    // 头部输入框子组件事件
    childrenEvent(e) {
      this.keyword = e;
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$Toast.loading({
          message: '数据加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 850
        });
        this.refreshing = false;
      }, 1000);

    }
  },
  created() {
    this.index = Number.parseInt(this.index);
    if (this.type === '0' && this.index === 0) {//必修未完成
      unFinishedCourses(this.$title, this.$token).then(this.getUnfinishedCourses);
    } else if (this.type === '0' && this.index === 1) {//必修已完成
      finishedCourses(this.$title, this.$token).then(this.getFinishedCourses);
    } else if (this.type === '1') {//选修
      catalogCourses(this.$title, 2, this.$token).then(this.getCatalogCourses);
    }
  },
  mounted() {

  }
};
</script>
<style lang='scss' type='text/css' scoped>
@import "../../../style/courseList/courseList.scss";
.complete {
  margin-top: 0rem !important;
}
.tabData {
  .tabDataChildren > span {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
}
.tabDatacompulsory {
  .tabDataChildren {
    .barContainerParent {
      width: 100%;
      .barContainer {
        .barContainerChildren {
          height: 0.05rem !important;
        }
      }
    }
    span:nth-child(1) {
      height: 100% !important;
    }
  }
}
</style>
