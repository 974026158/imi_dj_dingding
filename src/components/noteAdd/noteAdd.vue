<template>
  <div class="experienceAdd">
    <!-- 头部 -->
    <HeaderTitle :title="title" :titleFlag="titleFlag"></HeaderTitle>
    <div style="overflow:auto;margin-top: 0.32rem;padding-top: 0.16rem;">
      <!-- 心得内容 -->
      <van-field v-model="message" label="输入笔记" rows="4" autosize type="textarea" placeholder="有什么知识点需要记录吗?赶紧新建一个笔记吧" />
      <!-- 提交按钮 -->
      <div class="button" @click="submit()">提交</div>
    </div>
  </div>
</template>

<script>
import { addNotes } from "../../api/learningNotes.js";
export default {
  name: "experienceAdd",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      title: "新增笔记",
      titleFlag: true,
      message: ""
    };
  },
  computed: {},
  methods: {
    getaddNotes() {
      var _this = this;
      var _id = localStorage.getItem("videoData");
      const req = {
        items: [{ courseId: _id, noteContent: this.message }]
      };
      addNotes(_this.$title, _this.$token, req).then(res => {
        if (res.successful) {
          this.$router.go(-1);
        }
      })
    },
    submit() {
      this.getaddNotes();
    }
  },
  created() {
  },
  mounted() { }
};
</script>
<style lang='scss' type='text/css' scoped>
/deep/.van-cell::after {
  display: none;
}
/deep/.van-field__label {
  width: 70px;
}
.button {
  height: 0.36rem;
  background: #cb0a0f;
  text-align: center;
  line-height: 0.36rem;
  font-size: 16px;
  color: #fff;
  margin-top: 0.32rem;
  border-radius: 0.05rem;
  margin-left: 0.16rem;
  margin-right: 0.16rem;
}
</style>