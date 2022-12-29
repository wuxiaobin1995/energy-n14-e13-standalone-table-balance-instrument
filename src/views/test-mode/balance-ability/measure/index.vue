<!--
 * @Author      : Mr.bin
 * @Date        : 2022-12-24 17:40:53
 * @LastEditTime: 2022-12-28 17:05:03
 * @Description : 平衡能力测试-具体测量
-->
<template>
  <div class="test-balance-ability-measure">
    <div class="wrapper">
      <div class="left">
        <div class="title">平衡能力测试</div>
        <div class="type">
          <span class="type__item-1">{{ type1 }}</span>
          <span class="type__item-2">{{ type2 }}</span>
        </div>
        <div class="text">
          <span class="leg">{{ leg }}</span
          >{{ text }}
        </div>
      </div>

      <div class="main">
        <div class="chart">
          <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
        </div>
      </div>

      <div class="right">
        <div class="count-down">倒计时</div>
        <div class="result">测试结果</div>
        <div class="btn">
          <el-button class="item" type="success" @click="handleStart"
            >开 始 测 量</el-button
          >
          <el-button class="item" type="danger" @click="handleCancel"
            >退 出 测 试</el-button
          >
          <el-button class="item" type="primary" @click="handleFinish"
            >下一项</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 计算圆的相关参数 */
import { setCircle } from '@/utils/setCircle.js'

