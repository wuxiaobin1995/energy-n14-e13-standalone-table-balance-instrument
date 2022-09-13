<!--
 * @Author      : Mr.bin
 * @Date        : 2022-04-26 15:58:03
 * @LastEditTime: 2022-04-26 16:23:42
 * @Description : BESS平衡错误测试-介绍
-->
<template>
  <div class="bess-balance-error-test-introduce">
    <!-- 标题 -->
    <div class="title">BESS平衡错误测试-介绍</div>

    <!-- 图片 -->
    <div class="img">
      <el-image :src="imgSrc" fit="scale-down"></el-image>
    </div>

    <!-- 按钮 -->
    <div class="btn">
      <el-button class="btn__item" type="primary" @click="handleStart"
        >开 始 测 试</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'bess-balance-error-test-introduce',

  data() {
    return {
      imgSrc: require('@/assets/img/Test_Mode/BESS.png')
    }
  },

  created() {
    this.$store.dispatch('setIsCollapse', false)
  },

  methods: {
    /**
     * @description: 开始测试按钮
     */
    handleStart() {
      this.$router.push({
        path: '/layout/bess-balance-error-test-measure'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bess-balance-error-test-introduce {
  width: 100%;
  height: 100%;
  padding: 20px 40px;
  @include flex(column, flex-start, stretch);

  /* 标题 */
  .title {
    color: #008000;
    font-size: 34px;
  }

  /* 图片 */
  .img {
    flex: 1;
    @include flex(row, center, center);
  }

  /* 按钮 */
  .btn {
    margin: 10px 0;
    @include flex(row, center, center);
    .btn__item {
      font-size: 28px;
    }
  }
}
</style>
