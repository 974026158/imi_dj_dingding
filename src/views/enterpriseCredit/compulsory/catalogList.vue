<template>
  <div class="compulsoryDiv">
    <header-search :placeHolder="placeHolder" @childrenEvent='childrenEvent' @childrenGetData='childrenGetData'></header-search>
    <header-navigation :showID="1"></header-navigation>
    <van-loading size="24px" color="rgb(94, 180, 240)" type="spinner" v-show="defaultFlag" class="vanLoading">数据加载中...</van-loading>
    <!-- 搜索后的内容 -->
    <div class="search-content complete" v-show="keyword">
      <!-- <van-pull-refresh v-model="refreshing" loading-text="刷新中" success-text="刷新成功" @refresh="onRefresh" head-height="50"> -->
      <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
      <!-- 下拉刷新 上拉加载 -->
      <ul :class="compulsoryViewStyle==2?'tabDatacompulsory':'tabData'">
        <li class="search-item tabDataChildren" v-for="(item,itemIndex) in list" :key="itemIndex" style="font-size: 10px;display: flex;flex-direction: column;" @click="showVideo(item)">
          <span>
            <img :src="coursePrefix + item.course_img + suffix" alt :style="{'width':compulsoryViewStyle==2?'97%':'1.2rem','height':compulsoryViewStyle==2?'1rem':'0.7rem'}" class="commonImgStyle" />
          </span>
          <span class="barContainerParent">
            <p style="margin-top:0.1rem;margin-bottom:0.1rem" class="commonText wrapSize">{{item.course_title}}</p>
            <span class="barContainer">
              <span class="progressBar" style="height: 0.05rem !important;width:70%">
                <span class="progressBarConduct" :style="{width:item.course_learned / item.course_total * 100 + '%','height': '0.05rem !important'}"></span>
              </span>
              <em class="progressBarSize">{{item.course_learned / item.course_total * 100 + '%'}}</em>
            </span>
          </span>
        </li>

      </ul>
      <!-- </van-list> -->
      <!-- <no-more v-if="noMoreFalge"></no-more> -->
      <!-- </van-pull-refresh> -->
      <li v-show="hasNoData" class="hasData">
        没有找到匹配数据
      </li>
      <!-- <no-more v-if="noMoreFalge" v-show="!hasNoData"></no-more> -->
    </div>
    <!-- 搜索前展示 -->
    <div class="complete" v-show="!keyword">
      <!-- 下拉刷新 上拉加载 -->
      <van-pull-refresh v-model="refreshing" loading-text="刷新中" success-text="刷新成功" @refresh="onRefresh" head-height="50">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div :class="compulsoryViewStyle==2?'tabDatacompulsory':'tabData'">
            <div class="tabDataChildren" v-for="(item,index) in courseList" :key="index" style="flex-direction: column" @click="showVideo(item)">
              <!--todo-->
              <span>
                <img :src="coursePrefix + item.course_img + suffix" alt :style="{'width':compulsoryViewStyle==2?'97%':'1.2rem','height':compulsoryViewStyle==2?'1rem':'0.7rem'}" class="commonImgStyle" />
              </span>
              <span class="barContainerParent">
                <!-- course_teacher -->
                <p style="margin-bottom:0.1rem" class="commonText wrapSize">{{item.course_title}}</p>
                <p style="margin-top:0.1rem;color:#666 !important" class="commonText wrapSize">讲师：{{item.course_teacher}}</p>
                <span class="barContainer">
                  <span class="barContainerChildren progressBar" style="height: 0.05rem !important;width:70%">
                    <span class="progressBarConduct" :style="{width:item.course_learned / item.course_total * 100 + '%',display:barBlock,background:barColor,height:barHeight,'border-radius': '0 0.1rem 0.1rem 0'}"></span>
                  </span>
                  <em class="progressBarSize">{{item.course_learned / item.course_total * 100 + '%'}}</em>
                </span>
              </span>
            </div>
          </div>
        </van-list>
        <!-- <no-more v-if="noMoreFalge"></no-more> -->
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { countAndTime, studyCourseByCatalog } from "../../../api/finishedCourses.js";
export default {
  name: "planCourseList",
  components: {},
  props: {},
  data() {
    return {
      keyword: '',
      catalogId: this.$route.query.catalogId,
      courseList: [],
      list: [],//存放搜索结果数据
      coursePrefix: this.$title + this.$coursePrefix,
      suffix: '&TOKEN=' + this.$token,
      placeHolder: "输入课程名称",
      defaultFlag: true,
      noMoreFalge: false,
      refreshing: false,
      loading: false,
      finished: false,
      barHeight: '0.05rem',
      barColor: '#cb0a0f',
      barBlock: "block",
      compulsoryViewStyle: 1 //compulsoryViewStyle == 1 ? 按分类显示必修课 : compulsoryViewStyle == 2 ? 按课程显示必修课 : ''
    };
  },
  computed: {
    hasNoData() {
      return !this.list.length;
    }
  },
  watch: {
    // this.defaultFlag = false;
    keyword() {//监听搜索
      if (!this.list) {
        this.list = [];
        return;
      }
      const result = [];
      for (let i in this.courseList) {
        if (this.courseList[i].course_title.indexOf(this.keyword) > -1) {
          result.push(this.courseList[i]);
        }
      }
      this.list = result;
    },
    courseList() {
      this.$nextTick(function () {
        this.defaultFlag = false;
        this.noMoreFalge = true;
      });
    }
  },
  methods: {
    childrenEvent(e) {
      this.keyword = e;
    },
    childrenGetData() {
    },
    // 跳视频
    showVideo(item) {
      localStorage.setItem("videoData", item.course_id);
      this.$router.push({
        path: "/courseLearning",
        query: {
          value: item,
          courseName: item.course_title
        }
      });
    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        this.loading = false;
        if (this.refreshing) {
          this.courseList = [];
          this.getstudyCourseByCatalog(1);
          this.refreshing = false;
          this.$Toast.loading({
            message: '刷新成功',
            forbidClick: true,
            type: 'success',
            duration: 700
          });
        } else {
          this.getstudyCourseByCatalog(this.$pageNumber++);
        }
      }, 1200);
    },
    // 下拉刷新
    onRefresh() {
      //清空列表数据
      this.finished = false;
      //重新加载数据
      this.loading = true;
      this.onLoad();
    },
    getstudyCourseByCatalog(pageNumber) {
      studyCourseByCatalog(this.$title, this.catalogId, this.$token, 5, pageNumber).then(res => {
        let rows = res.resultValue.items;//请求返回当页的列表
        if (rows == null || rows.length == 0) {
          this.finished = true;
          return;
        }
        this.courseList = this.courseList.concat(rows);
        if (this.courseList.length >= res.resultValue.itemCount) {
          this.finished = true;

        }
      })
    }
  },
  created() {
    // this.getstudyCourseByCatalog(this.$pageNumber);
  },
  mounted() {
    countAndTime(this.$title, this.catalogId, this.$token).then(res => { console.log('2:' + res) });
  }
};
</script>
<style lang='scss' type='text/css' scoped>
@import "../../../style/courseList/courseList.scss";
</style>
