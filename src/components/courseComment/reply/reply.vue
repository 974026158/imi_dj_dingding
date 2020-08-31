<template>
  <div class="reply">
    <van-field
      v-model="message"
      rows="3"
      autosize
      type="textarea"
      placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
    />
    <div class="radio">
      <van-checkbox v-model="checked" shape="square" checked-color="#cb0a0f">是否匿名</van-checkbox>
      <div class="button" @click="submit()">回复</div>
    </div>
  </div>
</template>

<script>
import { reply } from "../../../api/video.js";
export default {
  name: "reply",
  components: {},
  watch: {},
  props: {
    replyID: String,
    displayId: String,
    repliedId: String,
    prove: String
  },
  data() {
    return {
      message: "",
      checked: true,
      replyId: this.replyID,
      displayID: this.displayId,
      repliedID: this.repliedId,
      PROVE: this.prove
    };
  },
  computed: {},
  methods: {
    //   回复接口
    getReply() {
      var _this = this;
      const req = {
        items: [
          {
            displayId: this.prove == "展开评论" ? this.repliedID : this.replyId,
            isAnonymity: this.checked == true ? 1 : 0,
            repliedId: this.prove == "展开评论" ? this.displayID : this.replyId,
            replyContent: this.message,
            replyType: this.prove == "展开评论" ? "1" : "0"
          }
        ]
      };
      reply(_this.$title, _this.$token, req).then(res => {
        if (res.successful) {
          if (this.prove == "展开评论") {
            this.$emit("commentEvent");
          } else {
            this.$emit("replyEvent");
          }

          this.message = "";
        }
      });
    },
    // 回复按钮点击事件
    submit() {
      this.getReply();
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' type='text/css' scoped>
.reply {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.12rem;
  background: #f8f8f8;
  .radio {
    font-size: 14px;
    color: #666;
    padding-left: 0.16rem;
    display: flex;
    border-top: 1px solid #ccc;
    align-items: center;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    .button {
      width: 0.55rem;
      background: rgb(203, 10, 15);
      height: 0.25rem;
      border-radius: 0.02rem;
      color: #fff;
      text-align: center;
      line-height: 0.25rem;
      margin-left: 0.15rem;
    }
  }
  .button {
    font-size: 13px;
  }
  /deep/.van-cell::after {
    display: none;
  }
  /deep/.van-cell {
    background: #f8f8f8 !important;
  }
}
</style>