export default {
  name: 'test-balance-ability-measure',

  data() {
    return {
      /* 路由传参 */
      showName: JSON.parse(this.$route.query.showName),
      nextRouterName: JSON.parse(this.$route.query.nextRouterName),

      /* 图形相关变量 */
      myChart: null,
      option: {},

      /* 其他 */
      type1: '',
      type2: '',
      leg: '',
      text: ''
    }
  },

  mounted() {
    // this.initChart()
  },

  watch: {
    showName: {
      handler(newValue, oldValue) {
        switch (newValue) {
          case 'test-show-left-1':
            this.type1 = '一档睁眼直立'
            this.type2 = '(晃动系数: 1档)'
            this.leg = '左腿'
            this.text =
              '平稳站立在训练台中心上，睁眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-right-1':
            this.type1 = '一档睁眼直立'
            this.type2 = '(晃动系数: 1档)'
            this.leg = '右腿'
            this.text =
              '平稳站立在训练台中心上，睁眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-left-2':
            this.type1 = '一档睁眼屈膝'
            this.type2 = '(晃动系数: 1档)'
            this.leg = '左腿'
            this.text =
              '平稳站立在训练台中心上，膝关节屈曲30°，睁眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-right-2':
            this.type1 = '一档睁眼屈膝'
            this.type2 = '(晃动系数: 1档)'
            this.leg = '右腿'
            this.text =
              '平稳站立在训练台中心上，膝关节屈曲30°，睁眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-left-3':
            this.type1 = '二档睁眼直立'
            this.type2 = '(晃动系数: 2档)'
            this.leg = '左腿'
            this.text =
              '平稳站立在训练台中心上，睁眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-right-3':
            this.type1 = '二档睁眼直立'
            this.type2 = '(晃动系数: 2档)'
            this.leg = '右腿'
            this.text =
              '平稳站立在训练台中心上，睁眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-left-4':
            this.type1 = '二档睁眼屈膝'
            this.type2 = '(晃动系数: 2档)'
            this.leg = '左腿'
            this.text =
              '平稳站立在训练台中心上，膝关节屈曲30°，睁眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-right-4':
            this.type1 = '二档睁眼屈膝'
            this.type2 = '(晃动系数: 2档)'
            this.leg = '右腿'
            this.text =
              '平稳站立在训练台中心上，膝关节屈曲30°，睁眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-left-5':
            this.type1 = '一档闭眼直立'
            this.type2 = '(晃动系数: 1档)'
            this.leg = '左腿'
            this.text =
              '平稳站立在训练台中心上，闭眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-right-5':
            this.type1 = '一档闭眼直立'
            this.type2 = '(晃动系数: 1档)'
            this.leg = '右腿'
            this.text =
              '平稳站立在训练台中心上，闭眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-left-6':
            this.type1 = '一档闭眼屈膝'
            this.type2 = '(晃动系数: 1档)'
            this.leg = '左腿'
            this.text =
              '平稳站立在训练台中心上，膝关节屈曲30°，闭眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-right-6':
            this.type1 = '一档闭眼屈膝'
            this.type2 = '(晃动系数: 1档)'
            this.leg = '右腿'
            this.text =
              '平稳站立在训练台中心上，膝关节屈曲30°，闭眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-left-7':
            this.type1 = '二档闭眼直立'
            this.type2 = '(晃动系数: 2档)'
            this.leg = '左腿'
            this.text =
              '平稳站立在训练台中心上，闭眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-right-7':
            this.type1 = '二档闭眼直立'
            this.type2 = '(晃动系数: 2档)'
            this.leg = '右腿'
            this.text =
              '平稳站立在训练台中心上，闭眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-left-8':
            this.type1 = '二档闭眼屈膝'
            this.type2 = '(晃动系数: 2档)'
            this.leg = '左腿'
            this.text =
              '平稳站立在训练台中心上，膝关节屈曲30°，闭眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          case 'test-show-right-8':
            this.type1 = '二档闭眼屈膝'
            this.type2 = '(晃动系数: 2档)'
            this.leg = '右腿'
            this.text =
              '平稳站立在训练台中心上，膝关节屈曲30°，闭眼，双手叉腰至髂脊，保持平衡10秒。'
            break
          default:
            this.$alert(
              `请点击"返回首页"按钮，然后重新测试！`,
              '没有找到匹配的测试项目',
              {
                type: 'error',
                showClose: false,
                center: true,
                confirmButtonText: '返回首页',
                callback: () => {
                  this.$router.push({
                    path: '/home'
                  })
                }
              }
            )
            break
        }
      },
      deep: true, // 开启深度监听
      immediate: true // 开启初次触发
    }
  },

  methods: {
    /**
     * @description: 初始化echarts图形
     */
    initChart() {
      /* 相关计算 */
      const maxAction = parseInt(window.localStorage.getItem('maxAction'))

      const boundary = maxAction + parseInt(maxAction * 0.2) // 方形
      const oneR = parseFloat((maxAction * 0.2).toFixed(1)) // 绿色圆半径
      const twoR = parseFloat((maxAction * 0.6).toFixed(1)) // 黄色圆半径
      const threeR = maxAction // 红色圆半径
      const oneRound = setCircle(0, 0, oneR) // 绿色圆数组
      const twoRound = setCircle(0, 0, twoR) // 黄色圆数组
      const threeRound = setCircle(0, 0, threeR) // 红色圆数组

      this.myChart = this.$echarts.init(
        document.getElementById('chart'),
        'light',
        {
          renderer: 'canvas'
        }
      )
      this.option = {
        xAxis: {
          type: 'value',
          min: -boundary,
          max: boundary,
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          min: -boundary,
          max: boundary,
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          // 移动轨迹
          {
            type: 'line',
            name: '移动轨迹',
            data: [],
            color: 'red',
            smooth: false,
            showSymbol: false
          },
          // 边界
          {
            type: 'line',
            name: '边界',
            data: [
              [-boundary, boundary],
              [boundary, boundary],
              [boundary, -boundary],
              [-boundary, -boundary],
              [-boundary, boundary]
            ],
            color: 'black',
            lineStyle: {
              width: 2
            },
            smooth: false,
            showSymbol: false
          },
          // 绿色圆
          {
            type: 'line',
            name: '绿色圆',
            data: oneRound,
            color: 'green',
            lineStyle: {
              width: 4
            },
            smooth: true,
            showSymbol: false
          },
          // 黄色圆
          {
            type: 'line',
            name: '黄色圆',
            data: twoRound,
            color: 'yellow',
            lineStyle: {
              width: 4
            },
            smooth: true,
            showSymbol: false
          },
          // 红色圆
          {
            type: 'line',
            name: '红色圆',
            data: threeRound,
            color: 'red',
            lineStyle: {
              width: 4
            },
            smooth: true,
            showSymbol: false
          }
        ],
        animation: false
      }
      this.myChart.setOption(this.option)
    },

    /**
     * @description: 开始测试
     */
    handleStart() {},

    /**
     * @description: 退出测试
     */
    handleCancel() {},

    /**
     * @description: 下一项或者查看报告
     */
    handleFinish() {
      this.$router.push({
        path: this.nextRouterName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test-balance-ability-measure {
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
    @include flex(row, space-between, stretch);

    .left {
      width: 30%;
      .title {
        font-weight: 700;
        font-size: 40px;
      }
      .type {
        margin-top: 40px;
        .type__item-1 {
          font-size: 26px;
          font-weight: 700;
        }
        .type__item-2 {
          font-size: 20px;
          color: orange;
          margin-left: 10px;
        }
      }
      .text {
        margin-top: 30px;
        font-size: 20px;
        .leg {
          color: green;
          font-weight: 700;
          line-height: 2em;
        }
      }
    }

    .main {
      flex: 1;
      @include flex(row, center, center);
      .chart {
        width: 580px;
        height: 600px;
      }
    }

    .right {
      width: 30%;
      @include flex(column, space-between, center);
      // .count-down {
      // }
      // .result {
      // }
      .btn {
        @include flex(column, center, center);
        .item {
          font-size: 24px;
          width: 220px;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
