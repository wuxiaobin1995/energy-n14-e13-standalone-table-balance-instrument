<!--
 * @Author      : Mr.bin
 * @Date        : 2023-02-02 20:10:00
 * @LastEditTime: 2025-01-03 15:08:53
 * @Description : 动态平衡训练-具体测量
-->
<template>
  <div class="train-dynamic-equilibrium-measure">
    <div class="wrapper">
      <div class="main">
        <div class="left">
          <div class="title">动态平衡训练</div>
          <div class="text">
            请双腿平稳站立在平台中心上，进行指定的训练动作，并维持重心在绿圈范围内，控制训练节奏在2-0-2。
          </div>
        </div>

        <div class="content">
          <div class="chart">
            <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
          </div>
        </div>

        <div class="right">
          <div class="trainPosture">训练姿势：{{ trainPosture }}</div>
          <div class="coefficient">晃动系数：{{ coefficient }}</div>
          <div class="num">训练组数：{{ nowNum }} /{{ num }}</div>
          <div class="count-down">
            <el-image class="img" :src="timeBgSrc" fit="scale-down"></el-image>
            <div class="text">倒计时</div>
            <div class="value">{{ nowTime }}</div>
          </div>
        </div>
      </div>

      <div class="btn">
        <el-button class="item" type="danger" round @click="handleGoBack"
          >返 回</el-button
        >
        <el-button
          :disabled="isStart"
          class="item"
          type="primary"
          round
          @click="handleStart"
          >开 始 训 练</el-button
        >
        <el-button
          :disabled="!isPdf"
          class="item"
          type="success"
          round
          @click="handlePdf"
          >查 看 报 告</el-button
        >
      </div>

      <el-dialog
        title="休息倒计时"
        :visible.sync="dialogVisible"
        width="16%"
        top="32vh"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :center="true"
      >
        <div class="dialog-value">
          {{ nowRestTime }}
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

/* 数据库 */
import { initDB } from '@/db/index.js'

/* 计算圆的相关参数 */
import { setCircle } from '@/utils/setCircle.js'

