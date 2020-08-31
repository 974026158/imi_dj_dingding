<template>
  <div class="learningNotes">
    <!-- 头部 -->
    <HeaderTitle :title="title" :titleFlag="titleFlag" :titleIcon="titleIcon" :titleAddFlag="titleAddFlag"></HeaderTitle>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 内容区 -->
      <div style="overflow:auto;margin-top: 0.32rem;">
        <div class="learningData" v-for="(items,index) in experienceData" :key="index">
          <span>
            <van-icon name="ellipsis" style="font-size:30px" @click="more(items)" />
            <!-- 隐藏的下拉框 点击...显示 -->
            <van-popup v-model="show" closeable position="bottom" :style="{ height: '30%' }">
              <div class="operation">
                <span style="padding-left:0rem;padding-right:0rem;font-size: 15px;" v-for="(item,indexs) in operationData" :key="indexs" @click="operationClick(item)">
                  <van-icon :name="item.iconValue" class="iconStyle" />
                  {{item.value}}
                </span>
                <!-- 分享 items.shareCount == 0?true:false-->
                <span style="padding-left:0rem;padding-right:0rem;font-size: 15px;" v-if="items.shareCount == 0?true:false" @click="ShareClick()">
                  <van-icon name="replay" class="iconStyle" />分享
                </span>
                <!-- 取消分享 items.shareCount == 1?true:false-->
                <span style="padding-left:0rem;padding-right:0rem;font-size: 15px;" v-if="items.shareCount == 1?true:false" @click="cancelSharing()">
                  <van-icon name="replay" class="iconStyle" />取消
                  <br />分享
                </span>
              </div>
            </van-popup>
          </span>
          <span @click="details(items)" style="font-size:16px">
            <van-icon name="label-o" style="font-size: 16px;vertical-align: text-top;" />
            心得：{{items.harvestContent}}
          </span>
          <span>
            <em>中国共产党的创立</em>
          </span>
          <span>{{items.updateTime}}</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
// experienceVideo
import {
  experience,
  deleteExperience,
  shareExperience,
  cancelShareExperience,
  experienceVideo
} from "../../api/learningExperience.js";
import { Dialog } from "vant";
export default {
  name: "learningExperience",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      title: "学习心得",
      titleFlag: true,
      titleIcon: "label-o",
      titleAddFlag: true,
      experienceData: [], //接收返回的所有数据
      show: false,
      operationData: [
        {
          id: 0,
          value: "编辑",
          iconValue: "edit"
        },
        {
          id: 1,
          value: "删除",
          iconValue: "delete"
        }
      ],
      avtiveData: "",
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  computed: {},
  methods: {
    //   更多点击事件
    more(items) {
      this.show = true;
      this.avtiveData = items;
    },
    //   获取心得
    getExperience(pageNumber) {
      var _this = this;
      var title = _this.$title;
      var token = _this.$token;
      var _id = localStorage.getItem("videoData");
      var phone = 1593756288282;
      if (this.$route.query.typePath == "0") {
        experience(title, token, 20, pageNumber, phone)
          .then(res => {
            // 接收返回的所有数据
            // this.experienceData = res.resultValue.items;
            let rows = res.resultValue.items;//请求返回当页的列表
            if (rows == null || rows.length == 0) {
              this.finished = true;
              return;
            }
            this.experienceData = this.experienceData.concat(rows);
            if (this.experienceData.length >= res.resultValue.itemCount) {
              this.finished = true;
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      } else if (this.$route.query.typePath == "1") {
        experienceVideo(title, _id, token, 20, pageNumber, phone).then(res => {
          let rows = res.resultValue.items;//请求返回当页的列表
          if (rows == null || rows.length == 0) {
            this.finished = true;
            return;
          }
          this.experienceData = this.experienceData.concat(rows);
          if (this.experienceData.length >= res.resultValue.itemCount) {
            this.finished = true;
          }
        })
      }

    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        this.loading = false;
        if (this.refreshing) {
          this.list = [];
          this.getevaluate(1);
          // this.loading = false;
          this.refreshing = false;
          this.$Toast.loading({
            message: '刷新成功',
            forbidClick: true,
            type: 'success',
            duration: 700
          });
        } else {
          this.$pageNumber = 1;
          this.$pageNumber++;
          // this.loading = false;
          this.getExperience(this.$pageNumber);

        }
      }, 1200);
    },
    // 操作点击
    operationClick(item) {
      // 0编辑、1删除、2分享
      if (item.id == 0) {
        this.$router.push({
          path: "/experienceEdit",
          query: {
            value: this.avtiveData
          }
        });
      } else if (item.id == 1) {
        Dialog.confirm({
          title: "删除心得",
          message: "是否确认删除 " + this.avtiveData.harvestContent + " 该笔记"
        })
          .then(() => {
            // on confirm
            this.deleteExperiences();
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    // 心得详情跳转
    details(items) {
      this.$router.push({
        path: "/experienceDetails",
        query: {
          value: items
        }
      });
    },
    // 删除心得
    deleteExperiences() {
      var _this = this;
      deleteExperience(_this.$title, this.avtiveData.harvestId, _this.$token)
        .then(() => {
          this.experienceData = [];
          this.getExperience(1);
          this.$dislog("删除成功");
          this.show = false;
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 分享点击事件
    ShareClick() {
      Dialog.confirm({
        title: "分享笔记",
        message: "是否确认分享 " + this.avtiveData.harvestContent + " 该心得"
      })
        .then(() => {
          // on confirm
          this.shareFunction();
        })
        .catch(() => {
          // on cancel
        });
    },
    // 分享函数
    shareFunction() {
      const req = [this.avtiveData.harvestId];
      shareExperience(this.$title, this.avtiveData.harvestId, this.$token, req)
        .then(res => {
          if (res.successful) {
            this.show = false;
            this.experienceData = [];
            this.getExperience(1);
            this.$dislog("分享成功");
          } else {
            this.show = true;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 取消分享函数
    canselShare() {
      const req = [this.avtiveData.harvestId];
      cancelShareExperience(
        this.$title,
        this.avtiveData.harvestId,
        this.$token,
        req
      )
        .then(res => {
          if (res.successful) {
            this.show = false;
            this.experienceData = [];
            this.getExperience(1);
            this.$dislog("已取消分享");
          } else {
            this.show = true;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 取消分享点击事件
    cancelSharing() {
      Dialog.confirm({
        title: "取消分享",
        message:
          "是否确认取消分享 " + this.avtiveData.harvestContent + " 该心得"
      })
        .then(() => {
          // on confirm
          this.canselShare();
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  created() {
    //   执行心得
    this.getExperience(this.$pageNumber);
  },
  mounted() { }
};
</script>
<style lang='scss' type='text/css' scoped>
// 与学习笔记共用一套css
@import "../../style/learningNotesOrExperience/learningNotesOrExperience.scss";
</style>