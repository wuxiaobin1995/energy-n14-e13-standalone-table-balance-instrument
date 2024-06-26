<!--
 * @Author      : Mr.bin
 * @Date        : 2023-02-02 16:30:02
 * @LastEditTime: 2023-03-15 14:55:12
 * @Description : 静态稳定测试-具体测量
-->
<template>
  <div class="test-static-stability-measure">
    <div class="wrapper">
      <div class="main">
        <div class="left">
          <div class="title">静态稳定测试</div>
          <div class="text">
            请双脚平稳站立在训练台中心上保持一定的下蹲角度，使重心保持在绿色区域内，可选择睁眼/闭眼进行测试。
          </div>
        </div>

        <div class="content">
          <div class="chart">
            <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
          </div>
        </div>

        <div class="right">
          <div class="coefficient">晃动系数：{{ coefficient }}</div>

          <div class="count-down">
            <el-image class="img" :src="timeBgSrc" fit="scale-down"></el-image>
            <div class="text">倒计时</div>
            <div class="value">{{ time }}</div>
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
          >开 始 测 量</el-button
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
  name: 'test-static-stability-measure',

  data() {
    return {
      /* 路由传参 */
      time: JSON.parse(this.$route.query.time),
      coefficient: JSON.parse(this.$route.query.coefficient),
      routerName: JSON.parse(this.$route.query.routerName),

      timeBgSrc: require('@/assets/img/Test/Static_Stability/Measure/倒计时背景.png'), // 倒计时背景

      isStart: false,
      isPdf: false,

      /* 串口相关变量 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200, // 默认波特率115200

      /* 图形相关变量 */
      myChart: null,
      option: {},

      /* 其他 */
      timeClock: null, // 计时器
      maxAction: '',
      dx: 0, // 相对x轴位移
      dy: 0, // 相对y轴位移
      trajectoryArray: [], // 轨迹数组
      pdfTime: ''
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
              this.time = JSON.parse(this.$route.query.time)

              this.$alert(
                `请重新连接USB线，然后点击"重新测试"按钮！`,
                '串口开启失败',
                {
                  type: 'error',
                  showClose: false,
                  center: true,
                  confirmButtonText: '重新测试',
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

              this.dx = parseInt(x - this.$store.state.zeroStandard.xStandard)
              this.dy = parseInt(this.$store.state.zeroStandard.yStandard - y)

              if (!isNaN(this.dx) && !isNaN(this.dy)) {
                this.trajectoryArray.push([this.dx, this.dy])

                // 渲染图形
                this.option.series[0].data = this.trajectoryArray
                this.myChart.setOption(this.option)
              }
            })
          } else {
            this.$getLogger('没有检测到USB连接')
            this.$alert(
              `请重新连接USB线，然后点击"重新测试"按钮！`,
              '没有检测到USB连接',
              {
                type: 'error',
                showClose: false,
                center: true,
                confirmButtonText: '重新测试',
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
            `${err}。请重新连接USB线，然后点击"重新测试"按钮！`,
            `初始化SerialPort.list失败`,
            {
              type: 'error',
              showClose: false,
              center: true,
              confirmButtonText: '重新测试',
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
     * @description: 开始测试
     */
    handleStart() {
      this.isStart = true

      if (this.usbPort) {
        if (!this.usbPort.isOpen) {
          this.usbPort.open()
        }
      }

      this.timeClock = setInterval(() => {
        this.time -= 1
        if (this.time === 0) {
          this.save()
        }
      }, 1000)
    },

    /**
     * @description: 完成所有测试项，保存到数据库中
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
      this.time = 0

      this.pdfTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      const hospital = window.localStorage.getItem('hospital')
      // 完成该次测试时的岁数
      const currentAge = this.$moment().diff(
        this.$store.state.currentUserInfo.birthday,
        'years'
      )

      const db = initDB()
      db.test_data
        .add({
          hospital: hospital,
          userId: this.$store.state.currentUserInfo.userId,
          userName: this.$store.state.currentUserInfo.userName,
          sex: this.$store.state.currentUserInfo.sex,
          affectedSide: this.$store.state.currentUserInfo.affectedSide,
          height: this.$store.state.currentUserInfo.height,
          weight: this.$store.state.currentUserInfo.weight,
          birthday: this.$store.state.currentUserInfo.birthday,
          currentAge: currentAge, // 完成该次测试时的岁数
          pdfTime: this.pdfTime,
          trajectoryArray: this.trajectoryArray, // 轨迹数组
          time: JSON.parse(this.$route.query.time), // 测量时长
          coefficient: this.coefficient, // 晃动系数
          type: '静态稳定测试'
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
          this.$alert(`请点击"重新测试"按钮！`, '数据保存失败', {
            type: 'error',
            showClose: false,
            center: true,
            confirmButtonText: '重新测试',
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
        path: '/test-static-stability-pdf',
        query: {
          userId: JSON.stringify(this.$store.state.currentUserInfo.userId),
          pdfTime: JSON.stringify(this.pdfTime),
          routerName: JSON.stringify('/test-static-stability-desc')
        }
      })
    },

    /**
     * @description: 回到上一页
     */
    handleGoBack() {
      this.$router.push({
        path: '/test-static-stability-desc'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test-static-stability-measure {
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
        @include flex(column, stretch, center);
        .coefficient {
          font-size: 24px;
          margin-top: 70px;
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
        font-size: 24px;
        width: 220px;
      }
    }
  }
}
</style>
