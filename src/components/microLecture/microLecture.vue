<template>
  <div class='microLecture'>
    <div style="height:0.8rem">
      <!-- 搜索栏 -->
      <header-search :placeHolder="placeHolder" @childrenEvent='childrenEvent'></header-search>
      <!-- 导航 -->
      <header-navigation :showID="2"></header-navigation>
    </div>
    <!-- 显示数据 -->
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh" head-height="50">
      <div class="headerBelowContainer" v-show="!keyword">
        <div class="complete" v-for="(item,index) in list" :key="index" @click="videoMore(item)">
          <div class="tabData">
            <div>
              <span>
                <!-- catalogName -->
                <p class="commonText">{{item.catalogName}}</p>
                <!-- <p class="commonText">{{item.courseName}}</p> -->
                <p class="commonText" style="font-size:13px !important;color:#666 !important">课程数：{{item.courseCount}}</p>
              </span>
              <!-- <span class="commonImgStyle"><img :src="electiveImg+item.courseCoverPath+micCoursesToken" alt='' /></span> -->
              <span class="commonImgStyle"><img :src="electiveImg+item.catagory_img+micCoursesToken" alt='' /></span>
            </div>
          </div>
        </div>
        <!-- </div> -->
        <no-more v-if="noMoreFalge" style="width:100%"></no-more>
      </div>
      <!-- <no-more v-if="noMoreFalge"></no-more> -->
      <!-- 搜索后的显示数据 -->
      <div class="headerBelowContainer" v-show="keyword">
        <div class="complete" v-for="(item,index) in searchList" :key="index" @click="videoMore(item)">
          <div class="tabData">
            <div>
              <span>
                <p class="commonText">{{item.catalogName}}</p>
                <!-- <p class="commonText">{{item.courseName}}</p> -->
                <p class="commonText" style="font-size:13px !important;color:#666 !important">课程数：{{item.courseCount}}</p>
              </span>
              <span class="commonImgStyle"><img :src="electiveImg+item.catagory_img+micCoursesToken" alt='' /></span>
              <!-- <span class="commonImgStyle"><img :src="electiveImg+item.courseCoverPath+micCoursesToken" alt='' /></span> -->
            </div>
          </div>
        </div>
        <div v-show="hasNoData" class="hasData">
          没有找到匹配数据
        </div>
        <no-more v-if="noMoreFalge" v-show="!hasNoData"></no-more>
      </div>

    </van-pull-refresh>
  </div>
</template>
<script>

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
        // catalogName
        if (this.list[i].catalogName.indexOf(this.keyword) > -1) {
          result.push(this.list[i]);
        }
        // if (this.list[i].courseName.indexOf(this.keyword) > -1) {
        //   result.push(this.list[i]);
        // }
      }
      this.searchList = result;
    },
    list() {
      this.$nextTick(function () {
        this.noMoreFalge = true;
      });
    }
  },
  props: {},
  data() {
    return {
      list: [],
      searchList: [],//存放搜索结果数据
      //图片请求地址
      electiveImg: this.$title + this.$catalogPrefix,
      micCoursesToken: "&TOKEN=" + this.$token,
      placeHolder: "请输入微课名称",
      keyword: "",
      noMoreFalge: false,
      isLoading: false
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
    // 跳分类 microclassification
    videoMore(item) {
      localStorage.setItem("videoData", item.catalogId);
      this.$router.push({
        path: "/microclassification",
        query: {
            catalogId: item.catalogId
          }
      });
    },
    onRefresh() {
      setTimeout(() => {
        this.$Toast.loading({
          message: '数据加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 100
        });
        this.isLoading = false;
      }, 1000)
    }
  },
  created() {
    //   取出微课数据
    this.list = JSON.parse(localStorage.getItem('MicrolectureData'));
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