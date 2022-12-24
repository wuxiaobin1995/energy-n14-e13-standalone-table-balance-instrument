<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-23 21:47:05
 * @LastEditTime: 2022-12-24 17:42:41
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
        <div class="select-item">
          <el-image
            class="img"
            :src="img1"
            fit="scale-down"
            @click.native="handleBalanceAbility"
          ></el-image>
          <div class="text">平衡能力测试</div>
        </div>

        <div class="select-item">
          <el-image
            class="img"
            :src="img2"
            fit="scale-down"
            @click.native="handleStaticStability"
          ></el-image>
          <div class="text">静态稳定测试</div>
        </div>

        <div class="select-item">
          <el-image
            class="img"
            :src="img3"
            fit="scale-down"
            @click.native="handleDynamicStability"
          ></el-image>
          <div class="text">动态稳定测试</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-select',

  data() {
    return {
      img1: require('@/assets/img/Test/Select/平衡能力测试.png'),
      img2: require('@/assets/img/Test/Select/静态稳定测试.png'),
      img3: require('@/assets/img/Test/Select/动态稳定测试.png')
    }
  },

  methods: {
    /**
     * @description: 前往平衡能力测试
     */
    handleBalanceAbility() {
      this.$router.push({
        path: '/test-balance-ability-desc'
      })
    },

    /**
     * @description: 前往静态稳定测试
     */
    handleStaticStability() {
      this.$router.push({
        path: '/test-static-stability-desc'
      })
    },

    /**
     * @description: 前往动态稳定测试
     */
    handleDynamicStability() {
      this.$router.push({
        path: '/test-dynamic-stability-desc'
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
