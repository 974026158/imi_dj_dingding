<template>
  <div class="tabBar">
    <van-tabbar v-model="active" active-color="#ee2400" inactive-color="#000" route>
      <van-tabbar-item replace to="/enterpriseCredit">
        <span>企信</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="friends-o" replace to="/enterpriseCredit">企信</van-tabbar-item> -->
      <van-tabbar-item icon="search" replace to="/mailList">通讯录</van-tabbar-item>
      <van-tabbar-item icon="setting-o" replace  to="/work">工作</van-tabbar-item>
      <van-tabbar-item icon="aim" replace  to="/realTimeInfo">资讯</van-tabbar-item>
      <van-tabbar-item icon="balance-pay" replace  to="/mine">我的</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  components: {},
  watch: {},
  props: {},
  data() {
    return {
      active: 0,
      icon: {
        active: require('../../assets/j.png'),
        inactive: require('../../assets/j.png')
      }
    };
  },
  computed: {},
  methods: {},
  create() {},
  mounted() {}
};
</script>
<style lang="scss" type="text/css" scoped>
.van-tabbar--fixed{
  border-top: 1px solid #ccc;
  display: none;
}
</style>