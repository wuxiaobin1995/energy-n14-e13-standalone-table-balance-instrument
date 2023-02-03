<!--
 * @Author      : Mr.bin
 * @Date        : 2023-02-03 15:07:42
 * @LastEditTime: 2023-02-03 15:26:15
 * @Description : 静态平衡训练-PDF
-->
<template>
  <div
    class="train-static-equilibrium-pdf"
    v-loading.fullscreen.lock="fullscreenLoading"
  >
    <!-- PDF区域 -->
    <div id="pdf" class="pdf-wrapper">
      <div class="top">
        <el-image class="logo" :src="logoSrc" fit="scale-down"></el-image>

        <div class="title">静态平衡训练报告</div>

        <div class="divider"></div>

        <div class="info">
          <div class="item">{{ hospital }}</div>
          <div class="item">姓名：{{ pdfData.userName }}</div>
          <div class="item">年龄：{{ pdfData.currentAge }}</div>
          <div class="item">性别：{{ pdfData.sex }}</div>
          <div class="item">训练日期：{{ pdfData.pdfTime }}</div>
        </div>

        <div class="divider"></div>
      </div>

      <div class="content">
        <div class="left">
          <div class="result">
            完成度：<span class="value">{{ greenRate }}</span
            > %
          </div>
          <div class="posture">
            训练姿势：<span class="value">{{ pdfData.posture }}</span>
          </div>
          <div class="coefficient">
            晃动系数：<span class="value">{{ pdfData.coefficient }}</span>
          </div>
          <div class="num">
            训练组数：<span class="value">{{ pdfData.num }}</span
            > 组
          </div>
          <div class="time">
            训练时长：<span class="value">{{ pdfData.time }}</span
            > s
          </div>
          <div class="restTime">
            休息时长：<span class="value">{{ pdfData.restTime }}</span
            > s
          </div>
        </div>

        <div class="main">
          <div class="chart">
            <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
          </div>
        </div>

        <div class="right">
          <div class="green">
            <div>
              <span class="value">{{ greenRate }}</span
              >%
            </div>
            <div class="text">绿色区域时间占比</div>
          </div>
          <div class="yellow">
            <div>
              <span class="value">{{ yellowRate }}</span
              >%
            </div>
            <div class="text">黄色区域时间占比</div>
          </div>
          <div class="red">
            <div>
              <span class="value">{{ redRate }}</span
              >%
            </div>
            <div class="text">红色区域时间占比</div>
          </div>

          <div class="advice">推荐值：绿色区域≥85%</div>
        </div>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="btn">
      <el-button class="item" type="primary" @click="handlePdf"
        >保存PDF</el-button
      >
      <el-button class="item" type="warning" @click="handleGoBack"
        >返 回</el-button
      >
    </div>
  </div>
</template>

<script>
/* 数据库 */
import { initDB } from '@/db/index.js'

/* 计算圆的相关参数 */
import { setCircle } from '@/utils/setCircle.js'