export default {
  name: 'train-dynamic-equilibrium-measure',

  data() {
    return {
      /* 路由传参 */
      trainPosture: JSON.parse(this.$route.query.trainPosture),
      coefficient: JSON.parse(this.$route.query.coefficient),
      num: JSON.parse(this.$route.query.num),
      time: JSON.parse(this.$route.query.time),
      restTime: JSON.parse(this.$route.query.restTime),
      routerName: JSON.parse(this.$route.query.routerName),

      timeBgSrc: require('@/assets/img/Train/Dynamic_Equilibrium/Measure/倒计时背景.png'), // 倒计时背景

      /* 控制相关 */
      isStart: false,
      isPdf: false,
      isRest: false,

      /* 串口相关变量 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200, // 默认波特率115200

      /* 图形相关变量 */
      myChart: null,
      option: {},

      /* 其他 */
      timeClock: null, // 倒计时计时器
      restTimeClock: null, // 休息计时器
      maxAction: '',
      dx: 0, // 相对x轴位移
      dy: 0, // 相对y轴位移
      trajectoryArray: [], // 完整的轨迹数组
      pdfTime: '',

      showTrajectoryArray: [], // 每一组展示的轨迹数组
      nowNum: 0,
      nowTime: JSON.parse(this.$route.query.time),
      nowRestTime: JSON.parse(this.$route.query.restTime),
      dialogVisible: false // 休息倒计时弹窗
    }
  },

  created() {
    this.maxAction = parseInt(window.localStorage.getItem('maxAction'))

    this.initSerialPort()
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    // 清除计时器
    if (this.timeClock) {
      clearInterval(this.timeClock)
    }
    if (this.restTimeClock) {
      clearInterval(this.restTimeClock)
    }
    // 关闭串口
    if (this.usbPort) {
      if (this.usbPort.isOpen) {
        this.usbPort.close()
      }
    }
  },

  methods: {
    /**
     * @description: 初始化串口对象
     */
    initSerialPort() {
      SerialPort.list()
        .then(ports => {
          /* 遍历设备的USB串口，目标设备需安装驱动 */
          let comPath = ''
          for (const port of ports) {
            if (/^USB/.test(port.pnpId)) {
              comPath = port.path
              break
            }
          }

          /* 验证USB有没有连接到电脑，但不能验证有无数据发送给上位机 */
          if (comPath) {
            /**
             * @description: 创建串口实例
             * @param {String} comPath 串行端口的系统路径。例如：在Mac、Linux上的/dev/tty.XXX或Windows上的COM1
             * @param {Object} 配置项
             */
            this.usbPort = new SerialPort(comPath, {
              baudRate: this.scmBaudRate,
              autoOpen: false // 是否自动开启串口
            })
            /* 调用 this.usbPort.open() 成功时触发（开启串口成功） */
            this.usbPort.on('open', () => {})
            /* 调用 this.usbPort.open() 失败时触发（开启串口失败） */
            this.usbPort.on('error', () => {
              if (this.timeClock) {
                clearInterval(this.timeClock)
              }
              this.nowTime = this.time

              this.$alert(
                `请重新连接USB线，然后点击"重新训练"按钮！`,
                '串口开启失败',
                {
                  type: 'error',
                  showClose: false,
                  center: true,
                  confirmButtonText: '重新训练',
                  callback: () => {
                    this.handleGoBack()
                  }
                }
              )
            })

            this.parser = this.usbPort.pipe(new Readline({ delimiter: '\n' }))
            this.parser.on('data', data => {
              const dataArray = data.split(',')
              const x = parseInt(dataArray[0])
              const y = parseInt(dataArray[1])

              // this.dx = parseInt(x - this.$store.state.zeroStandard.xStandard)
              this.dx = parseInt(this.$store.state.zeroStandard.xStandard - x)
              this.dy = parseInt(this.$store.state.zeroStandard.yStandard - y)

              if (!isNaN(this.dx) && !isNaN(this.dy)) {
                // 休息时间到
                if (this.isRest === false) {
                  this.trajectoryArray.push([this.dx, this.dy])
                  this.showTrajectoryArray.push([this.dx, this.dy])
                  // 渲染图形
                  this.option.series[0].data = this.showTrajectoryArray
                  this.myChart.setOption(this.option)
                }

                // 完成一组
                if (
                  this.showTrajectoryArray.length === parseInt(this.time * 10)
                ) {
                  this.showTrajectoryArray = []

                  this.nowNum += 1

                  if (this.timeClock) {
                    clearInterval(this.timeClock)
                  }

                  if (this.nowNum === this.num) {
                    // 完成训练
                    this.save()
                  } else {
                    this.nowRestTime = this.restTime
                    this.dialogVisible = true
                    this.isRest = true
                    this.restTimeClock = setInterval(() => {
                      this.nowRestTime -= 1

                      if (this.nowRestTime === 0) {
                        this.dialogVisible = false
                        if (this.restTimeClock) {
                          clearInterval(this.restTimeClock)
                        }

                        this.isRest = false
                        this.nowTime = this.time
                        this.timeClock = setInterval(() => {
                          this.nowTime -= 1
                          if (this.nowTime <= 0) {
                            this.nowTime = 0
                          }
                        }, 1000)
                      }
                    }, 1000)
                  }
                }
              }
            })
          } else {
            this.$getLogger('没有检测到USB连接')
            this.$alert(
              `请重新连接USB线，然后点击"重新训练"按钮！`,
              '没有检测到USB连接',
              {
                type: 'error',
                showClose: false,
                center: true,
                confirmButtonText: '重新训练',
                callback: () => {
                  this.handleGoBack()
                }
              }
            )
          }
        })
        .catch(err => {
          this.$getLogger(err)
          this.$alert(
            `${err}。请重新连接USB线，然后点击"重新训练"按钮！`,
            `初始化SerialPort.list失败`,
            {
              type: 'error',
              showClose: false,
              center: true,
              confirmButtonText: '重新训练',
              callback: () => {
                this.handleGoBack()
              }
            }
          )
        })
    },

    /**
     * @description: 初始化echarts图形
     */
    initChart() {
      /* 相关计算 */
      const boundary = this.maxAction + parseInt(this.maxAction * 0.2) // 方形
      const oneR = parseFloat((this.maxAction * 0.15).toFixed(1)) // 绿色圆半径
      const twoR = parseFloat((this.maxAction * 0.3).toFixed(1)) // 黄色圆半径
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
            data: [],
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
     * @description: 开始训练
     */
    handleStart() {
      this.isStart = true

      if (this.usbPort) {
        if (!this.usbPort.isOpen) {
          this.usbPort.open()
        }
      }

      this.timeClock = setInterval(() => {
        this.nowTime -= 1
        if (this.nowTime <= 0) {
          this.nowTime = 0
        }
      }, 1000)
    },

    /**
     * @description: 完成训练，保存到数据库中
     */
    save() {
      if (this.usbPort) {
        if (this.usbPort.isOpen) {
          this.usbPort.close()
        }
      }

      if (this.timeClock) {
        clearInterval(this.timeClock)
      }
      if (this.restTimeClock) {
        clearInterval(this.restTimeClock)
      }

      this.pdfTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      const hospital = window.localStorage.getItem('hospital')
      // 完成该次训练时的岁数
      const currentAge = this.$moment().diff(
        this.$store.state.currentUserInfo.birthday,
        'years'
      )

      const db = initDB()
      db.train_data
        .add({
          hospital: hospital,
          userId: this.$store.state.currentUserInfo.userId,
          userName: this.$store.state.currentUserInfo.userName,
          sex: this.$store.state.currentUserInfo.sex,
          affectedSide: this.$store.state.currentUserInfo.affectedSide,
          height: this.$store.state.currentUserInfo.height,
          weight: this.$store.state.currentUserInfo.weight,
          birthday: this.$store.state.currentUserInfo.birthday,
          currentAge: currentAge, // 完成该次训练时的岁数
          pdfTime: this.pdfTime,

          trajectoryArray: this.trajectoryArray, // 完整的轨迹数组

          posture: this.trainPosture, // 训练姿势
          coefficient: this.coefficient, // 晃动系数
          num: this.num, // 训练组数
          time: this.time, // 测量时长
          restTime: this.restTime, // 休息时长
          type: '动态平衡训练'
        })
        .then(() => {
          this.isPdf = true
          this.$message({
            message: '数据保存成功，可查看报告！',
            type: 'success',
            duration: 1500
          })
        })
        .catch(() => {
          this.$alert(`请点击"重新训练"按钮！`, '数据保存失败', {
            type: 'error',
            showClose: false,
            center: true,
            confirmButtonText: '重新训练',
            callback: () => {
              this.handleGoBack()
            }
          })
        })
    },

    /**
     * @description: 查看PDF
     */
    handlePdf() {
      this.$router.push({
        path: '/train-dynamic-equilibrium-pdf',
        query: {
          userId: JSON.stringify(this.$store.state.currentUserInfo.userId),
          pdfTime: JSON.stringify(this.pdfTime),
          routerName: JSON.stringify('/train-dynamic-equilibrium-desc')
        }
      })
    },

    /**
     * @description: 回到上一页
     */
    handleGoBack() {
      this.$router.push({
        path: '/train-dynamic-equilibrium-desc'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.train-dynamic-equilibrium-measure {
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
    @include flex(column, stretch, stretch);

    .main {
      flex: 1;
      @include flex(row, space-around, stretch);

      .left {
        width: 30%;
        .title {
          font-weight: 700;
          font-size: 50px;
          color: green;
        }
        .text {
          font-size: 24px;
          margin-top: 20px;
          line-height: 2em;
        }
      }

      .content {
        flex: 1;
        @include flex(row, center, center);
        .chart {
          width: 530px;
          height: 550px;
        }
      }

      .right {
        width: 30%;
        @include flex(column, stretch, stretch);

        .trainPosture {
          margin-top: 30px;
          font-size: 24px;
          margin-bottom: 50px;
        }

        .coefficient {
          font-size: 24px;
          margin-bottom: 50px;
        }

        .num {
          font-size: 24px;
          margin-bottom: 50px;
        }

        .count-down {
          position: relative;
          @include flex(column, center, center);
          transform: scale(0.9);
          .img {
            transform: scale(1.2);
          }
          .text {
            position: absolute;
            top: 6%;
            left: 50%;
            transform: translateX(-50%);
            color: #ffffff;
            font-size: 20px;
          }
          .value {
            position: absolute;
            color: #ffffff;
            font-size: 94px;
          }
        }
      }
    }

    .btn {
      @include flex(row, space-around, center);
      .item {
        font-size: 28px;
        width: 250px;
      }
    }

    .dialog-value {
      @include flex(row, center, center);
      height: 130px;
      font-size: 60px;
      color: #ffffff;
      border-radius: 9px;
      background: linear-gradient(
        180deg,
        #2d809e 0%,
        #2d809e 0%,
        #2aa06d 100%,
        #2aa06d 100%
      );
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
