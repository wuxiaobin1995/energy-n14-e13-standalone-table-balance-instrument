<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-24 11:28:34
 * @LastEditTime: 2022-12-24 17:44:32
 * @Description : 平衡能力测试-介绍1
-->
<template>
  <div class="test-balance-ability-introduce-1">
    <div class="wrapper">
      <div class="title">平衡能力测试-详细介绍(1)</div>

      <div class="main">
        <div class="action">
          <el-image class="img" :src="actionImg" fit="scale-down"></el-image>
          <div class="text">动作示意图</div>
        </div>

        <div class="content">
          <div class="title">测试说明</div>
          <div class="item">
            <div>
              <i class="el-icon-star-on"></i>
              &nbsp;<span class="item-title">每个动作的测试时间10秒</span>
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;完成测试得1分，不能完成为0分，满分16分。
            </div>
          </div>
          <div class="item">
            <div>
              <i class="el-icon-star-on"></i>
              &nbsp;<span class="item-title">屈 膝</span>
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单脚站立膝关节屈曲30度，双手叉腰，固定于髂前上棘。
            </div>
          </div>
          <div class="item">
            <div>
              <i class="el-icon-star-on"></i>
              &nbsp;<span class="item-title">直 立</span>
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单脚直立，双手叉腰，固定于髂前上棘。
            </div>
          </div>
        </div>
      </div>

      <div class="btn">
        <el-button class="item" type="danger" round @click="handleGoBack"
          >返 回</el-button
        >
        <el-button
          class="item"
          type="primary"
          round
          icon="el-icon-caret-right"
          @click="handleNext"
          >下 一 项</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-balance-ability-introduce-1',

  data() {
    return {
      actionImg: require('@/assets/img/Test/Balance_Ability/介绍动作1.png')
    }
  },

  methods: {
    /**
     * @description: 下一项
     */
    handleNext() {
      this.$router.push({
        path: '/test-balance-ability-introduce-2'
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
.test-balance-ability-introduce-1 {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 86%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 20px 60px;
    @include flex(column, stretch, stretch);

    .title {
      font-weight: 700;
      font-size: 42px;
      color: green;
    }

    .main {
      flex: 1;
      @include flex(row, space-around, center);
      .action {
        @include flex(column, center, center);
        .img {
          width: 90%;
          box-shadow: 0 0 12px #ee9919;
          border-radius: 26px;
        }
        .text {
          font-size: 18px;
          font-weight: 700;
          margin-top: 6px;
        }
      }

      .content {
        .title {
          font-weight: 700;
          font-size: 36px;
          margin: 20px 0 30px 0;
        }
        .item {
          font-size: 22px;
          margin: 20px 0;
          .item-title {
            font-weight: 700;
          }
        }
      }
    }

    .btn {
      @include flex(row, space-around, center);
      margin: 10px 0;
      .item {
        font-size: 28px;
        width: 220px;
      }
    }
  }
}
</style>