export default {
  name: 'train-static-equilibrium-pdf',

  data() {
    return {
      /* 路由传参 */
      userId: JSON.parse(this.$route.query.userId),
      pdfTime: JSON.parse(this.$route.query.pdfTime),
      routerName: JSON.parse(this.$route.query.routerName),

      logoSrc: require('@/assets/img/Company_Logo/logo_1.png'), // 公司商标

      /* 图形相关变量 */
      myChart: null,
      option: {},

      /* 其他 */
      fullscreenLoading: false,

      pdfData: {},

      greenRate: '',
      yellowRate: '',
      redRate: '',

      hospital: window.localStorage.getItem('hospital')
        ? window.localStorage.getItem('hospital')
        : '未设置医院'
    }
  },

  created() {
    this.maxAction = parseInt(window.localStorage.getItem('maxAction'))

    this.getTrainData()
  },

  methods: {
    /**
     * @description: 获取对应 [ID、训练时间] 的训练报告源数据，并做相关计算
     */
    getTrainData() {
      this.fullscreenLoading = true
      const db = initDB()
      db.train_data
        .where({
          userId: this.userId,
          pdfTime: this.pdfTime
        })
        .toArray()
        .then(res => {
          this.pdfData = res[0]
        })
        .then(() => {
          this.initChart()
        })
        .then(() => {
          /* 计算颜色占比 */
          const greenArray = []
          const yellowArray = []
          const redArray = []
          const greenRound = parseFloat((this.maxAction * 0.2).toFixed(1)) // 绿圈的位置
          const yellowRound = parseFloat((this.maxAction * 0.6).toFixed(1)) // 黄圈的位置

          let l = 0
          for (let i = 0; i < this.pdfData.trajectoryArray.length; i++) {
            const itemArrray = this.pdfData.trajectoryArray[i]
            l = Math.sqrt(
              Math.pow(itemArrray[0], 2) + Math.pow(itemArrray[1], 2)
            )
            if (l <= greenRound) {
              greenArray.push(1)
            } else if (l > greenRound && l <= yellowRound) {
              yellowArray.push(1)
            } else {
              redArray.push(1)
            }
          }

          this.greenRate = parseFloat(
            (
              (greenArray.length / this.pdfData.trajectoryArray.length) *
              100
            ).toFixed(1)
          )
          this.yellowRate = parseFloat(
            (
              (yellowArray.length / this.pdfData.trajectoryArray.length) *
              100
            ).toFixed(1)
          )
          this.redRate = parseFloat(
            (
              (redArray.length / this.pdfData.trajectoryArray.length) *
              100
            ).toFixed(1)
          )
        })
        .catch(err => {
          this.$confirm(
            `${err}。获取ID为 [${this.userId}] 的用户数据失败，请重试！`,
            '提示',
            {
              type: 'warning',
              center: true,
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              confirmButtonText: '重 试',
              cancelButtonText: '返 回'
            }
          )
            .then(() => {
              this.getTrainData()
            })
            .catch(() => {
              this.handleGoBack()
            })
        })
        .finally(() => {
          this.fullscreenLoading = false
        })
    },

    /**
     * @description: 初始化echarts图形
     */
    initChart() {
      /* 相关计算 */
      const boundary = this.maxAction + parseInt(this.maxAction * 0.2) // 方形
      const oneR = parseFloat((this.maxAction * 0.2).toFixed(1)) // 绿色圆半径
      const twoR = parseFloat((this.maxAction * 0.6).toFixed(1)) // 黄色圆半径
      const threeR = this.maxAction // 红色圆半径
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
            data: this.pdfData.trajectoryArray,
            color: 'black',
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
            color: 'rgba(0, 0, 0, 1)',
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
            color: 'rgba(0, 255, 0, 0.7)',
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
            color: 'rgba(255, 255, 0, 0.7)',
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
            color: 'rgba(255, 0, 0, 0.7)',
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
     * @description: 保存PDF
     */
    handlePdf() {
      this.$htmlToPdf(
        'pdf',
        `静态平衡训练报告 ${this.$moment().format('YYYY-MM-DD HH_mm_ss')}`,
        420
      )
    },

    /**
     * @description: 返回上一页
     */
    handleGoBack() {
      this.$router.push({
        path: this.routerName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.train-static-equilibrium-pdf {
  width: 100vw;
  height: 100vh;
  padding: 10px;
  @include flex(column, stretch, stretch);

  /* PDF区域 */
  .pdf-wrapper {
    flex: 1;
    @include flex(column, stretch, stretch);

    .top {
      position: relative;
      @include flex(column, stretch, center);
      .logo {
        position: absolute;
        top: 10px;
        right: 5px;
        width: 180px;
      }
      .title {
        font-size: 50px;
      }
      .divider {
        margin-top: 15px;
        border: 1px solid rgb(204, 204, 204);
        width: 100%;
      }
      .info {
        width: 100%;
        margin-top: 15px;
        @include flex(row, space-around, center);
        .item {
          font-size: 20px;
        }
      }
    }

    .content {
      @include flex(row, space-around, center);
      .left {
        width: 30%;
        @include flex(column, center, stretch);
        padding-left: 40px;
        .result {
          font-size: 30px;
          margin: 20px 0;
        }
        .posture {
          font-size: 30px;
          margin: 20px 0;
        }
        .coefficient {
          font-size: 30px;
          margin: 20px 0;
        }
        .num {
          font-size: 30px;
          margin: 20px 0;
        }
        .time {
          font-size: 30px;
          margin: 20px 0;
        }
        .restTime {
          font-size: 30px;
          margin: 20px 0;
        }
        .value {
          border: 1px solid black;
          border-radius: 6px;
          padding: 0 20px;
          background-color: rgba(173, 173, 173, 0.5);
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
        @include flex(column, center, flex-start);
        padding-left: 80px;
        .green {
          font-size: 22px;
          .value {
            font-size: 26px;
            border: 1px solid black;
            border-radius: 6px;
            background-color: green;
            padding: 2px 40px;
            margin-right: 4px;
          }
          .text {
            margin-top: 10px;
          }
        }
        .yellow {
          margin-top: 20px;
          font-size: 18px;
          .value {
            font-size: 26px;
            border: 1px solid black;
            border-radius: 6px;
            background-color: yellow;
            padding: 2px 40px;
            margin-right: 4px;
          }
          .text {
            margin-top: 10px;
          }
        }
        .red {
          margin-top: 20px;
          font-size: 18px;
          .value {
            font-size: 26px;
            border: 1px solid black;
            border-radius: 6px;
            background-color: red;
            padding: 2px 40px;
            margin-right: 4px;
          }
          .text {
            margin-top: 10px;
          }
        }
        .advice {
          margin-top: 40px;
          font-size: 18px;
          font-weight: 700;
          color: green;
        }
      }
    }
  }

  /* 按钮组 */
  .btn {
    @include flex(row, center, center);
    margin-bottom: 10px;
    .item {
      font-size: 28px;
      margin: 0 50px;
    }
  }
}
</style>
