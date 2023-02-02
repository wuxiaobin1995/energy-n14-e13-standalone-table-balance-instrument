<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-23 21:47:05
 * @LastEditTime: 2023-02-02 19:30:13
 * @Description : 训练项目选择
-->
<template>
  <div class="train-select">
    <div class="wrapper">
      <el-page-header
        class="page"
        title="返回首页"
        content="请选择训练项目"
        @back="handleToHome"
      ></el-page-header>

      <!-- 训练项目 -->
      <div class="select">
        <div class="select-item">
          <el-image
            class="img"
            :src="img1"
            fit="scale-down"
            @click.native="handleStaticEquilibrium"
          ></el-image>
          <div class="text">静态平衡训练</div>
        </div>

        <div class="select-item">
          <el-image
            class="img"
            :src="img2"
            fit="scale-down"
            @click.native="handleDynamicEquilibrium"
          ></el-image>
          <div class="text">动态平衡训练</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'train-select',

  data() {
    return {
      img1: require('@/assets/img/Train/Select/静态平衡训练.png'),
      img2: require('@/assets/img/Train/Select/动态平衡训练.png')
    }
  },

  methods: {
    /**
     * @description: 前往静态平衡训练
     */
    handleStaticEquilibrium() {
      this.$router.push({
        path: '/train-static-equilibrium-desc'
      })
    },

    /**
     * @description: 前往动态平衡训练
     */
    handleDynamicEquilibrium() {
      this.$router.push({
        path: '/train-dynamic-equilibrium-desc'
      })
    },

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
.train-select {
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

    /* 训练项目 */
    .select {
      flex: 1;
      @include flex(row, space-around, center);
      .select-item {
        @include flex(column, center, center);
        .img {
          transform: scale(1.2);
          box-shadow: 0 0 8px #1fc047;
          padding: 5px;
        }
        .text {
          color: green;
          margin-top: 35px;
          font-size: 30px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
