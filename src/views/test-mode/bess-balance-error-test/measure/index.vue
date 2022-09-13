<!--
 * @Author      : Mr.bin
 * @Date        : 2022-04-26 15:41:27
 * @LastEditTime: 2022-06-15 17:53:20
 * @Description : BESS平衡错误测试-测量页面
-->
<template>
  <div class="bess-balance-error-test-measure">
    <!-- 标题 -->
    <div class="title">BESS平衡错误测试</div>

    <!-- 说明文字 -->
    <div class="caption">
      <div class="instability-index">
        固定参数：不稳定系数{{ instabilityIndex }}级
      </div>
      <div class="action">{{ action }}</div>
    </div>

    <!-- 图形 -->
    <div></div>

    <!-- 按钮组 -->
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'bess-balance-error-test-measure',

  data() {
    return {
      instabilityIndex: 1, // 不稳定系数
      // 动作描述
      actionObj: {
        action1: `动作1：请双脚平稳站立在训练台中心上，闭眼，双手叉腰至髂棘，保持平衡20秒。`,
        action2: `动作2：请单脚平稳站立在训练台中心上，闭眼，双手叉腰至髂棘，非支撑腿屈髋≥60°，保持平衡20秒。`,
        action3: `动作3：请双脚串联步站立在训练台中心上，非优势侧在后，闭眼，双手叉腰至髂棘，保持平衡20秒。`,
        action4: `动作4：请双脚平稳站立在训练台中心上，闭眼，双手叉腰至髂棘，保持平衡20秒。`,
        action5: `动作5：请单脚平稳站立在训练台中心上，闭眼，双手叉腰至髂棘，非支撑腿屈髋≥60°，保持平衡20秒。`,
        action6: `动作6：请双脚串联步站立在训练台中心上，非优势侧在后，闭眼，双手叉腰至髂棘，保持平衡20秒。`
      },
      action: ''
    }
  },

  created() {
    this.$store.dispatch('setIsCollapse', true)

    this.action = this.actionObj.action1
  },

  watch: {
    // 根据 action 来设置不同的 instabilityIndex
    action: {
      handler(newValue, oldValue) {
        if (
          newValue === this.actionObj.action1 ||
          newValue === this.actionObj.action2 ||
          newValue === this.actionObj.action3
        ) {
          this.instabilityIndex = 1
        } else {
          this.instabilityIndex = 3
        }
      },
      immediate: true // 开启初次触发
    }
  }
}
</script>

<style lang="scss" scoped>
.bess-balance-error-test-measure {
  width: 100%;
  height: 100%;
  padding: 20px 40px;
  @include flex(column, flex-start, stretch);
}
</style>
