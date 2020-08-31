<template>
  <div class='headerSeach componentHeaderStyle'>
    <div class="iconContainer">
      <van-icon name="arrow-left" class="titleCon" @click="goBack" />
      <div class="iconContainerBorder"></div>
      <van-icon name="wap-home-o" class="titleCon" @click="()=>{this.$router.push({path:'/'})}" />
    </div>
    <van-field v-model="keyWord" :placeholder="placeHolder" />
  </div>
</template>

<script>
export default {
  name: 'headerSeach',
  components: {},
  watch: {
    keyWord() {
      this.$emit('childrenEvent', this.keyWord)
    }
  },
  props: {
    placeHolder: String
  },
  data() {
    return {
      keyWord: ''
    };
  },
  computed: {},
  methods: {
    goBack(){
      this.$router.go(-1);
      this.$emit("childrenGetData")
    }
  },
  created() {

  },
  mounted() { },
}
</script>
<style lang='scss' type='text/css' scoped>
.headerSeach {
  width: 100%;
  height: 0.45rem;
  background: #cb0a0f;
  text-align: center;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  .iconContainer {
    border: 1px solid #fff;
    width: 0.9rem;
    height: 60%;
    position: absolute;
    left: 0.1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 0.5rem;
    z-index: 100;
    .iconContainerBorder {
      width: 0.01rem;
      height: 55%;
      background: #fff;
    }
  }
  /deep/.van-cell {
    background-color: #cb0a0f;
    height: 90%;
    padding: 0.06rem 0.16rem;
    padding-left: 110px;
  }
  /deep/.van-field__control {
    height: 100%;
  }
  /deep/.van-field__body {
    height: 100%;
    padding-left: 0.1rem;
    background: #fff;
    border-radius: 0.05rem;
  }
}
</style>