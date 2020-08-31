<template>
  <div class="learningNotes">
    <!-- 头部 -->
    <HeaderTitle :title="title" :titleFlag="titleFlag" :titleIcon="titleIcon" :titleAddNotesFlag="titleAddNotesFlag"></HeaderTitle>
    <!-- 内容区 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div style="overflow:auto;margin-top: 0.32rem;">
        <div class="learningData" v-for="(items,index) in notesData" :key="index">
          <span>
            <van-icon name="ellipsis" style="font-size:30px" @click="more(items)" />
            <!-- 隐藏的下拉框 点击...显示 -->
            <van-popup v-model="show" closeable position="bottom" :style="{ height: '30%' }">
              <div class="operation">
                <span style="padding-left:0rem;padding-right:0rem;font-size: 15px;" v-for="(item,indexs) in operationData" :key="indexs" @click="operationClick(item)">
                  <van-icon :name="item.iconValue" class="iconStyle" />
                  {{item.value}}
                </span>
                <!-- 分享 -->
                <span style="padding-left:0rem;padding-right:0rem;font-size: 15px;" v-if="items.isShare == 0?true:false" @click="ShareClick()">
                  <van-icon name="replay" class="iconStyle" />分享
                </span>
                <!-- 取消分享 -->
                <span style="padding-left:0rem;padding-right:0rem;font-size: 15px;" v-if="items.isShare == 1?true:false" @click="cancelSharing()">
                  <van-icon name="replay" class="iconStyle" />取消
                  <br />分享
                </span>
              </div>
            </van-popup>
          </span>
          <span @click="details(items)" style="font-size:16px">
            <van-icon name="edit" style="font-size: 16px;vertical-align: text-top;" />
            笔记：{{items.noteContent}}
          </span>
          <span>
            <em>中国共产党的创立</em>
          </span>
          <span>{{items.noteUpdateTime}}</span>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
// notesVideo
import {
  notes,
  deleteNotes,
  shareNotes,
  cancelshareNotes,
  notesVideo
} from "../../api/learningNotes.js";
import { Dialog } from "vant";
export default {
  name: "learningNotes",
  components: {},
  watch: {

  },
  props: {},
  data() {
    return {
      title: "学习笔记",
      titleFlag: true,
      titleAddNotesFlag: this.$route.query.typePath == 1 ? true : false,
      titleIcon: "edit",
      notesData: [], //接收返回的所有数据
      show: false,
      // shareFlag: false, //控制取消收藏 显示隐藏s
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
      activeData: "",
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  computed: {},
  methods: {
    //   三个点 点击事件
    more(items) {
      this.show = true;
      this.activeData = items;
    },
    // 获取学习笔记数据
    getNotes(pageNumber) {
      var _this = this;
      var title = _this.$title;
      var token = _this.$token;
      var _id = localStorage.getItem("videoData");
      var phone = 1593666764625; //获取用户信息后获得
      if (this.$route.query.typePath == 0) {
        notes(title, token, 20, pageNumber, phone)
          .then(res => {
            // 接收返回的所有数据
            // _this.notesData = res.resultValue.items;
            let rows = res.resultValue.items;//请求返回当页的列表
            if (rows == null || rows.length == 0) {
              this.finished = true;
              return;
            }
            this.notesData = this.notesData.concat(rows);
            if (this.notesData.length >= res.resultValue.itemCount) {
              this.finished = true;
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      } else if (this.$route.query.typePath == 1) {
        notesVideo(title, _id, token, 20, pageNumber, phone).then(res => {
          // 接收返回的所有数据
          // _this.notesData = res.resultValue.items;
          let rows = res.resultValue.items;//请求返回当页的列表
          if (rows == null || rows.length == 0) {
            this.finished = true;
            return;
          }
          this.notesData = this.notesData.concat(rows);
          if (this.notesData.length >= res.resultValue.itemCount) {
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
          this.getNotes(this.$pageNumber);

        }
      }, 1200);
    },
    // 操作点击
    operationClick(item) {
      // 0编辑、1删除、2分享
      if (item.id == 0) {
        this.$router.push({
          path: "/noteEdit",
          query: {
            value: this.activeData
          }
        });
      } else if (item.id == 1) {
        Dialog.confirm({
          title: "删除笔记",
          message: "是否确认删除 " + this.activeData.noteContent + " 该笔记"
        })
          .then(() => {
            this.deleteNote();
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    //笔记详情跳转
    details(items) {
      this.$router.push({
        path: "/noteDetails",
        query: {
          value: items
        }
      });
    },
    // 删除笔记
    deleteNote() {
      var _this = this;
      deleteNotes(_this.$title, this.activeData.noteId, _this.$token)
        .then(() => {
          this.notesData = [];
          this.getNotes(1);
          this.show = false;
          this.$dislog("删除成功");
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 分享点击事件
    ShareClick() {
      Dialog.confirm({
        title: "分享笔记",
        message: "是否确认分享 " + this.activeData.noteContent + " 该笔记"
      })
        .then(() => {
          this.shareFunction();
        })
        .catch(() => {
          // on cancel
        });
    },
    // 分享函数
    shareFunction() {
      shareNotes(this.$title, this.activeData.noteId, this.$token)
        .then(res => {
          if (res.successful) {
            this.show = false;
            this.notesData = [];
            this.getNotes(1);
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
      cancelshareNotes(this.$title, this.activeData.noteId, this.$token)
        .then(res => {
          if (res.successful) {
            this.show = false;
            this.notesData = [];
            this.getNotes(1);
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
        message: "是否确认取消分享 " + this.activeData.noteContent + " 该笔记"
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
    //   执行获取学习笔记方法
    this.getNotes(this.$pageNumber);
  },
  mounted() { }
};
</script>
<style lang='scss' type='text/css' scoped>
// 与学习心得共用一套css
@import "../../style/learningNotesOrExperience/learningNotesOrExperience.scss";
// 确认框确认字体颜色
/deep/.van-dialog__confirm:active {
  color: #ee2400;
}
</style>