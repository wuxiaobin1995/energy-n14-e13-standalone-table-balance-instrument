<!--
 * @Author      : Mr.bin
 * @Date        : 2023-02-02 18:55:22
 * @LastEditTime: 2023-02-03 16:08:12
 * @Description : 训练-数据记录
-->
<template>
  <div class="train-record">
    <div class="wrapper">
      <div class="btn">
        <el-button
          class="item"
          type="warning"
          round
          plain
          @click="handleStaticEquilibrium"
          >静态平衡训练</el-button
        >

        <el-button
          class="item"
          type="success"
          round
          plain
          @click="handleDynamicEquilibrium"
          >动态平衡训练</el-button
        >
      </div>

      <div class="divider"></div>

      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'train-record',

  methods: {
    /**
     * @description: 静态平衡训练
     */
    handleStaticEquilibrium() {
      this.$router.push({ path: '/train-record/static-equilibrium' })
    },

    /**
     * @description: 动态平衡训练
     */
    handleDynamicEquilibrium() {
      this.$router.push({ path: '/train-record/dynamic-equilibrium' })
    }
  }
}
</script>

<style lang="scss" scoped>
/* 路由过渡动效 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}

.train-record {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 96%;
    height: 96%;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 20px;

    .btn {
      @include flex(row, space-around, center);
      .item {
        width: 180px;
        font-size: 22px;
      }
    }

    .divider {
      margin-top: 20px;
      border: 1px solid rgb(204, 204, 204);
      width: 100%;
    }
  }
}
</style>
