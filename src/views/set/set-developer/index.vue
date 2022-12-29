<!--
 * @Author      : Mr.bin
 * @Date        : 2022-06-28 11:13:55
 * @LastEditTime: 2022-12-28 15:24:08
 * @Description : 开发者
-->
<template>
  <div class="set-developer">
    <div class="wrapper">
      <el-page-header
        class="page"
        title="返回首页"
        content="开发者"
        @back="handleToHome"
      ></el-page-header>

      <div class="btn">
        <el-button class="item" type="success" round @click="handleOpenDev"
          >打开控制台</el-button
        >
      </div>

      <!-- 边界运动距离 -->
      <div class="set-maxAction">
        <div>
          <span>边界运动距离（mm）：</span>
          <el-input-number
            v-model="maxAction"
            :precision="0"
            :min="1"
            :max="5000"
            @change="handleMaxActionChange"
          ></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 用于打开控制台 */
import { remote } from 'electron'

export default {
  name: 'set-developer',

  data() {
    return {
      maxAction: ''
    }
  },

  created() {
    this.maxAction = parseInt(window.localStorage.getItem('maxAction'))
      ? parseInt(window.localStorage.getItem('maxAction'))
      : 80
  },

  methods: {
    /**
     * @description: 回到首页
     */
    handleToHome() {
      this.$router.push({
        path: '/home'
      })
    },

    /**
     * @description: 打开控制台
     */
    handleOpenDev() {
      try {
        remote.getCurrentWebContents().openDevTools()
      } catch (err) {
        this.$message({
          type: 'error',
          message: `打开控制台失败：${err}`
        })
      }
    },

    /**
     * @description: 边界运动距离变化时触发
     * @param {*} value
     */
    handleMaxActionChange(value) {
      if (!value) {
        value = 100
      }
      window.localStorage.setItem('maxAction', value)
      this.$message({
        message: '修改边界运动距离成功',
        type: 'success',
        duration: 500
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.set-developer {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 86%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 40px;
    @include flex(column, center, center);
    position: relative;

    .page {
      position: absolute;
      top: 20px;
      left: 30px;
    }

    .btn {
      @include flex(column, center, center);
      .item {
        font-size: 28px;
      }
    }

    .set-maxAction {
      margin-top: 100px;
      @include flex(row, center, center);
    }
  }
}
</style>
