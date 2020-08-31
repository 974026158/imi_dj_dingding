<template>
  <div class='headerNavigation'>
    <van-icon name="bars" style="font-size:22px;color:#bdb9b8" @click="navTab()" />
    <em style="color:#f8f8f8">{{text}}</em>
    <van-popup v-model="show" position="left">
      <div class="bottomContainer">
        <div v-for="(items,index) in bottoList" :key="index" @click="tabClick(items)">
          <div class="bottomContainerChildren" v-if="showID != items.id">
            <!-- <van-icon :name="items.icon" style="font-size: 17px;font-weight: bold;" /> -->
            <em style="margin-left:0.03rem">{{items.name}}</em>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'headerNavigation',
  components: {},
  watch: {},
  props: {
    showID: Number
  },
  data() {
    return {
      text: "",
      show: false,
      bottoList: [
        {
          id: 0,
          icon: "cluster",
          name: "我的必修计划"
        },
        {
          id: 1,
          icon: "volume",
          name: "我的选修计划"
        },
        {
          id: 2,
          icon: "award",
          name: "微课"
        },
        {
          id: 3,
          icon: "shop",
          name: "我的笔记"
        },
        {
          id: 4,
          icon: "smile",
          name: "我的心得"
        },
        {
          id: 5,
          icon: "smile",
          name: "关闭"
        }
      ]
    };
  },
  computed: {},
  methods: {
    navTab() {
      this.show = true;
    },
    tabClick(items) {
      var _id = items.id;
      switch (_id) {
        // 我的必修计划
        case 0: this.$router.push({ path: "/locationPlanCourse", query: { type: 0, index: 0, title: "我的必修" } });
          break;
        //  我的选修计划
        case 1: this.$router.push({ path: "/locationPlanCourseChoice", query: { type: 1, index: 0, title: "我的选修" } });
          break;
        // 微课
        case 2:
          this.$router.push({ path: '/microLecture' });
          break;
        // 我的笔记
        case 3: this.$router.push({ path: "/learningNotes", query: { typePath: "0" } });
          break;
        // 我的心得
        case 4: this.$router.push({ path: "/learningExperience",query: { typePath: "1" } });
          break;
        // 关闭
        case 5: this.show = false;
      }
    }
  },
  created() { },
  mounted() { },
}
</script>
<style lang='scss' type='text/css' scoped>
.headerNavigation {
  width: 100%;
  height: 0.35rem;
  position: fixed;
  top: 0.45rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e0e0e0;
  padding-left: 0.15rem;
  padding-right: 0.15rem;
  /deep/.van-icon {
    font-size: 20px;
  }
  em {
    font-size: 15px;
    color: #fff;
  }
  .bottomContainer {
    height: 100%;
    display: flex;
    flex-direction: column;
    .bottomContainerChildren {
      height: 0.5rem;
      border-bottom: 1px solid #e7e7e7;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 15px;
      color: #fff;
      padding-left: 0.2rem;
    }
    .bottomContainerChildren:last-child {
      border-bottom: none;
    }
  }
  /deep/.van-popup--left {
    width: 40%;
    background: rgba(0, 0, 0, 0.2);
    height: 100%;
    padding-top: 40%;
  }
}
</style>