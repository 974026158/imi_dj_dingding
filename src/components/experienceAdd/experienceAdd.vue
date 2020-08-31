<template>
  <div class="experienceAdd">
    <!-- 头部 -->
    <HeaderTitle :title="title" :titleFlag="titleFlag"></HeaderTitle>
    <div style="overflow:auto;margin-top: 0.32rem;padding-top: 0.16rem;">
      <!-- 课程分类 -->
      <div v-if="this.$route.query.typePath=='0'">
        <van-field readonly clickable label="课程分类" :value="classificationValue" placeholder="选择课程分类" @click="showPicker = true" />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker show-toolbar :columns="classificationColumns" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>
      </div>
      <!-- 选择课程 -->
      <div v-if="this.$route.query.typePath=='0'">
        <van-field readonly clickable label="选择课程" :value="curriculumValue" placeholder="选择课程" @click="showPickerCurriculum = true" />
        <van-popup v-model="showPickerCurriculum" round position="bottom">
          <van-picker show-toolbar :columns="curriculumList" @cancel="showPickerCurriculum = false" @confirm="onConCulum" />
        </van-popup>
      </div>
      <!-- 心得标题 -->
      <van-field v-model="text" label="心得标题" placeholder="请输入心得标题" />
      <!-- 心得内容 -->
      <van-field v-model="message" label="输入心得" rows="4" autosize type="textarea" placeholder="学习完本课程有什么收获吗?试试写一些心得吧" />
      <!-- 提交按钮 -->
      <div class="button" @click="submit()">提交</div>
    </div>
  </div>
</template>

<script>
import { addExperience } from "../../api/learningExperience.js";
//typePath=1
import axios from "axios";
export default {
  name: "experienceAdd",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      title: "新增心得",
      titleFlag: true,
      //   课程分类
      classificationValue: "",
      showPicker: false,
      classificationColumns: [],
      classificationColumnsValue: [],
      classificationID: "",
      //   选择课程
      curriculumValue: "",
      showPickerCurriculum: false,
      curriculumList: [],
      curriculumListValue: [],
      curriculumID: "",
      //   心得标题
      text: "",
      //   心得内容
      message: ""
    };
  },
  computed: {},
  methods: {
    //   课程分类
    onConfirm(value) {
      this.classificationValue = value;
      this.showPicker = false;
      this.classificationColumnsValue.map(item => {
        if (this.classificationValue == item.catalogName) {
          this.classificationID = item.id;
        }
      });

      if (this.classificationID != "") {
        var _this = this;
        var title = _this.$title;
        var token = _this.$token;
        axios
          .post(
            title +
            "/resourcemanage/course/getSelectOptions/" +
            this.classificationID +
            "?TOKEN=" +
            token
          )
          .then(res => {
            // 获取课程分类，并放到课程分类的数组中
            if (res.status == 200) {
              var data = res.data.data;
              this.curriculumListValue = data;
              //   this.curriculumList=data;
              var dataValue = [];
              data.map(item => {
                dataValue.push(item.courseName);
              });
              this.curriculumList = dataValue;
            } else {
              return false;
            }
          })
          .catch(e => {
            console.log(e, "获取数据失败");
          });
      }
    },
    // 选择课程
    onConCulum(value) {
      this.curriculumValue = value;
      this.showPickerCurriculum = false;
      this.curriculumListValue.map(item => {
        if (this.curriculumValue == item.courseName) {
          this.curriculumID = item.courseId;
        }
      });
    },
    // 获取课程分类信息 classClassification
    getClassification1() {
      var _this = this;
      var title = _this.$title;
      var token = _this.$token;
      axios
        .post(
          title + "/resourcemanage/catalog/getSelectOptions/?TOKEN=" + token
        )
        .then(res => {
          // 获取课程分类，并放到课程分类的数组中
          if (res.status == 200) {
            var data = res.data.data;
            this.classificationColumnsValue = data;
            data.map(item => {
              this.classificationColumns.push(item.catalogName);
            });
          } else {
            return false;
          }
        })
        .catch(e => {
          console.log(e, "获取数据失败");
        });
    },
    // 创建心得
    addExperienceFuction() {
      var _this = this;
      var title = _this.$title;
      var token = _this.$token;
      var _id = localStorage.getItem("videoData");
      const req = {
        items: [
          {
            courseId: [this.$route.query.typePath ? _id : this.curriculumID],
            harvestTitle: this.text,
            harvestContent: this.message
          }
        ]
      };
      addExperience(title, token, req).then(res => {
        if (res.successful) {
          this.$router.go(-1);
        }
      });
    },
    submit() {
      this.addExperienceFuction();
    }
  },
  created() {
    this.getClassification1();
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