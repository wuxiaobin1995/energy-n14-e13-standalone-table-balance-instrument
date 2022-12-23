<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-23 21:47:05
 * @LastEditTime: 2022-12-23 21:58:44
 * @Description : 测试项目选择
-->
<template>
  <div class="test-select">
    <div class="wrapper">
      <el-page-header
        class="page"
        title="返回首页"
        content="请选择测试项目"
        @back="handleToHome"
      ></el-page-header>

      <!-- 测试项目 -->
      <div class="select">
        <div class="select-item">平衡能力测试</div>
        <div class="select-item">静态稳定测试</div>
        <div class="select-item">动态稳定测试</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-select',

  data() {
    return {}
  },

  methods: {
    /**
     * @description: 回到首页
     */
    handleToHome() {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test-select {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 86%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 26px 40px;
    position: relative;
    @include flex(column, stretch, stretch);

    .page {
      position: absolute;
      top: 20px;
      left: 30px;
    }

    /* 测试项目 */
    .select {
      flex: 1;
      margin: 40px 0 20px 0;
      @include flex(row, space-around, stretch);
      .select-item {
        @include flex(row, center, center);
      }
    }
  }
}
</style>
