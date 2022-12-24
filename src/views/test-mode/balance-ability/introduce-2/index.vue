<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-24 11:29:06
 * @LastEditTime: 2022-12-24 17:45:05
 * @Description : 平衡能力测试-介绍2
-->
<template>
  <div class="test-balance-ability-introduce-2">
    <div class="wrapper">
      <div class="content">
        <div class="left">
          <div class="title">平衡能力测试-详细介绍(2)</div>
          <div class="action">
            <el-image class="img" :src="actionImg" fit="scale-down"></el-image>
            <div class="text">动作示意图</div>
          </div>
        </div>

        <div class="right">
          <el-image class="img" :src="showImg" fit="scale-down"></el-image>
        </div>
      </div>

      <div class="table">
        <el-image class="img" :src="tableImg" fit="scale-down"></el-image>
      </div>

      <div class="btn">
        <el-button class="item" type="danger" round @click="handleGoBack"
          >返 回</el-button
        >
        <el-button
          class="item"
          type="primary"
          round
          icon="el-icon-caret-left"
          @click="handlePrevious"
          >上 一 项</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-balance-ability-introduce-2',

  data() {
    return {
      actionImg: require('@/assets/img/Test/Balance_Ability/介绍动作2.png'),
      showImg: require('@/assets/img/Test/Balance_Ability/介绍错误评分标准2.png'),
      tableImg: require('@/assets/img/Test/Balance_Ability/表格示意图.png')
    }
  },

  methods: {
    /**
     * @description: 上一项
     */
    handlePrevious() {
      this.$router.push({
        path: '/test-balance-ability-introduce-1'
      })
    },

    /**
     * @description: 返回
     */
    handleGoBack() {
      this.$router.push({
        path: '/test-balance-ability-desc'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test-balance-ability-introduce-2 {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 86%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 0 60px;
    @include flex(column, stretch, stretch);

    .content {
      flex: 1;
      @include flex(row, space-around, center);
      .left {
        .title {
          font-weight: 700;
          font-size: 42px;
          color: green;
          margin-bottom: 35px;
        }
        .action {
          @include flex(column, center, center);
          .img {
            width: 50%;
            box-shadow: 0 0 8px #ee9919;
            border-radius: 22px;
          }
          .text {
            font-size: 18px;
            font-weight: 700;
            margin-top: 4px;
          }
        }
      }

      .right {
        @include flex(row, center, center);
        .img {
          width: 90%;
        }
      }
    }

    .table {
      @include flex(row, center, center);
      .img {
        width: 90%;
      }
    }

    .btn {
      @include flex(row, space-around, center);
      margin: 20px 0;
      .item {
        font-size: 28px;
        width: 220px;
      }
    }
  }
}
</style>
