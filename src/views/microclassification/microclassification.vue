<template>
  <div class='microLecture'>
    <div style="height:0.45rem">
      <!-- 搜索栏 -->
      <header-search :placeHolder="placeHolder" @childrenEvent='childrenEvent'></header-search>
      <!-- 导航 -->
      <!-- <header-navigation :showID="2"></header-navigation> -->
    </div>
    <van-loading size="24px" color="rgb(94, 180, 240)" type="spinner" v-show="defaultFlag" class="vanLoading" style="margin-top:0.45rem !important;text-align:center">数据加载中...</van-loading>
    <!-- 显示数据 -->
    <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh" head-height="50">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="headerBelowContainer" v-show="!keyword">
          <div class="complete" v-for="(item,index) in list" :key="index" @click="videoMore(item)">
            <div class="tabData">
              <div>
                <span>
                  <p class="commonText">{{item.course_title}}</p>
                  <p class="commonText" style="font-size:13px !important;color:#666 !important">讲师：{{item.course_teacher}}</p>
                </span>
                <span class="commonImgStyle"><img :src="electiveImg+item.course_img+micCoursesToken" alt='' /></span>
              </div>
            </div>
          </div>
        </div>
        <!-- 搜索后的显示数据 -->
        <div class="headerBelowContainer" v-show="keyword">
          <div class="complete" v-for="(item,index) in searchList" :key="index" @click="videoMore(item)">
            <div class="tabData">
              <div>
                <span>
                  <p class="commonText">{{item.course_title}}</p>
                  <p class="commonText" style="font-size:13px !important;color:#666 !important">讲师：{{item.course_teacher}}</p>
                </span>
                <span class="commonImgStyle"><img :src="electiveImg+item.course_img+micCoursesToken" alt='' /></span>
              </div>
            </div>
          </div>
          <div v-show="hasNoData" class="hasData">没有找到匹配数据</div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { classification } from "../../api/enterpriseCredit.js";
export default {
  name: 'microLecture',
  components: {},
  watch: {
    keyword() {
      if (!this.searchList) {
        this.searchList = [];
        return;
      }
      const result = [];
      for (let i in this.list) {
        if (this.list[i].catalogName.indexOf(this.keyword) > -1) {
          result.push(this.list[i]);
        }
      }
      this.searchList = result;
    },
    list() {
      this.$nextTick(function () {
        this.noMoreFalge = true;
        this.defaultFlag = false;
      });
    }
  },
  props: {},
  data() {
    return {
      list: [],
      searchList: [],//存放搜索结果数据
      //图片请求地址
      electiveImg: this.$title + this.$coursePrefix,
      micCoursesToken: "&TOKEN=" + this.$token,
      catalogId: this.$route.query.catalogId,
      placeHolder: "请输入微课名称",
      keyword: "",
      noMoreFalge: false,
      refreshing: false,
      loading: false,
      finished: false,
      defaultFlag: true
    };
  },
  computed: {
    hasNoData() {
      return !this.searchList.length;
    }
  },
  methods: {
    childrenEvent(e) {
      this.keyword = e;
    },
    // 跳视频
    videoMore(item) {
      localStorage.setItem("videoData", item.course_id);
      this.$router.push({
        path: "/courseLearning",
        query: {
          value: item,
          course_title: item.course_title
        }
      });
    },
    // 下拉刷新
    onRefresh() {
      //清空列表数据
      this.finished = false;
      //重新加载数据
      this.loading = true;
      this.onLoad();
    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        this.loading = false;
        if (this.refreshing) {
          this.list = [];
          this.getClassification(1);
          // this.loading = false;
          this.refreshing = false;
          this.$Toast.loading({
            message: '刷新成功',
            forbidClick: true,
            type: 'success',
            duration: 700
          });
        } else {
          this.getClassification(this.$pageNumber++);
        }
      }, 1200);
    },
    // 获取微课分类 catalogId
    getClassification(pageNumber) {
      classification(this.$title, this.catalogId, this.$token, 5, pageNumber, 1596425248369).then(res => {
        // this.list = res.resultValue.items;
        let rows = res.resultValue.items;//请求返回当页的列表
        if (rows == null || rows.length == 0) {
          this.finished = true;
          return;
        }
        this.list = this.list.concat(rows);
        if (this.list.length >= res.resultValue.itemCount) {
          this.finished = true;
        }
      })
    }
  },
  created() {
    // this.getClassification(this.$pageNumber);
  },
  mounted() { },
}
</script>
<style lang='scss' type='text/css' scoped>
/deep/.van-pull-refresh__track {
  position: static;
}
// 最外层div
.headerBelowContainer {
  margin-top: 0rem !important ;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .complete {
    margin-top: 0.2rem;
    width: 47%;
    .tabData {
      width: 100%;
      height: 100%;
    }
    div {
      width: 100%;
      padding-left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column-reverse;
      span:nth-child(1) {
        width: 100%;
        p {
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      span:nth-child(2) {
        display: block;
        // width: 1.17rem;
        height: 1.43rem;
        border: 1px solid #ccc;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>