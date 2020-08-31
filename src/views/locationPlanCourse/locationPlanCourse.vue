<template>
  <div>
    <HeaderTitle :title="title" :titleFlag="titleFlag"></HeaderTitle>
    <div class="placeholderDiv"></div>
    <header-navigation :showID="0"></header-navigation>
    <div class="placeholderDiv"></div>
    <plan-course :type="type"></plan-course>
  </div>
</template>
<script>
import PlanCourse from "../../components/planCourse/planCourse.vue";
export default {
  name: 'locationPlanCourse',
  components: {
    "plan-course": PlanCourse
  },
  watch: {},
  props: {},
  data() {
    return {
      titleFlag: true,
      title: this.$route.query.title,
      type: this.$route.query.type.toString()
    };
  },
  computed: {},
  methods: {},
  created() {
  },
  mounted() { },
}
</script>
<style lang='scss' type='text/css' scoped>
@import "../../style/enterpriseCredit/enterpriseCredit.scss";
.compulsoryDiv {
  margin-top: 0.93rem;
}
.headerNavigation {
  z-index: 99;
}
.placeholderDiv {
  height: 0.13rem;
  position: fixed;
  background: #f8f8f8;
  top: 0.32rem;
  width: 100%;
  z-index: 98;
}
.placeholderDiv:nth-child(2) {
  top: 0.8rem;
}
</style>