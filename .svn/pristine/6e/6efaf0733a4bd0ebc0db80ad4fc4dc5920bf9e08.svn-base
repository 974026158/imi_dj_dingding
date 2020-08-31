<template>
  <div class="headerTitle componentHeaderStyle headerTitleCommon">
    <div class="iconContainer" v-if="titleFlag">
      <!-- style="left:0.4rem" -->
      <van-icon name="arrow-left" class="titleCon" v-if="titleFlag" @click="()=>{this.$router.go(-1)}" />
      <div class="iconContainerBorder"></div>
      <van-icon name="wap-home-o" class="titleCon" v-if="titleFlag" @click="()=>{this.$router.push({path:'/'})}" />
    </div>
    <van-icon :name="titleIcon" v-if="titleFlag" />
    <i>{{title}}</i>
    <!-- wap-home-o titleAddNotesFlag-->
    <van-icon name="plus" class="titleConAdd" v-if="titleAddFlag" @click="addEcperience()" />
    <van-icon name="plus" class="titleConAdd" v-if="titleAddNotesFlag" @click="addNotes()" />
    <van-icon name="plus" class="titleConAdd" v-if="titleCourseAddFlag" @click="addCourse()" />
    <van-icon name="bars" class="titleConAdd" v-if="titleVideoFlag" @click="VideoDetails()" />
    <van-popup v-model="show" position="bottom">
      <div class="bottomContainer">
        <div class="bottomContainerChildren" v-for="(items,index) in bottoList" :key="index" @click="tabClick(items)">
          <van-icon :name="items.icon" style="font-size: 17px;font-weight: bold;" />
          <em style="margin-left:0.03rem">{{items.name}}</em>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "headerTitle",
  components: {},
  watch: {},
  props: {
    title: String,
    titleFlag: Boolean,
    titleIcon: String,
    titleAddFlag: Boolean,
    titleVideoFlag: Boolean,
    titleCourseAddFlag: Boolean,
    titleAddNotesFlag: Boolean
  },
  data() {
    return {
      show: false,
      bottoList: [
        {
          id: 0,
          icon: "cluster",
          name: "课程介绍"
        },
        {
          id: 1,
          icon: "volume",
          name: "教师简介"
        },
        {
          id: 2,
          icon: "award",
          name: "课程评价"
        },
        {
          id: 3,
          icon: "shop",
          name: "学习笔记"
        },
        {
          id: 4,
          icon: "smile",
          name: "学习心得"
        },
        {
          id: 5,
          icon: "column",
          name: "课程讨论"
        },
        {
          id: 6,
          icon: "cross",
          name: "关闭"
        }
      ]
    };
  },
  computed: {},
  methods: {
    // 跳新增心得
    addEcperience() {
      this.$router.push({ path: "/experienceAdd", query: { typePath: this.$route.query.typePath == "0" ? "0" : "1" } });
    },
    // 跳新建笔记 /noteAdd
    addNotes() {
      this.$router.push({ path: "/noteAdd" });
    },
    // 条发表评论
    addCourse() {
      this.$router.push({ path: "/publishcoursereComment" });
    },
    // 课程学习弹出下拉框
    VideoDetails() {
      this.show = true;
    },
    // 下拉框点击   courseEvaluate
    tabClick(items) {
      var _id = items.id;
      switch (_id) {
        // 课程介绍
        case 0: this.$router.push({ path: "/courseintroduction" });
          break;
        // 教师简介 trainerIntroduction
        case 1: this.$router.push({ path: "/trainerIntroduction" });
          break;
        // 课程评价
        case 2:
          this.$router.push({ path: "/courseEvaluate" });
          break;
        // 学习笔记
        case 3: this.$router.push({ path: "/learningNotes", query: { typePath: '1' } });
          break;
        // 学习心得
        case 4: this.$router.push({ path: "/learningExperience", query: { typePath: '1' } });
          break;
        // 课程讨论 courseComment
        case 5: this.$router.push({ path: "/courseComment" });
          break;
        // 关闭
        case 6: this.show = false;
      }
    }
  },
  create() {

  },
  mounted() { }
};
</script>
<style lang='scss' type='text/css' scoped>
.headerTitle {
  width: 100%;
  height: 0.32rem;
  background: #cb0a0f;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 2;
  .iconContainer {
    border: 1px solid #fff;
    width: 0.85rem;
    height: 74%;
    position: absolute;
    left: 0.1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 0.5rem;
    .iconContainerBorder {
      width: 0.01rem;
      height: 70%;
      background: #fff;
    }
  }
  .titleCon {
    // position: absolute;
    // left: 0.1rem;
  }
  .titleConAdd {
    position: absolute;
    right: 0.1rem;
  }
  .bottomContainer {
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    .bottomContainerChildren {
      height: 0.5rem;
      border-bottom: 1px solid #e7e7e7;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      color: #000;
    }
    .bottomContainerChildren:last-child {
      border-bottom: none;
    }
  }
}
</style>