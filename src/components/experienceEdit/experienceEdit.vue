<template>
  <div class="noteEdit">
    <HeaderTitle :title="title" :titleFlag="titleFlag"></HeaderTitle>
    <div class="container">
      <div class="curriculum">
        课程:
        <em>{{curriculum}}</em>
      </div>
      <van-field
        v-model="messageTitle"
        label="标题:"
        rows="1"
        autosize
        type="textarea"
        maxlength="20"
        placeholder="请输入标题"
        show-word-limit
      />
      <van-field
        v-model="message"
        label="心得:"
        rows="2"
        autosize
        type="textarea"
        maxlength="150"
        placeholder="请输入心得"
        show-word-limit
      />
      <div class="button" @click="submit()">提交</div>
    </div>
  </div>
</template>

<script>
import { editExperience } from "../../api/learningExperience.js";
export default {
  name: "experienceEdit",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      title: "编辑心得",
      titleFlag: true,
      message: "", //心得
      messageTitle: "", //标题
      curriculum: "", //课程'
      ID: "" //id
    };
  },
  computed: {},
  methods: {
    // harvestId 获取路由传值的参数
    getData() {
      var data = this.$route.query.value;
      this.message = data.harvestContent;
      this.messageTitle = data.harvestTitle;
      this.curriculum = data.courseName;
      this.ID = data.harvestId;
    },
    // 按钮点击事件
    submit() {
      this.experienceEditFunciton();
    },
    // 编辑心得
    experienceEditFunciton() {
      var _this = this;
      var req = {
        items: [
          {
            harvestId: this.ID,
            harvestTitle: this.messageTitle,
            harvestContent: this.message
          }
        ]
      };
      editExperience(_this.$title, _this.$token, req)
        .then(() => {
          this.$router.go(-1);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
  },
  mounted() {}
};
</script>
<style lang='scss' type='text/css' scoped>
@import "../../style/editNoteOrExperience/editNoteOrExperience.scss";
.curriculum {
  width: 100%;
  // padding-left: 0.15rem;
  padding-right: 0.15rem;
  word-break: break-all;
  text-align: left;
  font-size: 14px;
  color: #323232;
  padding-top: 0.25rem;
  padding-left: 0.5rem;
  text-indent: -0.38rem;
  em {
    margin-left: 0.07rem;
  }
}
// 去除最外层div的边框和间距
/deep/.van-cell {
  // padding: 0.1rem 0.15rem;
  border: none !important;
  border-radius: 0.05rem;
  margin-top: 0.2rem;
}
// 输入框
/deep/.van-cell__value {
  border: 1px solid #ccc;
  border-radius: 0.04rem;
}
// label
/deep/.van-field__label {
  width: 0.4rem;
}
// 输入框和label的padding值
/deep/.van-cell {
  padding: 0;
}
// 最大容器去除间距
.container {
  padding: 0 !important;
}
// 按钮新样式
.button {
  margin-left: 0.2rem;
  margin-right: 0.15rem;
  width: auto !important;
}
// 输入框
/deep/.van-field__word-limit {
  padding-right: 0.03rem;
}
// 字体ss
/deep/.van-field__control {
  padding-right: 0.03rem;
}
</style>