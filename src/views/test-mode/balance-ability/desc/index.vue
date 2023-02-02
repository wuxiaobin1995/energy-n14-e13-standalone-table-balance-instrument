<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-24 11:27:50
 * @LastEditTime: 2023-02-02 16:05:15
 * @Description : 平衡能力测试-描述
-->
<template>
  <div class="test-balance-ability-desc">
    <div class="wrapper">
      <div class="content">
        <div class="left">
          <div class="title">平衡能力测试</div>
          <div class="sub-title">测试说明</div>
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

        <div class="right">
          <el-image class="img" :src="showImg" fit="scale-down"></el-image>
        </div>
      </div>

      <div class="table">
        <el-image :src="tableImg" fit="scale-down"></el-image>
      </div>

      <div class="btn">
        <el-button class="item" type="danger" round @click="handleGoBack"
          >返 回</el-button
        >
        <el-button class="item" type="primary" round @click="handleStart"
          >开 始 测 试</el-button
        >
        <el-button
          class="item"
          type="warning"
          round
          icon="el-icon-search"
          @click="handleIntroduce"
          >查看详细介绍</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-balance-ability-desc',

  data() {
    return {
      showImg: require('@/assets/img/Test/Balance_Ability/图形示意图.png'),
      tableImg: require('@/assets/img/Test/Balance_Ability/表格示意图.png')
    }
  },

  created() {
    // 初始化平衡能力测试的最终结果
    this.$store.dispatch('changeBalanceAbilityResult', {
      l1: null, // 一档睁眼直立，左腿（动作1）
      r1: null, // 一档睁眼直立，右腿（动作1）
      l2: null, // 一档睁眼屈膝，左腿（动作2）
      r2: null, // 一档睁眼屈膝，右腿（动作2）
      l3: null, // 二档睁眼直立，左腿（动作3）
      r3: null, // 二档睁眼直立，右腿（动作3）
      l4: null, // 二档睁眼屈膝，左腿（动作4）
      r4: null, // 二档睁眼屈膝，右腿（动作4）
      l5: null, // 一档闭眼直立，左腿（动作5）
      r5: null, // 一档闭眼直立，右腿（动作5）
      l6: null, // 一档闭眼屈膝，左腿（动作6）
      r6: null, // 一档闭眼屈膝，右腿（动作6）
      l7: null, // 二档闭眼直立，左腿（动作7）
      r7: null, // 二档闭眼直立，右腿（动作7）
      l8: null, // 二档闭眼屈膝，左腿（动作8）
      r8: null // 二档闭眼屈膝，右腿（动作8）
    })
  },

  methods: {
    /**
     * @description: 开始测试
     */
    handleStart() {
      this.$router.push({
        path: '/test-show-left-1'
      })
    },

    /**
     * @description: 查看详细介绍
     */
    handleIntroduce() {
      this.$router.push({
        path: '/test-balance-ability-introduce-1'
      })
    },

    /**
     * @description: 回到上一页
     */
    handleGoBack() {
      this.$router.push({
        path: '/test-select'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test-balance-ability-desc {
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

    .content {
      @include flex(row, space-between, stretch);
      .left {
        .title {
          font-weight: 700;
          font-size: 46px;
          color: green;
        }
        .sub-title {
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
      .right {
        .img {
          width: 85%;
        }
      }
    }

    .table {
      flex: 1;
      @include flex(row, center, center);
    }

    .btn {
      @include flex(row, space-around, center);
      margin-top: 10px;
      .item {
        font-size: 28px;
        width: 250px;
      }
    }
  }
}
</style>
