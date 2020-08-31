<template>
  <div class="publishcoursereComment">
    <HeaderTitle :title="title" :titleFlag="titleFlag"></HeaderTitle>
    <div class="headerBelowContainer">
      <van-field
        v-model="message"
        label="输入讨论"
        rows="3"
        autosize
        type="textarea"
        placeholder="有什么想说的吗？赶紧来参与大家的讨论吧"
      />
      <div style="font-size:14px;color:#666;padding-left:0.16rem">
        <van-checkbox v-model="checked" shape="square" checked-color="#cb0a0f">是否匿名</van-checkbox>
      </div>
      <!-- 提交按钮 -->
      <div class="button" @click="submit()">提交</div>
    </div>
  </div>
</template>

<script>
import { addDiscuss } from "../../api/video.js";
export default {
  name: "publishcoursereComment",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      title: "发表课程讨论",
      titleFlag: true,
      message: "",
      checked: false
    };
  },
  computed: {},
  methods: {
    //   发表评论
    getAddDiscuss() {
      var _this = this;
      var _id = localStorage.getItem("videoData");
      const req = {
        items: [
          {
            courseId: _id,
            discussContent: this.message,
            isAnonymity: this.checked == true ? 1 : 0
          }
        ]
      };
      addDiscuss(_this.$title, _this.$token, req).then(() => {
        this.$router.go(-1);
      });
    },
    // 提交
    submit() {
      this.getAddDiscuss();
    }
  },
  created() {
  },
  mounted() {}
};
</script>
<style lang='scss' type='text/css' scoped>
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
/deep/.van-cell::after {
  display: none;
}
.headerBelowContainer {
  padding-top: 0.2rem;
}
</style>